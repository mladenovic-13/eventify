import GuestsTable from "@/app/event/manage/[eventId]/guests/_components/guests-table";
import Section from "@/components/header/section";
import { MainPage } from "@/components/layout/main-page";

export default function CalendarPeoplePage() {
  return (
    <MainPage>
      <div>
        <Section
          title="People (2)"
          description="Manage your subscribers and event attendees."
          button="Add People"
        />
        <GuestsTable />
      </div>
    </MainPage>
  );
}
