import { useEffect, useState } from "react";
import { fetchNftData, NftData } from "./nft";
import { Spinner } from "./spiner";

export default function NftForm({
  onLoad,
}: {
  onLoad?: (nftData: NftData) => void;
}): React.ReactNode {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [evmRpc, setEvmRpc] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");

  useEffect(() => {
    const evmRpc = localStorage.getItem("evmRpc");
    if (evmRpc) {
      setEvmRpc(evmRpc);
    }

    const contractAddress = localStorage.getItem("contractAddress");
    if (contractAddress) {
      setContractAddress(contractAddress);
    }

    const tokenId = localStorage.getItem("tokenId");
    if (tokenId) {
      setTokenId(tokenId);
    }
  }, []);

  useEffect(() => {
    if (evmRpc) {
      localStorage.setItem("evmRpc", evmRpc);
    }
  }, [evmRpc]);

  useEffect(() => {
    if (contractAddress) {
      localStorage.setItem("contractAddress", contractAddress);
    }
  }, [contractAddress]);

  useEffect(() => {
    if (tokenId) {
      localStorage.setItem("tokenId", tokenId);
    }
  }, [tokenId]);

  const isValid = evmRpc && contractAddress && tokenId;

  const updateNftData = async () => {
    try {
      if (!evmRpc || !contractAddress || !tokenId) {
        return;
      }

      setError(null);
      onLoad?.(await fetchNftData(evmRpc, contractAddress, tokenId));
    } catch (e) {
      if (e instanceof Error) {
        console.error("failed to load nft data", e);
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await updateNftData();
      }}
    >
      <div className="mb-4 text-left flex flex-col gap-4">
        {field({
          id: "evm-rpc",
          label: "EVM RPC",
          placeholder: "https://rpc.hyperliquid-testnet.xyz/evm",
          value: evmRpc,
          onChange: setEvmRpc,
          selector: (
            <select
              id="evm-rpc"
              onChange={(e) => {
                setEvmRpc(
                  e.target.value === OTHER_RPC_KEY
                    ? "https://host/evm"
                    : e.target.value,
                );
              }}
              value={rpcSelectorValue(evmRpc)}
              defaultChecked={false}
              className="bg-gray-800"
            >
              {Object.entries(PREDEFINED_RPCS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
              <option key={OTHER_RPC_KEY} value={OTHER_RPC_KEY}>
                Other
              </option>
            </select>
          ),
        })}

        {field({
          id: "contract-address",
          label: "Contract Address",
          placeholder: "0x...",
          value: contractAddress,
          onChange: setContractAddress,
        })}

        {field({
          id: "token-id",
          label: "Token ID",
          placeholder: "1",
          value: tokenId,
          onChange: setTokenId,
        })}

        <button
          className="bg-blue-500 text-white rounded-sm px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center min-h-10"
          disabled={!isValid || isLoading}
          type="submit"
        >
          {isLoading
            ? Spinner({
                height: 20,
              })
            : "Load NFT"}
        </button>

        {error && (
          <div className="text-red-500 text-sm, break-words">{error}</div>
        )}
      </div>
    </form>
  );
}

function field({
  id,
  label,
  value,
  placeholder,
  onChange,
  selector,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  selector?: React.ReactNode;
}): React.ReactNode {
  const inputBox = (
    <input
      type="text"
      id={id}
      className="w-full bg-white text-black rounded-sm px-1 focus:border-indigo-500 focus:ring-indigo-500"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <div className="hidden sm:flex flex-row gap-2">
        {inputBox}
        {selector}
      </div>
      <div className="flex sm:hidden flex-col gap-2">
        {selector}
        {inputBox}
      </div>
    </div>
  );
}

function rpcSelectorValue(evmRpc: string | null): string {
  if (evmRpc === null || !PREDEFINED_RPCS[evmRpc]) {
    return OTHER_RPC_KEY;
  }

  return evmRpc;
}

const OTHER_RPC_KEY = "other";

const PREDEFINED_RPCS: Record<string, string> = {
  "https://rpc.hyperliquid.xyz/evm": "Hyper Liquid Mainnet",
  "https://rpc.hyperliquid-testnet.xyz/evm": "Hyper Liquid Testnet",
};
