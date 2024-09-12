const startNFCRead = async (
  message: string,
  error: string | null,
  isReading: boolean,
  setMessage: (arg0: string) => void,
  setError: (arg0: string | null) => void,
  setIsReading: (arg0: boolean) => void
) => {
  if ("NDEFReader" in window) {
    try {
      const ndef = new (window as any).NDEFReader();
      setIsReading(true);
      setError(null);

      await ndef.scan();
      setMessage("Approchez un tag NFC de votre appareil...");

      ndef.addEventListener("reading", ({ message, serialNumber }: any) => {
        for (const record of message.records) {
          switch (record.recordType) {
            case "text":
              const textDecoder = new TextDecoder(record.encoding);
              setMessage(`Texte lu: ${textDecoder.decode(record.data)}`);
              break;
            case "url":
              setMessage(`URL lue: ${record.data}`);
              break;
            default:
              setMessage(`Données de type ${record.recordType} reçues.`);
          }
        }
      });
    } catch (error) {
      console.error(error);
      setError(`Erreur: ${(error as Error).message}`);
      setIsReading(false);
    }
  } else {
    setError("NFC non supporté sur cet appareil.");
  }
};

const checkNFCPermission = async (): Promise<boolean> => {
  if ("permissions" in navigator && "NDEFReader" in window) {
    try {
      const permissionStatus = await (navigator as any).permissions.query({
        name: "nfc",
      });
      return permissionStatus.state === "granted";
    } catch (error) {
      console.error(
        "Erreur lors de la vérification des permissions NFC:",
        error
      );
      return false;
    }
  }
  return false;
};

export { startNFCRead, checkNFCPermission };
