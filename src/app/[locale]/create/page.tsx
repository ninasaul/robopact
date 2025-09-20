'use client';

import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { CustomConnectButton } from '@/components/CustomConnectButton';
import { useTranslations } from 'next-intl';

export default function CreatePact() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const t = useTranslations();
  
  const [formData, setFormData] = useState({
    description: '',
    opponent: '',
    stake: '',
    duration: '1', // days
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;

    // TODO: 实现智能合约调用
    console.log('Creating pact:', formData);
    
    // 模拟创建契约
    alert(t('create.form.submit.featureComingSoon'));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t('create.connectWallet.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('create.connectWallet.description')}
          </p>
          <div className="flex justify-center">
            <CustomConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('create.title')}
          </h1>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('create.form.description.label')} *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t('create.form.description.placeholder')}
                />
              </div>

              <div>
                <label htmlFor="opponent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('create.form.opponent.label')} *
                </label>
                <input
                  type="text"
                  id="opponent"
                  name="opponent"
                  value={formData.opponent}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t('create.form.opponent.placeholder')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="stake" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('create.form.stake.label')} *
                  </label>
                  <input
                    type="number"
                    id="stake"
                    name="stake"
                    value={formData.stake}
                    onChange={handleInputChange}
                    required
                    min="0.001"
                    step="0.001"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={t('create.form.stake.placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('create.form.duration.label')} *
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  {t('create.warning.title')}
                </h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• {t('create.warning.rule1')}</li>
                  <li>• {t('create.warning.rule2')}</li>
                  <li>• {t('create.warning.rule3')}</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
{isPending ? t('create.form.submit.creating') : t('create.form.submit.create')}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}
