import 'dotenv/config'
import {DeployFunction} from 'hardhat-deploy/types'
import {ethers} from 'hardhat'

const deployer: DeployFunction = async hre => {
    const {deploy, getDeploymentsFromAddress} = hre.deployments;
    if (hre.network.config.chainId !== 31337) return
    const {deployer, second, random} = await hre.getNamedAccounts()
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

    collectionName = "ST03";
    cardCount = 17;
    await mainContract.createCollection(collectionName, cardCount);

    cards = [
        "https://i.ibb.co/6Ht8hr7/ST03-001.webp", "https://i.ibb.co/N3zvP6x/ST03-002.webp", "https://i.ibb.co/v1JJSs1/ST03-003.webp",
        "https://i.ibb.co/HKdw2rm/ST03-004.webp", "https://i.ibb.co/BfXTzyw/ST03-005.webp", "https://i.ibb.co/pjRDgT7/ST03-006.webp",
        "https://i.ibb.co/3vMpsRG/ST03-007.jpg", "https://i.ibb.co/jgY5vN0/ST03-008.webp", "https://i.ibb.co/6P0XJDx/ST03-009.webp",
        "https://i.ibb.co/jbXx9jB/ST03-010.webp", "https://i.ibb.co/F68QnGJ/ST03-011.webp", "https://i.ibb.co/WnQb4Yw/ST03-012.webp",
        "https://i.ibb.co/cvTXPMR/ST03-013.webp", "https://i.ibb.co/LhZGL40/ST03-014.webp", "https://i.ibb.co/tKqcrNJ/ST03-015.webp",
        "https://i.ibb.co/w4vqP5S/ST03-016.webp", "https://i.ibb.co/CnyH3Tr/ST03-017.webp"
    ]

    gids = [
        50, 103, 41, 104, 54, 86, 92, 105, 62, 106, 95, 99, 76, 107, 88, 97, 53
    ]

    for (let i = 0; i < cardCount; i++) {
        const imageUrl = cards[i];
        const gid = gids[i];
        await mainContract.mintCardToCollection(2, random, imageUrl, gid);
    }

    collectionName = "ST04";
    cardCount = 17;
    await mainContract.createCollection(collectionName, cardCount);

    cards = [
        "https://i.ibb.co/m0RYLLh/ST04-001.webp", "https://i.ibb.co/Nm5tkCb/ST04-002.webp", "https://i.ibb.co/6XhtxzQ/ST04-003.webp",
        "https://i.ibb.co/GVshztt/ST04-004.webp", "https://i.ibb.co/RB7cR73/ST04-005.webp", "https://i.ibb.co/GQvxHzy/ST04-006.webp",
        "https://i.ibb.co/D50CMSZ/ST04-007.webp", "https://i.ibb.co/XpsRDnZ/ST04-008.jpg", "https://i.ibb.co/ZK4vd4J/ST04-009.webp",
        "https://i.ibb.co/XsPf5xt/ST04-010.webp", "https://i.ibb.co/JjjVMt5/ST04-011.webp", "https://i.ibb.co/DfmzRvN/ST04-012.webp",
        "https://i.ibb.co/1YcfKsm/ST04-013.webp", "https://i.ibb.co/WKMh1Kz/ST04-014.webp", "https://i.ibb.co/nf3s3kV/ST04-015.webp",
        "https://i.ibb.co/WG0FMBF/ST04-016.webp", "https://i.ibb.co/VHC7KNr/ST04-017.webp"
    ]

    gids = [
        7, 13, 24, 12, 19, 30, 31, 32, 33, 34, 35, 36, 37, 40, 39, 14, 38
    ]

    for (let i = 0; i < cardCount; i++) {
        const imageUrl = cards[i];
        const gid = gids[i];
        await mainContract.mintCardToCollection(3, deployer, imageUrl, gid);
    }

}

export default deployer
