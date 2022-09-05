import Layout from "../../components/Layout";
import styles from "../../sass/home.module.scss";
import TextField from '@mui/material/TextField';

export default function Home() {
    return (
        <Layout center={true}>
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <h2 className={styles.formHeading}>
                        Sign in to your account
                    </h2>
                    <TextField id="standard-basic" label="E-mail" variant="outlined" /><br/>
                    <TextField id="standard-basic" label="Password" variant="outlined" type="password"/>
                </div>
            </div>
        </Layout>
    )
}