import { config_chains as testnet } from "./testnet";
import { config_chains as mainnet } from "./mainnet";

const isProd = import.meta.env.VITE_APP_NETWORK === "production";

export const config_chains = isProd ? mainnet : testnet;
