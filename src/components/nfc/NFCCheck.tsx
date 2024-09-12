"use client";
import React, { useEffect, useState } from "react";

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

const NFCCheck: React.FC = () => {
  const [isNFCSupported, setIsNFCSupported] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const checkNFCSupport = async () => {
  //     if ("NDEFReader" in window) {
  //       try {
  //         const ndef = new (window as any).NDEFReader();
  //         await ndef.scan();
  //         setIsNFCSupported(true);
  //       } catch (error) {
  //         console.error("Erreur lors de l'initialisation NFC:", error);
  //         setIsNFCSupported(false);
  //       }
  //     } else {
  //       setIsNFCSupported(false);
  //     }
  //   };

  //   checkNFCSupport();
  // }, []);

  // Utilisation dans le composant NFCCheck
  useEffect(() => {
    const checkNFCSupport = async () => {
      if ("NDEFReader" in window) {
        const hasPermission = await checkNFCPermission();
        if (hasPermission) {
          try {
            const ndef = new (window as any).NDEFReader();
            await ndef.scan();
            setIsNFCSupported(true);
          } catch (error) {
            console.error("Erreur lors de l'initialisation NFC:", error);
            setIsNFCSupported(false);
          }
        } else {
          setIsNFCSupported(false);
        }
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
        <p>NFC est supporté et activé sur cet appareil.</p>
      ) : (
        <p>NFC n'est pas supporté ou n'est pas activé sur cet appareil.</p>
      )}
    </div>
  );
};

export default NFCCheck;
