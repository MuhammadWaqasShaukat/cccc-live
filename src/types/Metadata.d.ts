import { PublicKey } from "@solana/web3.js";

// Utility Types
type Option<T> = T | null;
type BigNumber = number | string; // adjust if you're using a specific BN lib
type Pda = PublicKey; // PDA is usually a PublicKey too

// Supporting Types
type Creator = {
  address: PublicKey;
  verified: boolean;
  share: number;
};

type TokenStandard =
  | "NonFungible"
  | "FungibleAsset"
  | "FungibleToken"
  | "NonFungibleEdition";

type UseMethod = "Burn" | "Multiple" | "Single";

type ProgrammableConfig = {
  ruleSet: PublicKey;
};

type ReadApiCompressionMetadata = {
  compressed: boolean;
  eligible: boolean;
  dataHash: string;
  creatorHash: string;
  assetHash: string;
  leafId: number;
  tree: PublicKey;
};

// Metadata Type
export type Metadata<Json extends object = Record<string, any>> = {
  readonly model: "metadata";
  readonly address: Pda;
  readonly mintAddress: PublicKey;
  readonly updateAuthorityAddress: PublicKey;

  readonly json: Option<Json>;
  readonly jsonLoaded: boolean;

  readonly name: string;
  readonly symbol: string;
  readonly uri: string;

  readonly isMutable: boolean;
  readonly primarySaleHappened: boolean;
  readonly sellerFeeBasisPoints: number;
  readonly editionNonce: Option<number>;

  readonly creators: Creator[];
  readonly tokenStandard: Option<TokenStandard>;

  readonly collection: Option<{
    address: PublicKey;
    verified: boolean;
  }>;

  readonly collectionDetails: Option<{
    version: "V1";
    size: BigNumber;
  }>;

  readonly uses: Option<{
    useMethod: UseMethod;
    remaining: BigNumber;
    total: BigNumber;
  }>;

  readonly programmableConfig: Option<ProgrammableConfig>;
  readonly compression?: ReadApiCompressionMetadata;
};
