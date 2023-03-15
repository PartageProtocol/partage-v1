# Partage-v1
Partage-v1 is a smart contract written in Clarity at the backend, and a frontend to interact with the smart contract, written using Next and Tailwind.

Partage-v1 smart contract contains functions to mint, burn, transfer, fractionalize NFTs, list/unlist fractions for sale, buy, transfer and burn fractions. At the fractionalization the original NFT is locked in the contract. The fractions of NFT are Semi-Fungible Tokens (SFT = FT linked to an NFT ID). The original NFT can't be redeemed from escrow account of the contract, unless by someone owning 100% of the fractions and burning them. 
