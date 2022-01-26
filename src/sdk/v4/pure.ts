import { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { BytesLike, hexDataLength, hexDataSlice } from '@ethersproject/bytes';
import { ContractTransaction } from 'ethers';
import {
  ERC1155__factory,
  ERC20__factory,
  ERC721__factory,
} from '../../contracts';
import { UnexpectedAssetTypeError } from '../error';
import { InterallySupportedAssetFormat, MAX_APPROVAL } from '../v3/pure';

// User facing
export interface UserFacingERC20AssetDataSerialized {
  tokenAddress: string;
  type: 'ERC20';
  amount: string;
}

export interface UserFacingERC721AssetDataSerialized {
  tokenAddress: string;
  tokenId: string;
  type: 'ERC721';
}

//   export interface UserFacingERC1155AssetDataSerialized {
//     tokenAddress: string;
//     tokens: Array<{ tokenId: string; tokenValue: string }>;
//     type: 'ERC1155';
//   }

/**
 * Mimic the erc721 duck type
 */
export interface UserFacingERC1155AssetDataSerializedNormalizedSingle {
  tokenAddress: string;
  tokenId: string;
  type: 'ERC1155';
  amount?: string; // Will default to '1'
}

export type SwappableAsset =
  | UserFacingERC20AssetDataSerialized
  | UserFacingERC721AssetDataSerialized
  | UserFacingERC1155AssetDataSerializedNormalizedSingle;

export type FeeStruct = {
  recipient: string;
  amount: BigNumberish;
  feeData: BytesLike;
};

export type PropertyStruct = {
  propertyValidator: string;
  propertyData: BytesLike;
};

export type ERC721OrderStruct = {
  direction: BigNumberish;
  maker: string;
  taker: string;
  expiry: BigNumberish;
  nonce: BigNumberish;
  erc20Token: string;
  erc20TokenAmount: BigNumberish;
  fees: FeeStruct[];
  erc721Token: string;
  erc721TokenId: BigNumberish;
  erc721TokenProperties: PropertyStruct[];
};

// export type ERC721Order = {
//     direction: 0 | 1 | '0' | '1'; // sell = 0, buy = 1
//     maker: string;
//     taker: string;
//     expiry: string;
//     nonce: string;
//     erc20Token: string;
//     erc20TokenAmount: string;
//     fees: FeeStruct[];
//     erc721Token: string;
//     erc721TokenId: string;
//     erc721TokenProperties: string[];
//   };

export const EIP712_DOMAIN_PARAMETERS = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];

const ERC721ORDER_STRUCT_ABI = [
  { type: 'uint8', name: 'direction' },
  { type: 'address', name: 'maker' },
  { type: 'address', name: 'taker' },
  { type: 'uint256', name: 'expiry' },
  { type: 'uint256', name: 'nonce' },
  { type: 'address', name: 'erc20Token' },
  { type: 'uint256', name: 'erc20TokenAmount' },
  { type: 'Fee[]', name: 'fees' },
  { type: 'address', name: 'erc721Token' },
  { type: 'uint256', name: 'erc721TokenId' },
  { type: 'Property[]', name: 'erc721TokenProperties' },
];

const FEE_ABI = [
  { type: 'address', name: 'recipient' },
  { type: 'uint256', name: 'amount' },
  { type: 'bytes', name: 'feeData' },
];

const PROPERTY_ABI = [
  { type: 'address', name: 'propertyValidator' },
  { type: 'bytes', name: 'propertyData' },
];

const ERC721STRUCT_NAME = 'ERC721Order';

export enum TradeDirection {
  SellNFT = 0,
  BuyNFT = 1,
}

export enum OrderStatus {
  Invalid = 0,
  Fillable = 1,
  Unfillable = 2,
  Expired = 3,
}

interface Fee {
  recipient: string;
  amount: BigNumber;
  feeData: string;
}

interface Property {
  propertyValidator: string;
  propertyData: string;
}

