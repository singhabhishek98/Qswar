import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import Testimonials from '../components/sections/Testimonials';
import WhyChoose from '../components/WhyChoose';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
