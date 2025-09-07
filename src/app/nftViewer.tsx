import { NftData } from "./nft";
import Image from "./image";

export default function NftViewer({ nftData }: { nftData: NftData }) {
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
        <p className="text-gray-400 text-sm">Token ID: {id}</p>
        <p className="text-gray-400 text-sm">Owner: {owner}</p>
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
