# Game Shop Frontend
## Descrição do Projeto:

O Game Shop Frontend traz uma interface para interagir com a [Game Shop API](https://github.com/prisfalcao/game-shop-api) e gerenciar uma loja fictícia de jogos, com opções de listar games no catálogo, adicionar e remover do carrinho, e acessar a área de admin da loja, permitindo a importação de novos games para o catálogo via RAWG API.  
Essa é a segunda etapa do projeto MVP desenvolvido para a sprint de Desenvolvimento Back-end Avançado do curso de pós-graduação em Desenvolvimento Full Stack da PUC Rio.

## 📋 Funcionalidades

- Página de admin para importar jogos da API RAWG.io, adicionar jogos manualmente, editar e deletar jogos.
- Página de catálogo com jogos à venda
- Carrinho de compras com opção de remover itens

  As rotas de POST(import e add game), PUT(edit game) e DELETE da área de admin requerem um token para serem executadas. O token é: admin-secret-token

## 🚀 Tecnologias Utilizadas

- **React** - Estrutura da interface de usuário.
- **CSS** - Estilização do layout.
- **Docker** - Roda a aplicação em container.

## ⚙️ Pré-requisitos

Antes de iniciar, é necessário ter a [Game Shop API](https://github.com/prisfalcao/game-shop-api) em execução localmente.

## 🚀 Como rodar localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/prisfalcao/game-shop-frontend
   
2. Acesse o diretório do projeto:
   ```bash
      cd game-shop-frontend
3. No terminal do projeto digite os seguintes comandos:
    ```bash
      npm install
      npm start
      Acesse em http://localhost:3000.

## 🚀 Como rodar via Docker
1. No terminal do projeto digite os seguintes comandos:
   ```bash
   docker build -t game-shop-frontend .
   docker run -p 3000:80 game-shop-frontend
   Acesse em http://127.0.0.1:3000   

### 🤝 Contribuindo: 
Contribuições são bem-vindas! Para relatar bugs ou sugerir melhorias, por favor, abra uma issue no repositório.

--------------------------------------------------------
# Game Shop Frontend
## Description

The Game Shop Frontend was developed to interact with the [Game Shop API](https://github.com/prisfalcao/game-shop-api) and manage a fictitious game shop, with a catalog of games and a shopping cart where the user can add and remove games from the cart.
This is the second stage of the MVP project developed for Advanced Back-end Development for the Full Stack Development post-graduate course at PUC Rio.

## 📋 Features

- Admin page to import games from the RAWG.io API, add games manually, edit and delete games
- Catalog page with games for sale
- Shopping cart with option to remove items

  The routes for POST(import and add game), PUT(edit game) and DELETE in the admin area will require a token to be executed. The token is: admin-secret-token

## 🚀 Technologies Used

- **React** - User interface structure.
- **CSS** - Layout styling.
- **Docker** - Run the application in a container.

## ⚙️ Prerequisites

Before starting, ensure the [Game Shop API](https://github.com/prisfalcao/game-shop-api) is running locally.

## 🚀 How to run the project locally

1. Clone this repository:
   ```bash
   git clone https://github.com/prisfalcao/game-shop-frontend

2. Go to the project directory:
   ```bash
      cd game-shop-frontend
3. On your project's terminal execute the following commands:
    ```bash
      npm install
      npm start
      Open http://localhost:3000.

## 🚀 Running the project on Docker:
1. On your project's terminal execute the following commands:
   ```bash
   docker build -t game-shop-frontend .
   docker run -p 3000:80 game-shop-frontend
   In your browser access http://127.0.0.1:3000  

### 🤝 Contributing: 
Contributions are welcome! To report bugs or suggest improvements, please open an issue in the repository.
