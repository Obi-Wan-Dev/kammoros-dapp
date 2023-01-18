import { Dialog } from '@headlessui/react'
import { IRescueDepositDialog } from '../../../types/dialogs'
import DialogWrapper from '../../dialogs/DialogWrapper'
import { FaTimes } from "react-icons/fa"
import RescueDepositForm from '../forms/RescueDepositForm'

export default function RescueDepositDialog({ depositIndex, isOpen, openModal, closeModal }: IRescueDepositDialog) {

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
            <div className="mt-8">
                <RescueDepositForm />
            </div>
        </DialogWrapper>
    )
}