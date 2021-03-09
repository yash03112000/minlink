import styles from '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return(
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <Component {...pageProps} />
      <footer className={styles.footer}>
        This is the Beta version of product and currently in testing phase. 
        In case of bugs and suggestions feel reach out to me at <a href="mailto:yashag@iitk.ac.in">yashag@iitk.ac.in</a> or anywhere else you can find me Cheers!!!
      </footer>
    </>
  ) 
}

export default MyApp
