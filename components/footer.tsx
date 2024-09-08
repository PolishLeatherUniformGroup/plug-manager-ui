'use client';
import { Link } from "@nextui-org/link";
import { OrganizationDetails } from "../app/admin/settings/data";
import { useTranslation } from "react-i18next";

interface FooterProps {
    orgDetails: OrganizationDetails;
}

export default function Footer(props: FooterProps) {
    const { t } = useTranslation();
    return (<footer className="w-full flex items-start min-h-[100px] justify-center  bg-default-50 border-t-1 border-primary-600 dark:bg-default/50">
        <div className="container mx-auto py-2">
            <div className="grid grid-cols-12 gap-1">
                <div className="col-span-4 col-start-2 px-2 text-foreground/90">
                    <h4>{props.orgDetails.name}</h4>
                    <h5>NIP: {props.orgDetails.nip}</h5>
                    <h5>REGON: {props.orgDetails.regon}</h5>
                    {props.orgDetails.krs && <h5>KRS: {props.orgDetails.krs}</h5>}
                </div>
                <div className="col-span-2 px-2">
                    <h4 className="text-sm font-extrabold uppercase text-primary-700 mb-4">{t('footer_security')}</h4>
                    <Link color="foreground" href="/site/privacy">{t('footer_security_privacy')}</Link>
                    <Link color="foreground" href="/site/rodo">{t('footer_security_gdpr')}</Link>
                </div>
                <div className="col-span-2 px-2">
                    <h4 className="text-sm font-extrabold uppercase text-primary-700 mb-4">{t('footer_contact')}</h4>
                    <Link color="foreground" href="/join">{t('footer_contact_join')}</Link>
                    <Link color="foreground" href="/contact">{t('footer_contact_form')}</Link>
                </div>
                <div className="col-span-2 px-2">
                    Linki
                </div>

            </div>
        </div>
    </footer>);
}