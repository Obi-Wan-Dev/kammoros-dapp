import Container from "./Container";
import logo from "../../assets/logo.png"
import { ConnectWallet } from "@thirdweb-dev/react";

function Header() {
    return (
        <div className="bg-slate-900 text-white">
            <Container>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-row items-center">
                        <img src={logo} alt="Kammoros logo" className="w-16"/>
                        <span className="hidden sm:block text-sm md:text-xl font-semibold">KÁMMOROS STAKING v1.01</span>
                    </div>
                    <div>
                        <ConnectWallet />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Header