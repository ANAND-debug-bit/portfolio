import Hero from '../components/Hero';
import SelectedWorks from '../components/SelectedWorks';
import Explorations from '../components/Explorations';
import TextFlippingBoardDemo from '../components/TextFlippingBoardDemo';
import ContactSection from '../components/Contact'; // The old one with the video

export default function Home({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <Hero isLoading={isLoading} />
      <SelectedWorks />
      <Explorations />
      <TextFlippingBoardDemo />
      <ContactSection />
    </>
  );
}
