import { WebBundlr } from '@bundlr-network/client';
import BigNumber from 'bignumber.js';
import { providers, utils } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react'

export interface IBundlrHook {
    initialiseBundlr: () => Promise<void>;
    fundWallet: (_: number) => void;
    balance: string;
}


const BundlrContext = createContext<IBundlrHook>({
    initialiseBundlr: async () => { },
    fundWallet: (_: number) => { },
    balance: ''
});

const BundlrContextProvider = ({ children }: any): JSX.Element => {
    const [bundlrInstance, setBundlrInstance] = useState<WebBundlr>();
    const [balance, setBalance] = useState<string>('');

    useEffect(() => {
        if (bundlrInstance) {
            fetchBalance();
        }
    }, [bundlrInstance])

    const initialiseBundlr = async () => {
        const provider = new providers.Web3Provider(window.ethereum as any);
        await provider._ready();
        const bundlr = new WebBundlr(
            "https://devnet.bundlr.network",
            "matic",
            provider,
            {
                providerUrl:
                    "https://polygon-mumbai.g.alchemy.com/v2/jkUDVA_a1JATM92ymcbxC4mjOW5BhKod",
            }
        );
        await bundlr.ready();
        setBundlrInstance(bundlr);

    }


    async function fundWallet(amount: number) {
        if (bundlrInstance) {
            if (!amount) return
            const amountParsed = parseInput(amount)
            if (amountParsed) {
                let response = await bundlrInstance.fund(amountParsed)
                console.log('Wallet funded: ', response)
            }
            fetchBalance()
        }
    }

    function parseInput(input: number) {
        const conv = new BigNumber(input).multipliedBy(bundlrInstance!.currencyConfig.base[1])
        if (conv.isLessThan(1)) {
            console.log('error: value too small')
            return
        } else {
            return conv
        }
    }


    async function fetchBalance() {
        if (bundlrInstance) {
            const bal = await bundlrInstance.getLoadedBalance();
            console.log("bal: ", utils.formatEther(bal.toString()));
            setBalance(utils.formatEther(bal.toString()));
        }
    }

    return (
        <BundlrContext.Provider value={{ initialiseBundlr, fundWallet, balance }}>
            {children}
        </BundlrContext.Provider>
    )
}

export default BundlrContextProvider;


export const useBundler = () => {
    return useContext(BundlrContext);
}