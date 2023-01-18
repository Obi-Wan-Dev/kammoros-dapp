import { useAddress } from "@thirdweb-dev/react"
import { useState } from "react"
import { FaArrowAltCircleUp } from "react-icons/fa"
import NFTGrantRoleDialog from "../dialogs/NFTGrantRoleDialog"

interface INFTGrantRoleDialog {
    contractAddress: string
    role: string
    wallet: string
}

export default function NFTGrantRole({ contractAddress, role, wallet }: INFTGrantRoleDialog) {

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
            <button className="px-2 py-1 text-sm font-semibold uppercase rounded border-2 border-orange-500 text-orange-500 hover:border-orange-400 hover:text-orange-400 disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100" onClick={openModal} disabled={!address}>
                <div className="flex items-center gap-2">
                    <FaArrowAltCircleUp className="h-4" />
                    <span>Grant Role</span>
                </div>
            </button>
            <div>{isOpen}</div>
            <NFTGrantRoleDialog contractAddress={contractAddress} role={role} wallet={wallet} isOpen={isOpen} openModal={openModal} closeModal={closeModal} />            
        </>
    )
}