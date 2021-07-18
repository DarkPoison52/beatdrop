import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { nftaddress, nftmarketaddress } from "../../config";

import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/MARKET.sol/NFTMarket.json";

import Link from "next/link";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

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
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
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
                <Link href={`/marketplace/${i}`} key={i}>
                  <a
                    style={{
                      padding: 10,
                      width: "100%",
                      display: "inline-block",
                    }}
                    className="inline-block bg-blue-600 text-center mt-8 text-white rounded-xl"
                  >
                    View Item
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
