import { BigNumber } from "ethers"
import _ from "lodash"
import { tokenStakingAddress } from "../../constants"
import RoundRow from "./RoundRow"
import ERC20Staking from "../../abi/ERC20Staking.json"
import KMCToken from "../../abi/KMCToken.json"
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react"
import { formatCommify } from "../../support/formatters"
import { FaSpinner, FaTimes, FaPlug } from "react-icons/fa"
import Deposit from "./Deposit"

const headTdClass = "px-3 py-2 text-right text-xs uppercase font-semibold text-slate-400"

function LoadingDeposits() {
    return (
        <tr>
            <td colSpan={11} className="py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FaSpinner className="animate-spin h-6 w-6" />
                    <p className="text-slate-400 text-sm font-semibold uppercase">Loading Deposits</p>
                </div>
            </td>
        </tr>
    )
}

function ZeroDeposits() {

    const address = useAddress()

    return (
        <tr>
            <td colSpan={11} className="py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FaTimes className="h-6 w-6 text-slate-400" />
                    <div className="text-slate-400 text-sm font-semibold uppercase flex flex-col items-center gap-2">
                        <p>No deposits for address</p>
                        <p>{address}</p>
                    </div>
                </div>
            </td>
        </tr>
    )
}

function NoAddress() {
    return (
        <tr>
            <td colSpan={11} className="py-8">
                <div className="flex flex-col items-center justify-center gap-4">
                    <FaPlug className="h-6 w-6 text-slate-400" />
                    <div className="text-slate-400 text-sm font-semibold uppercase flex flex-col items-center gap-2">
                        <p>Connect your wallet to view deposits</p>
                    </div>
                </div>
            </td>
        </tr>
    )
}

function TokenStakingDepositTable() {
    const address = useAddress()
    const { contract } = useContract(tokenStakingAddress, ERC20Staking.abi)
    const { data: tokenAddress } = useContractRead(contract, "token");
    const { contract: token } = useContract(tokenAddress, KMCToken.abi)
    const { data: depositIndexesByAddress, isLoading } = useContractRead(contract, "depositIndexesByAddress", address);
    const { data: deposited } = useContractRead(contract, "balanceOf", address);
    const { data: balanceOf } = useContractRead(token, "balanceOf", address);

    //const { contract } = useContract(tokenStakingAddress, ERC20Staking.abi)
    //const { data: nbRounds, isLoading } = useContractRead(contract, "nbRounds");

    return (

        <div className="bg-slate-700 w-full p-4 rounded-lg flex flex-col gap-4">
            <div className="flex divide-x divide-solid text-white text-xs font-semibold uppercase">
                <span>Deposited: {formatCommify(deposited)}</span>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="hidden lg:table-row">
                        <td className={headTdClass}>#</td>
                        <td className={headTdClass} colSpan={3}>Deposit Time</td>
                        <td className={headTdClass} colSpan={3}>Withdraw Time</td>
                        <td className={headTdClass} colSpan={2}>Amount</td>
                        <td className={headTdClass} colSpan={2}></td>
                    </tr>
                </thead>
                <tbody>
                    {!address && <NoAddress />}
                    {address && isLoading && <LoadingDeposits />}
                    {!isLoading && depositIndexesByAddress?.length <= 0 && <ZeroDeposits />}
                    {!isLoading && depositIndexesByAddress?.map((index: BigNumber, key: number) => <Deposit index={index.toNumber()} key={key} />)}
                </tbody>
            </table>
        </div>
    )
}

export default TokenStakingDepositTable