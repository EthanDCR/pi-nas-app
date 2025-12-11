import { useEffect, useRef, useState } from "react";
import styles from "../components/fileViewer.module.css"

export default function FileViewer() {

  const [fileNames, setFileNames] = useState<string[]>([]);
  const currentLinkRef = useRef<HTMLAnchorElement | null>(null)


  const getFileNames = async () => {
    try {
      const res = await fetch('/api/getFileNamesHandler')
      const data = await res.json();
      const names = await data.FileNames;
      console.log(`Found files: ${names}`)
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

  return (
    <>
      <div className={styles.page}>
        <h1>File viewer</h1>
        {fileNames ? (
          <div className={styles.fileDisplay}>

            {fileNames.map((name) =>
              <div key={name}>
                <button onClick={() => getFile(name)} key={name}>Download {name}</button>
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
