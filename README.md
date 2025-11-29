# Projeto Test Final

Este projeto demonstra as metodologias de Desenvolvimento Orientado por Testes (TDD) e Desenvolvimento Orientado por Comportamento (BDD) em um sistema de mercado virtual. O TDD valida dados no cadastro de usuários, enquanto o BDD gerencia login/logout com email e adição de itens.

## Funcionalidades
- **TDD**: Cadastro de usuário com validações em tempo real (email, senha forte, data).
- **BDD**: Login com email cadastrado, logout, e adição de itens de mercado após login, com cálculo de total.
- **Interface Web**: Aplicação interativa com feedbacks dinâmicos e persistência local.

## Instalação
1. Instale o Node.js (versão LTS recomendada) em [nodejs.org](https://nodejs.org/).
2. Execute `npm install` na raiz do projeto para instalar Jest e Cucumber.js.

## Execução
- **Testes TDD**: Execute `npm test` no terminal para rodar testes de validação (ex: email e senha).
- **Testes BDD**: Execute `npm run cucumber` no terminal para executar cenários de comportamento (ex: login e itens).
- **Interface Web**: Abra `index.html` em um navegador (Chrome/Firefox) para testar o cadastro, login e adição de itens.

## Estrutura do Projeto
- `src/tdd/`: Módulo TDD (validações para cadastro).
- `src/bdd/`: Módulo BDD (autenticação e itens de mercado).
- `index.html`, `styles.css`, `app.js`: Interface web na raiz.
- `package.json`: Dependências e scripts.

## Diferenças TDD vs BDD
- **TDD**: Foco em design de código (testes primeiro, validações unitárias).
- **BDD**: Foco em comportamento do usuário (cenários em linguagem natural).