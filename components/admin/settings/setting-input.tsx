'use client';

import { XMarkIcon, CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import { ButtonGroup, Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { OrganizationSetting } from "../../../app/admin/settings/data";
import { use, useEffect, useState } from "react";
import { updateSetting } from "../../../app/admin/settings/actions";
import { set } from "date-fns";

interface SettingInputProps {
    setting: OrganizationSetting;
    size: '3' | '6' | '12';
}


export default function SettingInput(props: SettingInputProps) {
    const [value, setValue] = useState(props.setting.value);
    const [edit, setEdit] = useState(false);

    const editButtons = (<ButtonGroup size="sm">
        <Button isIconOnly size="sm" variant="flat" color="danger"
            onClick={() => {
                setEdit(false);
                setValue(props.setting.value);
            }}
        >
            <XMarkIcon className="w-4 h-4" />
        </Button>
        <Button isIconOnly size="sm" variant="flat" color="success"
            onClick={() => {
                setEdit(false);
                console.log(`Setting ${props.setting.key} to ${value}`);

                updateSetting({ key: props.setting.key, value: value });
            }}
        >
            <CheckIcon className="w-4 h-4" />
        </Button>
    </ButtonGroup>)

    const defaultButtons = (<ButtonGroup size="sm">
        <Button isIconOnly size="sm" variant="flat" color="default"
            onClick={() => setEdit(true)}
        >
            <PencilIcon className="w-4 h-4" />
        </Button>
    </ButtonGroup>);

    return (<Input label={props.setting.label} name={props.setting.key}
        value={value}
        isReadOnly={!edit}
        className={`col-span-${props.size}`}
        onValueChange={setValue}
        endContent={
            edit ? editButtons : defaultButtons
        }
    />);
}