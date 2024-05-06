import "./global.css";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { CreateTask } from "./components/CreateTask/CreateTask";

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <CreateTask />
      </div>
    </>
  );
}

export default App;
