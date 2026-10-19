# FixIt — Questões teóricas (3 pontos)

Cada questão vale **1 ponto**. Responda **na folha fornecida pelo professor**. Informe nomes completos, RMs e nome exato do repositório no GitHub. Não escreva respostas neste arquivo.

## Questão 1 — Requisição e resposta

Uma pessoa abre a lista de chamados e, em seguida, abre os detalhes de um deles. Indique o método HTTP e o caminho da API usados em cada ação. Explique, em uma frase, por que a segunda consulta precisa incluir o identificador no endereço.

## Questão 2 — Formulário e criação

No cadastro, o usuário preenche título, descrição, categoria e prioridade. Explique o papel de `register` e `handleSubmit` do React Hook Form nesse fluxo. Depois, diga qual método, cabeçalho e formato de corpo devem ser enviados à API para criar o chamado. O que deve acontecer quando o formulário é inválido?

## Questão 3 — Falha, status e exclusão

Uma implementação altera o status mostrado na tela **antes** de receber a resposta do `PUT`. Em seguida, tenta executar `resposta.json()` depois de um `DELETE` que retornou `204`.

Explique os dois problemas. Descreva o que a interface deve fazer se o `PUT` falhar, quando o status na tela deve mudar e como tratar a resposta `204` antes de voltar à lista.
