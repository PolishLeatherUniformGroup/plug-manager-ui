'use client';
import { useUser } from "@auth0/nextjs-auth0/client";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { DatePicker } from "@nextui-org/date-picker";
import { Textarea, Input } from "@nextui-org/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { expell } from "../../../app/admin/members/[id]/actions";
import { MemberDetailsView } from "../../../app/admin/members/[id]/data";
interface ExpellMemberProps {
    data: MemberDetailsView
    onClose: () => void
}
export function ExpellMember(props: ExpellMemberProps) {
    let defaultDate = today(getLocalTimeZone());
    let expulsion: {
        reason: string,
        expellDate: DateValue,
        appealDate: DateValue,
        card?: string
    } = {
        reason: "",
        expellDate: defaultDate,
        appealDate: defaultDate
    }
    const { user } = useUser();
    const [blocked, setBlocked] = useState(expulsion.card !== user?.nickname);
    const { t } = useTranslation();
    return (<>
        <div className="grid grid-cols-12 gap-2">
            <DatePicker
                label={t('admin_members_expell_expulsion_date')}
                className="col-span-6"
                variant="bordered"
                value={expulsion.expellDate}
            />

            <Textarea
                label={t('admin_members_expell_expulsion_reason')}
                className="col-span-12"
                variant="bordered"
                value={expulsion.reason}

            />
            <DatePicker
                label={t('admin_members_expell_expulsion_appeal_deadline')}
                className="col-span-6"
                variant="bordered"
                value={expulsion.appealDate}
            />
            <div className=" bg-danger-200 text-danger p-4 font-bold rounded-md col-span-12">
                {t('admin_members_expell_warning')}</div>
            <Input
                label="Numer karty"
                className="col-span-12"
                color="danger"
                variant="bordered"
                value={expulsion.card}
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
                    expell({ id: props.data?.id ?? "", reason: expulsion.reason, expellDate: expulsion.expellDate.toDate(getLocalTimeZone()), appealDate: expulsion.appealDate.toDate(getLocalTimeZone()) })
                    props.onClose();
                }}

            >{t('modal_button_save')}</Button>
            <Button
                onClick={props.onClose}
                color="danger" variant="light">{t('modal_button_cancel')}</Button></div>
    </>);
}