# Treinamento Java/Angular
Desafio - Desenvolver um sistema de Gestão de Restaurante

## Get Started

1. No diretório de sua preferência, execute no terminal/git bash:
```bash
git clone https://github.com/guigomes94/treinamento-java-angular.git
```

O projeto Spring está configurado em três perfis: test, dev, prod.
Por default esta test. Você pode alterar o perfil no arquivo application.properties.

### Backend
Em perfil 'test', está programado para executar o banco h2 em memória. (Se não deseja mudar para dev, pule para o passo 5)
No caso de utilizar o 'dev', precisará seguir os passoas a seguir:
1. Instâncie um cluster do PostgreSQL, instale na máquina ou utilize um contêiner Docker.
2. Instale ou inicie um cliente Postgre, pode ser o de sua preferência. Exemplos: (PgAdmin, Postbird, DBeaver)
3. No cliente Postgres, execute o comando 'CREATE DATABASE restaurante;' (sem aspas)
4. Abra a pasta gestaoRestaurante (back-end): No arquivo application.properties, que você escontrará em src/main/resources, 
altere o username e password para o da sua máquina, e se criou o banco com outro nome ou em outra porta, altere na url;
Exemplo:
```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/restaurante
spring.datasource.username=postgres
spring.datasource.password=docker
```

5. Na pasta gestaoRestaurante, você poderá da Start na aplicação pelo Spring Boot se o Maven já tiver concluído o download das dependências.
Se a aplicação Spring subiu sem erros, podemos agora executar o front-end Angular.

### Frontend
6. Na pasta restaurante-ui, para baixar as dependências do projeto. Execute no terminal:
```bash
npm install
```
7. Se o spring estiver rodando na porta em localhost:8080 não será necessário mais nenhuma alteração, caso contrário.
Em src/app/service atualiza a URL_BASE em item.service.ts, order.service.ts, user.service.ts.

8. Start o app angular com o comando no terminal:
```bash
ng serve -o para rodar na porta 4200 ou ng serve --port {porta de sua preferência}
```
