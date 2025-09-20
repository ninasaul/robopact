import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // 检查是否有语言偏好参数
  const url = request.nextUrl.clone();
  const locale = url.searchParams.get('locale');
  
  // 如果有 locale 参数，重定向到对应的语言路径
  if (locale && locales.includes(locale as any)) {
    url.searchParams.delete('locale');
    url.pathname = `/${locale}${url.pathname}`;
    return Response.redirect(url);
  }

  // 使用 next-intl 的默认中间件处理其他情况
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
