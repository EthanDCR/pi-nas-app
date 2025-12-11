import styles from "../src/app.module.css"
import FileUploader from "./components/FileUploader"
import FileViewer from "./components/FileViewer"


function App() {

  return (
    <>
      <div className={styles.page}>
        <h1>NETWORK ATTATCHED STORAGE INTERFACE</h1>
        <FileUploader></FileUploader>
        <FileViewer></FileViewer>
      </div >
    </>
  )
}

export default App
