import { useAddress } from "@thirdweb-dev/react"
import { useState } from "react"
import { FaArrowAltCircleDown } from "react-icons/fa"
import NFTRescueDepositDialog from "../dialogs/NFTRescueDepositDialog"

interface INFTRescueDepositDialog {
    contractAddress: string
    depositIndex: string
}

export default function NFTRescueDepositButton({ contractAddress, depositIndex }: INFTRescueDepositDialog) {

    const address = useAddress()

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        
        setIsOpen(false)
    }

    function openModal() {
        
        setIsOpen(true)
    }

    return (
        <>
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal} disabled={!address}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleDown className="h-4" />
                    <span>Rescue Deposit</span>
                </div>
            </button>
            <div>{isOpen}</div>
            <NFTRescueDepositDialog contractAddress={contractAddress} depositIndex={depositIndex} isOpen={isOpen} openModal={openModal} closeModal={closeModal} />            
        </>
    )
}