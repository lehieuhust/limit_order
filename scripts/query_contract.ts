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

  // query the contract
  // TODO: you must change orai1ufs3tlq4umljk0qfe8k5ya0x6hpavn897u2cnf9k0en9jr7qarqqr0335g to your contract address
  const res = await queryContract(client, "orai1ufs3tlq4umljk0qfe8k5ya0x6hpavn897u2cnf9k0en9jr7qarqqr0335g");

  // console.log(res);
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
