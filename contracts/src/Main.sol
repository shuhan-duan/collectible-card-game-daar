// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Collection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Main is Ownable {
    int256 private countC;
    mapping(int => Collection) public collections;
    Listing[] public listings;
    uint256 public listingPrice = 0.1 ether;

    struct Listing {
        address seller; int256 collectionId; uint256 tokenId; uint256 price;
    }

    struct Listings {
        uint256 id; Listing info; CardInfo card;
    }

    struct CollectionInfo {
        int collectionId; string collectionName; uint256 cardCount; CardInfo[] cards; bool redeemed; address owner;
    }

    struct Card {
        string img; int256 gid;
    }

    struct CardInfo {
        string img; uint256 cardNumber; int gid; bool onSell; address owner;
    }
    constructor(){
        countC = 0;
    }
    function createCollection(string memory name, uint256 cardCount) external onlyOwner {
        collections[countC] = new Collection(name, cardCount, address(this));
        countC++;
    }

    function createBooster() external {
        collections[countC] = new Collection("BP", 5, msg.sender);
        collections[countC].setRedeemed(false);
        countC++;
    }

    function redeemBooster(int256 boosterId, Card[] memory c) external {
        require(collections[boosterId] != Collection(address(0)), "[BNEx]");
        require(collections[boosterId].owner() == msg.sender, "OW2");
        for (uint256 i = 0; i < 5; i++) {
            collections[boosterId].mintTo(msg.sender, c[i].img, c[i].gid);
        }
        collections[boosterId].setRedeemed(true);
    }

    function mintCardToCollection(int256 collectionId, address to, string memory img, int256 gid) external onlyOwner {
        require(collections[collectionId] != Collection(address(0)), "[NEx]");
        collections[collectionId].mintTo(to, img, gid);
    }

    function getCollectionsAndCards(bool all, bool boosters, address user) public view returns (CollectionInfo[] memory) {
        CollectionInfo[] memory collectionInfo = new CollectionInfo[](uint256(countC));
        for (int256 i = 0; i < countC; i++) {
            CardInfo[] memory cardInfo = new CardInfo[](collections[i].cardCount());
            if (collections[i].redeemed()) {
                for (uint256 j = 0; j < collections[i].cardCount(); j++) {
                    (string memory img, uint256 cardNumber, int256 gid, bool onSell, address cardOwner) = collections[i].getCardInfo(j);
                    if (all) {
                        cardInfo[j] = CardInfo(img, cardNumber, gid, onSell, cardOwner);
                    } else {
                        if (cardOwner == user) {
                            cardInfo[j] = CardInfo(img, cardNumber, gid, onSell, cardOwner);
                        }
                    }
                }
            }

            if (all || !boosters) {
                collectionInfo[uint256(i)] = CollectionInfo(i, collections[i].collectionName(), collections[i].cardCount(), cardInfo, collections[i].redeemed(), collections[i].owner());
            } else {
                if (collections[i].owner() == user) {
                    collectionInfo[uint256(i)] = CollectionInfo(i, collections[i].collectionName(), collections[i].cardCount(), cardInfo, collections[i].redeemed(), collections[i].owner());
                }
            }

        }
        return collectionInfo;
    }

    function listCard(int256 collectionId, uint256 tokenId) external {
        require(collections[collectionId] != Collection(address(0)), "[NEx]");
        require(collections[collectionId].ownerOf(tokenId) == msg.sender, "Not the token owner");
        listings.push(Listing(msg.sender, collectionId, tokenId, listingPrice));
        collections[collectionId].listCard(tokenId, msg.sender);
    }

    function buyCard(uint256 listingIndex) external payable {
        require(listingIndex < listings.length, "LInd");

        collections[listings[listingIndex].collectionId].transferCard(listings[listingIndex].tokenId, listings[listingIndex].price, listings[listingIndex].seller, msg.sender, msg.value);

        // remove the listing
        if (listingIndex < listings.length - 1) {
            listings[listingIndex] = listings[listings.length - 1];
        }
        listings.pop();
    }

    function getListing() public view returns (Listings[] memory) {
        Listings[] memory list = new Listings[](uint256(listings.length));
        for (uint256 i = 0; i < listings.length; i++) {
            (string memory img, uint256 cardNumber, int256 gid, bool onSell, address cardOwner) = collections[listings[i].collectionId].getCardInfo(listings[i].tokenId);
            list[uint256(i)] = Listings(i, listings[i], CardInfo(img, cardNumber, gid, onSell, cardOwner));
        }
        return list;
    }
}
