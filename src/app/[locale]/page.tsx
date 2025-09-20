'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedPath } from '@/lib/routing';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('hero.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {t('hero.subtitle')}<br />
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={getLocalizedPath('/create', locale)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              {t('navigation.createPact')}
            </Link>
            <Link
              href={getLocalizedPath('/pacts', locale)}
              className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-8 rounded-lg border border-gray-300 transition-colors"
            >
              {t('navigation.myPacts')}
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4 text-blue-500 font-bold">FAST</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.fastArbitration.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('features.fastArbitration.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4 text-green-500 font-bold">LOCK</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.tamperProof.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('features.tamperProof.description')}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-4 text-yellow-500 font-bold">CASH</div>
              <h3 className="text-xl font-semibold mb-2">{t('features.economicIncentive.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('features.economicIncentive.description')}
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
