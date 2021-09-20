import  Head  from 'next/head';
import styles from './header.module.scss';

export default function Header() {
  return (
    <Head>
      <title>Posts | CRA</title>
      <img  className={styles.logo} src="/images/Logo.svg" alt="logo" />
    </Head>
  )
}
