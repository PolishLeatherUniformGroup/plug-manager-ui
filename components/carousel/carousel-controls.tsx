
'use client';
import clsx from "clsx";

type Props = {
    canScrollPrev: boolean;
    canScrollNext: boolean;
    onPrev(): void;
    onNext(): void;
};
export const CarouselControls = (props: Props) => {
    return (
        <div className="flex justify-end gap-2 ">
            <button
                className={clsx({
                    "px-4 py-2 text-white rounded-md": true,
                    "bg-indigo-200": !props.canScrollPrev,
                    "bg-indigo-400": props.canScrollPrev,
                })}
                disabled={!props.canScrollPrev}
                onClick={() => {
                    if (props.canScrollPrev) {
                        props.onPrev();
                    }
                }}
            >
                Prev
            </button>
            <button
                className={clsx({
                    "px-4 py-2 text-white rounded-md": true,
                    "bg-indigo-200": !props.canScrollNext,
                    "bg-indigo-400": props.canScrollNext,
                })}
                disabled={!props.canScrollNext}
                onClick={() => {
                    if (props.canScrollNext) {
                        props.onNext();
                    }
                }}
            >
                Next
            </button>
        </div>
    );
};