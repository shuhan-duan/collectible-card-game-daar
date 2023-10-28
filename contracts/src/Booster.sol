// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Booster is Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private _boosterIds;

    uint256 public constant MAX_BOOSTERS = 1000;  // Example limit
    uint256 public boosterCount = 0;

    struct Card {
        string name;
        string img;
    }

    struct BoosterInfo {
        Card[] cards;
        bool redeemed;
        uint256 expiryDate;
    }

    mapping(uint256 => BoosterInfo) public boosters;

    event BoosterMinted(uint256 boosterId, Card[] cards);
    event BoosterRedeemed(uint256 boosterId, address redeemer);
    event BoosterBurned(uint256 boosterId, address burner);

    function mintBooster(Card[] memory cards) external onlyOwner {
        require(boosterCount < MAX_BOOSTERS, "Maximum number of boosters reached");

        uint256 boosterId = _boosterIds.current();
        uint256 expiry = block.timestamp.add(30 days);  // Example expiration of 30 days
        boosters[boosterId] = BoosterInfo({cards: cards, redeemed: false, expiryDate: expiry});
        _boosterIds.increment();
        boosterCount = boosterCount.add(1);

        emit BoosterMinted(boosterId, cards);
    }

    function redeemBooster(uint256 boosterId) external {
        BoosterInfo storage booster = boosters[boosterId];
        require(!booster.redeemed, "Booster has already been redeemed.");
        require(booster.expiryDate > block.timestamp, "Booster has expired.");

        booster.redeemed = true;

        emit BoosterRedeemed(boosterId, msg.sender);
    }

    function burnBooster(uint256 boosterId) external {
        BoosterInfo storage booster = boosters[boosterId];
        require(!booster.redeemed, "Booster has already been redeemed.");

        delete boosters[boosterId];

        emit BoosterBurned(boosterId, msg.sender);
    }
}
