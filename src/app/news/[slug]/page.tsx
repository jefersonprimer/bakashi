// import { GetStaticPaths, GetStaticProps } from 'next';
// import fs from 'fs/promises';
// import path from 'path';

// interface NewsPost {
//   id: string;
//   category: string;
//   date: string;
//   title: string;
//   content: string;
//   author: string;
// }

// interface NewsPageProps {
//   post: NewsPost;
// }

// const NewsPostPage: React.FC<NewsPageProps> = ({ post }) => {
//   return (
//     <main>
//       <h1>{post.title}</h1>
//       <p>
//         <strong>Publicado em:</strong> {new Date(post.date).toLocaleDateString()}
//       </p>
//       <p>
//         <strong>Autor:</strong> {post.author}
//       </p>
//       <article>{post.content}</article>
//     </main>
//   );
// };

// export async function getStaticPaths() {
//   const filePath = path.join(process.cwd(), 'data', 'news.json');
//   const data = await fs.readFile(filePath, 'utf-8');
//   const posts: NewsPost[] = JSON.parse(data);

//   const paths = posts.map((post) => ({
//     params: { slug: post.id },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }: { params: { slug: string } }) {
//   const filePath = path.join(process.cwd(), 'data', 'news.json');
//   const data = await fs.readFile(filePath, 'utf-8');
//   const posts: NewsPost[] = JSON.parse(data);

//   const post = posts.find((post) => post.id === params.slug);

//   if (!post) {
//     return { notFound: true };
//   }

//   return { props: { post } };
// }

// export default NewsPostPage;
