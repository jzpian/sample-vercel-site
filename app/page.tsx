import Link from 'next/link';
import { getSortedArticlesData } from '../lib/articles';

export default function Home() {
  const allArticlesData = getSortedArticlesData();
  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-theme-text-primary mb-8">Articles</h1>
      <ul className="w-full max-w-2xl bg-white bg-opacity-10 p-6 rounded-lg shadow-lg border border-theme-border">
        {allArticlesData.map(({ id, date, title, author, tags, categories }) => (
          <li key={id} className="mb-6 pb-4 border-b border-theme-border last:border-b-0 last:mb-0">
            <Link href={`/articles/${id}`} className="text-theme-button-text hover:underline">
              <h2 className="text-2xl font-semibold text-theme-text-primary">{title}</h2>
            </Link>
            <small className="text-theme-text-secondary">
              {date} by {author}
            </small>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-theme-button-bg bg-opacity-20 text-theme-button-text text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
              {categories.map((category) => (
                <span key={category} className="bg-theme-button-bg bg-opacity-20 text-theme-button-text text-xs font-medium px-2.5 py-0.5 rounded-full">
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
