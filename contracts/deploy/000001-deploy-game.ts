import 'dotenv/config'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deployer: DeployFunction = async hre => {
  const { deploy, getDeploymentsFromAddress } = hre.deployments;
  if (hre.network.config.chainId !== 31337) return
  const { deployer } = await hre.getNamedAccounts()
  // await deploy('Collection', {from: deployer, log: true, gasLimit: 30000000 });
  const mainDeployment = await deploy('Main', {
    from: deployer,
    log: true,
  });

  const mainContract = await ethers.getContractAt('Main', mainDeployment.address);

  const collectionName = 'MyCollection';
  const cardCount = 10;
  await mainContract.createCollection(collectionName, cardCount);

  for (let i = 1; i <= 5; i++) {
    const imageUrl = `https://en.onepiece-cardgame.com/images/cardlist/card/OP01-001.png`;
    await mainContract.mintCardToCollection(0, imageUrl);
  }
}

export default deployer
