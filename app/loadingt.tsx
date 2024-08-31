import { Progress } from "@nextui-org/react";

export default function Loading() {

    return (<Progress
        size="lg"
        isIndeterminate
        color="primary"
        aria-label="Loading..."
        className="max-w-md"
    />)
}
