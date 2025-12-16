import styles from "../src/app.module.css";
import FileViewer from "./components/FileViewer";



function App() {

  return (
    <>
      <div className={styles.page}>
        <FileViewer></FileViewer>
      </div >
      <img src="/chickenfamguy.png" alt="chick" className={styles.chick} />
      <img src="/petaJustin (1).png" alt="peter" className={styles.peter} />
    </>
  )
}

export default App
