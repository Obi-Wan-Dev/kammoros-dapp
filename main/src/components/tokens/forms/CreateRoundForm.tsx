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
    startTime: number,
    duration: number,
};

export default function CreateRoundForm() {

    const stakingContract = new Contract(tokenStakingAddress, ERC20Staking.abi)

    const { state: stateCreateRound, send: createRound } = useContractFunction(stakingContract, 'createRound', { transactionName: 'Create Round' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [startTime, setStartTime] = useState<number>()
    const [duration, setDuration] = useState<number>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const duration = data.duration
        const startTime = data.startTime
        setStartTime(startTime)
        setDuration(duration)

        await createRound(startTime, duration)
    };

    useEffect(() => {
        setFocus("startTime")
    }, [setFocus])

    if (stateCreateRound.status === "PendingSignature") {
        return (<StateDialog
            heading="Create Round"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        />)
    }

    if (stateCreateRound.status === "Mining") {
        return (<StateDialog
            heading="Mining Create Round"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        />)
    }

    if (stateCreateRound.status === "Fail") {
        return (<StateDialog
            heading="Create Round Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateCreateRound.transaction?.hash}
            description={stateCreateRound.errorMessage}
        />)
    }

    if (stateCreateRound.status === "Success") {
        return (<StateDialog
            heading="Create Round Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Round successfully created. View the round created in the Rounds session."
            description={stateCreateRound.transaction?.hash}
        />)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <label>Start Time</label>
            </div>

            <div className="flex">
                <input autoFocus={true} {...register("startTime", { required: true })} className="grow outline-0 border-2 border-r-2 border-emerald-500 text-3xl py-1 px-2 rounded-md text-slate-600" />
            </div>
            
            {errors.startTime && <span>This field is required</span>}

            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <label>Duration</label>
            </div>

            <div className="flex">
                <input autoFocus={true} {...register("duration", { required: true })} className="grow outline-0 border-2 border-r-2 border-emerald-500 text-3xl py-1 px-2 rounded-md text-slate-600" />
            </div>

            {errors.duration && <span>This field is required</span>}

            <button type="submit" className="text-xl font-semibold text-white py-3 px-4 bg-emerald-500 rounded-md hover:border-emerald-500 hover:bg-emerald-400">
                <div className="flex items-center justify-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Create Round</span>
                </div>
            </button>

        </form>
    );
}