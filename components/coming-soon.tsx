import { color } from "framer-motion";
import { title } from "./primitives";

export default function ComingSoon() {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className={title({ color: "yellow", size: "lg" })}>
                Funkcjonalność w przygotowaniu
            </h1>
        </div>
    );
};