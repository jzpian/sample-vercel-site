import { getAllArticleIds, getArticleData } from '../../../lib/articles';

import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllArticleIds();
  return paths;
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const articleData = await getArticleData(params.id);

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <article className="w-full max-w-2xl bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg border border-border-light dark:border-border-dark">
        <h1 className="text-4xl font-bold text-foreground mb-4">{articleData.title}</h1>
        <div className="text-foreground text-opacity-75 mb-6">
          <p>{articleData.date} by {articleData.author}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {articleData.tags.map((tag) => (
              <span key={tag} className="bg-accent-light bg-opacity-10 text-accent-light text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-accent-dark dark:bg-opacity-20 dark:text-accent-dark">
                {tag}
              </span>
            ))}
            {articleData.categories.map((category) => (
              <span key={category} className="bg-accent-light bg-opacity-10 text-accent-light text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-accent-dark dark:bg-opacity-20 dark:text-accent-dark">
                {category}
              </span>
            ))}
          </div>
        </div>
        <div 
          className="prose dark:prose-invert max-w-none" 
          dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} 
        />
        <div className="mt-8">
          <Link href="/" className="text-accent-light dark:text-accent-dark hover:underline">
            ← Back to home
          </Link>
        </div>
      </article>
    </div>
  );
}
