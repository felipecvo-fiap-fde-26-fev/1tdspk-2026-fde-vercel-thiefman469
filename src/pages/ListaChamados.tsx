import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Icone from "../components/Icone";
import ResumoChamados from "../components/ResumoChamados";
import { categorias, dataCurta, prioridades, status } from "../data/rotulos";
import { listarChamados } from "../services/chamados";
import type { Chamado, Status } from "../types/chamado";
import { mensagemDeErro } from "../utils/mensagemDeErro";

type Filtro = "all" | Status;
const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: "all", rotulo: "Todos" },
  { valor: "open", rotulo: "Abertos" },
  { valor: "in_progress", rotulo: "Em andamento" },
  { valor: "closed", rotulo: "Fechados" },
];

export default function ListaChamados() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativas, setTentativas] = useState(0);
  const [filtro, setFiltro] = useState<Filtro>("all");
  const [busca, setBusca] = useState("");
  const location = useLocation();

  // A página já cuida dos três estados. Na Missão 1, complete listarChamados.
  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro("");
      try {
        setChamados(await listarChamados());
      } catch (e) {
        setErro(mensagemDeErro(e));
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [tentativas]);

  const chamadosVisiveis = chamados.filter((chamado) => {
    const correspondeStatus = filtro === "all" || chamado.status === filtro;
    const texto = `${chamado.title} ${categorias[chamado.category]} ${status[chamado.status]}`.toLocaleLowerCase("pt-BR");
    return correspondeStatus && texto.includes(busca.toLocaleLowerCase("pt-BR"));
  });

  function quantidade(valor: Filtro) {
    return valor === "all" ? chamados.length : chamados.filter((chamado) => chamado.status === valor).length;
  }

  return (
    <div className="pagina-lista">
      <div className="pagina-cabecalho">
        <div><p className="sobretitulo">VISÃO GERAL</p><h1>Chamados</h1><p className="subtitulo">Acompanhe e gerencie os chamados de suporte da instituição.</p></div>
        <Link className="botao primario cabecalho-acao" to="/chamados/novo"><Icone nome="plus" tamanho={18} /> Novo chamado</Link>
      </div>

      {typeof location.state?.sucesso === "string" && <p className="aviso sucesso" role="status"><Icone nome="check" tamanho={18} />{location.state.sucesso}</p>}

      <div className="lista-layout">
        <section className="lista-coluna" aria-label="Lista de chamados">
          <div className="filtros" role="group" aria-label="Filtrar por status">
            {filtros.map((item) => <button key={item.valor} type="button" className={`filtro${filtro === item.valor ? " selecionado" : ""}`} onClick={() => setFiltro(item.valor)} aria-pressed={filtro === item.valor}>{item.rotulo}<span>{quantidade(item.valor)}</span></button>)}
          </div>

          <label className="busca"><Icone nome="search" tamanho={20} /><span className="sr-only">Buscar chamados</span><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por título, categoria ou status..." /></label>

          <div className="painel tabela-painel">
            <div className="tabela-scroll">
              <table className="tabela-chamados"><thead><tr><th>Título</th><th>Categoria</th><th>Prioridade</th><th>Status</th><th>Aberto em</th><th><span className="sr-only">Detalhes</span></th></tr></thead>
                <tbody>{!carregando && !erro && chamadosVisiveis.map((chamado) => <tr key={chamado.id}>
                  <td className={`celula-titulo prioridade-${chamado.priority}`}><Link to={`/chamados/${chamado.id}`}>{chamado.title}</Link></td>
                  <td>{categorias[chamado.category]}</td>
                  <td><span className={`etiqueta prioridade-${chamado.priority}`}>{prioridades[chamado.priority]}</span></td>
                  <td><span className={`etiqueta status-${chamado.status}`}>{status[chamado.status]}</span></td>
                  <td className="data">{dataCurta(chamado.created_at)}</td>
                  <td><Link className="link-seta" aria-label={`Abrir ${chamado.title}`} to={`/chamados/${chamado.id}`}><Icone nome="arrow" tamanho={17} /></Link></td>
                </tr>)}</tbody>
              </table>
            </div>
            {carregando && <div className="estado-lista" role="status">Carregando chamados...</div>}
            {erro && <div className="estado-lista" role="alert"><p>Não foi possível carregar os chamados.</p><small>{erro}</small><button className="botao secundario" onClick={() => setTentativas((n) => n + 1)}>Tentar novamente</button></div>}
            {!carregando && !erro && chamadosVisiveis.length === 0 && <div className="estado-lista"><Icone nome="ticket" tamanho={28} /><p>{chamados.length === 0 ? "Nenhum chamado cadastrado ainda." : "Nenhum chamado corresponde à busca."}</p><small>{chamados.length === 0 ? "Crie o primeiro chamado para começar." : "Tente outro termo ou filtro."}</small></div>}
          </div>
          <p className="lista-rodape">{chamadosVisiveis.length} de {chamados.length} chamados</p>
        </section>

        <aside className="lista-lateral"><ResumoChamados chamados={chamados} /><div className="painel ajuda"><span className="ajuda-icone"><Icone nome="plus" /></span><h2>Precisa de ajuda?</h2><p>Registre o problema e acompanhe o andamento do seu chamado.</p><Link to="/chamados/novo">Abrir chamado <Icone nome="arrow" tamanho={17} /></Link></div></aside>
      </div>
    </div>
  );
}
