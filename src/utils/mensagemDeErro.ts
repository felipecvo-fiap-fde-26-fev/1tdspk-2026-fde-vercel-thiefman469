export function mensagemDeErro(erro: unknown) {
  return erro instanceof Error ? erro.message : "Ocorreu um erro inesperado.";
}
