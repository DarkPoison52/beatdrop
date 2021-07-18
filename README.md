This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, Install the dependencies:

```bash
npm i
# or
yarn add
```

## Initialise the local Ethereum Node:
```bash
npx hardhat node
```

## Deploy the SmartContract:
```bash
Local Node
npx hardhat run scripts/deploy.js --network
# or
Polygon Mainet
npx hardhat run scripts/deploy.js --network mainet 
#or
Polygon Mumbai Network
npx hardhat run scripts/deploy.js --network polyMumbai
```

## Initialise the dev server:
```bash
yarn dev
```

Beatdrop is a music-streaming platform where individual music producers can sell their tracks and beats to interested listeners.
 
It has 4 sections:

Marketplace:
- Displays the NFTs for sale
- Uses Smart Contracts to Fetch available NFTs

Product Page (once you click on a product):
- Shows the product info. (Title, Description)
- Shows the track cover image
- Gives a 5 second sample of the track for users to listen to

Sell Page:
- Section where sellers can enter details about their product, including an audio file and cover image
- Uses Smart Contracts to mint the NFT and upload it to the Market

Purchased Page: 
- Displays the purchased NFTs
- Uses Smart Contracts to query valid NFTs

Dashboard Page:
- Displays the Items listed by a user for sale
- Shows the items that have already been purchased
- Uses Smart Contracts to Fetch valid NFTs
