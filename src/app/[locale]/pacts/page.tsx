'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePactStore } from '@/store/pactStore';
import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedPath } from '@/lib/routing';

export default function PactsPage() {
  const { address, isConnected } = useAccount();
  const { getUserPacts } = usePactStore();
  const t = useTranslations();
  const locale = useLocale();

  // 模拟数据 - 在实际应用中这些数据会从智能合约中获取
  useEffect(() => {
    if (isConnected && address) {
      // 这里会从智能合约中获取用户的契约数据
      console.log('Loading pacts for address:', address);
    }
  }, [isConnected, address]);

  const mockPacts = [
    {
      id: '1',
      creator: '0x123...456',
      opponent: '0x789...abc',
      description: t('pacts.mockData.example1.description'),
      stake: '0.01',
      deadline: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7天后
      creatorFinished: false,
      opponentFinished: false,
      resolved: false,
    },
    {
      id: '2',
      creator: '0x123...456',
      opponent: '0xdef...ghi',
      description: t('pacts.mockData.example2.description'),
      stake: '0.05',
      deadline: Date.now() - 24 * 60 * 60 * 1000, // 已过期
      creatorFinished: true,
      opponentFinished: false,
      resolved: false,
    },
  ];

  const formatTimeRemaining = (deadline: number) => {
    const now = Date.now();
    const diff = deadline - now;
    
    if (diff <= 0) {
      return t('pacts.status.expired');
    }
    
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    if (days > 0) {
      return t('pacts.timeRemaining.daysHours', { days, hours });
    } else {
      return t('pacts.timeRemaining.hours', { hours });
    }
  };

  const getPactStatus = (pact: any) => {
    const now = Date.now();
    const isExpired = pact.deadline <= now;
    
    if (pact.resolved) {
      return t('pacts.status.resolved');
    } else if (isExpired) {
      return t('pacts.status.pending');
    } else {
      return t('pacts.status.active');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case t('pacts.status.resolved'):
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case t('pacts.status.pending'):
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case t('pacts.status.active'):
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t('pacts.connectWallet.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('pacts.connectWallet.description')}
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('pacts.title')}
            </h1>
            <Link
              href={getLocalizedPath('/create', locale)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              {t('pacts.createNew')}
            </Link>
          </div>

          {mockPacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 text-blue-500 font-bold">PACT</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('pacts.empty.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('pacts.empty.description')}
              </p>
              <Link
                href={getLocalizedPath('/create', locale)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
              >
                {t('pacts.empty.createButton')}
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {mockPacts.map((pact) => {
                const status = getPactStatus(pact);
                const isExpired = pact.deadline <= Date.now();
                const isCreator = pact.creator.toLowerCase() === address?.toLowerCase();
                
                return (
                  <div key={pact.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {pact.description}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                          <span>{t('pacts.pact.stake')}: {pact.stake} ETH</span>
                          <span>•</span>
                          <span>{t('pacts.pact.opponent')}: {pact.opponent.slice(0, 6)}...{pact.opponent.slice(-4)}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                        {status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {isExpired ? (
                          <span className="text-red-600 dark:text-red-400">{t('pacts.status.expired')}</span>
                        ) : (
                          <span>{t('pacts.timeRemaining.label')}: {formatTimeRemaining(pact.deadline)}</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        {!isExpired && !pact.resolved && (
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
                            onClick={() => {
                              // TODO: 调用 markAsFinished 函数
                              alert(t('pacts.actions.markCompleteAlert'));
                            }}
                          >
                            {t('pacts.actions.markComplete')}
                          </button>
                        )}
                        
                        {isExpired && !pact.resolved && (
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
                            onClick={() => {
                              // TODO: 调用 resolvePact 函数
                              alert(t('pacts.actions.resolveAlert'));
                            }}
                          >
                            {t('pacts.actions.resolve')}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 进度显示 */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span>{t('pacts.progress.creator')}: {pact.creatorFinished ? t('pacts.progress.completed') : t('pacts.progress.inProgress')}</span>
                        <span>{t('pacts.progress.opponent')}: {pact.opponentFinished ? t('pacts.progress.completed') : t('pacts.progress.inProgress')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
    </div>
  );
}
