"use client";

import { useRouter } from "next/navigation";
import { type Plan } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

export const CheckoutButton = forwardRef<
  ElementRef<typeof Button>,
  ComponentPropsWithoutRef<typeof Button> & {
    children: React.ReactNode;
    plan: Plan;
    currentPlan?: Plan;
    embed?: boolean;
  }
>(({ children, plan, currentPlan, ...props }, ref) => {
  const { mutate: getCheckoutURL, isLoading } =
    api.billing.getCheckoutUrl.useMutation();

  const router = useRouter();
  const isCurrent = currentPlan && plan.id === currentPlan.id;

  const { toast } = useToast();

  const onClick = () => {
    getCheckoutURL(
      {
        variantId: plan.variantId,
        embed: true,
      },
      {
        onSuccess: (url) => router.push(url ?? "/"),
        onError: () =>
          toast({
            title: "Error creating a checkout.",
            description:
              "Please check the server console for more information.",
          }),
      },
    );
  };

  return (
    <Button
      ref={ref}
      disabled={isLoading || isCurrent}
      onClick={onClick}
      {...props}
    >
      {!isLoading && <span>{children}</span>}
      {isLoading && <Loader2Icon className="ml-1.5 h-4 w-4 animate-spin" />}
    </Button>
  );
});
CheckoutButton.displayName = "CheckoutButton";
