'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n';

export function LanguageInitializer() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 检查 localStorage 中的语言偏好
    const storedLocale = localStorage.getItem('NEXT_LOCALE');
    
    if (storedLocale && locales.includes(storedLocale as any)) {
      // 检查当前路径是否已经包含语言前缀
      const currentLocale = pathname.split('/')[1];
      
      if (currentLocale !== storedLocale) {
        // 如果存储的语言与当前路径不匹配，重定向到正确的语言路径
        const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
        
        if (storedLocale === defaultLocale) {
          // 如果是默认语言，重定向到无前缀的路径
          if (pathname !== pathWithoutLocale) {
            router.push(pathWithoutLocale);
          }
        } else {
          // 如果不是默认语言，重定向到带语言前缀的路径
          const newPath = `/${storedLocale}${pathWithoutLocale}`;
          if (pathname !== newPath) {
            router.push(newPath);
          }
        }
      }
    }
  }, [pathname, router]);

  // 这个组件不渲染任何内容
  return null;
}
