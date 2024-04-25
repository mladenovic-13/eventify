import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns/esm";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  FileTextIcon,
  PencilLineIcon,
  SendIcon,
} from "lucide-react";
import { z } from "zod";

import { upcomingAndPastEvents } from "@/lib/mock-events";
import { type InviteGuestStep } from "@/types";

import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface InviteGuestsMenuProps {
  prop?: string;
}

export const InviteGuests = ({}: InviteGuestsMenuProps) => {
  const [step, setStep] = useState<InviteGuestStep>("addEmails");

  // const [setselectedGuest, setSetselectedGuest] = useState([]);
  const [emails, setEmails] = useState<Array<string>>([]);

  const handleOnEmailAdded = (value: string) => {
    setEmails([...emails, value]);
  };
  return (
    <section className="flex w-full flex-col">
      <section className="flex w-full items-start gap-2">
        {/* Side menu */}
        <div className="min-h-[450px] max-w-[240px]">
          {(step === "searchGuests" || step === "addEmails") && <SideMenu />}
          {step === "sendInvites" && <div>Inviting </div>}
        </div>
        <Separator orientation="vertical" className="bg-accent-foreground/20" />
        {/* Search area */}
        <div className="flex w-full flex-col">
          {(step === "searchGuests" || step === "addEmails") && (
            <AddEmails
              onEmailAdded={(email) => handleOnEmailAdded(email)}
              emails={emails}
            />
          )}
          {step === "sendInvites" && <p>Generate email for sending</p>}
        </div>
      </section>
      <Separator className="bg-white/20" />
      {(step === "searchGuests" || step === "addEmails") && (
        <div className="flex justify-between">
          <Button
            variant={"ghost"}
            className="pl-2 text-sm font-semibold transition-all hover:bg-transparent hover:text-primary"
          >
            Selected guests
          </Button>
          <Button
            variant={"default"}
            onClick={() => setStep("sendInvites")}
            className="gap-2"
          >
            Next
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      )}
      {step === "sendInvites" && (
        <div className="flex justify-between">
          <Button
            variant={"secondary"}
            onClick={() => setStep("searchGuests")}
            className="gap-2"
          >
            <ChevronLeftIcon size={16} />
            Back
          </Button>
          <Button variant={"default"} className="gap-2">
            Send Invites
            <SendIcon size={16} />
          </Button>
        </div>
      )}
    </section>
  );
};

interface SideMenuPros {
  prop?: string;
}
const SideMenu = ({}: SideMenuPros) => {
  return (
    <section className="flex w-[200px] flex-col gap-4">
      <div className="flex flex-col">
        <Button
          className="flex items-center justify-start gap-2 pl-2 font-bold text-accent-foreground hover:bg-accent-foreground/10"
          variant={"ghost"}
        >
          <PencilLineIcon size={17} className="text-accent-foreground/60 " />
          <p>Enter Emails</p>
        </Button>
        <Button
          className="flex items-center justify-start gap-2 pl-2 font-bold text-accent-foreground hover:bg-accent-foreground/10"
          variant={"ghost"}
        >
          <FileTextIcon size={17} className="text-accent-foreground/60" />
          <p>Import CSV</p>
        </Button>
      </div>
      <Separator className="bg-white/20" />
      <div className="flex flex-col gap-2">
        <Label className="px-2 pb-2 text-sm font-semibold uppercase  text-accent-foreground/50">
          Events
        </Label>
        <div className="flex max-h-[320px] flex-col gap-2 overflow-y-scroll">
          {upcomingAndPastEvents.upcoming.map((ev, idx) => (
            <div
              className="flex flex-col rounded-lg p-1 px-2  transition-all hover:cursor-pointer hover:bg-accent-foreground/10"
              key={idx}
            >
              <h1 className="text-base font-semibold text-accent-foreground">
                {ev.name}
              </h1>
              <div className="flex items-center gap-2 text-xs text-accent-foreground/50">
                <p>{format(ev.date, "PPP")}</p>
                <CircleIcon size={5} />
                <p>2 Guests</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface AddEmailsProps {
  onEmailAdded: (email: string) => void;
  emails: Array<string>;
}
const AddEmails = ({ onEmailAdded, emails }: AddEmailsProps) => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(value: z.infer<typeof formSchema>) {
    onEmailAdded(value.email);
    form.reset({ email: "" });
  }
  return (
    <section className="flex flex-col  pt-2">
      <div className="flex flex-col gap-2">
        <Label className="font-semibold capitalize">Add Emails</Label>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Input
                    type="search"
                    className="items-center bg-muted font-medium"
                    placeholder="Paste or enter emails here"
                    {...field}
                  />
                )}
              />
              <Button variant={"secondary"} className="font-semibold">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex h-[450px] flex-col gap-2 overflow-y-scroll pt-3">
        {emails.map((email, idx) => (
          <GuestEmailItem email={email} key={idx} />
        ))}
      </div>
    </section>
  );
};

interface GuestEmailItemProps {
  email: string;
}
const GuestEmailItem = ({ email }: GuestEmailItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg p-2  transition-all hover:bg-accent-foreground/10">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-accent-foreground/10 text-center text-accent-foreground/90">
          <p className="uppercase">{email[0]}</p>
        </div>
        <p className="font-semibold">{email}</p>
      </div>
      <CircleCheckIcon size={20} />
    </div>
  );
};