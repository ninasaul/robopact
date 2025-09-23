import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getLocalizedPath } from '@/lib/routing';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          页面未找到
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link
          href={getLocalizedPath('/', 'zh')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
