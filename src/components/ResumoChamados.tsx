import type { Chamado } from "../types/chamado";
import Icone from "./Icone";

export default function ResumoChamados({ chamados }: { chamados: Chamado[] }) {
  const abertos = chamados.filter((chamado) => chamado.status === "open").length;
  const andamento = chamados.filter((chamado) => chamado.status === "in_progress").length;
  const fechados = chamados.filter((chamado) => chamado.status === "closed").length;

  return (
    <section id="resumo" className="painel resumo" aria-labelledby="titulo-resumo">
      <div className="painel-titulo"><span className="icone-titulo"><Icone nome="chart" /></span><h2 id="titulo-resumo">Resumo dos chamados</h2></div>
      <div className="resumo-grid">
        <div className="resumo-item"><span className="resumo-bolha total"><Icone nome="ticket" /></span><div><strong>{chamados.length}</strong><small>Total de chamados</small></div></div>
        <div className="resumo-item"><span className="resumo-bolha aberto" /><div><strong>{abertos}</strong><small>Abertos</small></div></div>
        <div className="resumo-item"><span className="resumo-bolha andamento" /><div><strong>{andamento}</strong><small>Em andamento</small></div></div>
        <div className="resumo-item"><span className="resumo-bolha fechado" /><div><strong>{fechados}</strong><small>Fechados</small></div></div>
      </div>
    </section>
  );
}
