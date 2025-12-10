import styles from "../components/fileUploader.module.css"
import React, { useState } from 'react';

function FileUploader() {

  const [noteContent, setNoteContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)


  const handleUpload = async () => {
    const formData = new FormData();
    if (!uploadedFile) {
      alert("must upload a file");
      return;
    }
    formData.append('file', uploadedFile);
    formData.append('notes', noteContent);

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
        <input onChange={(e) => setNoteContent(e.target.value)} type="text" placeholder=" notes about this file" />
        <button onClick={() => handleUpload()}>Proccess upload</button>
      </div>
    </>
  )
}

export default FileUploader;
