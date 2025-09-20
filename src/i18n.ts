import { getRequestConfig } from 'next-intl/server';

// 支持的语言列表
export const locales = ['en', 'fr', 'ja', 'ko', 'th', 'zh'] as const;
export type Locale = (typeof locales)[number];

// 语言映射：系统语言到应用语言的映射
const languageMap: Record<string, Locale> = {
  'zh-Hans': 'zh',
  'zh-Hans-CN': 'zh',
  'zh-CN': 'zh',
  'zh': 'zh',
  'en-US': 'en',
  'en-CN': 'en',
  'en': 'en',
  'fr-FR': 'fr',
  'fr': 'fr',
  'ja-JP': 'ja',
  'ja': 'ja',
  'ko-KR': 'ko',
  'ko': 'ko',
  'th-TH': 'th',
  'th': 'th'
};

// 获取系统默认语言
function getSystemDefaultLocale(): Locale {
  // 在服务器端，尝试从环境变量获取语言
  if (typeof window === 'undefined') {
    const acceptLanguage = process.env.NEXT_PUBLIC_ACCEPT_LANGUAGE || '';
    const systemLang = acceptLanguage.split(',')[0]?.split('-')[0];
    return languageMap[systemLang] || 'en';
  }
  
  // 在客户端，从浏览器获取语言
  const browserLang = navigator.language;
  const langCode = browserLang.split('-')[0];
  const fullLang = browserLang;
  
  // 优先匹配完整语言代码，然后匹配语言代码
  return languageMap[fullLang] || languageMap[langCode] || 'en';
}

// 默认语言：基于当前系统设置，使用中文
export const defaultLocale: Locale = 'zh';

// 语言名称映射
export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  th: 'ไทย',
  zh: '简体中文'
};

export default getRequestConfig(async ({ locale }) => {
  // 确保 locale 有值，如果没有则使用默认语言
  const validLocale = locale || defaultLocale;
  
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});