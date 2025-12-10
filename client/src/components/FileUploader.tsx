import styles from "../components/fileUploader.module.css"
import React, { useState } from 'react';

function FileUploader() {

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)


  const handleUpload = async () => {
    const formData = new FormData();
    if (!uploadedFile) {
      alert("must upload a file");
      return;
    }
    formData.append('file', uploadedFile);

    try {
      fetch('/api/fileHandler', {
        method: 'POST',
        body: formData,
      })
    }
    catch (error) {
      console.error(error)
      return
    }
    console.log("success");
  }

  return (
    <>
      <div className={styles.page}>
        <input onChange={(e) => setUploadedFile(e.target.files[0])} type="file" />
        <button onClick={() => handleUpload()}>Proccess upload</button>
      </div>
    </>
  )
}

export default FileUploader;
