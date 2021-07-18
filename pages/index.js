require("dotenv").config();
import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/MARKET.sol/NFTMarket.json";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://preview.uideck.com/items/cryptoland/assets/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://preview.uideck.com/items/cryptoland/assets/css/LineIcons.3.0.css"
      />
      <link
        rel="stylesheet"
        href="https://preview.uideck.com/items/cryptoland/assets/css/animate.css"
      />
      <link
        rel="stylesheet"
        href="https://preview.uideck.com/items/cryptoland/assets/css/tiny-slider.css"
      />
      <link
        rel="stylesheet"
        href="https://preview.uideck.com/items/cryptoland/assets/css/glightbox.min.css"
      />
      <link
        rel="stylesheet"
        href="https://preview.uideck.com/items/cryptoland/assets/css/main.css"
      />
      <section class="hero-area" style={{ paddingTop: 60 }}>
        <img
          class="hero-shape"
          src="https://preview.uideck.com/items/cryptoland/assets/images/hero/hero-shape.svg"
          alt="#"
        />
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 col-md-12 col-12">
              <div class="hero-content">
                <h4 class="wow fadeInUp" data-wow-delay=".2s">
                  The next revolution of the music industry.
                </h4>
                <h1 class="wow fadeInUp" data-wow-delay=".4s">
                  Opportunity, Change, and <br />
                  <span>
                    <img
                      class="text-shape"
                      src="https://preview.uideck.com/items/cryptoland/assets/images/hero/text-shape.svg"
                      alt="#"
                    />
                    Passion.
                  </span>
                </h1>
                <p class="wow fadeInUp" data-wow-delay=".6s">
                  Beatdrop was created for this - for you to explore your
                  interests, and showcase it to the audience who want to see YOU
                  be YOU.
                </p>
                <div class="button wow fadeInUp" data-wow-delay=".8s">
                  <Link href="/marketplace">
                    <a className="btn bg-purple-600">Get Started</a>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-lg-7 col-12">
              <div class="hero-image">
                <img
                  class="main-image"
                  src="https://preview.uideck.com/items/cryptoland/assets/images/hero/home2-bg.png"
                  alt="#"
                />
                <img
                  class="h2-move-1"
                  src="https://preview.uideck.com/items/cryptoland/assets/images/hero/h2-bit-l.png"
                  alt="#"
                />
                <img
                  class="h2-move-2"
                  src="https://preview.uideck.com/items/cryptoland/assets/images/hero/h2-bit-m.png"
                  alt="#"
                />
                <img
                  class="h2-move-3"
                  src="https://preview.uideck.com/items/cryptoland/assets/images/hero/h2-bit-s.png"
                  alt="#"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="feature section">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="section-title">
                <h3 class="wow zoomIn" data-wow-delay=".2s">
                  Why choose us
                </h3>
                <h2 class="wow fadeInUp" data-wow-delay=".4s">
                  Our features
                </h2>
                <p class="wow fadeInUp" data-wow-delay=".6s">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div
              class="col-lg-4 col-md-6 col-12 wow fadeInUp"
              data-wow-delay=".2s"
            >
              <div class="feature-box">
                <div class="tumb">
                  <img
                    src="https://preview.uideck.com/items/cryptoland/assets/images/features/feature-icon-1.png"
                    alt=""
                  />
                </div>
                <h4 class="text-title">Share your work easily</h4>
                <p>
                  Beatdrop makes it super easy for creators to make and sell
                  NFTs.
                </p>
              </div>
            </div>
            <div
              class="col-lg-4 col-md-6 col-12 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <div class="feature-box">
                <div class="tumb">
                  <img
                    src="https://preview.uideck.com/items/cryptoland/assets/images/features/feature-icon-2.png"
                    alt=""
                  />
                </div>
                <h4 class="text-title">Safe & Secure</h4>
                <p>
                  Sell and Buy NFTs without having to worry about security
                  risks.
                </p>
              </div>
            </div>
            <div
              class="col-lg-4 col-md-6 col-12 wow fadeInUp"
              data-wow-delay=".6s"
            >
              <div class="feature-box">
                <div class="tumb">
                  <img
                    src="https://preview.uideck.com/items/cryptoland/assets/images/features/feature-icon-3.png"
                    alt=""
                  />
                </div>
                <h4 class="text-title">Make Money Fast</h4>
                <p>Recieve your entire payment on time for your NFT.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="start-process section">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="section-title">
                <h3 class="wow zoomIn" data-wow-delay=".2s">
                  Ready to get started?
                </h3>
                <h2 class="wow fadeInUp" data-wow-delay=".4s">
                  3 Steps To Start
                </h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-4 col-12">
              <div class="single-process">
                <span class="serial">01</span>
                <h3>Connect Your Wallet</h3>
                <p>Connect your MetaMask or Portis wallet to get started.</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-12">
              <div class="single-process">
                <span class="serial">02</span>
                <h3>Find Your NFT</h3>
                <p>Find the beats that you love from our massive database.</p>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-12">
              <div class="single-process">
                <span class="serial">03</span>
                <h3>Buy your Beats</h3>
                <p>Buy your beasts easily using your crypto wallet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ height: 100 }}></div>
    </>
  );
}
