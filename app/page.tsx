// app/page.tsx
import Hero from "../components/sections/Hero";
import Expertise from "../components/sections/Expertise";
import WhyWorkWithUs from "../components/sections/workWithUs";
import Footer from "../components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Expertise />
      <WhyWorkWithUs />

    </>
  );
}
