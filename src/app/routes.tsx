import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import Portfolio from "./pages/Portfolio";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "servicos", Component: Servicos },
      { path: "portfolio", Component: Portfolio },
      { path: "sobre", Component: Sobre },
      { path: "contato", Component: Contato },
      { path: "*", Component: NotFound },
    ],
  },
]);
