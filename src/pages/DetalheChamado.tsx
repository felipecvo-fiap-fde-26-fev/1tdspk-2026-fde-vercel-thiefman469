import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ConfirmarExclusao from "../components/ConfirmarExclusao";
import Icone from "../components/Icone";
import { categorias, dataCurta, prioridades, status } from "../data/rotulos";
import {
  alterarStatus,
  consultarChamado,
  excluirChamado,
} from "../services/chamados";
import type { Chamado, Status } from "../types/chamado";
import { mensagemDeErro } from "../utils/mensagemDeErro";

export default function DetalheChamado() {
  const { id } = useParams();
  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroConsulta, setErroConsulta] = useState("");
  const [erroAcao, setErroAcao] = useState("");
  const [statusEscolhido, setStatusEscolhido] = useState<Status>("open");
  const [operando, setOperando] = useState(false);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);

  // O componente já trata espera e falha. Complete consultarChamado na Missão 2.
  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErroConsulta("");
      try {
        if (!id) throw new Error("Identificador ausente.");
        const dados = await consultarChamado(id);
        setChamado(dados);
        setStatusEscolhido(dados.status);
      } catch (e) {
        setErroConsulta(mensagemDeErro(e));
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  // MISSÃO 5: chame alterarStatus com o id e a escolha. Atualize a tela somente
  // após o sucesso; em falha, permita tentar novamente.
  async function handleAlterarStatus() {
    if (!chamado) return;

    setOperando(true);
    try {
      const dados = await alterarStatus(chamado.id, statusEscolhido);
      setChamado(dados);
      setErroAcao("");
    } catch (e) {
      setErroAcao(mensagemDeErro(e));
    }
    setOperando(false);
  }

  // MISSÃO 5: chame excluirChamado. Navegue à lista somente após o sucesso.
  // Em falha, mantenha o diálogo aberto e restaure o botão.
  async function handleExcluir() {
    if (!chamado) return;
    setOperando(true);
    try {
      await excluirChamado(chamado.id);
      setErroAcao("");
    } catch (e) {
      setErroAcao(mensagemDeErro(e));
    }
    setOperando(false);
  }

  if (carregando)
    return (
      <div className="estado-pagina" role="status">
        Carregando chamado...
      </div>
    );
  if (erroConsulta || !chamado)
    return (
      <div className="estado-pagina" role="alert">
        <h1>Não foi possível abrir o chamado</h1>
        <p>{erroConsulta}</p>
        <Link className="botao secundario" to="/chamados">
          Voltar aos chamados
        </Link>
      </div>
    );

  return (
    <div className="pagina-detalhe">
      <div className="pagina-cabecalho">
        <div>
          <p className="sobretitulo">
            CENTRAL DE CHAMADOS <span>/</span> DETALHES
          </p>
          <h1>Detalhes do chamado</h1>
          <p className="subtitulo">
            Consulte o registro e acompanhe a solução.
          </p>
        </div>
        <Link className="botao secundario cabecalho-acao" to="/chamados">
          Voltar à lista
        </Link>
      </div>
      <div className="detalhe-layout">
        <article className="painel detalhe-principal">
          <div className="detalhe-topo">
            <span className="detalhe-id">
              CHAMADO #{chamado.id.slice(0, 8).toUpperCase()}
            </span>
            <span className={`etiqueta status-${chamado.status}`}>
              {status[chamado.status]}
            </span>
          </div>
          <h2>{chamado.title}</h2>
          <p className="detalhe-descricao">{chamado.description}</p>
          <dl className="detalhe-meta">
            <div>
              <dt>Categoria</dt>
              <dd>{categorias[chamado.category]}</dd>
            </div>
            <div>
              <dt>Prioridade</dt>
              <dd>
                <span className={`etiqueta prioridade-${chamado.priority}`}>
                  {prioridades[chamado.priority]}
                </span>
              </dd>
            </div>
            <div>
              <dt>Aberto em</dt>
              <dd>{dataCurta(chamado.created_at)}</dd>
            </div>
          </dl>
        </article>
        <aside className="detalhe-lateral">
          <section className="painel gerenciamento">
            <div className="painel-titulo">
              <span className="icone-titulo">
                <Icone nome="ticket" />
              </span>
              <h2>Gerenciar chamado</h2>
            </div>
            <p>Atualize o andamento para manter todos informados.</p>
            <label className="campo" htmlFor="status">
              <span>Status do chamado</span>
              <select
                id="status"
                value={statusEscolhido}
                onChange={(e) => setStatusEscolhido(e.target.value as Status)}
                disabled={operando}
              >
                <option value="open">Aberto</option>
                <option value="in_progress">Em andamento</option>
                <option value="closed">Fechado</option>
              </select>
            </label>
            <button
              className="botao primario largura-total"
              type="button"
              onClick={handleAlterarStatus}
              disabled={operando || statusEscolhido === chamado.status}
            >
              {operando ? "Salvando..." : "Salvar status"}
            </button>
            {erroAcao && !confirmandoExclusao && (
              <p className="aviso erro" role="alert">
                {erroAcao}
              </p>
            )}
          </section>
          <section className="painel zona-perigo">
            <h2>Excluir chamado</h2>
            <p>
              Remova este registro após confirmar que ele não é mais necessário.
            </p>
            <button
              className="botao texto-perigo"
              type="button"
              onClick={() => {
                setErroAcao("");
                setConfirmandoExclusao(true);
              }}
            >
              <Icone nome="trash" tamanho={17} /> Excluir chamado
            </button>
          </section>
        </aside>
      </div>
      {confirmandoExclusao && (
        <ConfirmarExclusao
          titulo={chamado.title}
          operando={operando}
          erro={erroAcao}
          onCancelar={() => setConfirmandoExclusao(false)}
          onConfirmar={handleExcluir}
        />
      )}
    </div>
  );
}
