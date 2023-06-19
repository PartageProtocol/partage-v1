# partage-v1

Partage is an NFT marketplace for shared utilities.
We built our v1 on a first use case based in Austin, Texas. 
Tare is a premium sushi restaurant willing to become the first NFT restaurant in the state. 

We used AI to generate a collection of NFTs inspired by the famous Japanese painter Hokusai. 
Each NFT represents one month in the year and can be unlimitedly fractionalized to adapt to the supply demand by the restaurant owners. NFT owners will experience a personalized VIP dinner with the Chef cooking special products directly imported from Japan based on the customer's tastes.

- smart contract is deployed on mainnet https://explorer.hiro.so/txid/0x34222f40dd5def2f42f033288f800310dd10b7a74b6ebc5fe91477533171f710?chain=mainnet

The partage-v1 smart contract feature functions to mint, burn, transfer, and fractionalize NFTs, list/unlist fractions for sale, buy, transfer and burn fractions. At the fractionalization the original NFT is locked in the contract. The original NFT can't be redeemed from escrow account of the contract, unless by someone owning 100% of the fractions and burning them. The fractions of NFT are Semi-Fungible Tokens (SFT = FT linked to an NFT ID). All purchases automatically spread payments between three beneficiaries: the utility provider (85%), the NFT owner (10%), and the platform (5%).

- the marketplace is deployed on netlify https://hellopartage.xyz

- tutorials are available here https://medium.com/partage-btc/partage-tutorials-8e1f6868716d
