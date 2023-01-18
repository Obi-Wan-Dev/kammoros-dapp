import NFTStakingTable from "./NFTStakingTable"
import OwnedNFTList from "./owned/OwnedNFTList"
import StakedNFTList from "./staked/StakedNFTList"
import useNFTCollection from "../../hooks/ERC721Staking/useNFTCollection"
import useHasRole from "../../hooks/ERC721Staking/useHasRole"
import AdmNFTTable from "./AdmNFTTable"
import { useAddress } from "@thirdweb-dev/react"

interface INFTWrapper {
    contractAddress: string
}

export default function NFTWrapper({ contractAddress }: INFTWrapper) {

    const address = useAddress()
    const nftDropAddress = useNFTCollection(contractAddress)
    const HasRole = useHasRole(contractAddress, "0x0000000000000000000000000000000000000000000000000000000000000000", address)

    return (
        <div className="flex flex-col gap-4">
            {!HasRole? <></> :
            <div>
                <AdmNFTTable contractAddress={contractAddress} />
            </div>
            }
            <div className="grid lg:grid-cols-2 gap-4">
                <OwnedNFTList contractAddress={contractAddress} />
                <StakedNFTList contractAddress={contractAddress} />
            </div>
            <div>
                <NFTStakingTable contractAddress={contractAddress} />
            </div>
        </div>
    )
}