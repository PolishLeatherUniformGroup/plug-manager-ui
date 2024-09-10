import { title } from "@/components/common/primitives";
import EventItem from "@/components/events/event-item";

export default function EventsPage() {
    return (
        <div>
            <h1 className={title({ color: "blue", size: "lg" })}>Nadchodzące Wydarzenia</h1>
            <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-auto px-4 mt-8">
                <EventItem />
            </div>
        </div>
    );
}
