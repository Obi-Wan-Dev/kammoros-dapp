import { Falsy, useCall } from "@usedapp/core";
import { Contract } from "ethers";
import ERC721Staking from "../../abi/ERC721Staking.json"

export default function useHasRole(
    contractAddress: string | Falsy,
    role: string | Falsy,
    address: string | Falsy
  ) {
    const { value, error } =
      useCall(
        role && address &&
        contractAddress && {
            contract: new Contract(contractAddress, ERC721Staking.abi), // instance of called contract
            method: "hasRole", // Method to be called
            args: [role, address], // Method arguments - address to be checked for balance
          }
      ) ?? {};
    if(error) {
      console.error(error.message)
      return undefined
    }
    return value?.[0]
  }