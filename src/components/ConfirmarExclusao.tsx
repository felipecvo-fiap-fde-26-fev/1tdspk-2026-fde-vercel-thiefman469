import Icone from "./Icone";

type Props = {
  titulo: string;
  operando: boolean;
  erro: string;
  onCancelar: () => void;
  onConfirmar: () => void;
};

export default function ConfirmarExclusao({ titulo, operando, erro, onCancelar, onConfirmar }: Props) {
  return (
    <div className="dialogo-fundo" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget && !operando) onCancelar(); }}>
      <div className="dialogo" role="alertdialog" aria-modal="true" aria-labelledby="dialogo-titulo" aria-describedby="dialogo-descricao">
        <span className="dialogo-icone"><Icone nome="trash" tamanho={23} /></span>
        <h2 id="dialogo-titulo">Excluir chamado?</h2>
        <p id="dialogo-descricao">O chamado <strong>“{titulo}”</strong> será removido. Esta ação não pode ser desfeita.</p>
        {erro && <p className="aviso erro" role="alert">{erro}</p>}
        <div className="dialogo-acoes"><button className="botao secundario" type="button" disabled={operando} onClick={onCancelar}>Cancelar</button><button className="botao perigo" type="button" disabled={operando} onClick={onConfirmar}>{operando ? "Excluindo..." : "Sim, excluir"}</button></div>
      </div>
    </div>
  );
}
