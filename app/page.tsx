import Link from 'next/link';
import { getSortedArticlesData } from '../lib/articles';

export default function Home() {
  const allArticlesData = getSortedArticlesData();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Articles</h1>
      <ul className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {allArticlesData.map(({ id, date, title, author, tags, categories }) => (
          <li key={id} className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0">
            <Link href={`/articles/${id}`} className="text-blue-600 hover:underline">
              <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            </Link>
            <small className="text-gray-500">
              {date} by {author}
            </small>
            <div className="flex gap-2 mt-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
              {categories.map((category) => (
                <span key={category} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {category}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
