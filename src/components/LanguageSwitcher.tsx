'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, defaultLocale } from '../i18n';
import { useState, useTransition, useEffect, useRef, useCallback } from 'react';

// 语言代码映射
const localeCodes: Record<string, string> = {
  en: 'US',
  fr: 'FR',
  ja: 'JP',
  ko: 'KR',
  th: 'TH',
  zh: 'CN'
};

// 国旗图标映射 - 使用 jsdelivr CDN country-flag-icons 库
const flagIcons: Record<string, string> = {
  en: 'https://cdn.jsdelivr.net/npm/country-flag-icons@latest/flags/3x2/US.svg',
  fr: 'https://cdn.jsdelivr.net/npm/country-flag-icons@latest/flags/3x2/FR.svg',
  ja: 'https://cdn.jsdelivr.net/npm/country-flag-icons@latest/flags/3x2/JP.svg',
  ko: 'https://cdn.jsdelivr.net/npm/country-flag-icons@latest/flags/3x2/KR.svg',
  th: 'https://cdn.jsdelivr.net/npm/country-flag-icons@latest/flags/3x2/TH.svg',
  zh: 'https://cdn.jsdelivr.net/npm/country-flag-icons@latest/flags/3x2/CN.svg'
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(locale);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 同步当前语言状态
  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  // 从路径中提取当前语言
  const getCurrentLocaleFromPath = useCallback(() => {
    const pathSegments = pathname.split('/');
    const firstSegment = pathSegments[1];
    
    if (locales.includes(firstSegment as any)) {
      return firstSegment;
    }
    return defaultLocale;
  }, [pathname]);

  // 确保显示的语言与当前语言一致
  useEffect(() => {
    const pathLocale = getCurrentLocaleFromPath();
    if (pathLocale !== currentLocale) {
      setCurrentLocale(pathLocale);
    }
  }, [pathname, currentLocale, getCurrentLocaleFromPath]);

  const handleLocaleChange = useCallback((newLocale: string) => {
    if (newLocale === currentLocale || isPending) return;
    
    startTransition(() => {
      try {
        // 使用 localStorage 存储语言偏好
        localStorage.setItem('NEXT_LOCALE', newLocale);
        console.log(`设置语言到 localStorage: NEXT_LOCALE=${newLocale}`);
        
        // 获取当前路径并移除语言前缀
        const currentPath = window.location.pathname;
        const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '') || '/';
        
        // 构建新的 URL
        const url = new URL(window.location.href);
        url.pathname = pathWithoutLocale;
        url.searchParams.set('locale', newLocale);
        
        // 使用 window.location.href 进行完整页面重定向
        window.location.href = url.toString();
      } catch (error) {
        console.error('语言切换失败:', error);
      }
    });
    
    setIsOpen(false);
  }, [currentLocale, isPending]);

  // 键盘导航支持
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const firstButton = menuRef.current?.querySelector('button');
        firstButton?.focus();
        break;
    }
  }, [isOpen]);

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const currentLocaleName = localeNames[currentLocale as keyof typeof localeNames];
  const currentCode = localeCodes[currentLocale];
  const currentFlagIcon = flagIcons[currentLocale];

  return (
    <div className="relative">
      {/* 自定义下拉选择器 */}
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={t('languageSwitcher.ariaLabel', { currentLanguage: currentLocaleName })}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <img 
            src={currentFlagIcon} 
            alt={`${currentLocaleName} flag`}
            className="w-6 h-4 object-cover rounded-sm"
            loading="lazy"
          />
          
          {/* 加载状态 */}
          {isPending ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" role="status" aria-label={t('languageSwitcher.switchingLanguage')}></div>
          ) : (
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        {/* 下拉菜单 */}
        {isOpen && (
          <div 
            ref={menuRef}
            onKeyDown={handleMenuKeyDown}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50"
            role="listbox"
            aria-label={t('languageSwitcher.selectLanguage')}
          >
            <div className="py-1">
              {locales.map((loc) => {
                const isSelected = loc === currentLocale;
                const flagIcon = flagIcons[loc];
                const name = localeNames[loc];
                
                return (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLocaleChange(loc);
                      }
                    }}
                    disabled={isPending}
                    role="option"
                    aria-selected={isSelected}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 ${
                      isSelected ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <img 
                      src={flagIcon} 
                      alt={`${name} flag`}
                      className="w-6 h-4 object-cover rounded-sm"
                      loading="lazy"
                    />
                    <span className="flex-1 font-medium">{name}</span>
                    {isSelected && (
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
