'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { set } from "date-fns";
import { wrap } from "module";
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';


export const CookieConsent = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [consent, setConsent] = useState(false);
    const privacyDisclouser = useDisclosure();

    useEffect(() => {
        const cookies = new Cookies();
        const consent = cookies.get('plug_privacy_consent');
        privacyDisclouser.onOpen();
    }, []);

    const handleConsent = () => {
        const cookies = new Cookies();
        cookies.set('plug_privacy_consent', true, { path: '/' });
        setShowDialog(true);
        setConsent(true);
    };

    const handleDecline = () => {
        const cookies = new Cookies();
        cookies.remove('plug_privacy_consent');
        setShowDialog(true);
        setConsent(false);
    }

    const classNames = {
        base: ["border-3 border-warning !my-0 !w-full"],
        wrapper: ["content-end !w-screen"],
        backdrop: [""],
    }
    const PrivacyModal = ({ isOpen, onOpenChange, onClose }: {
        isOpen: boolean,
        onOpenChange: () => void,
        onClose?: () => void
    }) => {
        return (
            <Modal backdrop="transparent"
            className="border-3 border-warning"
            classNames={classNames}
                size="5xl"
                radius="sm"
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
                isDismissable={false}
                shouldBlockScroll={false}
                hideCloseButton={true}
                isKeyboardDismissDisabled={true}
                onOpenChange={onOpenChange}
                >
                <ModalContent >
                    {(onClose) => {
                        return (<>
                            <ModalHeader>GDPR</ModalHeader>
                            <ModalBody>

                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="secondary"
                                    variant="shadow"
                                    onClick={() => {
                                        handleConsent();
                                        onClose();
                                    }}

                                >Wyrażam zgodę</Button>
                                <Button
                                    onClick={()=>{
                                        handleDecline();
                                        onClose();
                                    }}
                                    color="danger" variant="light">Nie wyrażam zgody</Button>
                            </ModalFooter>
                        </>)
                    }}
                </ModalContent >
            </Modal>
        )
    }

    return (<>
    {PrivacyModal({ isOpen: privacyDisclouser.isOpen, onOpenChange: privacyDisclouser.onOpenChange })}
    </>)
};