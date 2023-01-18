import { Dialog } from '@headlessui/react'
import { IUpdateRoundDialog } from '../../../types/dialogs'
import DialogWrapper from '../../dialogs/DialogWrapper'
import { FaTimes } from "react-icons/fa"
import UpdateRoundForm from '../forms/UpdateRoundForm'

export default function UpdateRoundDialog({ roundIndex, startTime, duration, isOpen, openModal, closeModal }: IUpdateRoundDialog) {

    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Update Round</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">
                <UpdateRoundForm />
            </div>
        </DialogWrapper>
    )
}