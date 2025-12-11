import styles from "../components/fileUploader.module.css"
import { useState } from 'react';



function FileUploader() {

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showFileSentMessage, setShowFileSentMessage] = useState<boolean>(false)


  const handleUpload = async () => {
    const formData = new FormData();
    if (!uploadedFile) {
      alert("must upload a file");
      return;
    }
    formData.append('file', uploadedFile);

    try {
      fetch('/api/uploadHandler', {
        method: 'POST',
        body: formData,
      })

      setShowFileSentMessage(true)
      setTimeout(() => {
        setShowFileSentMessage(false)
      }, 2000);
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
        <input onChange={(e) => setUploadedFile(e.target.files![0])} type="file" />
        <button onClick={() => handleUpload()}>Proccess upload</button>
        {showFileSentMessage && <p className={styles.fileSent}>File Sent  ✔ </p>}
      </div>
    </>
  )
}

export default FileUploader;
