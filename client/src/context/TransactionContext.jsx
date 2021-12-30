import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: 0,
        keyword: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem('transactionCount') || 0
    );

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert('Please install Metamask');
            }

            const accounts = await ethereum.request({
                method: 'eth_accounts',
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                // getAllTransactions();
            } else {
                console.log("You don't have any accounts");
            }
        } catch (error) {
            console.error(error);
            throw new Error('No ethereum object found');
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert('Please install Metamask');
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum provider found');
        }
    };

    const sendTransaction = async ({ addressTo, amount, keyword, message }) => {
        try {
            if (!ethereum) return alert('Please install Metamask');

            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        value: parsedAmount._hex,
                        gas: '0x5208',
                    },
                ],
            });

            const tx = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                keyword,
                message
            );

            setIsLoading(true);
            console.log(`Loading - ${tx.hash}`);

            await tx.wait();

            setIsLoading(false);
            console.log(`Success - ${tx.hash}`);

            const transactionCount =
                await transactionContract.getTransactionCount(currentAccount);
            setTransactionCount(transactionCount.toNumber());

            localStorage.setItem(
                'transactionCount',
                transactionCount.toNumber()
            );
        } catch (error) {
            console.log(error);
            throw new Error('No ethereum provider found');
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [currentAccount]);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                handleChange,
                formData,
                setFormData,
                sendTransaction,
                transactionCount,
                isLoading,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
