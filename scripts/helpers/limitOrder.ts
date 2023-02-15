import { SigningCosmWasmClient } from "cosmwasm";
import { InstantiateMsg, ExecuteMsg, QueryMsg } from "../../bindings/OraiswapLimitOrder.types";
import { coin } from "@cosmjs/amino"

export async function instantiateContract(
  client: SigningCosmWasmClient,
  address: string,
  code: number
) {
  const initMsg: InstantiateMsg = {
    admin: address,
    name: "orderbook contract",
    version: "1.0"
  };

  const info = await client.instantiate(
    address,
    code,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initMsg,
    "order book contract",
    "auto",
    {
      admin: address,
    }
  );
  return info.contractAddress;
}

export async function excecuteContract(
  client: SigningCosmWasmClient,
  senderAddress: string,
  contractAddress: string,
) {

  const excecute_orderbookpair: ExecuteMsg = {
    create_order_book_pair: {
      base_coin_info: {
        native_token: {
          denom: "usdt"
        }
      },
      quote_coin_info: {
        native_token: {
          denom: "orai"
        }
      },
      precision: "10",
      min_base_coin_amount: "10"
    },
  };

  const info = await client.execute(
    senderAddress,
    contractAddress,
    excecute_orderbookpair,
    'auto',
    '',
    [coin(200, "orai")],
  );
  return info;
}

export async function queryContract(
  client: SigningCosmWasmClient,
  contractAddress: string,
) {
  
  const queryOrderbookpair: QueryMsg = {
    order_book: {
      asset_infos: [
        {
          native_token: {
            denom: "orai"
          },
        },
        {
          native_token: {
            denom: "usdt"
          },
        }
      ]
    },
  };

  // const queryAllOrderbookpair: QueryMsg = {
  //   order_books: {
  //     limit: null,
  //     order_by: null,
  //     start_after: null,
  //   },
  // };
  // console.log(`query msg ${JSON.stringify(queryAllOrderbookpair)}`);
  // const queryAdmin: QueryMsg = {
  //   contract_info: {}
  // };

  const info = await client.queryContractSmart(
    contractAddress,
    queryOrderbookpair
  );
  console.log("query log",+ info);
  return info;
}