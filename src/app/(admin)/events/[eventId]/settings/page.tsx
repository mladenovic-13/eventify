import { api } from "@/trpc/server";
import {
  DeleteEvent,
  EditEventInfo,
  EventGalleryConfig,
} from "./_components/event-setting";

export default async function EventSettingsPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const eventSettings = await api.event.settings.query({ id: params.eventId });
  const event = await api.event.get.query({ id: params.eventId });

  return (
    <div className="space-y-5">
      {event && <EditEventInfo event={event} />}
      {eventSettings && <EventGalleryConfig settings={eventSettings} />}
      {event && <DeleteEvent eventId={event.id} />}
    </div>
  );
}
