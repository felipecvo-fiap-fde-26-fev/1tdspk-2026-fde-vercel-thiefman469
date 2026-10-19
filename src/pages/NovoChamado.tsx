import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import Icone from "../components/Icone";
import type { NovoChamadoInput } from "../types/chamado";
import { criarChamado } from "../services/chamados";

export default function NovoChamado() {
  const [erro, setErro] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NovoChamadoInput>();

  // MISSÃO 4: receba os dados validados, chame criarChamado e navegue após o sucesso.
  // Em caso de falha, mantenha os valores preenchidos e apresente o erro.
  async function handleCriar(_dados: NovoChamadoInput) {
    try {
      await criarChamado(_dados);
      setErro("");
    } catch (e) {
      setErro("Erro" + e);
    }
  }

  return (
    <div className="pagina-formulario">
      <div className="pagina-cabecalho">
        <div>
          <p className="sobretitulo">
            CENTRAL DE CHAMADOS <span>/</span> NOVO
          </p>
          <h1>Novo chamado</h1>
          <p className="subtitulo">
            Descreva o problema para que possamos ajudar.
          </p>
        </div>
      </div>
      <div className="form-layout">
        <section
          className="painel formulario-painel"
          aria-labelledby="titulo-formulario"
        >
          <div className="painel-titulo">
            <span className="icone-titulo">
              <Icone nome="ticket" />
            </span>
            <div>
              <h2 id="titulo-formulario">Informações do chamado</h2>
              <p>Preencha os campos abaixo para abrir uma solicitação.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleCriar)} noValidate>
            <div className="campo">
              <label htmlFor="title">
                Título <span>*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Ex.: Problema com o projetor"
                maxLength={100}
                {...register("title", {
                  required: "Informe o título",
                })}
              />
              {/* MISSÃO 3: conecte com register, valide e apresente errors.title. */}
              {errors.title && (
                <p className="erro-campo">{errors.title.message}</p>
              )}
            </div>
            <div className="campo-grid">
              <div className="campo">
                <label htmlFor="category">
                  Categoria <span>*</span>
                </label>
                <select
                  id="category"
                  defaultValue=""
                  {...register("category", {
                    required: "Informe a categoria",
                  })}
                >
                  <option value="" disabled>
                    Selecione...
                  </option>
                  <option value="infrastructure">Infraestrutura</option>
                  <option value="equipment">Equipamentos</option>
                  <option value="systems">Sistemas</option>
                </select>
                {/* MISSÃO 3: conecte e valide a categoria. */}
                {errors.category && (
                  <p className="erro-campo">{errors.category.message}</p>
                )}
              </div>
              <div className="campo">
                <label htmlFor="priority">
                  Prioridade <span>*</span>
                </label>
                <select
                  id="priority"
                  defaultValue=""
                  {...register("priority", {
                    required: "Informe a prioridade",
                  })}
                >
                  <option value="" disabled>
                    Selecione...
                  </option>
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
                {/* MISSÃO 3: conecte e valide a prioridade. */}
                {errors.priority && (
                  <p className="erro-campo">{errors.priority.message}</p>
                )}
              </div>
            </div>
            <div className="campo">
              <label htmlFor="description">
                Descrição <span>*</span>
              </label>
              <textarea
                id="description"
                rows={7}
                placeholder="Descreva o problema com detalhes: local, equipamento e o que aconteceu..."
                maxLength={500}
                {...register("description", {
                  required: "Informe a descrição",
                })}
              />
              {/* MISSÃO 3: conecte com register, valide e apresente errors.description. */}
              {errors.description && (
                <p className="erro-campo">{errors.description.message}</p>
              )}
              <small className="dica-campo">Até 500 caracteres.</small>
            </div>
            {erro && (
              <p className="aviso erro" role="alert">
                {erro}
              </p>
            )}
            <div className="form-acoes">
              <Link className="botao secundario" to="/chamados">
                Cancelar
              </Link>
              <button
                className="botao primario"
                type="submit"
                disabled={isSubmitting}
              >
                <Icone nome="plus" tamanho={17} />
                {isSubmitting ? "Abrindo..." : "Abrir chamado"}
              </button>
            </div>
          </form>
        </section>
        <aside className="painel orientacoes">
          <span className="orientacoes-numero">01 / 03</span>
          <h2>Um bom chamado começa com uma descrição clara.</h2>
          <p>
            Informe onde o problema acontece e o que você já tentou. A equipe de
            suporte poderá entender a situação mais rápido.
          </p>
          <div className="orientacoes-linha" />
          <p className="orientacoes-nota">
            Ao ser criado, o chamado recebe automaticamente o status{" "}
            <strong>Aberto</strong>.
          </p>
        </aside>
      </div>
      <p className="form-rodape">Os campos marcados com * são obrigatórios.</p>
    </div>
  );
}
