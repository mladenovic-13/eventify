"use client";

import { Tabs } from "@radix-ui/react-tabs";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import { type Timeframe } from "./events";

interface EventDateTabsProps {
  value: Timeframe;
  onValueChange: (value: Timeframe) => void;
}

export const EventTimeframeTabs = ({
  value,
  onValueChange,
}: EventDateTabsProps) => {
  return (
    <Tabs
      value={value}
      onValueChange={(value) => onValueChange(value as Timeframe)}
    >
      <TabsList>
        <TabsTrigger
          value="upcoming"
          className="w-24 hover:text-accent-foreground md:w-32"
        >
          Upcoming
        </TabsTrigger>

        <TabsTrigger
          value="past"
          className="w-24 hover:text-accent-foreground md:w-32"
        >
          Past
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
