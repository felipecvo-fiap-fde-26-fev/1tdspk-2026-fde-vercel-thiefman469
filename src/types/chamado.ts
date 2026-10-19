export type Categoria = "infrastructure" | "equipment" | "systems";
export type Prioridade = "low" | "medium" | "high";
export type Status = "open" | "in_progress" | "closed";

export type Chamado = {
  id: string;
  title: string;
  description: string;
  category: Categoria;
  priority: Prioridade;
  status: Status;
  created_at: string;
};

export type NovoChamadoInput = Pick<
  Chamado,
  "title" | "description" | "category" | "priority"
>;
