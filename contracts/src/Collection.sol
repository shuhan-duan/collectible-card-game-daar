// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7 .0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Collection {
  string public name;
  int public cardCount;

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct Card {
    string name;
    int cardCount;
  }

  mapping(uint => Card) public cards;

  constructor(
    string memory _name,
    uint _cardCount
  ) ERC721(_name, "TOKEN_SYMBOL_HERE") {
    name = _name;
    cardCount = _cardCount;
  }

  // creat cards for myself
  function addCard(string memory img) external {
    _tokenIds.increment();
    uint256 newCardId = _tokenIds.current();
    _mint(msg.sender, newCardId); // Mint a new NFT to the caller

    Card memory newCard = Card({cardNumber: newCardId, img: img});
    cards[newCardId] = newCard;
  }

  function mintTo(address to, string memory img) external {
    _tokenIds.increment();
    uint256 newCardId = _tokenIds.current();
    _mint(to, newCardId);

    Card memory newCard = Card({cardNumber: newCardId, img: img});
    cards[newCardId] = newCard;
  }
}
