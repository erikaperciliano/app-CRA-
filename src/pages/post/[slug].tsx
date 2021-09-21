import { GetStaticPaths, GetStaticProps } from 'next';

import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useRouter } from 'next/router';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    updatedAt: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }) {
  const router = useRouter()


  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <main className={styles.container}>
        <article className={styles.post}>
          <img className={styles.banner} src={post.banner.url} alt="banner" />
          <h1>{post.title}</h1>
          <div className={styles.header}>
            <img  className={styles.calendar} src="/images/calendar.png" alt="calendar" />
            <time>{post.updatedAt}</time>

            <img  className={styles.user} src="/images/user.png" alt="user" />
            <span className={styles.author}>{post.author}</span>
            <img  className={styles.clock} src="/images/clock.svg" alt="clock" />
            <span className={styles.author}>{Math.round(post.content.length / 200)} min</span>
          </div>

          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content}}
          >
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  return {
      paths: [],
      fallback: 'blocking'
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('publi', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    author: response.data.author,
    banner: response.data.banner,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    }
  }

};
