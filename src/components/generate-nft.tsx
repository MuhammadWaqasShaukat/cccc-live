import { useGenerateNft } from "../hooks/useGenerateNft";

export default function NFTGenerator() {
  const { image, metadata, generateNFT } = useGenerateNft();

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => generateNFT()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate Archer NFT
      </button>

      {image && (
        <>
          <img
            src={image}
            alt="Generated NFT"
            className=" aspect-[1000/1400] max-h-72 border rounded"
          />
          <pre className="text-sm bg-gray-100 p-2 rounded w-full overflow-x-auto">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
