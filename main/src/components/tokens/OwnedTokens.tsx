import { tokenStakingAddress } from "../../constants"
import { formatCommify } from "../../support/formatters"
import TokenDepositButton from "./buttons/TokenDepositButton"
import { pancakeLink } from "../../constants"
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import ERC20Staking from "../../abi/ERC20Staking.json"
import ERC20 from "../../abi/KMCToken.json"

export default function OwnedTokens() {

    const address = useAddress()
    const { contract } = useContract(tokenStakingAddress, ERC20Staking.abi)
    const { data: tokenAddress } = useContractRead(contract, "token")
    const { contract: token } = useContract(tokenAddress, ERC20.abi)
    const { data: balanceOf } = useContractRead(token, "balanceOf", address)

    const BuyPancake = pancakeLink
    const BuyPancakeText = BuyPancake.concat(tokenAddress)

    return (
        <div className="bg-slate-700 text-slate-50 p-4 rounded-lg">
        <div className="flex flex-col justify-between gap-4 h-full">
            <div className="flex justify-between items-center text-slate-50">
            <div className="text-white text-xs font-semibold uppercase">Owned</div>
                <div className="flex gap-2">
                    <a href={BuyPancakeText} target={"_blank"} rel="noreferrer" className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-slate-500 text-slate-500 hover:border-slate-400 hover:text-slate-400">Purchase</a>
                    {balanceOf && balanceOf.gt(0) && <TokenDepositButton />}
                </div>
            </div>
            <div>
                {!balanceOf && <div className="text-center animate-pulse">Loading...</div>}
                {balanceOf && <div className="text-center text-3xl font-semibold">{formatCommify(balanceOf)}</div>}
            </div>
            <div className="text-xs text-slate-400 font-mono">{tokenAddress}</div>
        </div>
    </div>
    )

}