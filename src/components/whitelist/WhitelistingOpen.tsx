import { useContext, useEffect, useState } from "react";
import SnakeLoader from "../UI/SnakeLoader";
import { CottonCandyContext } from "../../providers/ContextProvider";
import WhiteListed, { WhiteListTypes } from "./WhiteListed";
import useWhitelistVerification from "../../hooks/useWhitelistVerification";

const WhitelistingOpen = () => {
  const ctx = useContext(CottonCandyContext);

  const [checking] = useState<boolean>(true);
  const [whitelistStatus, setWhiteListStatus] = useState<WhiteListTypes | null>(
    null
  );

  const { mutate, data, isLoading } = useWhitelistVerification();

  useEffect(() => {
    if (!isLoading) {
      mutate();
    }
  }, []);

  useEffect(() => {
    if (data) {
      ctx.setIsWhitelisted(data.isWhitelisted);
      if (data.isWhitelisted) {
        setWhiteListStatus("whitelist");
      } else {
        setWhiteListStatus("not-whitelist");
      }
    }
  }, [data]);

  return (
    <>
      {checking ? (
        <SnakeLoader className="" message="Checking Your Wallet..." />
      ) : (
        <WhiteListed status={whitelistStatus} setStatus={setWhiteListStatus} />
      )}
    </>
  );
};

export default WhitelistingOpen;
