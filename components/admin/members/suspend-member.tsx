'use client';
import { useUser } from "@auth0/nextjs-auth0/client";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Textarea, Input } from "@nextui-org/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { suspend } from "../../../app/admin/members/[id]/actions";
import { MemberDetailsView } from "../../../app/admin/members/[id]/data";
interface SuspendMemberProps {
    data: MemberDetailsView
    onClose: () => void
}
export function SuspendMember(props: SuspendMemberProps) {
    let defaultDate = today(getLocalTimeZone());
    let suspension: {
        reason: string,
        suspensionDate: DateValue,
        endDate: DateValue,
        appealDate: DateValue,
        card?: string
    } = {
        reason: "",
        suspensionDate: defaultDate,
        endDate: defaultDate,
        appealDate: defaultDate
    }
    const { user } = useUser();
    const [blocked, setBlocked] = useState(suspension.card !== user?.nickname);
    const { t } = useTranslation();
    return (<>
        <div className="grid grid-cols-12 gap-2">
            <DatePicker
                label={t('admin_members_suspend_supsension_date')}
                className="col-span-6"
                variant="bordered"
                value={suspension.suspensionDate}
            />
            <DatePicker
                label={t('admin_members_suspend_supsension_end')}
                className="col-span-6"
                variant="bordered"
                value={suspension.endDate}
            />
            <Textarea
                label={t('admin_members_suspend_supsension_reason')}
                className="col-span-12"
                variant="bordered"
                value={suspension.reason}

                onChange={(e) => {
                    suspension.reason = e.target.value
                }}
            />
            <DatePicker
                label={t('admin_members_suspend_supsension_appeal_deadline')}
                className="col-span-6"
                variant="bordered"
                value={suspension.appealDate}
            />
            <div className=" bg-danger-200 text-danger p-4 font-bold rounded-md col-span-12">
                {t('admin_members_suspend_warning')}</div>
            <Input
                label={t('admin_members_suspend_card_number')}
                className="col-span-12"
                color="danger"
                variant="bordered"
                value={suspension.card}
                onChange={(e) => {
                    if (user?.nickname === undefined) setBlocked(true);
                    else if (e.target.value === user.nickname) setBlocked(false);
                    else setBlocked(true);
                }} />
        </div>
        <div>
            <Button
                color="secondary"
                variant="shadow"
                isDisabled={blocked}
                onClick={() => {
                    suspend({ id: props.data?.id ?? "", reason: suspension.reason, suspensionDate: suspension.suspensionDate.toDate(getLocalTimeZone()), endDate: suspension.endDate.toDate(getLocalTimeZone()), appealDate: suspension.appealDate.toDate(getLocalTimeZone()) })
                    props.onClose();
                }}

            >{t('modal_button_save')}</Button>
            <Button
                onClick={props.onClose}
                color="danger" variant="light">{t('modal_button_cancel')}</Button></div>
    </>);
}