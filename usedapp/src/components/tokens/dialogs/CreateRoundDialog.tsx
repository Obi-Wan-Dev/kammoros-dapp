import { Dialog } from '@headlessui/react'
import { ICreateRoundDialog } from '../../../types/dialogs'
import DialogWrapper from '../../dialogs/DialogWrapper'
import { FaTimes } from "react-icons/fa"
import CreateRoundForm from '../forms/CreateRoundForm'

export default function CreateRoundDialog({ startTime, duration, isOpen, openModal, closeModal }: ICreateRoundDialog) {

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
            <div className="mt-8">
                <CreateRoundForm />
            </div>
        </DialogWrapper>
    )
}