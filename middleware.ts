import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // 使用 next-intl 的默认中间件处理所有情况
  const intlMiddleware = createMiddleware({
    // 支持的语言列表
    locales,
    
    // 默认语言：使用配置的默认语言
    defaultLocale,
    
    // 语言检测策略：启用 cookie 检测
    localeDetection: true,
    
    // 使用 always 模式，所有语言都显示前缀
    localePrefix: 'always'
  });

  return intlMiddleware(request);
}

export const config = {
  // 匹配所有路径，除了 API 路由、静态文件和图片
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
