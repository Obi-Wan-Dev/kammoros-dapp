import { useAddress } from "@thirdweb-dev/react"
import { useState } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import DepositIndexesByAddressDialog from "../dialogs/DepositIndexesByAddressDialog"

interface IDepositIndexesByAddressDialog {
    address: string
}

export default function DepositIndexesByAddressButton({ address }: IDepositIndexesByAddressDialog) {

    const addressWallet = useAddress()



    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        
        setIsOpen(false)
    }

    function openModal() {
        
        setIsOpen(true)
    }

    return (
        <>
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-amber-500 text-amber-500 hover:border-amber-400 hover:text-amber-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal} disabled={!addressWallet}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Dep Index by Address</span>
                </div>
            </button>
            <div>{isOpen}</div>
            {/* <DepositIndexesByAddressDialog address={addressWallet} isOpen={isOpen} openModal={openModal} closeModal={closeModal} /> */}
        </>
    )
}