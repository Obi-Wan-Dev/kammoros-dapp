import { Dialog } from '@headlessui/react'
import { INFTRescueFundsDialog } from '../../../types/dialogs'
import DialogWrapper from '../../dialogs/DialogWrapper'
import { Contract, BigNumber, ethers } from 'ethers'
import { useForm, SubmitHandler } from "react-hook-form";
import { useContractFunction } from "@usedapp/core";
import StateDialog from "../../dialogs/StateDialog";
import { useEffect, useState } from "react";
import { FaArrowAltCircleUp, FaCheckCircle, FaTimes, FaSpinner, FaHandPointDown } from "react-icons/fa"
import ERC20Staking from "../../../abi/ERC20Staking.json"

interface IWrapper {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
    children: JSX.Element | JSX.Element[]
}

type Inputs = {
    contractAddress: string,
    amount: string,
};

function Wrapper({ isOpen, openModal, closeModal, children }: IWrapper) {
    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Rescue Funds</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">{children}</div>
        </DialogWrapper>
    )
}


export default function NFTRescueFundsDialog({ contractAddress, isOpen, openModal, closeModal }: INFTRescueFundsDialog) {

    const NFTStakingContracts = new Contract(contractAddress, ERC20Staking.abi)

    const { state: stateRescueFunds, send: rescueFunds } = useContractFunction(NFTStakingContracts, 'rescueETH', { transactionName: 'Rescue Funds' })

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
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Rescue Funds"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        /></Wrapper>)
    }

    if (stateRescueFunds.status === "Mining") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Mining Rescue Funds"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        /></Wrapper>)
    }

    if (stateRescueFunds.status === "Fail") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Rescue Funds Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateRescueFunds.transaction?.hash}
            description={stateRescueFunds.errorMessage}
        /></Wrapper>)
    }

    if (stateRescueFunds.status === "Success") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Rescue Funds Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Funds successfully rescued. View the funds rescued in your wallet."
            description={stateRescueFunds.transaction?.hash}
        /></Wrapper>)
    }

    return (
        <Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <>
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
            </>
        </Wrapper>
    )
}