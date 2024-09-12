"use client";
import React, { useState, useEffect } from "react";

const NFCReader: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isReading, setIsReading] = useState<boolean>(false);

  const startNFCRead = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new (window as any).NDEFReader();
        setIsReading(true);
        await ndef.scan();

        ndef.addEventListener("reading", ({ message, serialNumber }: any) => {
          for (const record of message.records) {
            switch (record.recordType) {
              case "text":
                const textDecoder = new TextDecoder(record.encoding);
                setMessage(textDecoder.decode(record.data));
                break;
              case "url":
                setMessage(`URL: ${record.data}`);
                break;
              default:
                setMessage(`Données de type inconnu reçues.`);
            }
          }
        });
      } catch (error) {
        console.error(error);
        setMessage(`Erreur: ${(error as Error).message}`);
      }
    } else {
      setMessage("NFC non supporté sur cet appareil.");
    }
  };

  useEffect(() => {
    return () => {
      // Nettoyage si nécessaire
      setIsReading(false);
    };
  }, []);

  return (
    <div>
      <button onClick={startNFCRead} disabled={isReading}>
        {isReading ? "Lecture en cours..." : "Démarrer la lecture NFC"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default NFCReader;
