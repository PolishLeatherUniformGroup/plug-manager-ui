import Link from "next/link";
import { Welcome } from "../components/home/welcome";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Welcome />
    </section>
  );
}
