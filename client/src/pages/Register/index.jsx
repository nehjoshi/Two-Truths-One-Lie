import Layout from "../../components/Layout";
import styles from "../../sass/home.module.scss";
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { PostData } from "./handler";

export default function Register() {

    //State variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {isLoading, refetch, error, isFetching} = useQuery("register", () => PostData(email, password), {
        enabled: false,
        refetchOnWindowFocus: false
    });

    //Handle the submit button
    const HandleSubmit = async () => {
        const {data} = await refetch();
        if (error) console.log(error.response.data.message);
        console.log(data);
    }

    return (
        <Layout center={true}>
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.formHeading}>Create an account</h2><br />
                    <TextField onChange={e => setEmail(e.target.value)} className={styles.input} label="E-mail" variant="outlined" /><br />
                    <TextField onChange={e => setPassword(e.target.value)} className={styles.input} label="Password" variant="outlined" type="password" /><br />
                    <TextField onChange={e => setConfirmPassword(e.target.value)} className={styles.input} label="Confirm password" variant="outlined" type="password" /><br />
                    {!isFetching && <Button disabled={confirmPassword !== password || password === "" || email===""} onClick={HandleSubmit} className={styles.button} variant="contained">Create account</Button>}<br />
                    {isFetching && <CircularProgress style={{margin: '0 auto'}}/>}
                    {error && <p style={{color: 'red'}}><center>{error.response.data.message}</center></p>}<br />
                    <Link to='/' className={styles.registerSpan}>Already have an account? Sign in here</Link>
                </div>
            </div>
        </Layout>
    )
}