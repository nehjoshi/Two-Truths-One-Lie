import Layout from "../../components/Layout";
import styles from "../../sass/global.module.scss";

export default function PageNotFound() {
    return (
        <Layout>
            <div className={styles.notFoundWrapper}>
                <h1>404 Error</h1>
                <h4>Page not found</h4><br />
                <hr />
            </div>
        </Layout>
    )
}