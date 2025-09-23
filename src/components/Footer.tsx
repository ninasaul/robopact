'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getLocalizedPath } from '@/lib/routing';
import { ThemeToggle } from '@/components/ThemeToggle';

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <footer className={`bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 ${className}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              RoboPact
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              {t('app.description')}
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wide">
              {t('footer.quickNavigation')}
            </h4>
            <nav className="space-y-2">
              <Link
                href={getLocalizedPath('/', locale)}
                className="block text-sm text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('footer.home')}
              </Link>
              <Link
                href={getLocalizedPath('/create', locale)}
                className="block text-sm text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('navigation.createPact')}
              </Link>
              <Link
                href={getLocalizedPath('/pacts', locale)}
                className="block text-sm text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('navigation.myPacts')}
              </Link>
            </nav>
          </div>
        </div>

        {/* 版权信息 */}
          <div className="border-t border-neutral-200 dark:border-neutral-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              {/* 主题切换按钮 */}
              <ThemeToggle 
                size="sm" 
                showLabel={true}
                variant="button"
                className="text-sm"
              />
              
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {t('footer.privacyPolicy')}
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {t('footer.termsOfService')}
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {t('footer.contactUs')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
