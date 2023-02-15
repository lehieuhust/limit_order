// data from https://github.com/cosmos/chain-registry/tree/master/testnets
import { GasPrice } from "@cosmjs/stargate";
import { Decimal } from '@cosmjs/math';

export interface Network {
  chainId: string;
  rpcEndpoint: string;
  prefix: string;
  gasPrice: GasPrice;
  feeToken: string;
}

export const oraiConfig: Network = {
  chainId: "Oraichain-testnet",
  rpcEndpoint: "https://testnet-rpc.orai.io/",
  prefix: "orai",
  gasPrice: new GasPrice(Decimal.fromUserInput('0', 6), "orai"),
  feeToken: "orai",
};
