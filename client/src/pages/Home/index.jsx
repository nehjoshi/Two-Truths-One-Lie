import Layout from "../../components/Layout";
import styles from "../../sass/home.module.scss";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { PostData } from "./handler";

export default function Home() {

    //State variables:
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data, isLoading, error, refetch } = useQuery("login", () => PostData(email, password), {
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const HandleSubmit = async () => {
        const {data, error} = await refetch();
        console.log(data.data.message);
        if (error) console.log(error);
    }

    return (
        <Layout center={true}>
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.formHeading}>
                        Sign in to your account
                    </h2><br />
                    <TextField onChange={e => setEmail(e.target.value)} className={styles.input} label="E-mail" variant="outlined" /><br />
                    <TextField onChange={e => setPassword(e.target.value)} className={styles.input} label="Password" variant="outlined" type="password" /><br />
                    {!isLoading && <Button onClick={HandleSubmit} className={styles.button} variant="contained">Sign in</Button>}
                </div>
            </div>
        </Layout>
    )
}