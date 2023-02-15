import { Contract, getMnemonic } from "./helpers/utils";
import { connect } from "./helpers/connect";
import { oraiConfig } from "./networks";
import { excecuteContract } from "./helpers/limitOrder";

async function main(): Promise<void> {

  console.log("Excecuting contract...");
  
  // get the mnemonic of the contract
  const mnemonic = getMnemonic();

  // get the signingclient
  const {client, address} = await connect(mnemonic, oraiConfig);

  // check if the given wallet has enough balance
  let {amount} = await client.getBalance(address, oraiConfig.feeToken);
  console.log(`balance of ${address} is ${amount}`);

  // excecute the contract
  // TODO: you must change orai1wkwy0xh89ksdgj9hr347dyd2dw7zesmtrue6kfzyml4vdtz6e5ws5thn3e to your contract address
  await excecuteContract(client, address, "orai1wkwy0xh89ksdgj9hr347dyd2dw7zesmtrue6kfzyml4vdtz6e5ws5thn3e");
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
