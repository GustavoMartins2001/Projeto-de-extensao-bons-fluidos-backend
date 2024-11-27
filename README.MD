# Instruções para rodar o projeto

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando
- npm ou yarn para gerenciamento de pacotes

### O banco de dados utilizado foi o MySQL, as configurações deste se encontram no arquivo '.env'.
### O nome do banco é 'backend', portanto rode o SQL:
#### `CREATE DATABASE backend;`
### Instale as dependências:
#### `npm install`
### Rodar migrations para criação de tabelas:
#### `npx sequelize-cli db:migrate`
### Rode o script para iniciar o servidor:
#### `npm start`
<br><br>

## Users <br>
### POST Cadastrar Usuário 
http://localhost:3000/api/user/register<br>
Body: <br>
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123",
  "superUser": 1,
}
```
<br>

### POST Login
http://localhost:3000/api/auth/login<br>
Body: <br>
```json
{
    "email": "email@exemplo.com",
    "password": "senha123"
}
```
<br>
