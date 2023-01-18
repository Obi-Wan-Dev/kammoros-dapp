import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import moment from "moment"
//import WithdrawButton from "./WithdrawButton";
import ERC20Staking from "../../abi/ERC20Staking.json"
import { tokenStakingAddress } from "../../constants"
import { formatCommify } from "../../support/formatters";
import Loading from "../support/Loading"
import TokenWithdrawButton from "./buttons/TokenWithdrawButton";

const tdClass = "px-3 py-4 text-right border-t border-slate-500 text-sm text-slate-50"

interface IDeposit {
    index: number
}

export function LoadingDeposit() {
    return (
        <tr>
            <td className={tdClass} colSpan={1}><Loading /></td>
            <td className={tdClass} colSpan={3}><Loading /></td>
            <td className={tdClass} colSpan={3}><Loading /></td>
            <td className={tdClass} colSpan={2}><Loading /></td>
            <td className={tdClass} colSpan={2}></td>
        </tr>
    )
}

export default function Deposit({ index }: IDeposit) {

    const { contract } = useContract(tokenStakingAddress, ERC20Staking.abi)
    const { data: deposit } = useContractRead(contract, "deposits", index)

    return (
        <>
            {deposit ?
                <tr>
                    <td className={tdClass} colSpan={1}>{index}</td>
                    <td className={tdClass} colSpan={3}>{moment(deposit.depositTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</td>
                    <td className={tdClass} colSpan={3}>{!deposit.withdrawlTime.eq(ethers.constants.MaxUint256) && moment(deposit.withdrawlTime.toNumber() * 1000).format("MMM Do YYYY, h:mm")}</td>
                    <td className={tdClass} colSpan={2}>{formatCommify(deposit.amount)}</td>
                    <td className={tdClass} colSpan={2}>
                        <TokenWithdrawButton depositIndex={index} />
                    </td>
                </tr> : <LoadingDeposit />}
        </>
    )
}