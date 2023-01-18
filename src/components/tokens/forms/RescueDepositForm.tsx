import { Contract } from "ethers";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowAltCircleUp, FaCheckCircle, FaTimes, FaHandPointDown } from "react-icons/fa"
import { tokenStakingAddress } from "../../../constants";
import ERC20Staking from "../../../abi/ERC20Staking.json"
import { FaSpinner } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import StateDialog from "../../dialogs/StateDialog";

type Inputs = {
    depositIndex: number,
};

export default function RescueDepositForm() {

    const stakingContract = new Contract(tokenStakingAddress, ERC20Staking.abi)

    const { state: stateRescueDeposit, send: rescueDeposit } = useContractFunction(stakingContract, 'rescueDeposit', { transactionName: 'Rescue Deposit' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [depositIndex, setAmount] = useState<number>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const depositIndex = data.depositIndex       
        setAmount(depositIndex)

        await rescueDeposit(depositIndex)
    };

    useEffect(() => {
        setFocus("depositIndex")
    }, [setFocus])

    if (stateRescueDeposit.status === "PendingSignature") {
        return (<StateDialog
            heading="Rescue Deposit"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        />)
    }

    if (stateRescueDeposit.status === "Mining") {
        return (<StateDialog
            heading="Mining Rescue Deposit"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        />)
    }

    if (stateRescueDeposit.status === "Fail") {
        return (<StateDialog
            heading="Rescue Deposit Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateRescueDeposit.transaction?.hash}
            description={stateRescueDeposit.errorMessage}
        />)
    }

    if (stateRescueDeposit.status === "Success") {
        return (<StateDialog
            heading="Rescue Deposit Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Deposit successfully rescued. View the tokens deposited in his wallet."
            description={stateRescueDeposit.transaction?.hash}
        />)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <label>Deposit Index</label>
            </div>

            <div className="flex">
                <input autoFocus={true} {...register("depositIndex", { required: true })} className="grow outline-0 border-2 border-r-2 border-emerald-500 text-3xl py-1 px-2 rounded-md text-slate-600" />
            </div>

            {errors.depositIndex && <span>This field is required</span>}

            <button type="submit" className="text-xl font-semibold text-white py-3 px-4 bg-emerald-500 rounded-md hover:border-emerald-500 hover:bg-emerald-400">
                <div className="flex items-center justify-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Rescue Deposit</span>
                </div>
            </button>

        </form>
    );
}