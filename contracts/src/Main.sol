// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Collection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Main is Ownable {
  int256 private count;
  mapping(int => Collection) private collections;

  constructor() {
    count = 0;
  }

  function createCollection(
    string memory name,
    uint256 cardCount
  ) external onlyOwner {
    Collection newCollection = new Collection(name, cardCount);
    collections[count] = newCollection;
    count++;
  }

  function mintCardToCollection(
    int256 collectionId,
    string memory img
  ) external onlyOwner {
    require(
      collections[collectionId] != Collection(address(0)),
      "Collection does not exist"
    );
    collections[collectionId].addCard(img);
  }
}
