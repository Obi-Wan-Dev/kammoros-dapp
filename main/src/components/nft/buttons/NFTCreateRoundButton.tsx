import { useAddress } from "@thirdweb-dev/react"
import { useState } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import NFTCreateRoundDialog from "../dialogs/NFTCreateRoundDialog"

interface INFTCreateRoundDialog {
    contractAddress: string
    startTime: number
    duration: number
}

export default function NFTCreateRoundButton({ contractAddress, startTime, duration }: INFTCreateRoundDialog) {

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
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-emerald-500 text-emerald-500 hover:border-emerald-400 hover:text-emerald-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal} disabled={!address}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Create Round</span>
                </div>
            </button>
            <div>{isOpen}</div>
            <NFTCreateRoundDialog contractAddress={contractAddress} startTime={startTime} duration={duration} isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
        </>
    )
}