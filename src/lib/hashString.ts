async function hashString(str: string) {
  // Encoder la chaîne en UTF-8
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  // Calculer le hash
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convertir le buffer en chaîne hexadécimale
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
