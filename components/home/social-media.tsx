'use client';
import { useTranslation } from "react-i18next";
import { FacebookIcon, InstagramIcon, XIcon } from "../icons";

export default function SocialMedia() {
    const { t } = useTranslation();
    return (
        <><div className=" flex flex-col bg-default-400 text-default-200 w-full p-2 px-4  justify-center text-2xl">
            <span className="text-small font-bold uppercase text-center text-default-900 mb-4">{t('home_social_media')}</span>
            <div className="flex flex-row gap-4 gap-x-6 justify-center">
                <FacebookIcon className="w-16 h-16" />
                <XIcon className="w-16 h-16" />
                <InstagramIcon className="w-16 h-16" />
            </div>
        </div>
        </>
    );
};