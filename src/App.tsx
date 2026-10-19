import { Navigate, Route, Routes } from "react-router";
import LayoutPrincipal from "./layouts/LayoutPrincipal";
import ListaChamados from "./pages/ListaChamados";
import NovoChamado from "./pages/NovoChamado";
import DetalheChamado from "./pages/DetalheChamado";

export default function App() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route path="/" element={<Navigate to="/chamados" replace />} />
        <Route path="/chamados" element={<ListaChamados />} />
        <Route path="/chamados/novo" element={<NovoChamado />} />
        <Route path="/chamados/:id" element={<DetalheChamado />} />
        <Route path="*" element={<Navigate to="/chamados" replace />} />
      </Route>
    </Routes>
  );
}
