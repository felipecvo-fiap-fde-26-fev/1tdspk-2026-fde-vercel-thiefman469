# FixIt — Avaliação de HTTP (aulas 11–15)

## Avaliação

O FixIt é uma central de chamados da Faculdade Bento. A interface, a navegação e os componentes visuais já estão prontos. Sua dupla implementará as operações de HTTP e o formulário estudados nos codelabs das aulas 11 a 15.

A avaliação vale **10 pontos**:

| Parte                                    | Pontos |
| ---------------------------------------- | -----: |
| Missões práticas                         |      7 |
| Três questões teóricas em `PERGUNTAS.md` |      3 |
| **Total**                                | **10** |

As missões são progressivas. Cada uma aproveita o que foi concluído antes:

| Missão | Conteúdo                    | Pontos | Prática acumulada |
| ------ | --------------------------- | -----: | ----------------: |
| 1      | GET da lista                |      2 |                 2 |
| 2      | GET de um chamado           |      2 |                 4 |
| 3      | React Hook Form e validação |      1 |                 5 |
| 4      | POST de um chamado          |      1 |                 6 |
| 5      | PUT de status e DELETE      |      1 |                 7 |

**Ordem obrigatória:** faça as missões **1 → 2 → 3 → 4 → 5**. Conclua, teste e registre cada missão em um commit antes de iniciar a próxima. Não pule etapas nem desenvolva duas missões ao mesmo tempo.

**Não antecipe requisitos:** em cada etapa, implemente somente o que ela pede. Mesmo quando duas missões usam o mesmo arquivo, não complete funções ou fluxos reservados para uma missão posterior. Por exemplo: não faça o GET de detalhes na Missão 1, não envie POST na Missão 3 e não implemente PUT ou DELETE antes da Missão 5. A sequência deve ficar identificável no histórico de commits.

**Consequência na nota:** descumprir a ordem ou antecipar requisitos reduzirá a pontuação das missões envolvidas, mesmo que a aplicação funcione ao final.

As questões teóricas valem **1 ponto cada**. A dupla pode entregar as missões concluídas mesmo que não termine todas. Código parcial funcional pode receber pontuação parcial. Recursos implementados com dados fixos no lugar de respostas da API não cumprem as missões.

## Preparação

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite. O projeto inicial deve abrir sem erros. A API já contém chamados de exemplo, mas a lista da aplicação permanece vazia até a Missão 1; a página de detalhes será ativada na Missão 2.

As rotas já estão configuradas:

| Rota             | Página                                   |
| ---------------- | ---------------------------------------- |
| `/chamados`      | Lista, busca, filtros e resumo           |
| `/chamados/novo` | Cadastro                                 |
| `/chamados/:id`  | Detalhes, alteração de status e exclusão |

Os tipos estão em `src/types/chamado.ts`, os rótulos em `src/data/rotulos.ts`, os templates em `src/pages` e as funções de HTTP em `src/services/chamados.ts`. Procure os comentários `MISSÃO` para localizar os pontos de trabalho. **Preserve o layout fornecido.**

## API disponível

Base: `https://fixit-api-vc7a.onrender.com`

| Método   | Caminho        | Resultado esperado                                      |
| -------- | -------------- | ------------------------------------------------------- |
| `GET`    | `/tickets`     | Lista de chamados em JSON                               |
| `GET`    | `/tickets/:id` | Um chamado em JSON                                      |
| `POST`   | `/tickets`     | Cria e devolve o chamado (`201`)                        |
| `PUT`    | `/tickets/:id` | Altera **somente o status** e devolve o chamado (`200`) |
| `DELETE` | `/tickets/:id` | Exclui sem corpo de resposta (`204`)                    |

Um chamado recebido tem este formato:

```json
{
  "id": "01a1282c-3a69-7d2a-af29-9b886f0348c3",
  "title": "Problema com o Wi-Fi",
  "description": "Sem conexão no laboratório 2.",
  "category": "infrastructure",
  "priority": "high",
  "status": "open",
  "created_at": "2026-10-10T23:35:49.609862Z"
}
```

O identificador é uma **string UUID**, gerada pela API. O `POST` recebe `title`, `description`, `category` e `priority`. Valores aceitos:

| Campo      | Valores                                  |
| ---------- | ---------------------------------------- |
| `category` | `infrastructure`, `equipment`, `systems` |
| `priority` | `low`, `medium`, `high`                  |
| `status`   | `open`, `in_progress`, `closed`          |

Os dados da API são compartilhados. Para testar cadastro, use um título que identifique sua dupla e altere ou exclua **somente chamados criados por vocês**. O primeiro acesso à API publicada pode demorar alguns segundos.

## Missão 1 — Carregar a lista — 2 pontos

Em `src/services/chamados.ts`, complete `listarChamados`.

- Faça um `GET` para `API` usando `fetch`.
- Verifique `resposta.ok` antes de ler o corpo; se falhar, lance um `Error` com o status.
- Leia o JSON e devolva `Chamado[]`.
- Confirme que a lista da página `/chamados` mostra os dados recebidos, sem importar um array local.
- Confira método, endereço e status na aba **Network**.

A página já possui `useEffect`, estado, carregamento, erro, nova tentativa, filtros e tabela. O trabalho desta missão é completar a origem dos dados.

