import { Dialog } from '@headlessui/react'
import { IDepositIndexesByAddressDialog } from '../../../types/dialogs'
import DialogWrapper from '../../dialogs/DialogWrapper'
import { FaTimes } from "react-icons/fa"
import DepositIndexesByAddressForm from '../forms/DepositIndexesByAddressForm'

export default function UpdateRoundDialog({ address, isOpen, openModal, closeModal }: IDepositIndexesByAddressDialog) {

    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-slate-900 uppercase"
            >
                <div className='flex items-center justify-between'>
                    <span>Dep Index By Address</span>
                    <button onClick={closeModal}><FaTimes /></button>
                </div>
            </Dialog.Title>
            <div className="mt-8">
                <DepositIndexesByAddressForm />
            </div>
        </DialogWrapper>
    )
}