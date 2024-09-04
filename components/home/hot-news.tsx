'use client';
import { Carousel } from "../carousel/carousel";

export default function HotNews() {
    return (
        <Carousel loop >

            <img src="https://placehold.co/1280x600?text=Slide+1" alt="carousel" />

            <img src="https://placehold.co/1280x600?text=Slide+2" alt="carousel" />

            <img src="https://placehold.co/1280x600?text=Slide+3" alt="carousel" />

        </Carousel>
    );
}