import { Dialog } from '@headlessui/react'
import { INFTRescueDepositDialog } from '../../../types/dialogs'
import DialogWrapper from '../../dialogs/DialogWrapper'
import { Contract } from 'ethers'
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
    depositIndex: string,
};

function Wrapper({ isOpen, openModal, closeModal, children }: IWrapper) {
    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Rescue Deposit</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">{children}</div>
        </DialogWrapper>
    )
}


export default function NFTRescueDepositDialog({ contractAddress, isOpen, openModal, closeModal }: INFTRescueDepositDialog) {

    const NFTStakingContracts = new Contract(contractAddress, ERC20Staking.abi)

    const { state: stateRescueDeposit, send: rescueDeposit } = useContractFunction(NFTStakingContracts, 'rescueDeposit', { transactionName: 'Rescue Deposit' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [depositIndex, setAmount] = useState<string>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const depositIndex = data.depositIndex        
        setAmount(depositIndex)

        await rescueDeposit(depositIndex)
    };

    useEffect(() => {
        setFocus("depositIndex")
    }, [setFocus])

    if (stateRescueDeposit.status === "PendingSignature") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Rescue Deposit"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        /></Wrapper>)
    }

    if (stateRescueDeposit.status === "Mining") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Mining Rescue Deposit"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        /></Wrapper>)
    }

    if (stateRescueDeposit.status === "Fail") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Rescue Deposit Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateRescueDeposit.transaction?.hash}
            description={stateRescueDeposit.errorMessage}
        /></Wrapper>)
    }

    if (stateRescueDeposit.status === "Success") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Create Round Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Deposit successfully rescued. View the deposit rescued in his wallet."
            description={stateRescueDeposit.transaction?.hash}
        /></Wrapper>)
    }

    return (
        <Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <>
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
            </>
        </Wrapper>
    )
}