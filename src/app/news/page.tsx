// import fs from 'fs/promises';
// import path from 'path';

// interface NewsPost {
//   id: string;
//   category: string;
//   date: string;
//   title: string;
// }

// const NewsPage: React.FC<{ posts: NewsPost[] }> = ({ posts }) => {
//   return (
//     <main>
//       <h1>Notícias</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <a href={`/news/${post.id}`}>
//               {post.title} - {new Date(post.date).toLocaleDateString()}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// };

// export async function getStaticProps() {
//   const filePath = path.join(process.cwd(), 'data', 'news.json');
//   const data = await fs.readFile(filePath, 'utf-8');
//   const posts: NewsPost[] = JSON.parse(data);

//   return { props: { posts } };
// }

// export default NewsPage;
