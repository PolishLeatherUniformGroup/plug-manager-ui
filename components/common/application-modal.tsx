'use client'
import { Modal, ModalBody, ModalContent, ModalHeader, ModalProps } from "@nextui-org/react";
interface ApplicationModalProps {
    title: string,
    isOpen: boolean,
    onOpenChange: () => void,
    onClose?: () => void,
    onSubmit?: ({ }: any) => void,
    children: React.ReactNode;
}
export function ApplicationModal(props: ApplicationModalProps & ModalProps) {
    const defaults: {
        size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined,
        backdrop: "transparent" | "opaque" | "blur" | undefined;
    } = {
        backdrop: "opaque",
        size: "xl"
    }
    return (
        <Modal backdrop={props.backdrop ?? defaults.backdrop}
            size={props.size ?? defaults.size}
            isOpen={props.isOpen}
            onClose={props.onClose}
            isDismissable={props.isDismissable}
            isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}
            onOpenChange={props.onOpenChange}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-800/10 backdrop-opacity-20"
            }}>
            <ModalContent>
                {(onClose) => {
                    return (<>
                        <ModalHeader>{props.title}</ModalHeader>
                        <ModalBody>
                            {props.children}
                        </ModalBody>
                    </>)
                }}

            </ModalContent >
        </Modal>)
}