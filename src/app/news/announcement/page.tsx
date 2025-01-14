import fs from 'fs/promises';
import path from 'path';
import CategoryPage from '../[slug]/page'; // Importa o componente base

const AnnouncementsPage = async () => {
  const filePath = path.join(process.cwd(), 'data', 'news.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const posts = JSON.parse(data);

  const filteredPosts = posts.filter((post: any) => post.category === 'announcements');

  return <CategoryPage category="Announcements" posts={filteredPosts} />;
};

export default AnnouncementsPage;
