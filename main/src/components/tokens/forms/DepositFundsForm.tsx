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
    roundIndex: number,
    amount: string,
};

export default function DepositFundsForm() {

    const stakingContract = new Contract(tokenStakingAddress, ERC20Staking.abi)

    const { state: stateDepositFunds, send: depositFunds } = useContractFunction(stakingContract, 'depositFunds', { transactionName: 'Deposit Funds' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [roundIndex, setRoundIndex] = useState<number>()
    const [amount, setAmount] = useState<BigNumber>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const roundIndex = data.roundIndex
        const amount = ethers.utils.parseEther(data.amount)
        if (amount.lte(0)) return        
        setRoundIndex(roundIndex)
        setAmount(amount)

        await depositFunds(roundIndex, amount, { value: amount })
    };

    useEffect(() => {
        setFocus("roundIndex")
    }, [setFocus])

    if (stateDepositFunds.status === "PendingSignature") {
        return (<StateDialog
            heading="Deposit Funds"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        />)
    }

    if (stateDepositFunds.status === "Mining") {
        return (<StateDialog
            heading="Mining Deposit Funds"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        />)
    }

    if (stateDepositFunds.status === "Fail") {
        return (<StateDialog
            heading="Deposit Funds Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateDepositFunds.transaction?.hash}
            description={stateDepositFunds.errorMessage}
        />)
    }

    if (stateDepositFunds.status === "Success") {
        return (<StateDialog
            heading="Deposit Funds Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Funds successfully deposited. View the funds deposited in the Rounds session."
            description={stateDepositFunds.transaction?.hash}
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
            
            {errors.roundIndex && <span>This field is required</span>}

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
                    <span>Deposit Funds</span>
                </div>
            </button>

        </form>
    );
}