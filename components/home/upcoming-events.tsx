'use client';
import { Image } from "@nextui-org/image";
import { title } from "../primitives";
import { useTranslation } from "react-i18next";

export default function UpcomingEvent() {
    const {t}=useTranslation();
    return (<div className="flex flex-row w-full my-4">
        <div className="mr-8">
            <Image src="/images/calendar.jpg" alt="calendar" shadow="md"
                className="w-96 h-96" isZoomed isBlurred />
        </div>
        <div>
            <h2 className={title({ size: "md", color: "primary" })}>{t('home_upcoming_events')}</h2>
        </div>
    </div>);

};