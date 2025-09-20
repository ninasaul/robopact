'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CustomConnectButton } from './CustomConnectButton';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const locale = useLocale();

  return (
    <header className={`flex justify-between items-center p-6 ${className}`}>
      <Link 
        href={`/${locale}`} 
        className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        🤖 RoboPact
      </Link>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <CustomConnectButton />
      </div>
    </header>
  );
}
