import { AboutSection } from "@/components/sections/AboutSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <PhilosophySection />
      <ProcessSection />
      <ContactCTA />
      <ContactSection />
      <LocationSection />
    </>
  );
}
