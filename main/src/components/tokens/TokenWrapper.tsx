import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import DelegatedTokens from "./DelegatedTokens";
import OwnedTokens from "./OwnedTokens";
import TokenStakingTable from "./TokenStakingTable";
import { tokenStakingAddress } from "../../constants"
import ERC20Staking from "../../abi/ERC20Staking.json"
import AdmTokensTable from "./AdmTokensTable";
import TokenStakingDepositTable from "./TokenStakingDepositList";

export default function TokenWrapper() {

    const address = useAddress()
    const { contract } = useContract(tokenStakingAddress, ERC20Staking.abi)
    const { data: hasRole, isLoading: isLoadingRound } = useContractRead(contract, "hasRole", "0x0000000000000000000000000000000000000000000000000000000000000000", address);

    return (
        <div className="flex flex-col gap-4">
            {!hasRole? <></> :
            <div>
                <AdmTokensTable />
            </div>
            }
            <div className="grid lg:grid-cols-2 gap-4">
                <OwnedTokens />
                <DelegatedTokens />
            </div>
            <div>
                <TokenStakingTable />
            </div>
            <div>
                <TokenStakingDepositTable />
            </div>
        </div>
    )
}