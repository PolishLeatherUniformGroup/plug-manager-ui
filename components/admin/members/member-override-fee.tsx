import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { overrideFee } from "../../../app/admin/members/[id]/actions";
import { MemberDetailsView } from "../../../app/admin/members/[id]/data";

interface FeeOverrideProps {
    data: MemberDetailsView,
    onClose?: () => void,
}

export function FeeOverride(props: FeeOverrideProps) {
    let newFee: {
        year: number,
        amount?: number,
        dueDate?: Date
    } = {
        year: new Date().getFullYear(),
        dueDate: new Date(new Date().getFullYear(), 2, 31)

    };
    return (
        <>
            <div className=" grid grid-cols-12 rows-auto gap-2">
                <Input
                    label="Rok"
                    type="number"
                    value={newFee.year.toString()}
                    readOnly
                    className="col-span-4"
                />
                <Input
                    label="Kwota"
                    type="number"
                    className="col-span-4"
                    value={newFee.amount?.toPrecision(2)}
                    onChange={(e) => {
                        newFee.amount = parseFloat(e.target.value)
                    }}
                />
                <Input
                    label="Termin płatności"
                    type="date"
                    readOnly
                    value={newFee.dueDate?.toISOString().split('T')[0]}
                    className="col-span-4"
                />
            </div>
            <div>
                <Button
                    color="secondary"
                    variant="shadow"
                    onClick={() => {
                        overrideFee({ id: props.data?.id ?? "", year: newFee.year, amount: newFee.amount ?? 0, date: newFee.dueDate ?? new Date() })
                        if (props.onClose) {
                            props.onClose();
                        }
                    }}

                >Zapisz</Button>
                <Button
                    onClick={props.onClose}
                    color="danger" variant="light">Anuluj</Button>
            </div>

        </>)
}