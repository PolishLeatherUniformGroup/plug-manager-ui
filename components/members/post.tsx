'use client';
import { HeartIcon as Liked } from "@heroicons/react/24/solid";
import { HeartIcon as Like } from "@heroicons/react/24/outline";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { User } from "@nextui-org/user";
import { Link } from "@nextui-org/link";


export default function Post() {
    const handleLike = (event: any) => {
        event.preventDefault();
        console.log("Liked");
    }

    return (<Card radius="sm" shadow="sm" className="bg-default-50 mx-auto">
        <CardHeader className="p-2">
            <User name="Imię Nazwisko" description="PLUG-9002" className="bg-transparent p-3" />
        </CardHeader>
        <CardBody className="p-4 px-20 bg-default-50t">
            <p>Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.
                Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki.
                Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym.
                Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty
                Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker</p>
        </CardBody>
        <CardFooter>
            <div className="flex flex-row w-full px-10 justify-between">
                <span className="flex flex-row">
                    <Link onClick={(event) => { handleLike(event) }} className="mr-2 cursor-pointer">
                        <Like className="h-6 w-6 text-danger-500" />
                    </Link>
                    <span className="text-md text-default-800"> 0</span>
                </span>
                <span className="flex flex-row">
                    <Link onClick={(event) => { handleLike(event) }} className="mr-2 cursor-pointer">
                        <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-secondary-500" />
                    </Link>
                    <span className="text-md text-default-800">0 komentarzy</span>
                </span>
            </div>
        </CardFooter>
    </Card>);
}