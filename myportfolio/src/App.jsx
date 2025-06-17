import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/sections/Home';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Education from './components/sections/Education';

function App() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section id="home"><Home /></section>
        <section id="skills"><Skills /></section>
        <section id="Experience"><Experience /></section>
        <section id="projects"><Projects /></section>
         <section id="Education"><Education /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </>
  );
}

export default App;
