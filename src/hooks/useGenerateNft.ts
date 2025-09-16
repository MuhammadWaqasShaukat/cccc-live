import { useState, useCallback } from "react";
import { NFT_SOURCE_MAP, Trait } from "../constants/nfts";
import mergeImages from "merge-images";

const apiUrl = import.meta.env.VITE_API_URL;

type CharacterKey = keyof typeof NFT_SOURCE_MAP;

const usedCombinations = new Set<string>();

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildSignature(
  character: CharacterKey,
  traits: Record<string, Trait>
) {
  return `${character}|${Object.entries(traits)
    .map(([k, v]) => `${k}:${v.title}`)
    .join("|")}`;
}

function base64ToBlob(base64: string, type = "image/png") {
  const byteChars = atob(base64.split(",")[1]);
  const byteNumbers = Array.from(byteChars).map((c) => c.charCodeAt(0));
  return new Blob([new Uint8Array(byteNumbers)], { type });
}

export function useGenerateNft() {
  const [image, setImage] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any | null>(null);

  async function uploadNFt(base64Image: string, metadata: any) {
    const blob = base64ToBlob(base64Image);
    const formData = new FormData();
    formData.append("nft", blob, "image.png");
    formData.append("metadata", JSON.stringify(metadata));

    await fetch(`${apiUrl}/upload-nft`, {
      method: "POST",
      body: formData,
    });
  }

  const characterKeys: CharacterKey[] = Object.keys(
    NFT_SOURCE_MAP
  ) as CharacterKey[];

  function getRandomCharacter(): CharacterKey {
    const randomIndex = Math.floor(Math.random() * characterKeys.length);
    return characterKeys[randomIndex];
  }

  const generateNFT = useCallback(async (maxRetries = 50) => {
    let retries = 0;
    const selectedCharacter = getRandomCharacter();
    while (retries < maxRetries) {
      const { rootDir, dir, layerOrder } = NFT_SOURCE_MAP[selectedCharacter];
      const traits: Record<string, Trait> = {};
      const layers: string[] = [];

      for (const part of layerOrder) {
        const files = dir[part];
        const file = pickRandom(files);
        const path = `${rootDir}/${part}/${file.filename}`;
        traits[part] = file;
        layers.push(path);
      }

      const signature = buildSignature(selectedCharacter, traits);

      if (!usedCombinations.has(signature)) {
        usedCombinations.add(signature);

        const merged = await mergeImages(layers);

        const nftMetadata = {
          name: `${selectedCharacter.toUpperCase()} #${usedCombinations.size}`,
          description: `A unique ${selectedCharacter} NFT generated randomly.`,
          attributes: Object.entries(traits).map(([trait_type, { title }]) => ({
            trait_type,
            value: title,
          })),
          seller_fee_basis_points: 500,
        };

        setImage(merged);
        setMetadata(nftMetadata);

        await uploadNFt(merged, nftMetadata);

        return { image: merged, metadata: nftMetadata };
      }

      retries++;
    }

    throw new Error(`No unique combination found after ${maxRetries} retries`);
  }, []);

  return { image, metadata, generateNFT };
}

// {
//   "attributes": [
//     {
//       "trait_type": "Background",
//       "value": "Green"
//     },
//     {
//       "trait_type": "Outfit",
//       "value": "Jacket Denim"
//     },
//     {
//       "trait_type": "Skin",
//       "value": "Natural"
//     },
//     {
//       "trait_type": "Eyes",
//       "value": "Vixen"
//     },
//     {
//       "trait_type": "Mouth",
//       "value": "Fangs"
//     },
//     {
//       "trait_type": "Head",
//       "value": "Cap Star"
//     },
//     {
//       "trait_type": "Summoned",
//       "value": "True"
//     }
//   ],
//   "collection": {
//     "family": "Famous Fox Federation",
//     "name": "Famous Fox Federation"
//   },
//   "description": "The Famous Fox Federation, an independent organization of the most fabulously famous foxes on the Blockchain.",
//   "external_url": "https://famousfoxes.com",
//   "name": "Fox #9989",
//   "properties": {
//     "creators": [
//       {
//         "address": "3pMvTLUA9NzZQd4gi725p89mvND1wRNQM3C8XEv1hTdA",
//         "share": 100
//       }
//     ],
//     "files": [
//       {
//         "type": "image/png",
//         "url": "https://famousfoxes.com/hd/9989.png"
//       }
//     ]
//   },
//   "seller_fee_basis_points": 420,
//   "symbol": "FFF",
//   "image": "https://famousfoxes.com/hd/9989.png"
// }
