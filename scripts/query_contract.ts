import { Contract, getMnemonic } from "./helpers/utils";
import { connect } from "./helpers/connect";
import { oraiConfig } from "./networks";
import { queryContract } from "./helpers/limitOrder";

async function main(): Promise<void> {

  console.log("Querying contract...");
  
  // get the mnemonic of the contract
  const mnemonic = getMnemonic();

  // get the signingclient
  const {client, address} = await connect(mnemonic, oraiConfig);

  // check if the given wallet has enough balance
  let {amount} = await client.getBalance(address, oraiConfig.feeToken);
  console.log(`balance of ${address} is ${amount}`);

  // excecute the contract
  const res = await queryContract(client, "orai16d3k9287605lft0jnjcvcgs0d4vlured959vu36h8zs9x0vphurqk48apk");

  console.log(`excecute response: ${res}`);
}

main().then(
  () => {
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
