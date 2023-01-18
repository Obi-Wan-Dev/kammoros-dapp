import { BSC } from "@usedapp/core"
//import { BSCTestnet } from "@usedapp/core"

//Testnet Contracts
/* export const nftStakingContracts = [
    { name: "Cinnamon", address: "0x8501D53F34192C2CB89A09c983a0f05C68381579" }, //0x35bB2C6C82e7e7Daf9bEcCB137430824502F7F17
    { name: "Amazon", address: "0xEa26775FF9c6Ad4e4F3a62233059beb993cc3aE3" },  //0xB331FEFD094C3226Ba4Ec9C49b97763D5A7373fa
    { name: "White", address: "0x499d484A986e291f4667Bb21276033F5010276A6" }, //0xdfD9e0E398232358BdD791E98214e99b4797CF60
    { name: "Pink", address: "0x12782Dc2ebd816E9a5f1fb71FFA3F37211a84525" }, //0xC2A015b33349A27546759A56441f32bA5e2a3436
    { name: "Whiteleg", address: "0x1C56f30C052476ab4da83dF7230c14599532678e" }, //0xE4089Ecf9f4d662eAd9836B974671bB604c7D3C6
] */

//Main Contracts
export const nftStakingContracts = [
    { name: "Cinnamon", address: "0x5DcC100d0882d044493AbDC7Dcd36340c2dC0d76" }, //0x0150a8a13695FF9708bC1bACCEbaD6E3cf186eAe
    { name: "Amazon", address: "0xcDb0aD27EAffb967ad6F7887a3E86397a260f350" },  //0x31A81011879ab76328aD7C0c7154A2af476961c6
    { name: "White", address: "0xEA2195ba96333AB71B0E926312b3dD63ffCb75ae" }, //0xB472F2a977f7b60dBd22732308dD33210828925b
    { name: "Pink", address: "0xAB1A8eFC31758611a98c8433512A549C67587994" }, //0x84307e3f9E175A0BcEeeA9BF66989Fe285206BE7
    { name: "Whiteleg", address: "0x63330C8A02E1cD0f2a8dAc98fEb2d7e380e2fa42" }, //0xDCb3CcdBE6388bFDE91A1cec61D8DeD8F169f3EE
]

//Teste
//export const tokenNFT = "0x5DcC100d0882d044493AbDC7Dcd36340c2dC0d76"

//Testnet Contract
//export const tokenStakingAddress = "0x73117C6b2Eafb7CBC42e8F5284536e92F1273bCd" //0xf82a8aae6a7B8858395BA3397c9A078270Ee4194

//Main Contract
export const tokenStakingAddress = "0x1875C1D0cC2727Ec1A74f90dB591A80d155B0845" //0x0974e5F2772a998301D7D6e9aca3F74d80Eef709

//Testnet Contract
//export const tokenContractAddress = "0xf82a8aae6a7B8858395BA3397c9A078270Ee4194"

//Main Contract
export const tokenContractAddress = "0x0974e5F2772a998301D7D6e9aca3F74d80Eef709"

export const pancakeLink = "https://pancakeswap.finance/swap?outputCurrency=" // MainNet
//export const pancakeLink = "https://pancake.kiemtienonline360.com/#/swap?outputCurrency=" // TestNet

//Testnet
//export const desiredChainId = BSCTestnet.chainId

//Main net
export const desiredChainId = BSC.chainId

export const desiredRpc = "https://bsc-dataseed.binance.org" //Spaceman
//export const desiredRpc = "https://bsc-dataseed.binance.org/" //Obi-Wan
//export const desiredRpc = "https://data-seed-prebsc-1-s1.binance.org:8545/"

export const baseNotificationClass = "p-4 rounded-md text-xs"