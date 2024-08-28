import { Button } from "@nextui-org/button";
import { subtitle, title } from "../primitives";
import clsx from 'clsx';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid'

export const Welcome = () => {
    return (
        <div className="container p-4">
            <div className="mb-4">
                <h1 className={clsx(title(), "")}>Witaj w strefie członka stowarzyszenia <span className={title({ color: "blue" })}> Polish Leather Uniform Group</span></h1>
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col w-1/2 shadow-md p-4 border-1 border-foreground-200 dark:border-background-600">
                    <h2 className={subtitle()}>Nie jesteś jeszcze członkiem stowarzyszenia?</h2>
                    <p>Aby dołączyć zapoznaj się z naszym regulaminem, następnie wypełnij
                        wniosek online o członkostwo. Pamiętaj, aby wniosek mógł być rozpatrzony
                        będziesz potrzebować rekomndację dwóch aktualnych członków stowarzyszenia.
                    </p>

                    <Button color="primary" className="w-40"
                        variant="flat" radius="sm" href="/join" as={Link}>
                        Przejdź do wniosku
                    </Button>
                </div>
                <div className="flex flex-col w-1/2 shadow-md p-4 border-1 border-foreground-200">
                    <h2 className={subtitle()}>Jesteś członkiem Stowarzyszenia?</h2>
                    <p>Jeśli już jesteś członkiem stowarzyszenia, zaloguj się aby uzyskać dostęp do
                        zasobów dostępnych tylko dla członków.
                    </p>
                    <Button color="success" className="w-40"
                        variant="flat" radius="sm" href="/login" as={Link}>
                        Zaloguj się
                    </Button>
                </div>
            </div>

        </div>
    );
}