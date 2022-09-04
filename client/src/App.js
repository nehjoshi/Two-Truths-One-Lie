import './App.css';
import styles from "./sass/home.module.scss";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ENDPOINTS } from './utils/endpoints.js'

const MakeRequest = async () => {
  return await axios.get(ENDPOINTS.MAIN + "/test");

}
function App() {

  const { isLoading, error, data } = useQuery('test', MakeRequest);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;


  return (
    <>
      <h1 className={styles.heading}>Two truths one lie</h1>
      <h2 className={styles.heading}>Data: {data.data}</h2>
    </>
  );
}

export default App;
