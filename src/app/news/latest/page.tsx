const LatestPage = async () => {
  const filePath = path.join(process.cwd(), 'data', 'news.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const posts = JSON.parse(data);

  const filteredPosts = posts.filter((post: any) => post.category === 'latest');

  return <CategoryPage category="Latest" posts={filteredPosts} />;
};

export default LatestPage;
