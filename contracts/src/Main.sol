// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Collection.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Main is Ownable {
    int256 private countC;
    int256 private countB;
    mapping(int => Collection) public collections;
    mapping(int => Collection) public boosters;

    struct CollectionInfo {
        int collectionId; string collectionName; uint256 cardCount; CardInfo[] cards;
    }
    struct BoosterInfo {
        int boosterId; string boosterName; CardInfo[] cards; bool redeemed; address owner;
    }
    struct Card {
        string img; int256 gid;
    }
    struct CardInfo {
        string img; uint256 cardNumber; int gid; address owner;
    }
    constructor() {
        countC = 0;
        countB = 0;
    }
    function createCollection(string memory name, uint256 cardCount) external onlyOwner {
        collections[countC] = new Collection(name, cardCount, msg.sender);
        countC++;
    }

    function createBooster(address user) public {
        boosters[countB] = new Collection("BP", 5, user);
        countB++;
    }

    function redeemBooster(address user, int256 boosterId, Card[] memory c) public {
        require(boosters[boosterId] != Collection(address(0)), "[BNEx]");
        for (uint256 i = 0; i < 5; i++) {
            boosters[boosterId].mintTo(user, c[i].img, c[i].gid);
        }
        boosters[boosterId].setRedeemed(true);
    }

    function mintCardToCollection(int256 collectionId, address to, string memory img, int256 gid) external onlyOwner {
        require(collections[collectionId] != Collection(address(0)), "[NEx]");
        collections[collectionId].mintTo(to, img, gid);
    }

    function getCollectionsAndCards(bool all, address user) public view returns (CollectionInfo[] memory) {
        CollectionInfo[] memory collectionInfo = new CollectionInfo[](uint256(countC));
        for (int256 i = 0; i < countC; i++) {
            CardInfo[] memory cardInfo = new CardInfo[](collections[i].cardCount());
            for (uint256 j = 0; j < collections[i].cardCount(); j++) {
                (string memory img, uint256 cardNumber, int256 gid, address cardOwner) = collections[i].getCardInfo(j);
                if (all) {cardInfo[j] = CardInfo(img, cardNumber, gid, cardOwner);} else {if (cardOwner == user) {cardInfo[j] = CardInfo(img, cardNumber, gid, cardOwner);}}
            }
            collectionInfo[uint256(i)] = CollectionInfo(i, collections[i].collectionName(), collections[i].cardCount(), cardInfo);
        }
        return collectionInfo;
    }

    function getBoosters(address user) public view returns (BoosterInfo[] memory) {
        BoosterInfo[] memory boosterInfo = new BoosterInfo[](uint256(countB));
        for (int256 i = 0; i < countB; i++) {
            CardInfo[] memory cardInfo = new CardInfo[](boosters[i].cardCount());
            if(boosters[i].redeemed()){
                for (uint256 j = 0; j < boosters[i].cardCount(); j++) {
                    (string memory img, uint256 cardNumber, int256 gid, address cardOwner) = boosters[i].getCardInfo(j);
                    if (cardOwner == user) {cardInfo[j] = CardInfo(img, cardNumber, gid, cardOwner);}
                }
            }
            if (boosters[i].owner() == user) {
                boosterInfo[uint256(i)] = BoosterInfo(i, boosters[i].collectionName(), cardInfo, boosters[i].redeemed(), boosters[i].owner());
            }
        }
        return boosterInfo;
    }
}
