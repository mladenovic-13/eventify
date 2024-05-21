import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { MainPage } from "@/components/layout/main-page";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

import { EventContact } from "./_components/event-contact";
import { EventDescription } from "./_components/event-description";
import { EventDetails } from "./_components/event-details";
import { EventGuests } from "./_components/event-guests";
import { EventHostedBy } from "./_components/event-hosted-by";
import { EventLocation } from "./_components/event-location";
import { EventThumbnail } from "./_components/event-thumbnail";
import { ManageEventCard } from "./_components/manage-event-card";
import { RegisterGuest } from "./_components/register-guest";

type Props = {
  params: { eventId: string };
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.eventId;

  // fetch data
  const event = await api.event.get({ id });

  return {
    title: event?.name,
    description: event?.description,
    openGraph: {
      images: [event?.thumbnailUrl ?? ""],
    },
  };
}

export default async function EventPage({
  params: { eventId },
  searchParams,
}: {
  params: {
    eventId: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const event = await api.event.get({ id: eventId });

  const session = await getServerAuthSession();

  if (!event) notFound();

  const isVisitorManager = session?.user.id === event.creator.id;

  return (
    <MainPage>
      <div className="space-y-5 p-3 pb-10 md:flex md:gap-5 md:space-y-0">
        <div className="space-y-5 md:w-2/5">
          <div className="mx-auto w-fit md:w-full">
            <EventThumbnail src={event.thumbnailUrl} />
          </div>
          <div className="hidden space-y-5 md:block">
            <EventHostedBy name={event.creator.name ?? "Unknown"} />
            <EventGuests guests={event.guests} />
            <EventContact />
          </div>
        </div>
        <div className="space-y-5 md:w-3/5">
          {isVisitorManager && <ManageEventCard eventId={eventId} />}
          <EventDetails
            name={event.name}
            host={event.creator.name ?? "Unknown"}
            date={event.date}
            timezone={event.timezone}
            location={event.location?.secondaryText ?? "Unknown"}
          />
          {/* TODO: 
              - check is event private and disable registration without valid link
          */}
          <RegisterGuest
            eventId={eventId}
            inviteId={(searchParams.invite as string) ?? null}
          />
          <EventDescription description={event.description} />
          {/* <EventGallery /> */}
          <EventLocation
            lat={event.location?.lat}
            lng={event.location?.lng}
            mainText={event.location?.mainText}
            secondaryText={event.location?.secondaryText}
          />
          <div className="space-y-5 md:hidden">
            <EventHostedBy name={event.creator.name ?? "Unknown"} />
            <EventGuests guests={event.guests} />
            <EventContact />
          </div>
        </div>
      </div>
    </MainPage>
  );
}
