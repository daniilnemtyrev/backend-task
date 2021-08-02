import { CountriesListFoo } from "../components/countriesListFoo";
import { General } from "../components/general";
import styles from "../styles/Home.module.css"

const TaskFive = () => {
 return(
   <General>
     <section className={styles.index}>
        <h4>В задании 3 уже используется fetch, поэтому страница не перезагружается</h4>
      </section>
   </General>
 );
};

export default TaskFive;