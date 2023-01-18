import { Dialog } from '@headlessui/react'
import { INFTGrantRoleDialog } from '../../../types/dialogs'
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
    role: string,
    wallet: string,
};

function Wrapper({ isOpen, openModal, closeModal, children }: IWrapper) {
    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Grant Role</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">{children}</div>
        </DialogWrapper>
    )
}


export default function NFTGrantRoleDialog({ contractAddress, isOpen, openModal, closeModal }: INFTGrantRoleDialog) {

    const NFTStakingContracts = new Contract(contractAddress, ERC20Staking.abi)

    const { state: stateGrantRole, send: grantRole } = useContractFunction(NFTStakingContracts, 'grantRole', { transactionName: 'Grant Role' })

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm<Inputs>();

    const [role, setGrantRole] = useState<string>()
    const [wallet, setAmount] = useState<string>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const role = data.role
        const wallet = data.wallet
        setGrantRole(role)
        setAmount(wallet)

        await grantRole(role, wallet)
    };

    useEffect(() => {
        setFocus("role")
    }, [setFocus])

    if (stateGrantRole.status === "PendingSignature") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Grant Role"
            icon={<FaHandPointDown className="animate-pulse h-6 w-6" />}
            description="Confirm this transaction in your wallet"
        /></Wrapper>)
    }

    if (stateGrantRole.status === "Mining") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Mining Grant Role"
            icon={<FaSpinner className="animate-spin h-6 w-6" />}
            description="Your transaction is processing"
        /></Wrapper>)
    }

    if (stateGrantRole.status === "Fail") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Grant Role Failed"
            icon={<FaTimes className="h-6 w-6" />}
            subheading={stateGrantRole.transaction?.hash}
            description={stateGrantRole.errorMessage}
        /></Wrapper>)
    }

    if (stateGrantRole.status === "Success") {
        return (<Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}><StateDialog
            heading="Grant Role Succeeded"
            icon={<FaCheckCircle className="text-emerald-500 h-6 w-6" />}
            subheading="Role successfully granted. View the transaction in your wallet."
            description={stateGrantRole.transaction?.hash}
        /></Wrapper>)
    }

    return (
        <Wrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <>
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
            </>
        </Wrapper>
    )
}