export const signOrderWithEoaWallet = async (
  order: ERC721OrderStruct,
  signer: TypedDataSigner,
  chainId: number,
  exchangeContractAddress: string
) => {
  const domain = {
    chainId: chainId,
    verifyingContract: exchangeContractAddress,
    name: 'ZeroEx',
    version: '1.0.0',
  };
  const types = {
    // EIP712Domain: EIP712_DOMAIN_PARAMETERS,
    [ERC721STRUCT_NAME]: ERC721ORDER_STRUCT_ABI,
    Fee: FEE_ABI,
    Property: PROPERTY_ABI,
  };
  const value = order;

  const rawSignatureFromEoaWallet = await signer._signTypedData(
    domain,
    types,
    value
  );

  return rawSignatureFromEoaWallet;
};

export type ECSignature = {
  v: BigNumberish;
  r: BytesLike;
  s: BytesLike;
};

export type SignatureStruct = {
  signatureType: BigNumberish;
  v: BigNumberish;
  r: BytesLike;
  s: BytesLike;
};

/**
 * @param exchangeProxyAddressForAsset Exchange Proxy address specific to the ERC type (e.g. use the 0x ERC721 Proxy if you're using a 721 asset). This is the address that will need approval & does the spending/swap.
 * @param asset
 * @param signer Signer, must be a signer not a provider, as signed transactions are needed to approve
 * @param approve Optional, can specify to unapprove asset when set to false
 * @returns
 */
export const approveAsset = async (
  exchangeProxyAddressForAsset: string,
  asset: SwappableAsset,
  signer: Signer,
  overrides: any = {},
  approve: boolean = true
): Promise<ContractTransaction> => {
  switch (asset.type) {
    case 'ERC20':
      const erc20 = ERC20__factory.connect(asset.tokenAddress, signer);
      const erc20ApprovalTxPromise = erc20.approve(
        exchangeProxyAddressForAsset,
        approve ? MAX_APPROVAL.toString() : 0,
        {
          ...overrides,
        }
      );
      return erc20ApprovalTxPromise;
    case 'ERC721':
      const erc721 = ERC721__factory.connect(asset.tokenAddress, signer);
      const erc721ApprovalForAllPromise = erc721.setApprovalForAll(
        exchangeProxyAddressForAsset,
        approve,
        {
          ...overrides,
        }
      );
      return erc721ApprovalForAllPromise;
    case 'ERC1155':
      const erc1155 = ERC1155__factory.connect(asset.tokenAddress, signer);
      const erc1155ApprovalForAll = await erc1155.setApprovalForAll(
        exchangeProxyAddressForAsset,
        approve,
        {
          ...overrides,
        }
      );
      return erc1155ApprovalForAll;
    default:
      throw new UnexpectedAssetTypeError((asset as any).type);
  }
};

// Parse a hex signature returned by an RPC call into an `ECSignature`.
export function parseRawSignature(rawSignature: string): ECSignature {
  const hexSize = hexDataLength(rawSignature);
  // if (hexUtils.size(rpcSig) !== 65) {
  //     throw new Error(`Invalid RPC signature length: "${rpcSig}"`);
  // }
  if (hexSize !== 65) {
    throw new Error(
      `Invalid signature length, expected 65, got ${hexSize}.\n"Raw signature: ${rawSignature}"`
    );
  }
  // Some providers encode V as 0,1 instead of 27,28.
  const VALID_V_VALUES = [0, 1, 27, 28];
  // Some providers return the signature packed as V,R,S and others R,S,V.
  // Try to guess which encoding it is (with a slight preference for R,S,V).
  // let v = parseInt(rpcSig.slice(-2), 16);
  let v = parseInt(rawSignature.slice(-2), 16);

  if (VALID_V_VALUES.includes(v)) {
    // Format is R,S,V
    v = v >= 27 ? v : v + 27;
    return {
      // r: hexDataSlice.slice(rpcSig, 0, 32),
      // s: hexUtils.slice(rpcSig, 32, 64),
      r: hexDataSlice(rawSignature, 0, 32),
      s: hexDataSlice(rawSignature, 32, 64),
      v,
    };
  }
  // Format should be V,R,S
  // v = parseInt(rpcSig.slice(2, 4), 16);
  v = parseInt(rawSignature.slice(2, 4), 16);
  if (!VALID_V_VALUES.includes(v)) {
    throw new Error(
      `Cannot determine RPC signature layout from V value: "${rawSignature}"`
    );
  }
  v = v >= 27 ? v : v + 27;
  return {
    v,
    r: hexDataSlice(rawSignature, 1, 33),
    s: hexDataSlice(rawSignature, 33, 65),
  };
}
