"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ethers_1 = require("ethers");
const contracts_json_1 = require("../contracts.json");
const collectionsRouter = express_1.default.Router();
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const jsonRpcUrl = 'http://127.0.0.1:8545';
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const signer = new ethers_1.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const { address, abi } = contracts_json_1.contracts.Main;
    const contract = new ethers_1.ethers.Contract(address, abi, provider);
    const deployed = yield contract.deployed();
    if (!deployed)
        console.log("contract not deployed");
    const contract_ = signer ? contract.connect(signer) : contract;
    return contract_;
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = yield connect();
        // Create a collection with 5 cards
        // const collectionName = 'MyCollection';
        // const cardCount = 5;
        // await contract.createCollection(collectionName, cardCount);
        //
        // // Add one more card to the collection
        // const collectionId = 0; // Assuming this is the ID of the created collection
        // const imgUrl = 'https://onepiece-cardgame.dev/images/cards/OP01-001_332dbe_jp.jpg';
        // await contract.mintCardToCollection(collectionId, imgUrl);
        // Now you can use the contract_ object for interactions.
        const collection = yield contract.getAllCollectionsAndCards();
        const response = collection.map((collection) => {
            return {
                collectionName: collection[0],
                cardCount: collection[1].toNumber(),
                cards: collection[2].map((card) => {
                    return {
                        img: card[0],
                        cardNumber: card[1].toNumber(),
                    };
                }),
            };
        });
        return response;
    });
}
collectionsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mes = yield main();
        res.json({ message: mes });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
exports.default = collectionsRouter;
