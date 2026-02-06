import Link from 'next/link';
import { getSortedArticlesData } from '../lib/articles';

export default function Home() {
  const allArticlesData = getSortedArticlesData();
  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-foreground mb-8">Articles</h1>
      <ul className="w-full max-w-2xl bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-lg border border-border-light dark:border-border-dark">
        {allArticlesData.map(({ id, date, title, author, tags, categories }) => (
          <li key={id} className="mb-6 pb-4 border-b border-border-light dark:border-border-dark last:border-b-0 last:mb-0">
            <Link href={`/articles/${id}`} className="text-accent-light dark:text-accent-dark hover:underline">
              <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
            </Link>
            <small className="text-foreground text-opacity-75 dark:text-opacity-75">
              {date} by {author}
            </small>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span key={tag} className="bg-accent-light bg-opacity-10 text-accent-light text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-accent-dark dark:bg-opacity-20 dark:text-accent-dark">
                  {tag}
                </span>
              ))}
              {categories.map((category) => (
                <span key={category} className="bg-accent-light bg-opacity-10 text-accent-light text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-accent-dark dark:bg-opacity-20 dark:text-accent-dark">
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
