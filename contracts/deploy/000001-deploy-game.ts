import 'dotenv/config'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deployer: DeployFunction = async hre => {
  const { deploy, getDeploymentsFromAddress } = hre.deployments;
  if (hre.network.config.chainId !== 31337) return
  const { deployer, second } = await hre.getNamedAccounts()
  // await deploy('Collection', {from: deployer, log: true, gasLimit: 30000000 });
  const mainDeployment = await deploy('Main', {
    from: deployer,
    log: true,
    gasLimit: 8000000
  });

  console.log("Main contract deployed to:", mainDeployment.address);

  const mainContract = await ethers.getContractAt('Main', mainDeployment.address);

  let collectionName = "ST01";
  let cardCount = 17;
  await mainContract.createCollection(collectionName, cardCount);

  let cards = [
    "https://i.ibb.co/b2mgK7q/ST01-001.jpg", "https://i.ibb.co/fnkqCnH/ST01-002.jpg", "https://i.ibb.co/HBKbCDF/ST01-003.jpg",
    "https://i.ibb.co/85vGsbt/ST01-004.webp", "https://i.ibb.co/ypVk4wY/ST01-005.webp", "https://i.ibb.co/hM8HFcm/ST01-006.jpg",
    "https://i.ibb.co/mFnR6P2/ST01-007.webp", "https://i.ibb.co/JjKdX4Q/ST01-008.webp", "https://i.ibb.co/BzV4j25/ST01-009.jpg",
    "https://i.ibb.co/Fxr76Dp/ST01-010.jpg", "https://i.ibb.co/VxfCYxT/ST01-011.webp", "https://i.ibb.co/k5QrSb2/ST01-012.webp",
    "https://i.ibb.co/ctRx7BY/ST01-013.webp", "https://i.ibb.co/Zdv8M9b/ST01-014.jpg", "https://i.ibb.co/fScydcV/ST01-015.jpg",
    "https://i.ibb.co/D1VJWqR/ST01-016.jpg", "https://i.ibb.co/wwqq7h6/ST01-017.jpg"
  ]

  let gids = [
    1, 23, 28, 17, 5, 9, 25, 247, 566, 29, 10, 8, 11, 6, 21, 27, 18
  ]

  for (let i = 0; i < cardCount; i++) {
    const imageUrl = cards[i];
    const gid = gids[i];
    await mainContract.mintCardToCollection(0, deployer, imageUrl, gid);
  }

  collectionName = "ST02";
  cardCount = 17;
  await mainContract.createCollection(collectionName, cardCount);

  cards = [
    "https://i.ibb.co/V943b27/ST02-001.jpg", "https://i.ibb.co/4Ft6d70/ST02-002.webp", "https://i.ibb.co/1szLTmw/ST02-003.webp",
    "https://i.ibb.co/tMXDcR5/ST02-004.webp", "https://i.ibb.co/9tpf6yS/ST02-005.webp", "https://i.ibb.co/cNjDBvC/ST02-006.webp",
    "https://i.ibb.co/ZRQgT9S/ST02-007.webp", "https://i.ibb.co/KVnHHjz/ST02-008.webp", "https://i.ibb.co/hMYt0bc/ST02-009.webp",
    "https://i.ibb.co/s1kRXYv/ST02-010.webp", "https://i.ibb.co/GJkRbhT/ST02-011.webp", "https://i.ibb.co/1KjYj3w/ST02-012.webp",
    "https://i.ibb.co/hXSYtgR/ST02-013.webp", "https://i.ibb.co/Kw01V37/ST02-014.webp", "https://i.ibb.co/Lgx14f2/ST02-015.webp",
    "https://i.ibb.co/tDnzKGs/ST02-016.webp", "https://i.ibb.co/N7DdvGf/ST02-017.webp"
  ]

  gids = [
    49, 109, 110, 108, 42, 84, 113, 794, 43, 56, 52, 44, 45, 57, 46, 111, 112
  ]

  for (let i = 0; i < cardCount; i++) {
    const imageUrl = cards[i];
    const gid = gids[i];
    await mainContract.mintCardToCollection(1, second, imageUrl, gid);
  }

  // collectionName = "ST03";
  // cardCount = 17;
  // await mainContract.createCollection(collectionName, cardCount);
  //
  // collectionName = "ST04";
  // cardCount = 17;
  // await mainContract.createCollection(collectionName, cardCount);


  // const res = await mainContract.getCount();
  // console.log(res.toNumber())
}

export default deployer
