import { title } from "../primitives";

export default function Partners() {
    return (
        <><h1 className={title({ color: 'primary', size: 'lg' })}>Nasi Partnerzy</h1>
            <div className="w-full border-1 border-primary rounded-none p-8">
                <div className="grid grid-cols-12 rows-auto gap-4">
                </div>
            </div>
        </>
    );
}