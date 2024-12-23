MVC! Em uma arquitetura típica de software, a informação geralmente passa por várias camadas antes de ser armazenada no banco de dados. Aqui está um resumo do processo:

1. **Rota (Route)**: A requisição do cliente chega à rota definida na aplicação. Essa rota é responsável por mapear a URL da requisição para um controlador específico.

2. **Controle (Controller)**: O controlador recebe a requisição e gerencia a lógica de negócio. Ele pode realizar validações, processar dados e interagir com modelos ou serviços. O controlador faz a ponte entre as rotas e a camada de acesso a dados.

3. **Modelo (Model)**: Normalmente, após o processamento no controlador, os dados são enviados para a camada de modelo, que representa a estrutura dos dados e gerencia a interação com a base de dados. Essa camada é responsável por realizar consultas e operações de CRUD (Create, Read, Update, Delete) no banco.

4. **Banco de Dados**: Por fim, os dados são armazenados ou recuperados do banco de dados, completando o ciclo de comunicação.

Essa estrutura ajuda na organização do código e na separação de preocupações, facilitando a manutenção e evolução do sistema.

## Links de Apoio:

- `https://stackoverflow.com/questions/52675257/how-to-send-data-from-html-to-node-js`

- `https://pt.stackoverflow.com/questions/374129/pegar-dados-no-method-post`

- `https://stackoverflow.com/questions/48248832/stylesheet-not-loaded-because-of-mime-type`

- `https://pt.stackoverflow.com/questions/374129/pegar-dados-no-method-post`

- `https://www.npmjs.com/package/md5`

- `https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests`

- `https://www.codesnippets.dev.br/post/como-gerar-um-simples-hash-com-javascript`

- `https://www.scaler.com/topics/nodejs/import-and-export-in-nodejs/`

- `https://consolelog.com.br/utilizando-node-js-e-dotenv-para-parametrizar-sua-aplicacao/`

- `https://www.freecodecamp.org/portuguese/news/exportacao-de-modulos-do-node-explicada-com-exemplos-de-exportacao-de-funcoes-do-javascript/`
