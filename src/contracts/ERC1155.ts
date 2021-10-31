/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common'

export interface ERC1155Interface extends ethers.utils.Interface {
  functions: {
    'balanceOf(address,uint256)': FunctionFragment
    'balanceOfBatch(address[],uint256[])': FunctionFragment
    'isApprovedForAll(address,address)': FunctionFragment
    'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)': FunctionFragment
    'safeTransferFrom(address,address,uint256,uint256,bytes)': FunctionFragment
    'setApprovalForAll(address,bool)': FunctionFragment
    'supportsInterface(bytes4)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'balanceOf', values: [string, BigNumberish]): string
  encodeFunctionData(functionFragment: 'balanceOfBatch', values: [string[], BigNumberish[]]): string
  encodeFunctionData(functionFragment: 'isApprovedForAll', values: [string, string]): string
  encodeFunctionData(
    functionFragment: 'safeBatchTransferFrom',
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike],
  ): string
  encodeFunctionData(
    functionFragment: 'safeTransferFrom',
    values: [string, string, BigNumberish, BigNumberish, BytesLike],
  ): string
  encodeFunctionData(functionFragment: 'setApprovalForAll', values: [string, boolean]): string
  encodeFunctionData(functionFragment: 'supportsInterface', values: [BytesLike]): string

  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'balanceOfBatch', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isApprovedForAll', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'safeBatchTransferFrom', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'safeTransferFrom', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setApprovalForAll', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result

  events: {
    'ApprovalForAll(address,address,bool)': EventFragment
    'TransferBatch(address,address,address,uint256[],uint256[])': EventFragment
    'TransferSingle(address,address,address,uint256,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'ApprovalForAll'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TransferBatch'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'TransferSingle'): EventFragment
}

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { _owner: string; _operator: string; _approved: boolean }
>

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>

export type TransferBatchEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber[]],
  {
    _operator: string
    _from: string
    _to: string
    _ids: BigNumber[]
    _amounts: BigNumber[]
  }
>

export type TransferBatchEventFilter = TypedEventFilter<TransferBatchEvent>

export type TransferSingleEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  {
    _operator: string
    _from: string
    _to: string
    _id: BigNumber
    _amount: BigNumber
  }
>

export type TransferSingleEventFilter = TypedEventFilter<TransferSingleEvent>

export interface ERC1155 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: ERC1155Interface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    balanceOf(_owner: string, _id: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>

    balanceOfBatch(
      _owners: string[],
      _ids: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<[BigNumber[]]>

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides,
    ): Promise<[boolean] & { isOperator: boolean }>

    safeBatchTransferFrom(
      _from: string,
      _to: string,
      _ids: BigNumberish[],
      _amounts: BigNumberish[],
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    safeTransferFrom(
      _from: string,
      _to: string,
      _id: BigNumberish,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>

    supportsInterface(_interfaceID: BytesLike, overrides?: CallOverrides): Promise<[boolean]>
  }

  balanceOf(_owner: string, _id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

  balanceOfBatch(
    _owners: string[],
    _ids: BigNumberish[],
    overrides?: CallOverrides,
  ): Promise<BigNumber[]>

  isApprovedForAll(_owner: string, _operator: string, overrides?: CallOverrides): Promise<boolean>

  safeBatchTransferFrom(
    _from: string,
    _to: string,
    _ids: BigNumberish[],
    _amounts: BigNumberish[],
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  safeTransferFrom(
    _from: string,
    _to: string,
    _id: BigNumberish,
    _amount: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  setApprovalForAll(
    _operator: string,
    _approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>

  supportsInterface(_interfaceID: BytesLike, overrides?: CallOverrides): Promise<boolean>

  callStatic: {
    balanceOf(_owner: string, _id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    balanceOfBatch(
      _owners: string[],
      _ids: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<BigNumber[]>

    isApprovedForAll(_owner: string, _operator: string, overrides?: CallOverrides): Promise<boolean>

    safeBatchTransferFrom(
      _from: string,
      _to: string,
      _ids: BigNumberish[],
      _amounts: BigNumberish[],
      _data: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>

    safeTransferFrom(
      _from: string,
      _to: string,
      _id: BigNumberish,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides,
    ): Promise<void>

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: CallOverrides,
    ): Promise<void>

    supportsInterface(_interfaceID: BytesLike, overrides?: CallOverrides): Promise<boolean>
  }

  filters: {
    'ApprovalForAll(address,address,bool)'(
      _owner?: string | null,
      _operator?: string | null,
      _approved?: null,
    ): ApprovalForAllEventFilter
    ApprovalForAll(
      _owner?: string | null,
      _operator?: string | null,
      _approved?: null,
    ): ApprovalForAllEventFilter

    'TransferBatch(address,address,address,uint256[],uint256[])'(
      _operator?: string | null,
      _from?: string | null,
      _to?: string | null,
      _ids?: null,
      _amounts?: null,
    ): TransferBatchEventFilter
    TransferBatch(
      _operator?: string | null,
      _from?: string | null,
      _to?: string | null,
      _ids?: null,
      _amounts?: null,
    ): TransferBatchEventFilter

    'TransferSingle(address,address,address,uint256,uint256)'(
      _operator?: string | null,
      _from?: string | null,
      _to?: string | null,
      _id?: null,
      _amount?: null,
    ): TransferSingleEventFilter
    TransferSingle(
      _operator?: string | null,
      _from?: string | null,
      _to?: string | null,
      _id?: null,
      _amount?: null,
    ): TransferSingleEventFilter
  }

  estimateGas: {
    balanceOf(_owner: string, _id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>

    balanceOfBatch(
      _owners: string[],
      _ids: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    safeBatchTransferFrom(
      _from: string,
      _to: string,
      _ids: BigNumberish[],
      _amounts: BigNumberish[],
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    safeTransferFrom(
      _from: string,
      _to: string,
      _id: BigNumberish,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>

    supportsInterface(_interfaceID: BytesLike, overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    balanceOf(
      _owner: string,
      _id: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    balanceOfBatch(
      _owners: string[],
      _ids: BigNumberish[],
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    safeBatchTransferFrom(
      _from: string,
      _to: string,
      _ids: BigNumberish[],
      _amounts: BigNumberish[],
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    safeTransferFrom(
      _from: string,
      _to: string,
      _id: BigNumberish,
      _amount: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>

    supportsInterface(
      _interfaceID: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>
  }
}
