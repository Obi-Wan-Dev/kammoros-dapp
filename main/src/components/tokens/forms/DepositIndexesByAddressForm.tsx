import { Contract } from "ethers";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaArrowAltCircleUp } from "react-icons/fa"
import { tokenStakingAddress } from "../../../constants";
import ERC20Staking from "../../../abi/ERC20Staking.json"
import { useEffect, useState } from "react";
import { useContractFunction } from "@usedapp/core";

type Inputs = {
    address: string,
};

export default function DepositIndexesByAddressForm() {

    const stakingContract = new Contract(tokenStakingAddress, ERC20Staking.abi)

    const { state: stateDepositIndexesByAddress, send: depositIndexesByAddress } = useContractFunction(stakingContract, 'depositIndexesByAddress', { transactionName: 'Deposit Indexes By Address' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [address, setDepositIndexesByAddress] = useState<string>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const address = data.address
        setDepositIndexesByAddress(address)

        await depositIndexesByAddress(address)
        
    
    };

    useEffect(() => {
        setFocus("address")
    }, [setFocus])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase">
                <label>Address</label>
            </div>

            <div className="flex">
                <input autoFocus={true} {...register("address", { required: true })} className="grow outline-0 border-2 border-r-2 border-emerald-500 text-3xl py-1 px-2 rounded-md text-slate-600" />
            </div>

            {errors.address && <span>This field is required</span>}

            <button type="submit" className="text-xl font-semibold text-white py-3 px-4 bg-emerald-500 rounded-md hover:border-emerald-500 hover:bg-emerald-400">
                <div className="flex items-center justify-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Call</span>
                </div>
            </button>

        </form>
    );
}