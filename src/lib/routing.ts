import { defaultLocale } from '@/i18n';

/**
 * 生成本地化的路由路径
 * @param path 目标路径
 * @param locale 当前语言
 * @returns 本地化后的路径
 */
export function getLocalizedPath(path: string, locale: string): string {
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 所有语言都需要前缀，包括默认语言
  // 这样确保在 [locale] 路由结构中正确工作
  return `/${locale}${normalizedPath}`;
}
