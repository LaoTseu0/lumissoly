import NFCCheck from "@components/nfc/NFCCheck";
import NFCReader from "@components/nfc/NFCReader";

const NFCPage = () => {
  return (
    <div>
      <h1>Fonctionnalité NFC</h1>
      <NFCCheck />
      <NFCReader />
    </div>
  );
};

export default NFCPage;
