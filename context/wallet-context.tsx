"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAccount as useWagmiAccount } from "wagmi"

interface WalletContextType {
  isConnected: boolean
  address: string | null
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
})

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const { isConnected, address } = useWagmiAccount()

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  return useContext(WalletContext)
}

