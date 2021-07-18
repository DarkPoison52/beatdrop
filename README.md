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
