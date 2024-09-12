"use client";
import React, { useEffect, useState } from "react";

const NFCCheck: React.FC = () => {
  const [isNFCSupported, setIsNFCSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkNFCSupport = () => {
      if ("NDEFReader" in window) {
        setIsNFCSupported(true);
      } else {
        setIsNFCSupported(false);
      }
    };

    checkNFCSupport();
  }, []);

  if (isNFCSupported === null) {
    return <div>Vérification de la compatibilité NFC...</div>;
  }

  return (
    <div>
      {isNFCSupported ? (
        <p>NFC est supporté sur cet appareil.</p>
      ) : (
        <p>NFC n'est pas supporté sur cet appareil.</p>
      )}
    </div>
  );
};

export default NFCCheck;
