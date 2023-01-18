import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { tokenStakingAddress } from "../../constants"
import { formatCommify } from "../../support/formatters"
import TokenWithdrawAllButton from "./buttons/TokenWithdrawAllButton"
import ERC20Staking from "../../abi/ERC20Staking.json"

export default function DelegatedTokens() {

    const address = useAddress()
    const { contract } = useContract(tokenStakingAddress, ERC20Staking.abi)
    const { data: balanceOf } = useContractRead(contract, "balanceOf", address)

    return (
        <div className="bg-slate-700 text-slate-50 p-4 rounded-lg">
        <div className="flex flex-col justify-between gap-4 h-full">
            <div className="flex justify-between items-center text-slate-50">
            <div className="text-white text-xs font-semibold uppercase">Delegated</div>
                {balanceOf && balanceOf.gt(0) && <TokenWithdrawAllButton />}
            </div>
            <div>
                {!balanceOf && <div className="text-center animate-pulse">Loading...</div>}
                {balanceOf && <div className="text-center text-3xl font-semibold">{formatCommify(balanceOf)}</div>}
            </div>
            <div className="text-xs text-slate-400 font-mono">{tokenStakingAddress}</div>
        </div>
    </div>
    )

}