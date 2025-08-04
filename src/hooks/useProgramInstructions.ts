import { useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Keypair,
  ComputeBudgetProgram,
  Transaction,
} from "@solana/web3.js";

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { Program } from "@coral-xyz/anchor";
import { Buffer } from "buffer";

import IDL from "../constants/solana_lottery.json";
import useWeb3Utils from "./useWeb3Utils";
import { networkStateAccountAddress, Orao } from "@orao-network/solana-vrf";
import { useContext } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";
import { getTxSize } from "../utils/getTxSize";

const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  import.meta.env.VITE_APP_MPL_TOKEN_METADATA_PROGRAM_ID
);

const encode = (str: string) => Buffer.from(str);

const useProgramInstructions = () => {
  const { publicKey, wallet } = useWallet();
  const ctx = useContext(CottonCandyContext);

  const { getProvider, connection, getConnectedWallet } = useWeb3Utils();

  const estimateTransactionFee = async (
    transaction: Transaction
  ): Promise<number> => {
    const provider = await getProvider(connection);

    if (!transaction.recentBlockhash || !transaction.feePayer) {
      const { blockhash } = await provider.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey as PublicKey;
    }

    const message = transaction.compileMessage();

    const feeResult = await provider.connection.getFeeForMessage(message);

    if (feeResult.value !== null) {
      const feeInLamports = feeResult.value;
      const feeInSOL = feeInLamports / 1e9;
      return feeInSOL;
    } else {
      console.warn("Failed to estimate fee");
      return 0;
    }
  };

  //********************************************************
  //                    BUY NFT
  //********************************************************

  const BuyNFT = async (mintCount: number) => {
    const connectedWallet = await getConnectedWallet(wallet!);
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    if (!connectedWallet || !provider || !publicKey || mintCount <= 0) {
      alert("Wallet not connected or invalid input.");
      return;
    }

    const txs: Transaction[] = [];
    const nftMintKeypairsForSign: Keypair[] = [];

    //temp loop
    for (let i = 0; i < mintCount; i++) {
      const remainingAccounts: any[] = [];
      const nftMintKeypairs: Keypair[] = [];

      const [collectionAuthorityPda] = PublicKey.findProgramAddressSync(
        [encode("collection_authority")],
        program.programId
      );

      const [collectionMintPda] = PublicKey.findProgramAddressSync(
        [encode("collection")],
        program.programId
      );

      const [collectionMetadataAccountPda] = PublicKey.findProgramAddressSync(
        [
          encode("metadata"),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          collectionMintPda.toBuffer(),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
      );

      const [collectionMasterEditionPda] = PublicKey.findProgramAddressSync(
        [
          encode("metadata"),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          collectionMintPda.toBuffer(),
          encode("edition"),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
      );

      for (let i = 0; i < 1 /** mintCount */; i++) {
        const nftMintKeypair = Keypair.generate();
        nftMintKeypairs.push(nftMintKeypair);
        nftMintKeypairsForSign.push(nftMintKeypair);
        const [metadataPda] = PublicKey.findProgramAddressSync(
          [
            encode("metadata"),
            MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            nftMintKeypair.publicKey.toBuffer(),
          ],
          MPL_TOKEN_METADATA_PROGRAM_ID
        );

        const [masterEditionPda] = PublicKey.findProgramAddressSync(
          [
            encode("metadata"),
            MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            nftMintKeypair.publicKey.toBuffer(),
            encode("edition"),
          ],
          MPL_TOKEN_METADATA_PROGRAM_ID
        );

        const tokenAccount = getAssociatedTokenAddressSync(
          nftMintKeypair.publicKey,
          publicKey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );

        const [nftState] = PublicKey.findProgramAddressSync(
          [encode("nft-state"), nftMintKeypair.publicKey.toBuffer()],
          program.programId
        );

        // Push the required 5 accounts in order:
        remainingAccounts.push(
          {
            pubkey: nftMintKeypair.publicKey,
            isWritable: true,
            isSigner: true,
          },
          { pubkey: metadataPda, isWritable: true, isSigner: false },
          { pubkey: masterEditionPda, isWritable: true, isSigner: false },
          { pubkey: tokenAccount, isWritable: true, isSigner: false },
          { pubkey: nftState, isWritable: true, isSigner: false }
        );
      }

      // try {
      const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 600_000,
      });

      const tx = await program.methods
        .buy()
        .accounts({
          user: publicKey,
          collectionMint: collectionMintPda,
          collectionAuthority: collectionAuthorityPda,
          collectionMetadataAccount: collectionMetadataAccountPda,
          collectionMasterEdition: collectionMasterEditionPda,
          tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .remainingAccounts(remainingAccounts)
        .signers(nftMintKeypairs)
        .transaction();

      let size = getTxSize(tx, publicKey);

      console.log("*size", size);
      // if (size > 1232) {
      // throw new Error("Tx size limit exceeded.");
      // }

      const gasFee = await estimateTransactionFee(tx);
      if (gasFee) {
        ctx.setGasFee(gasFee);
      }

      tx.add(computeBudgetIx);
      tx.feePayer = publicKey;
      tx.recentBlockhash = (
        await provider.connection.getLatestBlockhash()
      ).blockhash;

      txs.push(tx);
    }
    // const signedTx = await connectedWallet.signTransaction(tx);
    const signedTxs = await connectedWallet.signAllTransactions(txs);

    for (const [index, signedTx] of signedTxs.entries()) {
      // await connection.sendRawTransaction(signedTx.serialize());

      signedTx.partialSign(nftMintKeypairsForSign[index]);

      const txId = await provider.connection.sendRawTransaction(
        signedTx.serialize()
      );

      await provider.connection.confirmTransaction(
        {
          signature: txId,
          ...(await provider.connection.getLatestBlockhash()),
        },
        "confirmed"
      );
    }

    //   console.log("Minted NFTs Tx:", txId);
    // } catch (e) {
    //   console.error("BuyNFT error:", e);
    // }
  };

  // const BuyNFT = async (mintCount: number) => {
  //   const connectedWallet = await getConnectedWallet(wallet!);
  //   const provider = await getProvider(connection);

  //   const program = new Program(IDL as any, provider);

  //   if (!publicKey || !program || !provider) {
  //     alert("Wallet not connected or program not loaded.");
  //     return;
  //   }
  //   if (mintCount <= 0) {
  //     alert("Select at least 1 item to mint.");
  //     return;
  //   }

  //   if (!connectedWallet || connectedWallet === undefined) {
  //     alert("Appropriate Wallet not connected.");
  //     return;
  //   }

  //   for (let i = 0; i < mintCount; i++) {
  //     try {
  //       const nftMintKeypair = Keypair.generate();
  //       const [lottery] = PublicKey.findProgramAddressSync(
  //         [encode("lottery")],
  //         program.programId
  //       );

  //       //@ts-ignore
  //       const state = await program.account.state.fetch(lottery);

  //       const [collectionMintPda] = PublicKey.findProgramAddressSync(
  //         [encode("collection")],
  //         program.programId
  //       );

  //       const [collectionAuthorityPda] = PublicKey.findProgramAddressSync(
  //         [encode("collection_authority")],
  //         program.programId
  //       );

  //       // Metaplex PDAs for the new NFT
  //       const [metadataAccountPda] = PublicKey.findProgramAddressSync(
  //         [
  //           encode("metadata"),
  //           MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
  //           nftMintKeypair.publicKey.toBuffer(),
  //         ],
  //         MPL_TOKEN_METADATA_PROGRAM_ID
  //       );

  //       const [masterEditionPda] = PublicKey.findProgramAddressSync(
  //         [
  //           encode("metadata"),
  //           MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
  //           nftMintKeypair.publicKey.toBuffer(),
  //           encode("edition"),
  //         ],
  //         MPL_TOKEN_METADATA_PROGRAM_ID
  //       );

  //       const [collectionMetadataAccountPda] = PublicKey.findProgramAddressSync(
  //         [
  //           encode("metadata"),
  //           MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
  //           collectionMintPda.toBuffer(),
  //         ],
  //         MPL_TOKEN_METADATA_PROGRAM_ID
  //       );

  //       const [collectionMasterEditionPda] = PublicKey.findProgramAddressSync(
  //         [
  //           encode("metadata"),
  //           MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
  //           collectionMintPda.toBuffer(),
  //           encode("edition"),
  //         ],
  //         MPL_TOKEN_METADATA_PROGRAM_ID
  //       );

  //       const nftTokenAccountPda = getAssociatedTokenAddressSync(
  //         nftMintKeypair.publicKey,
  //         publicKey,
  //         false,
  //         TOKEN_PROGRAM_ID,
  //         ASSOCIATED_TOKEN_PROGRAM_ID
  //       );

  //       const transaction = await program.methods
  //         .buy()
  //         .accounts({
  //           user: connectedWallet.publicKey,
  //           collectionMint: collectionMintPda,
  //           collectionAuthority: collectionAuthorityPda,
  //           collectionMetadataAccount: collectionMetadataAccountPda,
  //           collectionMasterEdition: collectionMasterEditionPda,
  //           tokenAccount: nftTokenAccountPda,
  //           metadataAccount: metadataAccountPda,
  //           masterEdition: masterEditionPda,
  //           nftMint: nftMintKeypair.publicKey,
  //           tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
  //         })
  //         .signers([nftMintKeypair])
  //         .transaction();

  //       const gasFee = await estimateTransactionFee(transaction);
  //       if (gasFee) {
  //         ctx.setGasFee(gasFee);
  //       }

  //       const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
  //         units: 300_000,
  //       });

  //       transaction.add(computeBudgetIx);

  //       transaction.recentBlockhash = (
  //         await provider.connection.getLatestBlockhash()
  //       ).blockhash;
  //       transaction.feePayer = publicKey;

  //       const signedTx = await connectedWallet.signTransaction(transaction);

  //       signedTx.partialSign(nftMintKeypair);

  //       const txId = await provider.connection.sendRawTransaction(
  //         signedTx.serialize()
  //       );

  //       const latestBlockhash = await provider.connection.getLatestBlockhash();

  //       await provider.connection.confirmTransaction(
  //         {
  //           signature: txId,
  //           blockhash: latestBlockhash.blockhash,
  //           lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  //         },
  //         "confirmed"
  //       );

  //       // ctx.setMyNfts([]);
  //     } catch (error: any) {
  //       console.error(`Failed to mint NFT ${i + 1}:`, error);
  //       if (error instanceof anchor.AnchorError) {
  //         console.error("Anchor Error Code:", error.error.errorCode.code);
  //         console.error("Anchor Error Message:", error.error.errorMessage);
  //       }
  //       if (error.logs) {
  //         console.error("Transaction Logs:", error.logs.join("\n"));
  //       }
  //       break;
  //     }
  //   }
  // };

  //********************************************************
  //                    CLAIM NFT
  //********************************************************

  const ClaimNFT = async (nftAddress: string) => {
    const connectedWallet = await getConnectedWallet(wallet!);

    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    if (!publicKey || !program || !provider) {
      alert("Wallet not connected or program not loaded.");
      return;
    }

    if (!connectedWallet || connectedWallet === undefined) {
      alert("Appropriate Wallet not connected.");
      return;
    }

    try {
      const nftMintKeypair = Keypair.generate();

      const [collectionAuthorityPda] = PublicKey.findProgramAddressSync(
        [encode("collection_authority")],
        program.programId
      );

      const [eggCollectionMint] = PublicKey.findProgramAddressSync(
        [encode("egg_collection")],
        program.programId
      );

      const [eggMetadataAccount] = PublicKey.findProgramAddressSync(
        [
          encode("metadata"),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          nftMintKeypair.publicKey.toBuffer(),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
      );

      const [eggMasterEdition] = PublicKey.findProgramAddressSync(
        [
          encode("metadata"),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          nftMintKeypair.publicKey.toBuffer(),
          encode("edition"),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
      );

      const [eggCollectionMetadataAccount] = PublicKey.findProgramAddressSync(
        [
          encode("metadata"),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          eggCollectionMint.toBuffer(),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
      );

      const [eggCollectionMasterEdition] = PublicKey.findProgramAddressSync(
        [
          encode("metadata"),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          eggCollectionMint.toBuffer(),
          encode("edition"),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
      );

      const tokenAccount = getAssociatedTokenAddressSync(
        nftMintKeypair.publicKey,
        publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // console.log({
      //   user: connectedWallet.publicKey.toBase58(),
      //   eggCollectionMint: eggCollectionMint.toBase58(),
      //   collectionAuthority: collectionAuthorityPda.toBase58(),
      //   eggCollectionMetadataAccount: eggCollectionMetadataAccount.toBase58(),
      //   eggCollectionMasterEdition: eggCollectionMasterEdition.toBase58(),
      //   tokenAccount: tokenAccount.toBase58(),
      //   eggMetadataAccount: eggMetadataAccount.toBase58(),
      //   eggMasterEdition: eggMasterEdition.toBase58(),
      //   eggNftMint: nftMintKeypair.publicKey.toBase58(),
      //   nftMint: nftAddress,
      //   tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
      // });

      const transaction = await program.methods
        .claim()
        .accounts({
          user: connectedWallet.publicKey,
          eggCollectionMint: eggCollectionMint,
          collectionAuthority: collectionAuthorityPda,
          eggCollectionMetadataAccount: eggCollectionMetadataAccount,
          eggCollectionMasterEdition: eggCollectionMasterEdition,
          tokenAccount,
          eggMetadataAccount,
          eggMasterEdition,
          eggNftMint: nftMintKeypair.publicKey,
          nftMint: nftAddress,
          tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .signers([nftMintKeypair])
        .transaction();

      const computeBudgetIx = ComputeBudgetProgram.setComputeUnitLimit({
        units: 300_000,
      });

      transaction.add(computeBudgetIx);

      transaction.feePayer = publicKey;

      transaction.recentBlockhash = (
        await provider.connection.getLatestBlockhash()
      ).blockhash;

      const signedTx = await connectedWallet.signTransaction(transaction);

      signedTx.partialSign(nftMintKeypair);

      const txId = await provider.connection.sendRawTransaction(
        signedTx.serialize()
      );

      const latestBlockhash = await provider.connection.getLatestBlockhash();
      await provider.connection.confirmTransaction(
        {
          signature: txId,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
      );
    } catch (err: any) {
      console.error("Claim failed:", err);
    }
  };

  //********************************************************
  //                    HATCH NFT
  //********************************************************

  const HatchNFT = async (
    eggMintAddress: PublicKey,
    nftMintAddress: PublicKey
  ) => {
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    let vrf = new Orao(
      provider,
      new PublicKey(import.meta.env.VITE_APP_ORAO_VRF_KEY)
    );

    let treasury = (await vrf.getNetworkState("finalized")).config.treasury;

    if (!publicKey || !program || !provider) {
      alert("Wallet not connected or program not loaded.");
      return;
    }

    try {
      const tokenAccount = getAssociatedTokenAddressSync(
        eggMintAddress,
        publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      await program.methods
        .hatch()
        .accounts({
          user: publicKey,
          treasury: treasury,
          network: networkStateAccountAddress(),
          vrf: vrf.programId,
          eggNftMint: eggMintAddress,
          nftMint: nftMintAddress,
          tokenAccount,
          tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .rpc({ commitment: "confirmed" });

      ctx.setMyEggs([]);
    } catch (err: any) {
      console.error("Hatch failed:", err);
    }
  };

  //********************************************************
  //                    Fulfill Hatching
  //********************************************************

  const FulfillHatching = async (
    eggMintAddress: PublicKey,
    nftMintAddress: PublicKey
  ) => {
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    if (!publicKey || !program || !provider) {
      alert("Wallet not connected or program not loaded.");
      return;
    }

    try {
      const [collectionAuthority] = PublicKey.findProgramAddressSync(
        [encode("collection_authority")],
        program.programId
      );

      const [eggMetadataAccount] = PublicKey.findProgramAddressSync(
        [
          encode("metadata"),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          eggMintAddress.toBuffer(),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID
      );

      const eggNftTokenAccountPda = getAssociatedTokenAddressSync(
        eggMintAddress,
        publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      await program.methods
        .fulfill()
        .accounts({
          user: publicKey,
          nftMint: nftMintAddress,
          eggNftMint: eggMintAddress,
          eggMetadataAccount,
          collectionAuthority,
          tokenAccount: eggNftTokenAccountPda,
          tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .rpc({ commitment: "confirmed" });

      // const { status, lotteryStatus } = await getEggFulFilledState(
      //   eggMintAddress.toBase58()
      // );
      // ctx.setCrackedEggStatus({ status, lotteryStatus });
    } catch (err: any) {
      console.error("Fulfill hatching failed:", err);
    }
  };

  return {
    BuyNFT,
    ClaimNFT,
    HatchNFT,
    FulfillHatching,
  };
};

export default useProgramInstructions;
