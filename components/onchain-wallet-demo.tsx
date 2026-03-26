"use client"

import { useEffect, useState } from "react"
import {
  ConnectWallet,
  Wallet,
  WalletAdvanced,
  WalletAdvancedAddressDetails,
  WalletAdvancedTokenHoldings,
  WalletAdvancedTransactionActions,
  WalletAdvancedWalletActions,
} from "@coinbase/onchainkit/wallet"
import { Avatar, Name } from "@coinbase/onchainkit/identity"
import { useAccount as useWagmiAccount } from "wagmi"

export function OnchainWalletDemo() {
  const { isConnected, address, chain } = useWagmiAccount()
  const [isExpanded, setIsExpanded] = useState(false)

  // Log connection status for debugging
  useEffect(() => {
    console.log("OnchainKit connection status:", { isConnected, address, chain })
  }, [isConnected, address, chain])

  return (
    <div className="fixed right-4 bottom-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">OnchainKit Demo</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <Wallet>
        {/* Connection Status */}
        {isConnected && (
          <div className="mb-2 text-xs bg-green-100 dark:bg-green-900 p-2 rounded">
            <p>✅ Connected to {chain?.name || "blockchain"}</p>
            {address && <p className="truncate">Address: {address}</p>}
          </div>
        )}

        {/* Connect Button */}
        <ConnectWallet>
          <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            <Avatar className="h-5 w-5" />
            <span>{isConnected ? <Name /> : "Connect with OnchainKit"}</span>
          </button>
        </ConnectWallet>

        {/* Advanced Wallet UI (only shown when expanded) */}
        {isExpanded && (
          <WalletAdvanced>
            <div className="mt-4 space-y-4">
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
  )
}

