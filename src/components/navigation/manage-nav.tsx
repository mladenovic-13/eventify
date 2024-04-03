"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

interface ManageNavProps {
  items: { title: string; href: string }[];
  navigateBack: {
    label: string;
    href: string;
  };
  navigateForward: {
    label: string;
    href: string;
  };
}

export const ManageNav = ({
  items,
  navigateBack,
  navigateForward,
}: ManageNavProps) => {
  const pathname = usePathname();

  const isCalendarSettings =
    pathname.includes("settings") && pathname.includes("calendar");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Link
          href={navigateBack.href}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ChevronLeftIcon className="mr-1.5 size-4" /> {navigateBack.label}
        </Link>
        <Link
          href={navigateForward.href}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          {navigateForward.label} <ChevronRightIcon className="ml-1.5 size-4" />
        </Link>
      </div>
      <div className="flex">
        <ul className="flex justify-start gap-5 overflow-x-auto overflow-y-hidden rounded-none bg-transparent px-3 text-muted-foreground md:overflow-hidden md:px-0">
          {items.map((item) => (
            <Link key={item.title} href={item.href}>
              <li
                className={cn(
                  "flex items-center rounded-none border-b-2 border-transparent py-2 text-sm font-medium transition duration-300",
                  (pathname === item.href ||
                    (item.href.includes("settings") && isCalendarSettings)) &&
                    "border-primary-foreground text-primary-foreground",
                )}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};