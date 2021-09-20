import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

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
    updatedAt: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }) {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a key={post.slug} href="#">
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>

              <img  className={styles.calendar} src="/images/calendar.png" alt="calendar" />
              <time>{post.updatedAt}</time>

              <img  className={styles.user} src="/images/user.png" alt="user" />
              <span className={styles.author}>{post.author}</span>
            </a>
          ))}
        </div>
      </main>
    </>
  );
  // TODO
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'publi'),
  ], {
    fetch: ['title', 'content','author.name'],
    pageSize: 2,
  })

  console.log('response: ', JSON.stringify(postsResponse, null, 2))

  const posts = postsResponse.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      author: post.data.author,
      subtitle: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })


  return {
    props: {
      posts
    }
  }

  // TODO
};
