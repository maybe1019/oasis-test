import './home.scss'

import { shortenAddress, useEthers } from "@usedapp/core";
import React from "react";
import { useState } from "react";
import Web3 from "web3";

import abi from '../config/oasisAbi.json'
import config from '../config/config.json'

export default function Home() {
  const { account, activateBrowserWallet, deactivate, library } = useEthers();

  const [nftContractAddress, setNftContractAddress] = useState("");
  const [tokenId, setTokenId] = useState('')

  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenId1, setTokenId1] = useState('')

  const handleConnect = () => {
    if (account) {
      deactivate();
    } else {
      activateBrowserWallet();
    }
  };

  const handleMakeOrder = async () => {
    const web3 = new Web3(library.provider)
    const contract = new web3.eth.Contract(abi, config.oasisAddress)
    await contract.methods.fixedPrice(nftContractAddress, tokenId, '1000000', '10000000000').send({from: account})
  }

  const getOrdersByToken = async () => {
    const web3 = new Web3(library.provider)
    const contract = new web3.eth.Contract(abi, config.oasisAddress)
    let res = await contract.methods.getOrdersByToken(tokenAddress, tokenId1).call()
    console.log(res)
  }

  const getOrdersByContractAddress = async () => {
    const web3 = new Web3(library.provider)
    const contract = new web3.eth.Contract(abi, config.oasisAddress)
    let res = await contract.methods.getOrdersByContractAddress(tokenAddress).call()
    console.log(res)
  }

  return (
    <div className="home">
      <div>
        <button className="connect" onClick={handleConnect}>
          {account ? shortenAddress(account) : "Connect"}
        </button>
      </div>
      <div>
        <div>
          <span>Contract Address</span>
          <input
            type="text"
            value={nftContractAddress}
            onChange={(e) => setNftContractAddress(e.target.value)}
          />
        </div>
        <div>
          <span>Token Id</span>
          <input
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </div>

        <button onClick={handleMakeOrder}>Make Order</button>
      </div>
      <div className="line"></div>

      <div>
        <div>
          <span>Contract Address</span>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </div>
        <div>
          <span>Token Id</span>
          <input
            type="text"
            value={tokenId1}
            onChange={(e) => setTokenId1(e.target.value)}
          />
        </div>
        <button onClick={getOrdersByToken}>getOrdersByToken</button>
        <button onClick={getOrdersByContractAddress}>getOrdersByContractAddress</button>
      </div>
    </div>
  );
}
