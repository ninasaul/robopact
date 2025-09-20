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
const ROBO_PACT_CONTRACT_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // <-- 本地测试地址, 部署后请替换
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
    const stakeInWei = parseEther(formData.stake as `${number}`);

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t("create.connectWallet.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center z-20 relative">
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
          className="relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg shadow-lg group"
        >
          <div className="space-y-6 relative z-10">
            {/* Form fields remain the same */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t("create.form.description.placeholder")}
              />
            </div>

            <div>
              <label
                htmlFor="opponent"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={t("create.form.opponent.placeholder")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="stake"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t("create.form.stake.placeholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
            <div className="h-10 text-center">
              {isPending && (
                <div className="text-gray-600 dark:text-gray-300">
                  请在钱包中确认...
                </div>
              )}
              {isConfirming && (
                <div className="text-blue-600 dark:text-blue-400">
                  正在创建契约，等待区块链确认...
                </div>
              )}
              {isConfirmed && (
                <div className="text-green-600 dark:text-green-400">
                  <p>契约创建成功！</p>
                  <a
                    href={`${MONAD_EXPLORER_URL}/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    查看交易详情
                  </a>
                </div>
              )}
              {error && (
                <div className="text-red-500 text-sm break-words">
                  错误: {(error as any).shortMessage || error.message}
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
