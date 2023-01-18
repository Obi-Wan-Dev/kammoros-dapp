import _ from "lodash"
import { tokenStakingAddress } from "../../constants"
import useNbRounds from "../../hooks/ERC20Staking/useNbRounds"
import CreateRoundButton from "./buttons/CreateRoundButton"
import DepositFundsButton from "./buttons/DepositFundsButton"
import UpdateRoundButton from "./buttons/UpdateRoundButton"
import RescueFundsButton from "./buttons/RescueFundsButton"
import RescueDepositButton from "./buttons/RescueDepositButton"
import GrantRoleButton from "./buttons/GrantRoleButton"

const headTdClass = "px-3 py-2 text-right text-xs uppercase font-semibold text-slate-400"

function AdmTokenTable() {
    const nbRounds = useNbRounds(tokenStakingAddress)

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-slate-700 text-slate-50 p-4 rounded-lg">
                <div className="text-white text-xs font-semibold uppercase">Write Contract (Payable)</div>
                <div className="bg-slate-700 w-full p-4 rounded-lg flex gap-2">
                    <CreateRoundButton startTime={0} duration={0} /> {/* Aqui vai o botão de createRound */}
                    <DepositFundsButton roundIndex={0} amount="" /> {/* Aqui vai o botão de depositFunds */}
                    <UpdateRoundButton roundIndex={0} startTime={0} duration={0} /> {/* Aqui vai o botão de updateRound */}
                    <RescueFundsButton amount="" /> {/* Aqui vai o botão de rescueETH */}
                    <RescueDepositButton depositIndex=""  /> {/* Aqui vai o botão de rescueDeposit */}
                    <GrantRoleButton role="" wallet="" /> {/* Aqui vai o botão de rescueDeposit */}
                    {/* <UpdateRoundButton roundIndex={0} startTime={0} duration={0} /> Aqui vai o botão de setFeeCliff
                    <UpdateRoundButton roundIndex={0} startTime={0} duration={0} /> Aqui vai o botão de setFeeRate
                    <UpdateRoundButton roundIndex={0} startTime={0} duration={0} /> Aqui vai o botão de setFeeReceiver */}
                </div>
            </div>
        </div>
    )
}

export default AdmTokenTable