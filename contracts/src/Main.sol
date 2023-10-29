// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Collection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Main is Ownable {
  int256 private count;
  mapping(int => Collection) public collections;

  // Define a struct to store collection information
  struct CollectionInfo {
    int collectionId;
    string collectionName;
    uint256 cardCount;
    CardInfo[] cards;
  }
  struct CardInfo {
    string img;
    uint256 cardNumber;
    int gid;
    address owner;
  }

  constructor() {
    count = 0;
  }
  function createCollection(
    string memory name,
    uint256 cardCount
  ) external onlyOwner {
    console.logBytes(msg.data);
    Collection newCollection = new Collection(name, cardCount);
    collections[count] = newCollection;
    count++;
  }
  function mintCardToCollection(
    int256 collectionId,
    address to,
    string memory img,
    int256 gid
  ) external onlyOwner {
    require(
      collections[collectionId] != Collection(address(0)),
      "Collection does not exist"
    );
    collections[collectionId].mintTo(to, img, gid);
  }

  // Getter function to retrieve information about all collections and cards
  function getCollectionsAndCards(bool all, address user) public view returns (CollectionInfo[] memory) {
    CollectionInfo[] memory collectionInfo = new CollectionInfo[](uint256(count));
    for (int256 i = 0; i < count; i++) {
      Collection collection = collections[i];
      // Get card information for each collection
      CardInfo[] memory cardInfo = new CardInfo[](collection.cardCount());

      for (uint256 j = 0; j < collection.cardCount(); j++) {
        (string memory img, uint256 cardNumber, int256 gid, address cardOwner) = collection.getCardInfo(j);
        if (all) {
          cardInfo[j] = CardInfo(img, cardNumber, gid, cardOwner);
        }else{
          if (cardOwner == user) {
            cardInfo[j] = CardInfo(img, cardNumber, gid, cardOwner);
          }
        }
      }
      collectionInfo[uint256(i)] = CollectionInfo({
        collectionId : i,
        collectionName: collection.collectionName(),
        cardCount: collection.cardCount(),
        cards: cardInfo
      });
    }

    return collectionInfo;
  }
}
