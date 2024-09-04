import clsx from "clsx";

type Props = {
    itemsLength: number;
    selectedIndex: number;
};
const Dots = ({ itemsLength, selectedIndex }: Props) => {
    const arr = new Array(itemsLength).fill(0);

    return (
        <div className="flex gap-1 my-2 justify-center -translate-y-5">
            {arr.map((_, index) => {
                const selected = index === selectedIndex;

                return (
                    <div
                        key={index}
                        className={clsx({
                            "h-2 w-2 mt-4 rounded-full transition-all duration-300 bg-primary-300":
                                true,
                            "w-4": selected,
                        })}
                    />
                );
            })}
        </div>
    );
};

export default Dots;