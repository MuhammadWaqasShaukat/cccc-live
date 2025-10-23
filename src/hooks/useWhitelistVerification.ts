import { useMutation } from "react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { TERMS_AND_CONDITIONS } from "../constants/message";

const apiUrl = import.meta.env.VITE_API_URL;

const useWhitelistVerification = (setChecking: (v: boolean) => void) => {
  const { publicKey, signMessage } = useWallet();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        if (!publicKey || !signMessage) {
          alert("Wallet not connected or signing not supported");
          return;
        }

        const encodedMessage = new TextEncoder().encode(TERMS_AND_CONDITIONS);

        setChecking(true);

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
        setChecking(false);
      }
    },
  });

  return mutation;
};

export default useWhitelistVerification;
