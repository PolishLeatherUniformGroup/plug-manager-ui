import ComingSoon from "../../components/common/coming-soon";
import { features } from "../../config/features";

export default function MembersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const enabled = features["events"];
    if (!enabled) {
        return <ComingSoon />
    }
    return <>{children}</>
}