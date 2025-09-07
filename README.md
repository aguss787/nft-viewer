# [NFT Viewer](https://nft.agus.dev)

## Why?

- Someone need a quick way to view NFTs on a random blockchain testnet
- Somehow I can't find any existing on the search engines
- So I made one
- Probably should asked LLMs to find one instead of code a new one
  - But but but, it's not fun

## Compatibility

The UI is compatible with any contract that implements the ERC721 standard, with [standart metadata](https://docs.opensea.io/docs/metadata-standards).

## Deployment

The entire code is client-side. The code can be deployed to any static hosting service.
To build the code, run

```bash
deno run build
```
