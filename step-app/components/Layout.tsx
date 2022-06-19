import styles from '../styles/Layout.module.css'

const Layout = ({children}: any) => {
  return (
    <div className={styles.container}>
        <main className={styles.main}>
            { children }
        </main>

    </div>
  )
}

export default Layout