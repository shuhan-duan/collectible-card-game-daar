// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Collection is ERC721{
  string public collectionName;
  uint256 public cardCount;

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct Card {
    string img;
    uint256 cardNumber;
    int256 gid;
  }

  mapping(uint => Card) public cards;

  constructor(
    string memory _name,
    uint256 _cardCount
  ) ERC721(_name, "MYNFT") {
    collectionName = _name;
    cardCount = _cardCount;
  }

  // create cards for myself
  function addCard(string memory img, int256 gid) external {
    uint256 newCardId = _tokenIds.current();
    _mint(msg.sender, newCardId); // Mint a new NFT to the caller
    _tokenIds.increment();

    Card memory newCard = Card({cardNumber: newCardId, img: img, gid: gid});
    cards[newCardId] = newCard;
  }

  function mintTo(address to, string memory img, int256 gid) external {
    uint256 newCardId = _tokenIds.current();
    _mint(to, newCardId);
    _tokenIds.increment();

    Card memory newCard = Card({cardNumber: newCardId, img: img, gid: gid});
    cards[newCardId] = newCard;
  }

  // New function to retrieve card information based on the index
  function getCardInfo(uint256 index) external view returns (string memory img, uint256 cardNumber, int256 gid, address cardOwner) {
    require(index < cardCount, "Index out of bounds");
    Card storage card = cards[index];
    return (card.img, card.cardNumber, card.gid, ownerOf(card.cardNumber));
  }
}
