import { BigNumber } from "ethers"
import _ from "lodash"
import { tokenStakingAddress } from "../../constants"
import RoundRow from "./RoundRow"
import ERC20Staking from "../../abi/ERC20Staking.json"
import { useContract, useContractRead } from "@thirdweb-dev/react"

const headTdClass = "px-3 py-2 text-right text-xs uppercase font-semibold text-slate-400"

function TokenStakingTable() {
    const { contract } = useContract(tokenStakingAddress, ERC20Staking.abi)
    const { data: nbRounds, isLoading } = useContractRead(contract, "nbRounds");

    return (

        <div className="bg-slate-700 w-full p-4 rounded-lg flex flex-col gap-4">
            <div className="text-white text-xs font-semibold uppercase">Rounds ({nbRounds && nbRounds.toString()})</div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="hidden lg:table-row">
                        <td className={headTdClass}>#</td>
                        <td className={headTdClass} colSpan={2}>Start Time</td>
                        <td className={headTdClass} colSpan={2}>End Time</td>
                        <td className={headTdClass} colSpan={2}>Duration</td>
                        <td className={headTdClass}>Stake</td>
                        <td className={headTdClass}>%</td>
                        <td className={headTdClass}>Round*</td>
                        <td className={headTdClass}>Yours*</td>
                        <td className={headTdClass}>Claimed*</td>
                        <td className={headTdClass}>Unclaimed*</td>
                        <td className={`${headTdClass} pr-0`} colSpan={2}>*BNB</td>
                    </tr>
                </thead>
                <tbody>
                    {nbRounds ? _.times(nbRounds, (index) => <RoundRow key={index} index={BigNumber.from(index)} />) : <tr><td colSpan={15} className="animate-pulse text-center text-white text-xs text-semibold">Loading...</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default TokenStakingTable