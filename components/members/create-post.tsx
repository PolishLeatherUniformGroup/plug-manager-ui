import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { subtitle, title } from "../common/primitives";
import { Divider } from "@nextui-org/divider";
import { CheckBadgeIcon, PencilIcon } from "@heroicons/react/16/solid";
import { Badge } from "@nextui-org/badge";
import clsx from 'clsx';
import { Textarea } from "@nextui-org/input";

export default function CreatePost() {

    return (<>
        <Card shadow="sm" radius="none">
            <CardHeader>
                <h3 className={clsx(title({ color: "cyan", size: "sm" }), "flex flex-row text-medium")}>
                    <PencilIcon className="h-10 w-10 mr-2 text-secondary-500 border-secondary-500 border-1 rounded-full p-1" />
                    Podziel się...</h3>
            </CardHeader>
            <Divider className="bg-primary" />
            <CardBody>
                <Textarea placeholder="Napisz coś..." variant="bordered" radius="none" />
            </CardBody>
            <CardFooter className="flex justify-items-end">
                <Button radius="none" color="secondary" variant="solid">Prześlij</Button>
            </CardFooter>
        </Card>
    </>);
};