'use client';
import { Switch } from "@nextui-org/switch";
import { ApplicationFeature } from "../../../app/admin/configuration/data";
import { Button, Popover, PopoverTrigger, Tooltip } from "@nextui-org/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface FeatureSwitchProps {
    data: ApplicationFeature;
    onChange?: (id: number, enabled: boolean) => void;
}
export function FeatureSwitch(props: FeatureSwitchProps) {
    const tooltipContent = (
        <div className="flex flex-col text-tiny p-2">
            <div>{props.data?.description}</div>
        </div>
    )
    return (
        <div className="flex flex-row w-full py-1 border-b-1 border-default-300">
            <Switch defaultSelected={props.data.enabled} className="col-span-6" feature-id={props.data.id}
                onValueChange={(selected) => {
                    props.onChange?.(props.data.id, selected);
                    window.location.reload();
                }}
            >
                {props.data?.name}
            </Switch>
            <Tooltip content={tooltipContent} placement="top">
                <InformationCircleIcon className="col-span-1 w-8 h-8 ml-2" />
            </Tooltip>
        </div>
    );
}