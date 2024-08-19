## Regras de Contribuição

Antes de começar a trabalhar em qualquer nova funcionalidade ou modificar o código existente, siga estas etapas para garantir que você está alinhado com a versão mais recente do projeto e evitar conflitos:

info <sub>1</sub>: **Atualize seu repositório local**: Sempre comece com `git pull` ou `git pull --rebase` para obter as últimas atualizações do repositório remoto. Isso garantirá que você esteja trabalhando com a versão mais recente do código e evitará conflitos ao integrar suas alterações.


### 1. Fluxo de Desenvolvimento baseado no git workflow

Cada unidade de trabalho é seja um bug ou feature, é feita atraves da branch <i>main</i>. Depois que o trabalho é concluido - criada a partir da main, ele é revisado e testado antes de realizar o merge na <b>main</b>, e passano pela branch de <i>develop</i> para no final ser mergeado a <b>Main</b>

<b>branchs existentes</b>:

- <b>Main</b>: principal branch - branch em produção. todas as novas funcionalidades que estamos desenvolvendo, em algum momento, serão mescladas ou associadas a Main
- <b>Develop</b>: onde ficará o codigo do nosso proximo deploy. isso significa que, como recursos ou funcionalidades, será finalizado e adicionando nesta ramificação para posteriormente passo por mais uma etapa antes de ser associado a Main.

<b>branchs de suporte</b>:

- <b>Feature</b> - são branchs para o desenvolvimento de uma funcioanlide específica. Elas devem ter no nome iniciado por feature, exemplo: "feature/api-comanda". É importante lembrar que essas <i>features</i> branchs são sempre criadas sempre a parti da branch <i>Develop</i>.
Portanto, quando finalizada, ela é removida após realizar o merge com a branch Develop

- <b>Realese</b> - server para como ponte para fazer o merge da Develop para a main. Funciona como ambiente de homologação e é removida após realizar os testes e do merge com a main. caso haja alguma alteração, ela também deve ser sincronizada com a Develop.

- <b>Bugfix</b> - uma branch criada a partir da Realese para realizar correções encontradas no sistema ainda no momemnto de desenvolvimento. Quando é concluida ela é excluida após realizar o merge com a branch realese.

- <b>Hotfilz</b> - uma branch criada a partir da Main para realizar correções encontrada no sistema em produção. Quando concuida ela é excluida após realizar o merge com a branch main e develop.


<p style="color: red;">info <sub>2</sub>: as branches de suporte devem ser excluídas após o merge.</p>


### 2. Commmits semânticos


Um commit semântico é um tipo de commit no Git que segue uma convenção específica para a mensagem de commit, com o objetivo de tornar o histórico de commits mais claro e fácil de entender. O principal objetivo é fornecer uma estrutura consistente para mensagens de commit, facilitando a leitura e a manutenção do código.

Um commit semântico geralmente segue a seguinte estrutura:

```git
<tipo>[escopo opcional]: <descrição>
<corpo opcional>
<rodapé opcional>

```
na prática:

```git
fix(containers/profile): ajustar argumento da função getThumbnailImage

A função getThumbnailImage costumava receber um argumento do tipo XPTO.
Agora recebe o argumento correto do tipo FOO.

Resolve o issue #132

```

Tipo: Define a natureza da mudança. Os tipos comuns incluem:

- feat: Adição de uma nova funcionalidade.
- fix: Correção de um bug.
- docs: Alterações na documentação.
- style: Alterações que não afetam o significado do código (formatação, espaçamento).
- refactor: Alterações no código que não adicionam uma nova funcionalidade ou corrigem um bug.
- test: Adição ou modificação de testes.
- chore: Outras mudanças que não se encaixam nas categorias acima (atualizações de build, configurações).

Escopo: (Opcional) Indica a parte do código afetada pela mudança. É colocado entre parênteses.

Mensagem: Descreve brevemente a mudança realizada.

Corpo: (Opcional) Fornece detalhes adicionais sobre a mudança, como o motivo da alteração e o impacto.


### Exemplos de Commits Semânticos
- feat(auth): add JWT authentication
  
  Adiciona autenticação JWT ao sistema de autenticação.

- fix(ui): resolve button alignment issue
  
  Corrige o problema de alinhamento dos botões na interface do usuário.

- docs(readme): update contribution guidelines
  
  Atualiza as diretrizes de contribuição no README.

### Ver mais

git workflow:

https://www.zup.com.br/blog/git-workflow

commit semânticos:

https://blog.cubos.io/que-tal-comecar-a-usar-commits-semanticos/#


