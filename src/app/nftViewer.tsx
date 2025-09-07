import { NftData } from "./nft";
import Image from "./image";
import { FaCopy } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import { useState } from "react";

export default function NftViewer({ nftData }: { nftData: NftData }) {
  const [glow, setGlow] = useState(false);

  const { id, owner, name, description, image: imageUrl, attributes } = nftData;

  const image = (
    <div className="flex-1 flex flex-row justify-center">
      <Image src={imageUrl} alt={name} className="rounded-lg" />
    </div>
  );

  const details = (
    <div className="flex-1 flex flex-col text-left gap-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-primary">{name}</h2>
        <p className="text-gray-400 text-sm">{description}</p>
        <DetailRow>
          <span>Token ID:</span>
          <span>{id}</span>
        </DetailRow>
        <DetailRow>
          <span>Owner:</span>
          <span className="hidden sm:inline">{owner}</span>
          <span className="inline sm:hidden">{shortenAddress(owner)}</span>
          <span>
            <FaCopy
              className={`cursor-pointer mt-0.5 transition duration-300 
                  ${glow ? "text-yellow-400" : ""}`}
              onClick={() => {
                copy(owner);
                setGlow(true);
                setTimeout(() => setGlow(false), 300);
              }}
            />
          </span>
        </DetailRow>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Attributes</h3>
        <div className="grid grid-cols-2 gap-4">
          {attributes.map((attribute) => (
            <div key={attribute.trait_type}>
              <div className="bg-gray-600 p-2 rounded">
                <div className="text-gray-400 text-xs">
                  {attribute.trait_type}
                </div>
                <div className="text-white text-sm">{attribute.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="hidden md:flex flex-row gap-4">
        {image}
        {details}
      </div>
      <div className="flex md:hidden flex-col gap-4">
        {image}
        {details}
      </div>
    </div>
  );
}

function shortenAddress(owner: string): string {
  return `${owner.slice(0, 6)}...${owner.slice(-4)}`;
}

function DetailRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row text-gray-400 text-sm gap-2">{children}</div>
  );
}
