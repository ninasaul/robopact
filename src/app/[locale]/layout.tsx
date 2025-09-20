import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  
  return {
    title: messages.app?.title as string || 'RoboPact',
    description: messages.app?.description as string || 'Robot Pact Application',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  
  // 验证 locale 是否在支持的语言列表中
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <NextIntlClientProvider messages={messages}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
