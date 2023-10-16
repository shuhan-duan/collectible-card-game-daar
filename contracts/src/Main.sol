// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7 .0;

import "./Collection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Main is Ownable {
  int private count;
  mapping(int => Collection) private collections;

  constructor() {
    count = 0;
  }

  function createCollection(
    string memory name,
    uint cardCount
  ) external onlyOwner {
    Collection newCollection = new Collection(name, cardCount);
    collections[count++] = newCollection;
  }

  function mintCardToCollection(
    uint collectionId,
    address to,
    string memory img
  ) external onlyOwner {
    require(
      collections[collectionId] != Collection(address(0)),
      "Collection does not exist"
    );
    collections[collectionId].mintTo(to, img);
  }
}
