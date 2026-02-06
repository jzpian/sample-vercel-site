import { getAllArticleIds, getArticleData } from '../../../../lib/articles';

import Link from 'next/link';

export async function generateStaticParams() {
  const paths = getAllArticleIds();
  return paths;
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const articleData = await getArticleData(params.id);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <article className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{articleData.title}</h1>
        <div className="text-gray-500 mb-6">
          <p>{articleData.date} by {articleData.author}</p>
          <div className="flex gap-2 mt-2">
            {articleData.tags.map((tag) => (
              <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
            {articleData.categories.map((category) => (
              <span key={category} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {category}
              </span>
            ))}
          </div>
        </div>
        <div 
          className="prose prose-blue max-w-none" 
          dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} 
        />
        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to home
          </Link>
        </div>
      </article>
    </div>
  );
}
