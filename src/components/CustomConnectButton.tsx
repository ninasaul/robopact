'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslations } from 'next-intl';

export function CustomConnectButton() {
  const t = useTranslations('common');

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        const buttonClassName = "flex items-center gap-2 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-medium";

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className={buttonClassName}>
                    <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded">
                      CON
                    </span>
                    <span className="hidden sm:inline">{t('connectWallet')}</span>
                    <span className="sm:hidden">{t('connectWalletShort')}</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className={`${buttonClassName} text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20`}>
                    <span className="text-xs font-bold px-1.5 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">
                      !
                    </span>
                    <span className="hidden sm:inline">{t('connectButton.wrongNetwork')}</span>
                    <span className="sm:hidden">{t('connectButton.wrongNetworkShort')}</span>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={buttonClassName}
                  >
                    {chain.hasIcon && (
                      <div
                        className="w-4 h-4 rounded-full overflow-hidden mr-1"
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden sm:inline">{chain.name}</span>
                    <span className="sm:hidden">{chain.name?.split(' ')[0]}</span>
                  </button>
                  
                  <button onClick={openAccountModal} type="button" className={buttonClassName}>
                    <div className="w-4 h-4 flex items-center justify-center">
                      <img 
                        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${account.address}&backgroundColor=ff9500&size=16`}
                        alt="Wallet"
                        className="w-4 h-4 rounded-sm"
                        loading="lazy"
                      />
                    </div>
                    <span className="hidden sm:inline">{account.displayName}</span>
                    <span className="sm:hidden">{account.displayName?.split(' ')[0]}</span>
                    {account.displayBalance && (
                      <span className="hidden md:inline text-xs text-neutral-500 dark:text-neutral-400">
                        ({account.displayBalance})
                      </span>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
