import { AiFillPayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { Loader } from '.';

const commonStyles =
    'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Welcome = () => {
    const connectWallet = () => {
        console.log('Not Implemented Yet!!!');
    };

    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex md:flex-row items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 justify-start flex-col md:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                        Send Crypto <br /> across the world
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        Explore the crypto world. Buy and sell crypto easily
                        with us.
                    </p>
                    <button
                        className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] transition-all text-white text-base font-semibold'
                        type='button'
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </button>

                    <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-2'>
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>

                        <div className={commonStyles}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={commonStyles}>Low Fees</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
                    <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism'></div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
