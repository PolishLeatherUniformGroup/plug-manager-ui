import { MapPinIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

export default function EventItem() {
    return (
        <Card className="col-span-12 md:col-span-4 h-[300px]" shadow="md">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/80 uppercase font-bold">5 października 2024 20:00</p>
                <h4 className="text-white font-medium text-large">PLUG & PLAY</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://nextui.org/images/card-example-4.jpeg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                    <MapPinIcon className="h-16 w-16 text-primary" />
                    <div className="flex flex-col">
                        <p className="text-tiny text-white/60">Instytut Bar</p>
                        <p className="text-tiny text-white/60">ul. Prosta 2/14, Warszawa</p>
                    </div>
                </div>
                <Button radius="full" size="sm" color="secondary">Zobacz</Button>
            </CardFooter>
        </Card>
    )
};