import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import { nftaddress, nftmarketaddress } from "../../config";

import AudioMaker from "audiomaker";
import Portis from "@portis/web3";

import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/MARKET.sol/NFTMarket.json";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  const id = router.query.id;

  const [nft, setNft] = useState(null);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [audioTrack, setAudioTrack] = useState("");
  useEffect(() => {
    loadNFT().then((item) => {
      if (item) trimAudio(item.audio);
    });
  }, []);

  async function loadNFT() {
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
          audio: meta.data.audio,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNft(items[id]);
    setLoadingState("loaded");

    return items[id];
  }

  async function buyNft(nft) {
    // const portis = new Portis("766cf47c-9ba2-4638-8853-8998d2692750","mainnet");
    // const provider = new ethers.providers.Web3Provider(portis.web3Provider);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();

    router.push("/purchased");
  }

  async function trimAudio(url) {
    var data = await fetch(url);
    var blob = await data.blob();

    const audioMaker = new AudioMaker();
    const audio_blob = await audioMaker.trim(blob, 0, 5);

    setAudioTrack(URL.createObjectURL(audio_blob));
  }

  if (loadingState === "loaded" && nft) {
    return (
      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: "1600px" }}>
          <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 pt-4">
            <img
              style={{ height: 300 }}
              src={nft.image}
              title={nft.title}
              className="lg:rounded-xl sm:rounded-xl"
            />
            <div
              style={{ height: 300 }}
              className=" p-4 lg:rounded-r-xl sm:rounded-b-xl"
            >
              <h1 className="sm:text-4xl lg:text-5xl lg:mt-3">{nft.title}</h1>
              <p className="text-gray-700 mt-8 sm:text-xl lg:text-1xl">
                {nft.description}
              </p>
              <div className="mt-12">
                {audioTrack ? (
                  <div>
                    <audio controls style={{ width: "100%" }}>
                      <source src={audioTrack} />
                    </audio>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center text-blue-600">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-blue-600 mt-6 text-2xl">Price: {nft.price}</p>
              <button
                style={{
                  padding: 10,
                  width: "100%",
                  display: "inline-block",
                }}
                className="inline-block bg-blue-600 text-center mt-8 text-white rounded-xl"
                onClick={() => buyNft(nft)}
              >
                Buy Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
}
