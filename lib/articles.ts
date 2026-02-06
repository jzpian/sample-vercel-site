import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Helper to get the absolute path to the articles directory
const getArticlesDirectory = () => {
  // In development, process.cwd() is the project root
  // In Vercel deployment, the 'articles' folder might be outside the root of the bundled serverless function
  // Using path.resolve for robustness through different environments
  return path.join(process.cwd(), 'articles');
}

export function getSortedArticlesData() {
  const articlesDirectory = getArticlesDirectory();
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(articlesDirectory);
  } catch (error) {
    console.error(`Error reading articles directory at ${articlesDirectory}:`, error);
    return []; // Return empty array if directory cannot be read
  }

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    let fileContents = '';
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
      console.error(`Error reading file ${fullPath}:`, error);
      return null; // Return null for this article if it cannot be read
    }

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string; author: string; tags: string[]; categories: string[] }),
    };
  }).filter(Boolean); // Filter out any null entries due to read errors

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  }) as Array<{id: string; date: string; title: string; author: string; tags: string[]; categories: string[]}>;
}

export async function getArticleData(id: string) {
  const articlesDirectory = getArticlesDirectory();
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  let fileContents = '';

  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error reading article file ${fullPath} for ID ${id}:`, error);
    // Re-throw to propagate error, e.g., to trigger a 404 in Next.js
    throw new Error(`Failed to read article file: ${id}.md`);
  }

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; author: string; tags: string[]; categories: string[] }),
  };
}

export function getAllArticleIds() {
  const articlesDirectory = getArticlesDirectory();
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(articlesDirectory);
  } catch (error) {
    console.error(`Error reading articles directory for IDs at ${articlesDirectory}:`, error);
    return [];
  }

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
