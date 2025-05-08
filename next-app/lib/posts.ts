
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

// Your markdown folder for posts.
const postsDirectory = path.join(process.cwd(), '/_posts');

export async function getPostbyId(id: string){
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export async function getAllPosts() {
    const files = fs.readdirSync(postsDirectory);

    const posts = await Promise.all(
      files.map((file) => {
        const id = file.replace(/\.md$/, '');
        return getPostbyId(id);
      })
    );
    return posts;
}