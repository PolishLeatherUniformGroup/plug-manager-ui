'use client';
import { CheckIcon, PencilIcon, QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";

// TODO: Add validation
interface EditableInputProps {
    value?: string,
    description?: string,
    fieldType: 'text' | 'number' | 'email' | 'tel' | 'password',
    name: string,
    label: string,
    placeholder?: string,
    disabled?: boolean,
    size?: 'sm' | 'md' | 'lg',
    onUpdate: (value?: string) => void;
}
export function EditableInput(props: EditableInputProps) {
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(props.value);

    const editButtons = (<ButtonGroup size="sm">
        <Button isIconOnly size="sm" variant="flat" color="danger"
            onClick={() => {
                setEditable(false);
                setValue(props.value);
            }}
        >
            <XMarkIcon className="w-4 h-4" />
        </Button>
        <Button isIconOnly size="sm" variant="flat" color="success"
            onClick={() => {
                setEditable(false);
                props.onUpdate(value);
            }}
        >
            <CheckIcon className="w-4 h-4" />
        </Button>
    </ButtonGroup>)

    const defaultButtons = (<ButtonGroup size="sm">
        {props.disabled === true ? <Button isIconOnly size="sm" variant="flat" color="default"
            onClick={() => setEditable(true)}
        >
            <PencilIcon className="w-4 h-4" />
        </Button> : null}
        {!props.description &&
            <Button isIconOnly size="sm" variant="flat" color="default">
                <QuestionMarkCircleIcon className="w-4 h-4" />
            </Button>}
        {props.description && <Tooltip content={props.description}>
            <Button isIconOnly size="sm" variant="flat" color="default">
                <QuestionMarkCircleIcon className="w-4 h-4" />
            </Button>
        </Tooltip>}
    </ButtonGroup>);
    const className = props.size === 'sm' ? 'col-span-3' : props.size === 'md' ? 'col-span-6' : 'col-span-9';
    return (
        <Input label={props.label}
            name={props.name}
            type={props.fieldType}
            isReadOnly={!editable}
            placeholder={props.placeholder}
            className={className}
            value={value}
            endContent={editable ? editButtons : defaultButtons}
        />
    );
}