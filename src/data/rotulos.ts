import type { Categoria, Prioridade, Status } from "../types/chamado";

export const categorias: Record<Categoria, string> = {
  infrastructure: "Infraestrutura",
  equipment: "Equipamentos",
  systems: "Sistemas",
};

export const prioridades: Record<Prioridade, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

export const status: Record<Status, string> = {
  open: "Aberto",
  in_progress: "Em andamento",
  closed: "Fechado",
};

export function dataCurta(valor: string) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
    new Date(valor),
  );
}
