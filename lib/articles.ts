import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define a type for a single article's metadata + ID
export type ArticleData = {
  id: string;
  date: string;
  title: string;
  author: string;
  tags: string[];
  categories: string[];
};

// Helper to get the absolute path to the articles directory
const getArticlesDirectory = () => {
  return path.join(process.cwd(), 'articles');
}

export function getSortedArticlesData() {
  const articlesDirectory = getArticlesDirectory();
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(articlesDirectory);
  } catch (error) {
    console.error(`Error reading articles directory at ${articlesDirectory}:`, error);
    return [];
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
      ...(matterResult.data as Omit<ArticleData, 'id'>), // Use Omit as id is already present
    } as ArticleData; // Explicitly cast to ArticleData to satisfy TS
  }).filter((article): article is ArticleData => article !== null); // Filter out nulls with a type predicate

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getArticleData(id: string) {
  if (!id) {
    console.error("getArticleData received an undefined ID.");
    throw new Error("Article ID is undefined.");
  }

  const articlesDirectory = getArticlesDirectory();
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  let fileContents = '';

  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error reading article file ${fullPath} for ID ${id}:`, error);
    throw new Error(`Failed to read article file: ${id}.md`);
  }

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as Omit<ArticleData, 'id'>), // Use Omit as id is already present
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
  console.log(`[getAllArticleIds] Found fileNames: ${fileNames.join(', ')}`);

  const paths = fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
  console.log(`[getAllArticleIds] Generated paths: ${JSON.stringify(paths)}`);
  return paths;
}
