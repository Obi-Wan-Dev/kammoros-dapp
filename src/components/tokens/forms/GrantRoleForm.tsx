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
    role: string,
    wallet: string,
};

export default function GrantRoleForm() {

    const stakingContract = new Contract(tokenStakingAddress, ERC20Staking.abi)

    const { state: stateGrantRole, send: grantRole } = useContractFunction(stakingContract, 'grantRole', { transactionName: 'Grant Role' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [role, setRole] = useState<string>()
    const [wallet, setWallet] = useState<string>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const role = data.role
        const wallet = data.wallet
        setRole(role)
        setWallet(wallet)

        await grantRole(role, wallet)
    };

    useEffect(() => {
        setFocus("role")
    }, [setFocus])

    if (stateGrantRole.status === "PendingSignature") {
        return (<StateDialog
            heading="Grant Roles"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        />)
    }

    if (stateGrantRole.status === "Mining") {
        return (<StateDialog
            heading="Mining Grant Roles"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        />)
    }

    if (stateGrantRole.status === "Fail") {
        return (<StateDialog
            heading="Grant Roles Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateGrantRole.transaction?.hash}
            description={stateGrantRole.errorMessage}
        />)
    }

    if (stateGrantRole.status === "Success") {
        return (<StateDialog
            heading="Grant Roles Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Roles successfully granted. View the transaction in the your wallet."
            description={stateGrantRole.transaction?.hash}
        />)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <label>Role</label>
            </div>

            <div className="flex">
                <input autoFocus={true} {...register("role", { required: true })} className="grow outline-0 border-2 border-r-2 border-emerald-500 text-3xl py-1 px-2 rounded-md text-slate-600" />
            </div>
            
            {errors.role && <span>This field is required</span>}

            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <label>Address</label>
            </div>

            <div className="flex">
                <input autoFocus={true} {...register("wallet", { required: true })} className="grow outline-0 border-2 border-r-2 border-emerald-500 text-3xl py-1 px-2 rounded-md text-slate-600" />
            </div>

            {errors.wallet && <span>This field is required</span>}

            <button type="submit" className="text-xl font-semibold text-white py-3 px-4 bg-emerald-500 rounded-md hover:border-emerald-500 hover:bg-emerald-400">
                <div className="flex items-center justify-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Grant Role</span>
                </div>
            </button>

        </form>
    );
}