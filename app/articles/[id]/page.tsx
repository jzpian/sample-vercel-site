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
      <article className="w-full max-w-2xl bg-white bg-opacity-10 p-6 rounded-lg shadow-lg border border-theme-border">
        <h1 className="text-4xl font-bold text-theme-text-primary mb-4">{articleData.title}</h1>
        <div className="text-theme-text-secondary mb-6">
          <p>{articleData.date} by {articleData.author}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {articleData.tags.map((tag) => (
              <span key={tag} className="bg-theme-button-bg bg-opacity-20 text-theme-button-text text-xs font-medium px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            {articleData.categories.map((category) => (
              <span key={category} className="bg-theme-button-bg bg-opacity-20 text-theme-button-text text-xs font-medium px-2.5 py-0.5 rounded-full">
                {category}
              </span>
            ))}
          </div>
        </div>
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} 
        />
        <div className="mt-8">
          <Link href="/" className="text-theme-button-text hover:underline">
            ← Back to home
          </Link>
        </div>
      </article>
    </div>
  );
}
