import { Routes, BrowserRouter, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import SideBar from "../components/layout/SideBar";
import Articulos from "../components/pages/Articulos";
import CrearArticulo from "../components/pages/CrearArticulo";
import Footer from "../components/layout/Footer";
const Rutas = () => {
  return (
    <>
      <BrowserRouter>
        {/* Layout */}
        <Header />
        {/* Contenido del sitio */}
        <section className="flex flex-wrap flex-row h-auto p-2">
          <article className="flex flex-row flex-wrap justify-evenly basis-3/4">
            <Routes>
              <Route path="/" element={<Articulos />}></Route>
              <Route path="/creararticulo" element={<CrearArticulo />}></Route>
            </Routes>
          </article>
          <SideBar />
        </section>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Rutas;
