"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CustomConnectButton } from "@/components/CustomConnectButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { parseEther } from "viem";

// 1. 导入合约 ABI
import RoboPactAbi from "@/utils/abi/RoboPact.json";

// 2. 定义合约地址和浏览器 URL
const ROBO_PACT_CONTRACT_ADDRESS = "0x8F19309B7e16e3414C679F9af495338A2ff7F6d0"; // <-- 本地测试地址, 部署后请替换
const MONAD_EXPLORER_URL = "https://testnet.monadexplorer.com";

export default function CreatePact() {
  const { address, isConnected } = useAccount();
  const t = useTranslations();

  // wagmi hooks for writing to the contract and getting transaction status
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Form state
  const [formData, setFormData] = useState({
    description: "",
    opponent: "",
    stake: "",
    duration: "1", // days
  });

  // Reset form after successful submission
  useEffect(() => {
    if (isConfirmed) {
      setFormData({
        description: "",
        opponent: "",
        stake: "",
        duration: "1",
      });
    }
  }, [isConfirmed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;

    const durationInSeconds = BigInt(formData.duration) * BigInt(86400);
    const stakeInWei = parseEther(formData.stake as `${number}`); // Convert MON to wei

    // Call the contract
    writeContract({
      address: ROBO_PACT_CONTRACT_ADDRESS,
      abi: RoboPactAbi.abi,
      functionName: "createPact",
      args: [formData.description, formData.opponent, durationInSeconds],
      value: stakeInWei,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
            {t("create.connectWallet.title")}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 mb-8">
            {t("create.connectWallet.description")}
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
      <div className="max-w-2xl mx-auto relative">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center z-20 relative">
          {t("create.title")}
        </h1>

        <div className="absolute inset-0 opacity-30 dark:opacity-15 z-0">
          <div className="w-full h-full transition-transform duration-700 ease-out hover:-translate-y-4">
            <Image
              src="/image-banner.png"
              alt="Background"
              fill
              className="object-cover -translate-y-[20%]"
              priority={false}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-white/30 dark:bg-neutral-800/30 backdrop-blur-sm p-8 rounded-lg shadow-lg group"
        >
          <div className="space-y-6 relative z-10">
            {/* Form fields remain the same */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
              >
                {t("create.form.description.label")} *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                placeholder={t("create.form.description.placeholder")}
              />
            </div>

            <div>
              <label
                htmlFor="opponent"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
              >
                {t("create.form.opponent.label")} *
              </label>
              <input
                type="text"
                id="opponent"
                name="opponent"
                value={formData.opponent}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                placeholder={t("create.form.opponent.placeholder")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="stake"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  {t("create.form.stake.label")} *
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
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                  placeholder={t("create.form.stake.placeholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                >
                  {t("create.form.duration.label")} *
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
                  className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:text-white"
                />
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                {t("create.warning.title")}
              </h3>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• {t("create.warning.rule1")}</li>
                <li>• {t("create.warning.rule2")}</li>
                <li>• {t("create.warning.rule3")}</li>
              </ul>
            </div>

            {/* --- Notification Area --- */}
            <div className="min-h-[60px] w-full">
              {isPending && (
                <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">{t("create.notifications.pending")}</span>
                </div>
              )}
              {isConfirming && (
                <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">{t("create.notifications.confirming")}</span>
                </div>
              )}
              {isConfirmed && (
                <div className="flex flex-col items-center gap-3 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{t("create.notifications.success")}</span>
                  </div>
                  <a
                    href={`${MONAD_EXPLORER_URL}/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline hover:opacity-80 transition-opacity"
                  >
                    {t("create.notifications.viewTransaction")}
                  </a>
                </div>
              )}
              {error && (
                <div className="flex items-center gap-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm break-words">
                    <span className="font-medium">{t("create.notifications.error")}: </span>
                    <span>{(error as any).shortMessage || error.message}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-md transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isPending
                ? "等待确认..."
                : isConfirming
                ? "创建中..."
                : t("create.form.submit.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
