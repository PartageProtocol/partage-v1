import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { StacksMocknet, StacksTestnet, StacksMainnet } from '@stacks/network';
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from '@stacks/connect';
import {
  uintCV,
  stringUtf8CV,
  hexToCV,
  cvToHex,
  callReadOnlyFunction,
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  NonFungibleConditionCode,
  FungibleConditionCode,
  createAssetInfo,
  makeStandardNonFungiblePostCondition,
  makeStandardSTXPostCondition,
  bufferCVFromString,
  standardPrincipalCV,
} from '@stacks/transactions';

const Home: NextPage = () => {
  const appConfig = new AppConfig(['publish_data']);
  const userSession = new UserSession({ appConfig });
  const [uri, setUri] = useState("None");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  // Set up the network and API
  const network = new StacksTestnet();
  // for mainnet, use `StacksMainnet()`
  // for devnet, use `StacksMocknet()`

  const handleUriChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUri(e.target.value);
  };

    // function to connect wallet (web3 login ^^)
    function authenticate() {
      showConnect({
        appDetails: {
          name: 'partage-v1',
          icon: 'https://hellopartage.xyz/favicon.ico',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload()
        },
        userSession,
      });
    }
  
    useEffect(() => {
      if (userSession.isSignInPending()) {
        userSession.handlePendingSignIn().then((userData) => {
          setUserData(userData)
        })
      } else if (userSession.isUserSignedIn()) {
        setLoggedIn(true)
        setUserData(userSession.loadUserData())
      }
    }, []);

  // call the mint function from frontend
  const mint = async () => {
    // the address of the smart contract deployer
    const assetAddress = 'ST2NC54N30J95AHB55W6VY3MF9X4G07F4XCPVYKGD'
    // Add post conditions here
    const postConditionAddress =
      userSession.loadUserData().profile.stxAddress.testnet;
    const nftPostConditionCode = NonFungibleConditionCode.Sends;
    const assetContractName = 'partage-v1'
    const assetName = 'NFT'
    const tokenAssetName = bufferCVFromString('NFT')
    const nonFungibleAssetInfo = createAssetInfo(
      assetAddress,
      assetContractName,
      assetName
    )
    const stxConditionCode = FungibleConditionCode.LessEqual;
    const stxConditionAmount = 1000000; // price 1 STX in microstacks
    const postConditions = [
      makeStandardNonFungiblePostCondition(
      postConditionAddress,
      nftPostConditionCode,
      nonFungibleAssetInfo,
      tokenAssetName
      ),
      makeStandardSTXPostCondition(
      postConditionAddress,
      stxConditionCode,
      stxConditionAmount
      ),
    ];

    const functionArgs = [ stringUtf8CV(uri), standardPrincipalCV(userSession.loadUserData().profile.stxAddress.testnet)];

    const options = {
      contractAddress: assetAddress,
      contractName: 'partage-v1',
      functionName: 'mint-nft',
      functionArgs,
      network,
      //pass the created post conditions
      postConditions,
      appDetails: {
        name: 'partage-v1',
        icon: 'https://hellopartage.xyz/favicon.ico',
      },
      onFinish: (data: any) => {
        console.log(data)
      },
    };

    //const transaction = await makeContractCall(options);
    //const broadcastResponse = await broadcastTransaction(transaction, network);
    //const txId = broadcastResponse.txid;

    await openContractCall(options);
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Partage - Shared NFT Utilities</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Timeshared utility NFTs</h1>
        
        <p className="mt-4 w-full text-xl md:w-1/2">
          The smart contract Partage v1 contains public functions to mint, burn, transfer, fractionalize NFTs, list and unlist fractions for sale, buy, transfer and burn fractions.
        </p>
        <p className="mt-4 w-full text-xl md:w-1/2">
          At the fractionalization the original NFT is locked in an escrow account, 
          from which it can be redeemed only by someone owning 100% of the fractions and burning them. 
        </p>
        <p className="mt-4 w-full text-xl md:w-1/2">
          All purchases spread payment between three beneficiaries: 
          the utility provider (85%), the listing maker (10%), and the platform fees (5%).
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          {loggedIn ? (
            <>
              <button
                onClick={() => mint()}
                className="rounded bg-indigo-500 p-4 text-2xl text-white hover:bg-indigo-700"
              >
                Mint
              </button>
            </>
          ) : (
            <button
              className="bg-white-500 mb-6 rounded border-2 border-black py-2 px-4 font-bold hover:bg-gray-300"
              onClick={() => authenticate()}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home