import { useMutation } from "react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { TERMS_AND_CONDITIONS } from "../constants/message";
import { useContext } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { Buffer } from "buffer";

const apiUrl = import.meta.env.VITE_API_URL;

const useWhitelistVerification = () => {
  const { publicKey, signMessage } = useWallet();
  const { setCurrentModal } = useContext(CottonCandyContext);

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        if (!publicKey || !signMessage) {
          alert("Wallet not connected or signing not supported");
          return;
        }

        const encodedMessage = new TextEncoder().encode(TERMS_AND_CONDITIONS);

        setCurrentModal("whitelisting");

        const signature = await signMessage(encodedMessage);

        const signatureBase64 = Buffer.from(signature).toString("base64");
        const publicKeyBase58 = publicKey.toBase58();

        const res = await fetch(`${apiUrl}/whitelist/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicKey: publicKeyBase58,
            signature: signatureBase64,
          }),
        });

        if (!res.ok) throw new Error("Failed to verify whitelist status");

        return res.json();
      } catch (error: any) {
        console.error("Whitelist verification failed:", error.message);
        throw error;
      } finally {
        setCurrentModal(null);
      }
    },
  });

  return mutation;
};

export default useWhitelistVerification;
