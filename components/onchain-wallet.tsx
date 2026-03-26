"use client"

import {
  ConnectWallet,
  Wallet,
  WalletAdvanced,
  WalletAdvancedAddressDetails,
  WalletAdvancedTokenHoldings,
  WalletAdvancedTransactionActions,
  WalletAdvancedWalletActions,
} from "@coinbase/onchainkit/wallet"
import { Avatar, Name, Identity, Address } from "@coinbase/onchainkit/identity"
import { color } from "@coinbase/onchainkit/theme"
import { useState } from "react"
import { useAccount as useWagmiAccount } from "wagmi"

export function OnchainWallet() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { isConnected } = useWagmiAccount()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 max-w-xs">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">OnchainKit Demo</h3>
          {isConnected && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
            >
              {isExpanded ? "Hide Details" : "Show Details"}
            </button>
          )}
        </div>

        <Wallet>
          <ConnectWallet>
            <div className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              <Avatar className="h-5 w-5" />
              <span>{isConnected ? <Name /> : "Connect with OnchainKit"}</span>
            </div>
          </ConnectWallet>

          {isExpanded && (
            <WalletAdvanced>
              <div className="mt-4 space-y-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                  <Identity hasCopyAddressOnClick>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-8 w-8" />
                      <div>
                        <Name className="font-medium" />
                        <Address className={color.foregroundMuted + " text-xs"} />
                      </div>
                    </div>
                  </Identity>
                </div>

                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                  <h4 className="text-xs font-medium mb-2">Wallet Actions</h4>
                  <WalletAdvancedWalletActions />
                </div>

                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                  <h4 className="text-xs font-medium mb-2">Address Details</h4>
                  <WalletAdvancedAddressDetails />
                </div>

                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                  <h4 className="text-xs font-medium mb-2">Transaction Actions</h4>
                  <WalletAdvancedTransactionActions />
                </div>

                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                  <h4 className="text-xs font-medium mb-2">Token Holdings</h4>
                  <WalletAdvancedTokenHoldings />
                </div>
              </div>
            </WalletAdvanced>
          )}
        </Wallet>
      </div>
    </div>
  )
}

