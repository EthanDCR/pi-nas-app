import { useEffect, useState } from "react";
import styles from "../components/fileViewer.module.css"

export default function FileViewer() {

  const [fileNames, setFileNames] = useState<string[]>([]);
  const getFileNames = async (fileName: string | null) => {
    if (!fileName) {
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
  }

  useEffect(() => {
    getFileNames();
  }, []);

  return (
    <>
      <div className={styles.page}>
        <h1>File Viewer</h1>
        {fileNames ? (
          <div>
            <ul>
              {fileNames.map((name) =>
                <li key={name}>{name}</li>
              )}
            </ul>
          </div>
        ) :
          <div>
            <h2>
              No files found
            </h2>
          </div>
        }
      </div>
    </>
  )
}
