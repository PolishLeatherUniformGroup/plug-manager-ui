import { ChevronDownIcon, LanguageIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useTranslation } from "react-i18next";

export default function LanguageChoose() {
    const { i18n } = useTranslation();

    const displayLanguage = (language: string) => {

        switch (language) {
            case 'en':
                return 'EN';
            case 'pl':
                return 'PL';
        }
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="shadow" color="primary" className="text-white"
                    startContent={<LanguageIcon className="w-8 h-8 border-r-1 pr-2" />}
                    endContent={<ChevronDownIcon className="w-5 h-5" />}>
                    {displayLanguage(i18n.language)}
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key="en" onClick={() => i18n.changeLanguage('en')}>English</DropdownItem>
                <DropdownItem key="pl" onClick={() => i18n.changeLanguage('pl')}>Polski</DropdownItem>
            </DropdownMenu>
        </Dropdown >
    )
}