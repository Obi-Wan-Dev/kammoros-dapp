import { useAddress } from "@thirdweb-dev/react"
import { useEthers } from "@usedapp/core"
import { useState } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import NFTUpdateRoundDialog from "../dialogs/NFTUpdateRoundDialog"

interface INFTUpdateRoundDialog {
    contractAddress: string
    roundIndex: number
    startTime: number
    duration: number
}

export default function NFTUpdateRoundButton({ contractAddress, roundIndex, startTime, duration }: INFTUpdateRoundDialog) {

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
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-amber-500 text-amber-500 hover:border-amber-400 hover:text-amber-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal} disabled={!address}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Update Round</span>
                </div>
            </button>
            <div>{isOpen}</div>
            <NFTUpdateRoundDialog contractAddress={contractAddress} roundIndex={roundIndex} startTime={startTime} duration={duration} isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
        </>
    )
}