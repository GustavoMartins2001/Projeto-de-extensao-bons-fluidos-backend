# Instruções para rodar o projeto

### Pré-requisitos
- Node.js instalado
- Docker compose
- npm ou yarn para gerenciamento de pacotes

### O banco de dados utilizado foi o MySQL, as configurações deste devem ser feitas no '.env' no modelo do '.env.example'.
### Suba o container do mysql:
#### `docker compose up`
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
Body: 
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123",
  "superUser": true,
  "supporter": false
}
```
<br>

### GET Listar Usuários
http://localhost:3000/api/user/list<br>
<br>

### PUT Atualizar Usuário
http://localhost:3000/api/user/update/:id<br>
Body: 
```json
{
  "name": "Novo Nome",
  "email": "novoemail@exemplo.com",
  "password": "novasenha123",
  "superUser": true,
  "supporter": true
}
```
<br>

### DELETE Excluir Usuário
http://localhost:3000/api/user/delete/:id<br>
<br>

## Auth <br>

### POST Login
http://localhost:3000/api/auth/login<br>
Body: 
```json
{
    "email": "email@exemplo.com",
    "password": "senha123"
}
```
<br>

## Event <br>

### POST Criar Evento
http://localhost:3000/api/event/create<br>
Body: 
```json
{
    "date": "2024-12-08T10:00:00Z",
    "description": "Evento de Conscientização",
    "participants": [1, 2, 3]
}
```
<br>

### GET Listar Eventos
http://localhost:3000/api/event/list<br>
<br>

### PUT Atualizar Evento
http://localhost:3000/api/event/update/:id<br>
Body: 
```json
{
    "date": "2024-12-09T10:00:00Z",
    "description": "Evento de Conscientização Atualizado",
    "participants": [1, 2, 4]
}
```
<br>

### DELETE Excluir Evento
http://localhost:3000/api/event/delete/:id<br>