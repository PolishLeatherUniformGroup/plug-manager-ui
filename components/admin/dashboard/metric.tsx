import { Card, CardBody } from "@nextui-org/card";
import clsx from "clsx";
import { tv } from "tailwind-variants";

export default function MetricCard({ title, value, variant, icon }: {
    title: string,
    value: string,
    variant: "ok" | "warning" | "error" | "default",
    icon: React.ReactNode
}) {
    const cardColor = tv({
        variants: {
            color: {
                ok: "border-success-300 border-2 bg-success-300",
                warning: "border-warning-300 border-2 bg-warning-300",
                error: "border-danger-300 border-2 bg-danger-300",
                default: "border-default-400 border-2 bg-default-400",
            },
        },
        compoundVariants: [
            {
                color: "ok",
                variant: "ok",
                styles: "border-success-500 border-2 bg-success-300",
            },
            {
                color: "warning",
                variant: "warning",
                styles: "border-warning-500 border-2 bg-warning-300",
            },
            {
                color: "error",
                variant: "error",
                styles: "border-default-500 border-2 bg-default-500",
            },
            {
                color: "default",
                variant: "default",
                styles: "border-default-500 border-2 bg-default-500",
            }
        ]
    });
    const cardTitle = tv({
        variants: {
            color: {
                ok: "text-success-700 rounded-small p-1 font-bold text-lg",
                warning: "text-warning-900 rounded-small p-1 font-bold text-lg",
                error: "text-error-700  rounded-small p-1 font-bold text-lg",
                default: "text-default-900  rounded-small p-1 text-lg  font-bold",
            },
        }
    });


    const iconBackground = tv({
        variants: {
            color: {
                ok: "bg-success-500 text-white",
                warning: "bg-warning-500 text-white",
                error: "bg-danger-500 text-white",
                default: "bg-gray-500 text-white",
            },
        },
        defaultVariants: {
            color: "default",
        },
    });
    return (
        <Card className={clsx("col-span-12 md:col-span-4", cardColor({ color: variant }))
        } radius="sm" shadow="sm">
            <CardBody className={clsx("flex flex-row bg-inherit")} >
                <div className={clsx("w-24 h-24 rounded-small flex items-center justify-center mr-2 shadow-md", iconBackground({ color: variant }))}>
                    {icon}
                </div>
                <div>
                    <h3 className={cardTitle({ color: variant })}>{title}</h3>
                    <h1 className="text-3xl font-black mt-2">{value}</h1>
                </div>
            </CardBody>
        </ Card >
    );
};