```bash
git add src/services/chamados.ts
git commit -m "feat: consulta lista de chamados"
```

## Missão 2 — Abrir um chamado — 2 pontos

Complete `consultarChamado(id)` no mesmo service.

- Monte o endereço com o `id` recebido, sem usar um identificador fixo.
- Faça um `GET`, verifique `resposta.ok` e devolva o JSON como `Chamado`.
- Clique em um item da lista e confirme que `/chamados/:id` mostra título, descrição, categoria, prioridade, status e data do chamado escolhido.
- Teste também um identificador inexistente e confirme que a página apresenta a falha.

A rota, os links e os estados da página de detalhes já estão preparados.

```bash
git add src/services/chamados.ts
git commit -m "feat: consulta detalhe do chamado"
```

## Missão 3 — Validar o formulário — 1 ponto

Em `src/pages/NovoChamado.tsx`, conecte os quatro campos existentes ao **React Hook Form**.

- Use `register` com os nomes do tipo `NovoChamadoInput`.
- Título e descrição devem ser obrigatórios, inclusive quando preenchidos só com espaços. O título tem até 100 caracteres e a descrição até 500.
- Categoria e prioridade devem exigir uma escolha válida.
- Mostre as mensagens de `formState.errors` junto de cada campo, usando a classe `.erro-campo` já estilizada.
- O `<form>` deve continuar usando `handleSubmit`. Um formulário inválido não deve executar `handleCriar`.

Ainda não é para enviar `POST`. O botão pode mostrar a mensagem provisória de cadastro. A missão deve encerrar aqui.

```bash
git add src/pages/NovoChamado.tsx
git commit -m "feat: valida formulario de chamado"
```

## Missão 4 — Criar um chamado — 1 ponto

Complete `criarChamado` em `src/services/chamados.ts` e `handleCriar` em `src/pages/NovoChamado.tsx`.

- Faça um `POST` para `API` com `Content-Type: application/json` e `JSON.stringify(dados)`.
- Verifique `resposta.ok` e devolva o chamado criado.
- No envio, aguarde a função do service. O botão já apresenta o estado `isSubmitting`.
- Após o sucesso, navegue para a lista e apresente uma mensagem de sucesso. A lista já possui um espaço preparado para essa mensagem.
- Em falha, mostre o erro e mantenha os campos preenchidos para outra tentativa.
- Confirme na Network o método, o corpo JSON e o status `201`.

Teste com um chamado criado por sua dupla. Um formulário inválido não deve fazer `POST`.

```bash
git add src/services/chamados.ts src/pages/NovoChamado.tsx
git commit -m "feat: cria chamado via HTTP"
```

## Missão 5 — Atualizar e excluir — 1 ponto

Esta é a missão mais exigente. Complete `alterarStatus` e `excluirChamado` no service e os dois callbacks em `src/pages/DetalheChamado.tsx`.

**Alteração de status**

- Envie `PUT /tickets/:id` com `Content-Type: application/json` e corpo contendo **apenas** `{ "status": "..." }`.
- Verifique a resposta e leia o chamado atualizado.
- Desabilite o botão durante a operação. Atualize a tela com o chamado devolvido somente após o sucesso.
- Em falha, preserve o status anterior, apresente o erro e permita nova tentativa.

**Exclusão**

- O diálogo de confirmação já está pronto. Cancelar não deve enviar requisição.
- Ao confirmar, envie `DELETE /tickets/:id` e verifique `resposta.ok`.
- A resposta de sucesso tem status `204` e não possui JSON.
- Só depois do sucesso navegue à lista. Em falha, mantenha o diálogo aberto e permita outra tentativa.

Teste apenas com um chamado criado pela dupla. Confirme os dois métodos e respectivos status na Network.

```bash
git add src/services/chamados.ts src/pages/DetalheChamado.tsx
git commit -m "feat: atualiza status e exclui chamado"
```

## Questões teóricas — 3 pontos

Responda as três questões de `PERGUNTAS.md` **na folha fornecida pelo professor**. Inclua nomes completos, RMs e o nome exato do repositório no GitHub. Respostas no arquivo ou no repositório não substituem a folha.

## Consultas e integridade

É permitido consultar slides, codelabs, documentação oficial, sites, fóruns, anotações e códigos desenvolvidos anteriormente pela própria dupla. **Não é permitido utilizar IA generativa** para escrever, completar, corrigir ou explicar código durante a avaliação. O uso de IA generativa anula a avaliação.

Ambos os integrantes devem compreender o código entregue. O professor poderá pedir que expliquem uma parte da implementação.

## Entrega

- Faça um commit ao concluir cada missão, antes de iniciar a seguinte. Cada commit deve conter apenas os requisitos da missão correspondente; não concentre tudo em um único commit.
- Não apague nem reescreva o histórico. Não use `git push --force`.
- Execute `npm run build` antes da entrega.
- Envie os commits com `git push`. Apenas o código no repositório remoto será considerado.
- Entregue a folha com as três respostas teóricas e a identificação da dupla.

As missões avaliam funcionamento, uso correto de HTTP e React Hook Form, estados de espera/falha, tipagem e clareza do código. Alterações só visuais não substituem funcionalidades.
