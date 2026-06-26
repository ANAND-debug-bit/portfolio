import Hero from '../components/Hero';
import SelectedWorks from '../components/SelectedWorks';
import Journal from '../components/Journal';
import Explorations from '../components/Explorations';
import Stats from '../components/Stats';
import ContactSection from '../components/Contact'; // The old one with the video

export default function Home({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <Hero isLoading={isLoading} />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <ContactSection />
    </>
  );
}
