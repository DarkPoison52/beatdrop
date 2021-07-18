import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";

// Implementing Portis Wallet
import Portis from "@portis/web3";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

export default function CreateItem() {
  const [imgUrl, setImgUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const [imageUpload, setImageUpload] = useState(-1);
  const [audioUpload, setAudioUpload] = useState(-1);

  const [formInput, updateFormInput] = useState({
    price: "",
    title: "",
    description: "",
  });
  const router = useRouter();

  async function onChange(e) {
    const name = e.target.name;

    const file = e.target.files[0];
    const fileSize = file.size;
    try {
      const added = await client.add(file, {
        progress: (uploadedBytes) => {
          var uploadPercent = (uploadedBytes / fileSize) * 100;
          if (name === "titleImage") setImageUpload(uploadPercent);
          else if (name === "audioTrack") setAudioUpload(uploadPercent);
        },
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      if (name === "titleImage") {
        setImgUrl(url);
        console.log("Image uploaded");
      } else if (name === "audioTrack") {
        setAudioUrl(url);
        console.log("Audio uploaded");
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    const { title, description, price } = formInput;

    if (!title || !description || !price || !imgUrl || !audioUrl) return;

    /* first, upload to IPFS */
    const data = JSON.stringify({
      title,
      description,
      image: imgUrl,
      audio: audioUrl,
    });

    console.log(data);
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    // const portis = new Portis(
    //   "766cf47c-9ba2-4638-8853-8998d2692750",
    //   "mainnet"
    // );

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // const provider = new ethers.providers.Web3Provider(portis.web3Provider);

    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];

    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });

    await transaction.wait();

    router.push("/");
  }

  return (
    <div>
      {audioUpload == 100 ? (
        <div
          className="alert alert-success d-flex align-items-center alert-dismissible fade show"
          role="alert"
        >
          <strong className="mr-2">Success!</strong> Audio Track loaded
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : null}

      <div className="flex justify-evenly">
        <div className="w-1/2 flex flex-col pb-12 mt-12">
          {/* Title Input */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              onChange={(e) =>
                updateFormInput({ ...formInput, title: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              rows="4"
              style={{ resize: "none" }}
              className="form-control"
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
            ></textarea>
          </div>
          <label className="form-label">Price</label>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">
              ETH
            </span>
            <input
              type="number"
              className="form-control"
              aria-describedby="basic-addon3"
              onChange={(e) =>
                updateFormInput({ ...formInput, price: e.target.value })
              }
            />
          </div>
          <div className="mt-8">
            <label className="form-label">Audio Track</label>

            {audioUpload > 0 ? (
              <div className="progress mb-8">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${audioUpload}%` }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            ) : null}

            <input
              className="form-control"
              type="file"
              name="audioTrack"
              onChange={onChange}
            />
          </div>
          <button
            onClick={createMarket}
            style={{ height: 60, textAlign: "center", lineHeight: 0 }}
            className="font-bold mt-4 bg-blue-600 text-white rounded-2xl p-4 shadow-lg"
          >
            Create Digital Asset
          </button>
        </div>
        <div className=" flex flex-col pb-12 mt-12">
          <div className="mb-3">
            <label className="form-label">Upload Cover </label>
            {imgUrl ? (
              <img
                className="rounded mt-4 rounded-xl"
                style={{ height: 220 }}
                src={imgUrl}
              />
            ) : (
              <div
                className="bg-gray-200 rounded-xl"
                style={{ width: "100%", height: 220 }}
              ></div>
            )}
            <div className="mt-8">
              {imageUpload > 0 ? (
                <div className="progress mb-8">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${imageUpload}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              ) : null}

              <input
                className="form-control"
                type="file"
                name="titleImage"
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
