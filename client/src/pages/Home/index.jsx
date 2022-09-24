import Layout from "../../components/Layout";
import styles from "../../sass/home.module.scss";
import TextField from '@mui/material/TextField';
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostData } from "./handler";

export default function Home() {

    //State variables:
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    

    const HandleSubmit = async (e) => {
        setIsLoading(true);
        setError(false);
        console.log("Called");
        try {
        const data = await PostData(email, password);
        if (data?.data?.code === "SUCCESS"){
            document.cookie = `token=${data.data.token} `;
            sessionStorage.setItem("token", data.data.token);
            sessionStorage.setItem("_id", data.data._id);
            navigate("/dashboard");
        }
        }
        catch(err) {
            setError(true);
            console.log(err.response.data)
        }
        setIsLoading(false);
        
    }

    return (
        <Layout center={true}>
            <div className={styles.wrapper}>
                <div className={styles.formWrapper} onKeyDown={e => e.key === "Enter" && HandleSubmit()}>
                    <h2 className={styles.formHeading}>
                        Sign in to your account
                    </h2><br />
                    <TextField onChange={e => setEmail(e.target.value)} className={styles.input} label="E-mail" variant="outlined" /><br />
                    <TextField onChange={e => setPassword(e.target.value)} className={styles.input} label="Password" variant="outlined" type="password" /><br />
                    {!isLoading && <Button onClick={HandleSubmit} className={styles.button} variant="contained">Sign in</Button>}
                    {isLoading && <CircularProgress style={{ margin: '0 auto' }} />}
                    {error && <p className={styles.error}>Invalid credentials</p>}
                    <Link to='/register' className={styles.registerSpan}>Don't have an account? Create one here</Link>
                </div>
            </div>
        </Layout>
    )
}