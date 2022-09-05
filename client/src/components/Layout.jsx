import styles from "../sass/global.module.scss";

export default function Layout({ children, center }) {
    return (
        <main className={center ? `${styles.flexWrapper}` : `${styles.wrapper}`}>
            {children}
        </main>
    )
}