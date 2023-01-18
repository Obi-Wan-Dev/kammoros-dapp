import { Contract, ethers } from "ethers";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowAltCircleUp, FaCheckCircle, FaTimes, FaHandPointDown } from "react-icons/fa"
import { tokenStakingAddress } from "../../../constants";
import ERC20Staking from "../../../abi/ERC20Staking.json"
import { FaSpinner } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import StateDialog from "../../dialogs/StateDialog";

type Inputs = {
    roundIndex: number,
    startTime: number,
    duration: number,
};

export default function UpdateRoundForm() {

    const stakingContract = new Contract(tokenStakingAddress, ERC20Staking.abi)

    const { state: stateUpdateRound, send: updateRound } = useContractFunction(stakingContract, 'updateRound', { transactionName: 'Update Round' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [roundIndex, setRoundIndex] = useState<number>()
    const [startTime, setStartTime] = useState<number>()
    const [duration, setDuration] = useState<number>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const roundIndex = data.roundIndex
        const duration = data.duration
        const startTime = data.startTime
        setRoundIndex(roundIndex)
        setStartTime(startTime)
        setDuration(duration)

        await updateRound(roundIndex, startTime, duration)
    };

    useEffect(() => {
        setFocus("roundIndex")
    }, [setFocus])

    if (stateUpdateRound.status === "PendingSignature") {
        return (<StateDialog
            heading="Update Round"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        />)
    }

    if (stateUpdateRound.status === "Mining") {
        return (<StateDialog
            heading="Mining Update Round"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        />)
    }

    if (stateUpdateRound.status === "Fail") {
        return (<StateDialog
            heading="Update Round Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateUpdateRound.transaction?.hash}
            description={stateUpdateRound.errorMessage}
        />)
    }

    if (stateUpdateRound.status === "Success") {
        return (<StateDialog
            heading="Update Round Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Round successfully updated. View the round updated in the Rounds session."
            description={stateUpdateRound.transaction?.hash}
        />)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <label>Round Index</label>
            </div>

            <div className="flex">
                <input autoFocus={true} {...register("roundIndex", { required: true })} className="grow outline-0 border-2 border-r-2 border-emerald-500 text-3xl py-1 px-2 rounded-md text-slate-600" />
            </div>
            
            {errors.startTime && <span>This field is required</span>}

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
                    <span>Update Round</span>
                </div>
            </button>

        </form>
    );
}