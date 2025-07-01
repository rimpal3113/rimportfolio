import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/sections/Home';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import About from './components/sections/About';

function App() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section id="home"><Home /></section>
         <section id="About"><About/></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </>
  );
}

export default App;
