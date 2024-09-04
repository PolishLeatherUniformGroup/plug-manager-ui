"use client";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Dots from "./dots";


// Define the props
type Props = PropsWithChildren & EmblaOptionsType;

export const Carousel = ({ children, ...options }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        function selectHandler() {
            // selectedScrollSnap gives us the current selected index.
            const index = emblaApi?.selectedScrollSnap();

            setSelectedIndex(index || 0);
        }

        emblaApi?.on("select", selectHandler);

        // cleanup
        return () => {
            emblaApi?.off("select", selectHandler);
        };
    }, [emblaApi]);
    const length = React.Children.count(children);

    return (
        <>
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">{children}</div>
            </div>
            <Dots itemsLength={length} selectedIndex={selectedIndex} />
        </>
    );
};