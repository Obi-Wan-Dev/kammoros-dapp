import { BigNumber } from "ethers"

interface IDialog {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

export interface IDialogWrapper extends IDialog {
    children: JSX.Element | JSX.Element[]
}

export interface IDepositDialog extends IDialog {
    // 
}

export interface IClaimDialog extends IDialog {
    roundIndex: number
}

export interface IWithdrawDialog extends IDialog {
    depositIndex: number
}

export interface INFTWithdrawDialog extends IDialog {
    contractAddress: string
    tokenIds: BigNumber[]
}

export interface INFTDepositDialog extends IDialog {
    contractAddress: string
    tokenIds: BigNumber[]
}

export interface ICreateRoundDialog extends IDialog {
    startTime: number
    duration: number
}

export interface INFTCreateRoundDialog extends IDialog {
    contractAddress: string
    startTime: number
    duration: number
}

export interface IDepositFundsDialog extends IDialog {
    roundIndex: number,
    amount: string,
}

export interface INFTDepositFundsDialog extends IDialog {
    contractAddress: string
    roundIndex: number
    amount: string
}

export interface IUpdateRoundDialog extends IDialog {
    roundIndex: number
    startTime: number
    duration: number
}

export interface INFTUpdateRoundDialog extends IDialog {
    contractAddress: string
    roundIndex: number
    startTime: number
    duration: number
}

export interface IRescueFundsDialog extends IDialog {
    amount: string,
}

export interface INFTRescueFundsDialog extends IDialog {
    contractAddress: string
    amount: string
}

export interface IRescueDepositDialog extends IDialog {
    depositIndex: string,
}

export interface INFTRescueDepositDialog extends IDialog {
    contractAddress: string
    depositIndex: string
}

export interface IDepositIndexesByAddressDialog extends IDialog {
    address: string
}

export interface IGrantRoleDialog extends IDialog {
    role: string,
    wallet: string,
}

export interface INFTGrantRoleDialog extends IDialog {
    contractAddress: string
    role: string
    wallet: string
}