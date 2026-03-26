import type { Metadata } from "next"
import { TippingDashboard } from "@/components/tipping-dashboard"
import { TwitchStream } from "@/components/twitch-stream"
import { NFTRewardsBanner } from "@/components/nft-rewards-banner"
import { NetworkStatus } from "@/components/network-status"
import { TopTippers } from "@/components/top-tippers"
import { NFTShowcase } from "@/components/nft-showcase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { WalletConnect } from "@/components/wallet-connect"

export const metadata: Metadata = {
  title: "BaseTip - Social Tipping on Base",
  description: "Send tips and recognition to others on the Base network",
}

// Sample streamer data with images
const POPULAR_STREAMERS = [
  {
    name: "ninja",
    displayName: "Ninja",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/6d942669-203f-464d-8623-db376ff971e0-profile_image-300x300.png",
  },
  {
    name: "pokimane",
    displayName: "Pokimane",
    image: "https://static-cdn.jtvnw.net/jtv_user_pictures/pokimane-profile_image-5fdd3d1e00c3c9f5-300x300.png",
  },
  {
    name: "shroud",
    displayName: "shroud",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/7ed5e0c6-0191-4eef-8328-4af6e4ea5318-profile_image-300x300.png",
  },
  {
    name: "timthetatman",
    displayName: "TimTheTatman",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/bd6ad022-5295-4ce6-9d21-37b32200c0d2-profile_image-300x300.png",
  },
  {
    name: "xqc",
    displayName: "xQc",
    image: "https://static-cdn.jtvnw.net/jtv_user_pictures/xqc-profile_image-9298dca608632101-300x300.jpeg",
  },
]

const TOP_TIPPED_STREAMERS = [
  {
    name: "xqc",
    displayName: "xQc",
    amount: "12.45",
    image: "https://static-cdn.jtvnw.net/jtv_user_pictures/xqc-profile_image-9298dca608632101-300x300.jpeg",
  },
  {
    name: "pokimane",
    displayName: "Pokimane",
    amount: "8.32",
    image: "https://static-cdn.jtvnw.net/jtv_user_pictures/pokimane-profile_image-5fdd3d1e00c3c9f5-300x300.png",
  },
  {
    name: "shroud",
    displayName: "shroud",
    amount: "6.78",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/7ed5e0c6-0191-4eef-8328-4af6e4ea5318-profile_image-300x300.png",
  },
  {
    name: "timthetatman",
    displayName: "TimTheTatman",
    amount: "5.21",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/bd6ad022-5295-4ce6-9d21-37b32200c0d2-profile_image-300x300.png",
  },
  {
    name: "ninja",
    displayName: "Ninja",
    amount: "4.67",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/6d942669-203f-464d-8623-db376ff971e0-profile_image-300x300.png",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="font-bold text-xl">BaseTip</span>
          </div>
          <nav className="ml-auto flex gap-4 items-center">
            <a href="#" className="text-sm font-medium hover:underline">
              Home
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              Streamers
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              About
            </a>
            <div className="ml-4">
              <WalletConnect />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-6 md:py-12 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">BaseTip</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Send tips to friends, creators, and Twitch streamers on Base
                </p>
                <NetworkStatus />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-6">
          <div className="container px-4 md:px-6">
            <NFTRewardsBanner />
          </div>
        </section>

        <section className="w-full py-6 md:py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="streamers" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 md:grid-cols-5 mb-8">
                <TabsTrigger value="streamers">Twitch Streamers</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="rewards">My Rewards</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>
              <TabsContent value="streamers">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <TwitchStream />
                  </div>
                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6">
                      <h3 className="text-lg font-bold mb-4">Popular Streamers</h3>
                      <div className="space-y-4">
                        {POPULAR_STREAMERS.map((streamer) => (
                          <div key={streamer.name} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={streamer.image} alt={streamer.displayName} />
                              <AvatarFallback>{streamer.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{streamer.displayName}</span>
                            <Badge variant="outline" size="sm" className="ml-auto text-red-500">
                              Live
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-6">
                      <h3 className="text-lg font-bold mb-4">Top Tipped Streamers</h3>
                      <div className="space-y-4">
                        {TOP_TIPPED_STREAMERS.map((streamer, index) => (
                          <div key={streamer.name} className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-background font-bold text-sm">
                              {index + 1}
                            </div>
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={streamer.image} alt={streamer.displayName} />
                              <AvatarFallback>{streamer.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{streamer.displayName}</span>
                            <Badge variant="outline" className="ml-auto">
                              {streamer.amount} ETH
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="dashboard">
                <TippingDashboard />
              </TabsContent>
              <TabsContent value="leaderboard">
                <div className="max-w-2xl mx-auto">
                  <TopTippers />
                </div>
              </TabsContent>
              <TabsContent value="rewards">
                <div className="max-w-4xl mx-auto">
                  <NFTShowcase />
                </div>
              </TabsContent>
              <TabsContent value="about">
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>About BaseTip</CardTitle>
                      <CardDescription>Social tipping on the Base network</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        BaseTip is a decentralized platform that allows viewers to easily send ETH tips to their favorite Twitch streamers and creators on the Base Sepolia testnet.
                      </p>
                      <p>
                        Our mission is to foster a more direct relationship between creators and their communities by utilizing low-cost, fast transactions on Base.
                      </p>
                      <h3 className="font-semibold mt-4 text-lg">How It Works:</h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Connect your wallet (MetaMask or Coinbase Wallet) to the Base Sepolia testnet.</li>
                        <li>Browse popular streamers or watch the embedded Twitch streams.</li>
                        <li>Send a tip directly to the streamer's wallet using the Tipping Dashboard or Twitch integration.</li>
                        <li>Your tip will appear on the leaderboard, and top tippers receive exclusive NFT badges!</li>
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row md:justify-between">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left dark:text-gray-400">
            Built on{" "}
            <a
              href="https://sepolia-explorer.base.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Base Sepolia
            </a>
          </p>
          <p className="text-center text-sm leading-loose text-gray-500 md:text-right">
            Top tippers receive daily NFT rewards
          </p>
        </div>
      </footer>
    </div>
  )
}

