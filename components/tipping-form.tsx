"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAccount } from "@/hooks/use-account"
import { OnchainTransaction } from "@/components/onchain-transaction"
import { useAccount as useWagmiAccount } from "wagmi"

const formSchema = z.object({
  recipient: z.string().min(42, {
    message: "Recipient address must be a valid Ethereum address.",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  message: z.string().max(200, {
    message: "Message must not be longer than 200 characters.",
  }),
})

export function TippingForm() {
  const { toast } = useToast()
  const { address } = useAccount()
  const { isConnected } = useWagmiAccount()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTransaction, setShowTransaction] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      amount: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to send tips",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setShowTransaction(true)
  }

  const handleTransactionSuccess = (txHash: string) => {
    toast({
      title: "Tip sent successfully!",
      description: `You sent ${form.getValues("amount")} ETH to ${form.getValues("recipient").slice(0, 6)}...${form.getValues("recipient").slice(-4)}`,
    })

    form.reset()
    setIsSubmitting(false)
    setShowTransaction(false)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>Enter the Base wallet address of the recipient.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (ETH)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.001" min="0.001" placeholder="0.01" {...field} />
                  </FormControl>
                  <FormDescription>Enter the amount of ETH you want to send.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Thanks for your help!" {...field} />
                  </FormControl>
                  <FormDescription>Add a personal message to your tip.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showTransaction ? (
              <OnchainTransaction
                amount={form.getValues("amount")}
                message={form.getValues("message")}
                onSuccess={handleTransactionSuccess}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
              />
            ) : (
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Preparing..." : "Send Tip"}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

