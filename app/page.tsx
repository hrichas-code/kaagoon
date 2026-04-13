import SkyCanvas from '@/components/SkyCanvas'
import CustomCursor from '@/components/CustomCursor'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WorkSection from '@/components/WorkSection'
import ProcessSection from '@/components/ProcessSection'
import AboutSection from '@/components/AboutSection'
import SpeakingSection from '@/components/SpeakingSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <SkyCanvas />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <WorkSection />
        <ProcessSection />
        <AboutSection />
        <SpeakingSection />
        <ContactSection />
      </main>
    </>
  )
}
