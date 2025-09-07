import { ethers } from "ethers";

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface NftData {
  id: string;
  owner: string;
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: Attribute[];
}

interface Metadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: Attribute[];
}

const ERC721_ABI = [
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function ownerOf(uint256 tokenId) external view returns (address)",
];

export async function fetchNftData(
  rpcUrl: string,
  contractAddress: string,
  tokenId: string,
): Promise<NftData> {
  // IMPORTANT: This is a hack to make the provider not retrying on bad RPC URLs
  const provider = new ethers.JsonRpcProvider(rpcUrl, 1, {
    staticNetwork: true,
  });
  const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);

  // Get token URI and owner
  const [metadataUri, owner] = await Promise.all([
    contract.tokenURI(tokenId),
    contract.ownerOf(tokenId),
  ]);

  const metadataUrl = ipfsUrlToHttpUrl(metadataUri);
  const { name, description, image, attributes }: Metadata = await (
    await fetch(metadataUrl)
  ).json();

  return {
    id: tokenId,
    owner: owner,
    name,
    description,
    image: ipfsUrlToHttpUrl(image),
    attributes,
  };
}

function ipfsUrlToHttpUrl(url: string): string {
  if (url.startsWith("ipfs://")) {
    return `https://ipfs.io/ipfs/${url.substring(7)}`;
  }
  return url;
}
