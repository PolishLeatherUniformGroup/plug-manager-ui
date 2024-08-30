import { ArrowPathIcon, BarsArrowDownIcon, BarsArrowUpIcon, SparklesIcon } from "@heroicons/react/16/solid";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

export default function PostsToolbar() {
    return (
        <div className="flex flex-row border-b-1 border-default-200 rounded-sm p-3 my-2">
            <div className="flex justify-between w-1/3">
                <Tooltip content="Odświeź strumień">
                    <Button isIconOnly>
                        <ArrowPathIcon className="h-6 w-6" />
                    </Button>
                </Tooltip>
            </div>
            <div className="flex justify-end w-2/3">
                <ButtonGroup>
                    <Tooltip content="Nahjpierw najpopularniejsze">
                        <Button isIconOnly radius="sm">
                            <SparklesIcon className="h-6 w-6" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Najpierw najnowsze">
                        <Button isIconOnly radius="sm">
                            <BarsArrowDownIcon className="h-6 w-6" />
                        </Button>
                    </Tooltip>
                    <Tooltip content="Najpierw najstarsze">
                        <Button isIconOnly radius="sm">
                            <BarsArrowUpIcon className="h-6 w-6" />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </div>
        </div >
    );
}