import { Dialog } from '@headlessui/react'
import { IRescueFundsDialog } from '../../../types/dialogs'
import DialogWrapper from '../../dialogs/DialogWrapper'
import { FaTimes } from "react-icons/fa"
import RescueFundsForm from '../forms/RescueFundsForm'

export default function RescueFundsDialog({ amount, isOpen, openModal, closeModal }: IRescueFundsDialog) {

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
            <div className="mt-8">
                <RescueFundsForm />
            </div>
        </DialogWrapper>
    )
}