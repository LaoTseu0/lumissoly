import React, { useState } from "react";
import { Button } from "./ui/button";

const FileUpload = () => {
  const [fileName, setFileName] = useState("Aucun fichier choisi.");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFileName(file ? file.name : "Aucun fichier choisi.");
  };

  return (
    <label className="file-upload-container">
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button asChild>
        <span id="file-name">Télécharger le fichier</span>
      </Button>
    </label>
  );
};

export default FileUpload;
