import { Dialog } from '@headlessui/react'
import { INFTCreateRoundDialog } from '../../../types/dialogs'
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
    startTime: number,
    duration: number,
};

function Wrapper({ isOpen, openModal, closeModal, children }: IWrapper) {
    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Create Round</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">{children}</div>
        </DialogWrapper>
    )
}


export default function NFTCreateRoundDialog({ contractAddress, isOpen, openModal, closeModal }: INFTCreateRoundDialog) {

    const NFTStakingContracts = new Contract(contractAddress, ERC20Staking.abi)

    const { state: stateCreateRound, send: createRound } = useContractFunction(NFTStakingContracts, 'createRound', { transactionName: 'Create Round' })

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
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Create Round"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        /></Wrapper>)
    }

    if (stateCreateRound.status === "Mining") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Mining Create Round"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        /></Wrapper>)
    }

    if (stateCreateRound.status === "Fail") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Create Round Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateCreateRound.transaction?.hash}
            description={stateCreateRound.errorMessage}
        /></Wrapper>)
    }

    if (stateCreateRound.status === "Success") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Create Round Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Round successfully created. View the round created in the Rounds session."
            description={stateCreateRound.transaction?.hash}
        /></Wrapper>)
    }

    return (
        <Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <>
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
            </>
        </Wrapper>
    )
}