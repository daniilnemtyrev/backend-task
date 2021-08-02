import { General } from "../components/general";
import styles from "../styles/Home.module.css"

const Home = () => {
  return (
    <General>
      <section className={styles.index}>
        <h1>Тестовое задание</h1>
      </section>
    </General>
  );
};

export default Home;
