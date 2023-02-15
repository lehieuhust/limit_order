export type Addr = string;
export type Uint128 = string;
export type Binary = string;
export type AssetInfo = {
  token: {
    contract_addr: Addr;
  };
} | {
  native_token: {
    denom: string;
  };
};
export type Decimal = string;
export type OrderDirection = "buy" | "sell";
export interface Cw20ReceiveMsg {
  amount: Uint128;
  msg: Binary;
  sender: string;
}
export interface Asset {
  amount: Uint128;
  info: AssetInfo;
}
export type OrderFilter = ("tick" | "none") | {
  bidder: string;
} | {
  price: Decimal;
};