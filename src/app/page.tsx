"use client";

import { useState } from "react";
import NftForm from "./nftForm";
import { NftData } from "./nft";
import NftViewer from "./nftViewer";

export default function Home() {
  const [nftData, setNftData] = useState<NftData | null>(null);

  return (
    <div className="bg-black text-white min-h-screen min-w-screen flex flex-col items-center">
      <div className="text-center max-w-4xl min-w-lg w-screen px-10 pb-80">
        <h1 className="text-4xl font-bold text-primary mb-4 py-16 flex-1">
          NFT Viewer
        </h1>
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-lg shadow-sm border px-6 pt-6 pb-2">
            <NftForm onLoad={setNftData} />
          </div>
          {nftData && <NftViewer nftData={nftData} />}
        </div>
      </div>
    </div>
  );
}
