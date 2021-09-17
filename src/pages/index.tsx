import { GetStaticProps } from 'next';
import  Head  from 'next/head';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
        <img  className={styles.logo} src="/images/Logo.svg" alt="logo" />
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <strong>Exibindo informações do imóvel com ModalRoute</strong>
            <p>Esse post é a decima primeira parte da série de posts “Clone AirBnB com AdonisJS.</p>

            <img  className={styles.calendar} src="/images/calendar.png" alt="calendar" />
            <time>12 de março de 2021</time>

            <img  className={styles.user} src="/images/user.png" alt="user" />
            <span className={styles.author}>Josepha Stefany</span>
          </a>
          <a href="#">
            <strong>Exibindo informações do imóvel com ModalRoute</strong>
            <p>Esse post é a decima primeira parte da série de posts “Clone AirBnB com AdonisJS.</p>

            <img  className={styles.calendar} src="/images/calendar.png" alt="calendar"/>
            <time>12 de março de 2021</time>

            <img  className={styles.user} src="/images/user.png" alt="user" />
            <span className={styles.author}>Josepha Stefany</span>
          </a>
          <a href="#">
            <strong>Exibindo informações do imóvel com ModalRoute</strong>
            <p>Esse post é a decima primeira parte da série de posts “Clone AirBnB com AdonisJS.</p>

            <img  className={styles.calendar} src="/images/calendar.png" alt="calendar" />
            <time>12 de março de 2021</time>

            <img  className={styles.user} src="/images/user.png" alt="user" />
            <span className={styles.author}>Josepha Stefany</span>
          </a>
        </div>
      </main>
    </>
  );
  // TODO
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
