import { NavLink, Outlet } from "react-router";
import Icone from "../components/Icone";

export default function LayoutPrincipal() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="marca">
          <div className="marca-simbolo" aria-hidden="true"><span /><span /><span /></div>
          <div><strong>FixIt</strong><small>Central de Chamados</small></div>
        </div>

        <nav className="menu" aria-label="Navegação principal">
          <NavLink to="/chamados" end className={({ isActive }) => `menu-item${isActive ? " ativo" : ""}`}>
            <Icone nome="home" /> <span>Chamados</span>
          </NavLink>
          <NavLink to="/chamados/novo" className={({ isActive }) => `menu-item${isActive ? " ativo" : ""}`}>
            <Icone nome="plus" /> <span>Novo chamado</span>
          </NavLink>
          <a className="menu-item" href="/chamados#resumo"><Icone nome="chart" /> <span>Resumo</span></a>
        </nav>

        <div className="sidebar-rodape"><Icone nome="building" tamanho={26} /><span>Faculdade Bento<small>Suporte acadêmico</small></span></div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <span className="topbar-caption">PAINEL DE SUPORTE <span className="topbar-divider">/</span> FIXIT</span>
          <div className="topbar-user"><span className="avatar" aria-hidden="true">FB</span><span>Faculdade Bento</span></div>
        </header>
        <main className="conteudo"><Outlet /></main>
      </div>
    </div>
  );
}
