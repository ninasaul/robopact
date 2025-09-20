'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedPath } from '@/lib/routing';
import { useEffect, useState } from 'react';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 页面加载完成后触发动画
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`text-center lg:text-left transition-all duration-1000 ease-out ${isLoaded ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-50px]'}`}>
              <h1 className={`text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-all duration-1000 ease-out delay-200 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                {t('hero.title')}
              </h1>
              <p className={`text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                {t('hero.subtitle')}
              </p>
              <p className={`text-lg text-gray-500 dark:text-gray-400 mb-12 leading-relaxed transition-all duration-1000 ease-out delay-400 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                {t('hero.description')}
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 ease-out delay-500 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                <Link
                  href={getLocalizedPath('/create', locale)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {t('navigation.createPact')}
                </Link>
                <Link
                  href={getLocalizedPath('/pacts', locale)}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {t('navigation.myPacts')}
                </Link>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className={`relative group transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'animate-slide-in-right' : 'opacity-0 translate-x-[50px]'}`}>
              <div className="banner-container relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/image-banner.png"
                  alt="RoboPact Banner"
                  width={600}
                  height={400}
                  className="banner-image w-full h-auto object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>
              </div>
              {/* Decorative elements with floating animation */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full float-animation transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-500/15 delay-700 ${isLoaded ? 'animate-scale-in' : 'opacity-0 scale-0'}`}></div>
              <div className={`absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full float-animation-delayed transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-500/15 delay-1000 ${isLoaded ? 'animate-scale-in' : 'opacity-0 scale-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-600 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 delay-700 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">快</div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('features.fastArbitration.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('features.fastArbitration.description')}
                </p>
              </div>
            </div>

            <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 delay-800 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">安</div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('features.tamperProof.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('features.tamperProof.description')}
                </p>
              </div>
            </div>

            <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 delay-900 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">奖</div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t('features.economicIncentive.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('features.economicIncentive.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
