import { Contract, ethers, BigNumber } from "ethers";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowAltCircleUp, FaCheckCircle, FaTimes, FaHandPointDown } from "react-icons/fa"
import { tokenStakingAddress } from "../../../constants";
import ERC20Staking from "../../../abi/ERC20Staking.json"
import { FaSpinner } from "react-icons/fa"
import { useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";
import StateDialog from "../../dialogs/StateDialog";

type Inputs = {
    amount: string,
};

export default function RescueFundsForm() {

    const stakingContract = new Contract(tokenStakingAddress, ERC20Staking.abi)

    const { state: stateRescueFunds, send: rescueFunds } = useContractFunction(stakingContract, 'rescueETH', { transactionName: 'Rescue Funds' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [amount, setAmount] = useState<BigNumber>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const amount = ethers.utils.parseEther(data.amount)
        if (amount.lte(0)) return        
        setAmount(amount)

        await rescueFunds(amount)
    };

    useEffect(() => {
        setFocus("amount")
    }, [setFocus])

    if (stateRescueFunds.status === "PendingSignature") {
        return (<StateDialog
            heading="Rescue Funds"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        />)
    }

    if (stateRescueFunds.status === "Mining") {
        return (<StateDialog
            heading="Mining Rescue Funds"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        />)
    }

    if (stateRescueFunds.status === "Fail") {
        return (<StateDialog
            heading="Rescue Funds Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateRescueFunds.transaction?.hash}
            description={stateRescueFunds.errorMessage}
        />)
    }

    if (stateRescueFunds.status === "Success") {
        return (<StateDialog
            heading="Rescue Funds Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Funds successfully rescued. View the funds deposited in your wallet."
            description={stateRescueFunds.transaction?.hash}
        />)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <label>Amount</label>
            </div>

            <div className="flex">
                <input autoFocus={true} {...register("amount", { required: true })} className="grow outline-0 border-2 border-r-2 border-emerald-500 text-3xl py-1 px-2 rounded-md text-slate-600" />
            </div>

            {errors.amount && <span>This field is required</span>}

            <button type="submit" className="text-xl font-semibold text-white py-3 px-4 bg-emerald-500 rounded-md hover:border-emerald-500 hover:bg-emerald-400">
                <div className="flex items-center justify-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Rescue Funds</span>
                </div>
            </button>

        </form>
    );
}