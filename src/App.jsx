import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Edition from './pages/Edition';
import About from './pages/About';
import Manifesto from './pages/Manifesto';
import Collaborate from './pages/Collaborate';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() { return <Routes><Route element={<Layout />}><Route path="/" element={<Home />} /><Route path="/archivo" element={<Archive />} /><Route path="/edicion/:slug" element={<Edition />} /><Route path="/quienes-somos" element={<About />} /><Route path="/manifiesto" element={<Manifesto />} /><Route path="/colaborar" element={<Collaborate />} /><Route path="/contacto" element={<Contact />} /><Route path="*" element={<NotFound />} /></Route></Routes>; }
