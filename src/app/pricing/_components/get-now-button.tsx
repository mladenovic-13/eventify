"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

export const GetNowButton = () => {
  const { data: plan } = api.billing.getPlan.useQuery({ type: "professional" });
  const { data: currentPlan } = api.billing.getCurrentPlan.useQuery();

  const { mutate: getCheckoutURL, isPending } =
    api.billing.getCheckoutUrl.useMutation();

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window.createLemonSqueezy === "function") {
      window.createLemonSqueezy();
    }
  }, []);

  const onClick = () => {
    if (!plan?.variantId) return;

    getCheckoutURL(
      { variantId: plan?.variantId, embed: false },
      {
        onSuccess: (url) => router.push(url ?? "/"),
        onError: () =>
          toast({
            variant: "destructive",
            title: "Error creating a checkout.",
            description:
              "Please check the server console for more information.",
          }),
      },
    );
  };

  const isPremium = currentPlan?.productId === 207991;

  return (
    <Button
      disabled={isPending || isPremium}
      onClick={onClick}
      className="w-full"
    >
      Get Now
    </Button>
  );
};
