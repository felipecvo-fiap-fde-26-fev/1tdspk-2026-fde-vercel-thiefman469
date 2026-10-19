import type { Chamado, NovoChamadoInput, Status } from "../types/chamado";

export const API = "https://fixit-api-vc7a.onrender.com/tickets";

// MISSÃO 1: substitua o retorno temporário por GET, resposta.ok e resposta.json().
export async function listarChamados(): Promise<Chamado[]> {
  const resposta = await fetch(API);

  if (!resposta.ok) {
    throw new Error("Falha ao buscar a lista de chamados");
  }

  const dados = await resposta.json();

  return dados;
}

// MISSÃO 2: consulte um único chamado usando o id recebido.
export async function consultarChamado(id: string): Promise<Chamado> {
  const resposta = await fetch(API + `/${id}`);

  if (!resposta.ok) {
    throw new Error("Não foi possível pegar o chamado");
  }

  const dado = await resposta.json();

  return dado;
}

// MISSÃO 4: envie os valores validados como JSON e retorne o chamado criado.
export async function criarChamado(dados: NovoChamadoInput): Promise<Chamado> {
  const resposta = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error("Falha na criação do chamado");
  }

  return resposta.json();
}

// MISSÃO 5: PUT altera somente o status e devolve o chamado atualizado.
export async function alterarStatus(
  id: string,
  status: Status,
): Promise<Chamado> {
  const resposta = await fetch(API + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!resposta.ok) {
    throw new Error("Falha na atualização do chamado");
  }

  return resposta.json();
}

// MISSÃO 5: DELETE retorna 204, portanto não leia resposta.json().
export async function excluirChamado(id: string): Promise<void> {
  const resposta = await fetch(API + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!resposta.ok) {
    throw new Error("Falha na atualização do chamado");
  }
}
