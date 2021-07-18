import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

// Implementing Portis Wallet
import Portis from "@portis/web3";
import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const portis = new Portis("766cf47c-9ba2-4638-8853-8998d2692750","mainnet");
    const provider = new ethers.providers.Web3Provider(portis.web3Provider);

//     const web3Modal = new Web3Modal({
//       network: "mainnet",
//       cacheProvider: true,
//     });
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          title: meta.data.title,
          description: meta.data.description,
          audio: meta.data.audio,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <h2 className="text-2xl py-2">Your Purchases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i}>
              <img
                src={nft.image}
                className="rounded-t-xl"
                style={{ height: 250, width: "100%" }}
                title={nft.title}
              />
              <div className="bg-gray-200 p-4 rounded-b-xl ">
                <h1 className="text-xl">{nft.title}</h1>
                <p className="text-gray-400">{nft.description}</p>
                <p className="text-blue-600 mt-6 text-lg">
                  Price: {nft.price} ETH
                </p>
                <div className="mt-8">
                  <audio controls style={{ width: "100%" }}>
                    <source src={nft.audio} />
                  </audio>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
