import Layout from "../../components/Layout";
import styles from "../../sass/dashboard.module.scss";
import { ENDPOINTS } from "../../utils/endpoints";
import { requestHeaderConfig } from "../../utils/requestHeader";
import axios from 'axios';
import { useState } from "react";
import { useQuery } from "react-query";
import { getTruthsAndLies } from "./handler";
export default function Dashboard() {

    const [truth, setTruth] = useState("");
    const [lie, setLie] = useState("");

    const { isLoading, data, refetch } = useQuery('fetch-truths-and-lies', getTruthsAndLies)

    const AddTruth = () => {
        if (truth !== "" || truth !== null) {
        axios.post(ENDPOINTS.NEW_TRUTH, { truth }, requestHeaderConfig)
            .then(res => {
                console.log(res.data)
                setTruth("");
                refetch();
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
    const AddLie = () => {
        if (lie !== "" || lie !== null) {
        axios.post(ENDPOINTS.NEW_LIE, { lie }, requestHeaderConfig)
            .then(res => {
                console.log(res.data)
                setLie("");
                refetch();
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <Layout>
            <div className={`${styles.leftHalf} ${styles.half}`}>
                <div className={styles.upper}>
                    <h2>Add Truths Here</h2>
                    <div className={styles.previousTruths}>
                        {!isLoading && data?.data?.truths.map((truth, key) => {
                            return <input key={key} className={styles.inputTruth} type="text" value={truth} disabled />
                        })}
                    </div>
                    <input onChange={e => setTruth(e.target.value)} value={truth} className={styles.input} type="text" placeholder="Start Typing Here" />
                    <div className={styles.buttonAdd} onClick={AddTruth}>+</div>
                </div>
                <div className={styles.lower}>
                    <h2>Add Lies Here</h2>
                    <div className={styles.previousTruths}>
                    {!isLoading && data.data.lies.map((lie, key) => {
                        return <input key={key} className={styles.inputTruth} type="text" value={lie} disabled />
                    })}
                    </div>
                    <input value={lie} onChange={e => setLie(e.target.value)} className={styles.input} type="text" placeholder="Start Typing Here" />
                    <div className={styles.buttonAdd} onClick={AddLie}>+</div>
                </div>
            </div>
            <div className={`${styles.half} ${styles.rightHalf}`}>
                <div className={styles.button}>Join a Game</div>
            </div>
        </Layout>
    )
}