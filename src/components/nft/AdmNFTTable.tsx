import useNbRounds from "../../hooks/ERC721Staking/useNbRounds"
import NFTDepositFundsButton from "./buttons/NFTDepositFundsButton"
import NFTCreateRoundButton from "./buttons/NFTCreateRoundButton"
import NFTUpdateRoundButton from "./buttons/NFTUpdateRoundButton"
import NFTRescueFundsButton from "./buttons/NFTRescueFundsButton"
import NFTRescueDepositButton from "./buttons/NFTRescueDepositButton"
import NFTGrantRoleButton from "./buttons/NFTGrantRoleButton"

interface IAdmNFTTable {
    contractAddress: string
}

function AdmNFTTable({ contractAddress }: IAdmNFTTable) {

    const nbRounds = useNbRounds(contractAddress)

    return (
        <div className="bg-slate-700 text-slate-50 p-4 rounded-lg">
        <div className="text-white text-xs font-semibold uppercase">Calls (Payable)</div>
        <div className="bg-slate-700 w-full p-4 rounded-lg flex gap-2">
            <NFTCreateRoundButton contractAddress={contractAddress} startTime={0} duration={0} /> {/* Aqui vai o botão de createRound */}
            <NFTDepositFundsButton contractAddress={contractAddress} roundIndex={0} amount="" /> {/* Aqui vai o botão de depositFunds */}
            <NFTUpdateRoundButton contractAddress={contractAddress} roundIndex={0} startTime={0} duration={0} /> {/* Aqui vai o botão de updateRound */}
            <NFTRescueFundsButton contractAddress={contractAddress} amount="" /> {/* Aqui vai o botão de rescueETH */}
            <NFTRescueDepositButton contractAddress={contractAddress} depositIndex="" /> {/* Aqui vai o botão de rescueDeposit */}
            <NFTGrantRoleButton contractAddress={contractAddress} role="" wallet="" /> {/* Aqui vai o botão de grantRole */}
            {/*<NFTDepositFundsButton contractAddress={contractAddress} roundIndex={0} amount="" /> Aqui vai o botão de setFeeCliff
            <NFTDepositFundsButton contractAddress={contractAddress} roundIndex={0} amount="" /> Aqui vai o botão de setFeeRate
            <NFTDepositFundsButton contractAddress={contractAddress} roundIndex={0} amount="" /> Aqui vai o botão de setFeeReceiver */}
            </div>
        </div>
    )
}

export default AdmNFTTable