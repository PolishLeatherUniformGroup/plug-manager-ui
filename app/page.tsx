
import HotNews from "../components/home/hot-news";
import UpcomingEvent from "../components/home/upcoming-events";
import Partners from "../components/home/partners";
import ScocialMedia from "../components/home/social-media";
import { ConfigClient, ConfigurationKeys } from "../services/config.client";
import { apiConfig } from "../config/api";


export default async function Home() {
  const defaultContent = (
    <>
      <HotNews />
      <UpcomingEvent />
      <Partners />
      <ScocialMedia />
    </>
  );


  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {defaultContent}
    </section>
  );
}
