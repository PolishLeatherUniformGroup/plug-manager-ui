'use client';
import { title } from "../primitives";
import { useTranslation } from 'react-i18next';

export default function Partners() {
    const { t, i18n } = useTranslation();
    return (
        <><h1 className={title({ color: 'primary', size: 'lg' })}>{t('home_partners')}</h1>
            <div className="w-full border-1 border-primary rounded-none p-8">
                <div className="grid grid-cols-12 rows-auto gap-4">
                </div>
            </div>
        </>
    );
}