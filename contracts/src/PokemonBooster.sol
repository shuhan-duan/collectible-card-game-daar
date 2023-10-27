// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Collection.sol";

contract Booster is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _boosterIds;

    struct BoosterInfo {
        Collection collection;
        uint256[] cardIds;
        bool redeemed;
    }

    mapping(uint256 => BoosterInfo) public boosters;

    event BoosterMinted(uint256 boosterId, address indexed collectionAddress, uint256[] cardIds);
    event BoosterRedeemed(uint256 boosterId, address redeemer);

    function mintBooster(Collection _collection, uint256[] memory cardIds) external onlyOwner {
        uint256 boosterId = _boosterIds.current();
        boosters[boosterId] = BoosterInfo({collection: _collection, cardIds: cardIds, redeemed: false});
        _boosterIds.increment();

        emit BoosterMinted(boosterId, address(_collection), cardIds);
    }

    function redeemBooster(uint256 boosterId) external {
        BoosterInfo storage booster = boosters[boosterId];
        require(!booster.redeemed, "Booster has already been redeemed.");

        booster.redeemed = true;

        for (uint256 i = 0; i < booster.cardIds.length; i++) {
            uint256 cardId = booster.cardIds[i];
            // Assuming the Booster contract owns the card in the Collection, transfer it to the redeemer
            booster.collection.safeTransferFrom(address(this), msg.sender, cardId);
        }

        emit BoosterRedeemed(boosterId, msg.sender);
    }
}
