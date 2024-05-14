import React from "react";
import { FileTextIcon, PencilLineIcon } from "lucide-react";

import {
  useGuestEmails,
  useInviteGuestActions,
  useInviteStep,
} from "@/hooks/use-guest-store";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

import { EventItem } from "./event-item";
import { InviteList } from "./invite-list";

interface SideBarPros {
  prop?: string;
}
export const SideBar = ({}: SideBarPros) => {
  const step = useInviteStep();
  const selectedEmails = useGuestEmails();
  return (
    <div>
      {step !== "generate-email" && step !== "add-guests-directly" && (
        <div className="flex flex-col gap-4 md:h-[540px] md:w-[200px]">
          <ImportActions />
          <EventList />
        </div>
      )}
      {/* remove contidions and move whole "sidebar" for second step to new */}
      {(step === "generate-email" || step === "add-guests-directly") && (
        <InviteList guestsEmails={selectedEmails} />
      )}
    </div>
  );
};

const ImportActions = () => {
  const step = useInviteStep();
  const { setStep } = useInviteGuestActions();
  return (
    <div className="flex flex-col">
      <Button
        className={cn(
          "flex items-center justify-start gap-2 pl-2 font-bold text-accent-foreground hover:bg-accent-foreground/10",
          step === "add-emails" && "bg-accent-foreground/10",
        )}
        variant={"ghost"}
        onClick={() => setStep("add-emails")}
      >
        <PencilLineIcon size={17} className="text-accent-foreground/60 " />
        <p>Enter Emails</p>
      </Button>
      <Button
        className={cn(
          "flex items-center justify-between gap-2 px-2  font-bold text-accent-foreground hover:cursor-not-allowed hover:bg-accent-foreground/10",
          step === "import-CSV" && "bg-accent-foreground/10",
        )}
        variant={"ghost"}
        onClick={() => setStep("import-CSV")}
        disabled={true}
      >
        <div className="flex gap-2">
          <FileTextIcon size={17} className="text-accent-foreground/60" />
          <p>Import CSV</p>
        </div>
        <p className=" text-blue-500">Soon</p>
      </Button>
    </div>
  );
};

interface EventListProps {
  prop?: string;
}
const EventList = ({}: EventListProps) => {
  const { data: userEvents, isLoading } = api.event.list.useQuery({});
  const { setStep, setSelectedEventName, setEventGuests } =
    useInviteGuestActions();
  const onEventClick = (event: RouterOutputs["event"]["list"][number]) => {
    setStep("search-guests");
    setSelectedEventName(event.name);
    setEventGuests(event.guests.map((guest) => guest.email));
  };
  return (
    <div className="flex flex-col gap-2">
      <Label className="px-2 pb-2 text-sm font-semibold uppercase  text-accent-foreground/50">
        Events
      </Label>
      <div className="flex h-[400px]  flex-col gap-2 overflow-y-auto">
        {isLoading && (
          <>
            <Skeleton className="h-12 w-full animate-pulse bg-accent-foreground/10" />
            <Skeleton className="h-12 w-full animate-pulse bg-accent-foreground/10" />
            <Skeleton className="h-12 w-full animate-pulse bg-accent-foreground/10" />
          </>
        )}
        {userEvents?.map((event, idx) => (
          <EventItem
            event={event}
            key={idx}
            onClick={() => onEventClick(event)}
          />
        ))}
      </div>
    </div>
  );
};
