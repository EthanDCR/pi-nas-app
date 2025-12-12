import { useEffect, useRef, useState } from "react";
import styles from "../components/fileViewer.module.css"

export default function FileViewer() {

  const [fileNames, setFileNames] = useState<string[]>([]);
  const currentLinkRef = useRef<HTMLAnchorElement | null>(null)
  const [storageStats, setStorageStats] = useState<any>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showFileSentMessage, setShowFileSentMessage] = useState<boolean>(false)


  const getFileNames = async () => {
    console.log("getting file names")
    try {
      const res = await fetch('/api/getFileNamesHandler')
      const data = await res.json();
      const names = await data.FileNames;
      setFileNames(names)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFileNames();
  }, []);



  const getFile = async (fileName: string) => {

    try {
      const res = await fetch(`/api/sendFileHandler?fileName=${fileName}`)
      const blob = await res.blob()
      console.log("got da blob:\n " + blob)


      const a = currentLinkRef.current;
      if (!a) {
        alert("no anchor element attatched to ref")
        return
      }
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click()
      window.URL.revokeObjectURL(url);
    }
    catch (err) {
      console.error(err, "Couldn't fetch file" + fileName)
    }
  }

  useEffect(() => {
    const getDiskData = async () => {
      const res = await fetch('/api/getStorageHandler')
      const data = await res.json()
      console.log(data)
      setStorageStats(data)
    }
    getDiskData();
  }, []);

  const deleteFile = async (fileName: string) => {
    const res = await fetch(`/api/deleteFileHandler?fileName=${fileName}`)
    if (!res.ok) {
      console.error("error deleting selected file")
    } else if (res.ok) {
      console.log(`${fileName} deleted successfully`)
    }

  }

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

    }

    catch (error) {
      console.error(error)
      return
    }
    getFileNames();
    console.log("success");
  }

  return (
    <>
      <div className={styles.page}>

        <div className={styles.topBar}>
          <div className={styles.uploadSection}>
            <input onChange={(e) => setUploadedFile(e.target.files![0])} type="file" />
            <button onClick={() => handleUpload()}>Upload</button>
            {showFileSentMessage && <p className={styles.fileSent}>File Sent  ✔ </p>}
          </div>
          <h1>NETWORK ATTATCHED STORAGE INTERFACE</h1>
          {storageStats &&
            <ul className={styles.storageUl}>
              <li>Total: {storageStats.total} Gb</li>
              <li>Free: {storageStats.free} Gb</li>
              <li>Used: {storageStats.used} %</li>
            </ul>}
        </div>

        {fileNames ? (
          <div className={styles.fileDisplay}>

            {fileNames.map((name) =>
              <div key={name} className={styles.downloadTrash}>
                <button onClick={() => getFile(name)} >Download {name}</button>
                <button onClick={() => deleteFile(name)} className={styles.trashButton}>🗑️</button>
              </div>
            )}
          </div>
        ) :
          <div>
            <h2>
              No files found
            </h2>
          </div>
        }
      </div>
      <a className={styles.hidden} ref={currentLinkRef}></a>
    </>
  )
}
