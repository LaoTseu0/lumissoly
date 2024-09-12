import React, { useState, useEffect } from "react";

const NFCReader: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isReading, setIsReading] = useState<boolean>(false);

  const startNFCRead = async () => {
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

  useEffect(() => {
    return () => {
      setIsReading(false);
    };
  }, []);

  return (
    <div>
      <button onClick={startNFCRead} disabled={isReading}>
        {isReading ? "Lecture en cours..." : "Démarrer la lecture NFC"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default NFCReader;
