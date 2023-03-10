import { Dialog } from '@headlessui/react'
import { IWithdrawDialog } from '../../../types/dialogs'
import DialogWrapper from '../../dialogs/DialogWrapper'
import { FaCheckCircle, FaSpinner, FaSync, FaTimes } from "react-icons/fa"
import { FaArrowAltCircleDown } from "react-icons/fa"
import { tokenStakingAddress } from '../../../constants'
import ERC20Staking from "../../../abi/ERC20Staking.json"
import { formatCommify } from '../../../support/formatters'
import { useAddress, useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { TransactionError } from '@thirdweb-dev/sdk'
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'

function LoadingView() {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Step 1 of 1</h4>
            <FaSpinner className="animate-spin h-6 w-6" />
            <h3 className="font-semibold uppercase text-slate-900">Withdrawing This Deposit</h3>
            {/* <h4 className="font-semibold uppercase text-slate-900">{formatCommify(amount)}</h4> */}
            <p className="text-slate-400">Confirm this transaction in your wallet</p>
        </div>
    )
}

function ErrorView({ error, withdraw }: { error: string | undefined, withdraw: () => void }) {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Error</h4>
            <h3 className="font-semibold uppercase text-red-900">Oops! Something went wrong.</h3>
            <p className="text-slate-400 w-full text-xs font-mono">
                {error}
            </p>
            <button
                type="button"
                className="rounded-md border border-transparent bg-amber-100 px-6 py-3 text-amber-900 hover:bg-amber-200 w-full text-base font-semibold"
                onClick={withdraw}
            >
                <div className="flex items-center justify-center gap-2">
                    <FaSync className="h-4" />
                    <span>Try again</span>
                </div>
            </button>
        </div>
    )
}

function SuccessView() {
    return (
        <div className="flex flex-col gap-4 items-center text-center mb-8">
            <h4 className="text-sm text-slate-400 uppercase">Congratulations</h4>
            <FaCheckCircle className="text-emerald-500 h-6 w-6" />
            <h3 className="font-semibold uppercase text-emerld-900">Withdrew This Deposit</h3>
            <p className="text-slate-400">Tokens have been transferred to your wallet.</p>
        </div>
    )
}

export default function TokenWithdrawDialog({ depositIndex, isOpen, openModal, closeModal }: IWithdrawDialog) {

    const address = useAddress()
    const { contract } = useContract(tokenStakingAddress, ERC20Staking.abi)
    const { data: deposit } = useContractRead(contract, "deposits", depositIndex)
    const { data: balanceOf } = useContractRead(contract, "balanceOf", address)

    const { mutateAsync: withdrawThis, status: status, error: error } = useContractWrite(contract, "withdrawByDeposit")

    const [amount, setAmount] = useState<BigNumber>()
    const [index, setDepositIndex] = useState<BigNumber>()

    useEffect(() => {

        if (deposit) {
            const amount = (deposit.amount as BigNumber)
            setAmount(amount)
        }

    }, [deposit])

    useEffect(() => {
        const depIndex = (depositIndex as unknown as BigNumber)
        setDepositIndex(depIndex)
    }, [index])

    async function withdraw() {
        console.log(index)
        await withdrawThis([index])
    }

    return (
        <DialogWrapper isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
            <div className='flex flex-col gap-8'>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-slate-900 uppercase"
                >
                    <div className='flex items-center justify-between'>
                        <span>Withdraw This</span>
                        <button onClick={closeModal}><FaTimes /></button>
                    </div>
                </Dialog.Title>
                {status === "idle" && <LoadingView />}
                {status === "loading" && <LoadingView />}
                {status === "error" && <ErrorView error={(error as TransactionError).toString()} withdraw={withdraw} />}
                {status === "success" && <SuccessView />}
                {status === "idle" &&
                    <>
                        <div className='text-center font-semibold'>
                            <div>{deposit && formatCommify(deposit.amount)}</div>
                        </div>
                        <button
                            type="button"
                            className="rounded-md border border-transparent bg-amber-100 px-6 py-3 text-amber-900 hover:bg-amber-200 w-full text-base font-semibold disabled:border-slate-100 disabled:text-slate-300 disabled:bg-slate-100"
                            onClick={withdraw}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FaArrowAltCircleDown className="h-4" />
                                <span>Withdraw This Deposit</span>
                            </div>
                        </button>
                    </>}
            </div>
        </DialogWrapper>
    )
}
