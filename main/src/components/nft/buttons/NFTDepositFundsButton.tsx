import { useAddress } from "@thirdweb-dev/react"
import { useState } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import NFTDepositFundsDialog from "../dialogs/NFTDepositFundsDialog"

interface INFTDepositFundsDialog {
    contractAddress: string
    roundIndex: number
    amount: string
}

export default function NFTDepositFundsButton({ contractAddress, roundIndex, amount }: INFTDepositFundsDialog) {

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
                    <span>Deposit Funds</span>
                </div>
            </button>
            <div>{isOpen}</div>
            <NFTDepositFundsDialog contractAddress={contractAddress} roundIndex={roundIndex} amount={amount} isOpen={isOpen} openModal={openModal} closeModal={closeModal} />            
        </>
    )
}