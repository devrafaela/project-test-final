### 🛒 Trabalho Final de Teste - Mercado Virtual

Este projeto é um **exemplo prático e completo de desenvolvimento orientado a testes**, combinando **TDD (Test Driven Development)** e **BDD (Behavior Driven Development)** em um sistema de mercado virtual simples. Ele foi criado para demonstrar como aplicar metodologias ágeis de teste em um projeto real, garantindo qualidade de código e validação de comportamentos do usuário desde o início.

### 🎯 Contexto e Propósito
- **TDD**: Foca em escrever testes unitários antes do código, seguindo o ciclo RED (teste falha) → GREEN (código passa) → REFACTOR (código limpo). Aqui, validamos funções como verificação de email, senha forte e formatação de datas.
- **BDD**: Usa cenários descritos em linguagem natural (com Cucumber.js) para simular ações reais do usuário, como registrar uma conta, fazer login, adicionar itens ao carrinho e calcular totais. Isso garante que o software atenda às necessidades do usuário final.
- **Integração**: O projeto inclui uma interface web básica (HTML/CSS/JS) para testar interativamente, com persistência via `localStorage`. É ideal para aprender ou ensinar testes, pois cobre desde validações simples até fluxos complexos.

### 💻 Tecnologias Utilizadas
- **JavaScript/Node.js**: Linguagem principal.
- **Jest**: Para testes unitários (TDD).
- **Cucumber.js**: Para testes de comportamento (BDD).
- **Babel**: Para compatibilidade de sintaxe.
- **HTML/CSS**: Para a interface web.

Este projeto não apenas implementa um sistema funcional, mas também serve como referência para boas práticas de desenvolvimento, mostrando como testes podem guiar o design e reduzir bugs.

---

## 🛠 Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn** para gerenciamento de pacotes
- Conhecimento básico de JavaScript, Jest e Cucumber.js

---

## ⚙️ Instalação
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd project-test-final
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   > Isso instala Jest, Cucumber.js e outras bibliotecas necessárias.

3. Rode o projeto
   ```bash
   npm run dev
   ```
   > Isso abre o projeto no navegador

---

## 📁 Estrutura do Projeto
```
project-test-final/
├── .gitignore
├── app.js                 # Arquivo principal da aplicação
├── babel.config.json      # Configuração do Babel
├── cucumber.js            # Configuração do Cucumber
├── index.html             # Interface web
├── package.json           # Dependências e scripts
├── README.md              # Este arquivo
├── styles.css             # Estilos CSS
└── src/
    ├── bdd/               # Testes BDD
    │   ├── auth.js        # Lógica de autenticação
    │   ├── features/      # Arquivos .feature
    │   │   ├── cart.feature
    │   │   ├── login.feature
    │   │   └── register.feature
    │   ├── mock/          # Mocks para testes
    │   │   └── localStorageMock.js
    │   ├── step-definition/  # Definições dos steps
    │   │   ├── cart.steps.js
    │   │   ├── index.js
    │   │   ├── login.steps.js
    │   │   └── register.steps.js
    │   └── support/       # Suporte para Cucumber
    │       └── world.js
    ├── tdd/               # Testes TDD
    │   ├── dateFormatter.js
    │   ├── validation.js
    │   └── validation.test.js
    └── utils/             # Utilitários
        ├── dateMask.js
        └── helpers.js
```

---

## ✨ Funcionalidades

### TDD (Test Driven Development)
- Validações unitárias para campos de cadastro:
  - Email válido
  - Senha forte
  - Formatação de data
- Ciclo **RED → GREEN → REFACTOR**:
  - **RED**: Teste falha (função não implementada)
  - **GREEN**: Código mínimo para passar
  - **REFACTOR**: Código limpo e otimizado

### BDD (Behavior Driven Development)
- Cenários de usuário em linguagem natural (`Given/When/Then`):
  - Registro e login de usuários
  - Logout
  - Adição de itens ao carrinho
  - Cálculo do total de preços

### Interface Web
- Formulários interativos para cadastro e login
- Feedback visual para sucesso/erro
- Persistência com `localStorage`
- Visualização dinâmica do carrinho

---

## 🚀 Execução

### Testes TDD
Execute os testes unitários:
```bash
npm test
```
- **Saída esperada**: `3 passing (15ms)`
- Foca na validação de funções individuais.

### Testes BDD
Execute todos os cenários:
```bash
npm run bdd
```
Ou manualmente:
```bash
npx cucumber-js src/bdd/features --require src/bdd/support/world.js --require src/bdd/step-definition/**/*.js
```

#### Executar por Feature (para demonstração)
1. **Registro**:
   ```bash
   npx cucumber-js src/bdd/features/register.feature --require src/bdd/support/world.js --require src/bdd/step-definition/**/*.js
   ```

2. **Login**:
   ```bash
   npx cucumber-js src/bdd/features/login.feature --require src/bdd/support/world.js --require src/bdd/step-definition/**/*.js
   ```

3. **Carrinho**:
   ```bash
   npx cucumber-js src/bdd/features/cart.feature --require src/bdd/support/world.js --require src/bdd/step-definition/**/*.js
   ```

- **Saída típica**:
  ```
  [BDD DEBUG] carregando world.js
  [BDD DEBUG] loading cart.steps.js
  ...
  1 scenario (1 passed)
  4 steps (4 passed)
  ```
- Logs `[BDD DEBUG]` mostram carregamento; pontos `.` indicam sucesso.

### Executar a Aplicação Web
Abra `index.html` em um navegador para testar a interface.

---

## 📊 Diferenças TDD vs BDD

| Aspecto          | TDD                          | BDD                          |
|------------------|------------------------------|------------------------------|
| **Foco**        | Design e lógica do código    | Comportamento do usuário     |
| **Tipo de Teste**| Unitários (funções isoladas) | Cenários integrados          |
| **Ciclo**       | RED → GREEN → REFACTOR       | Given/When/Then              |
| **Ferramentas** | Jest, Mocha                  | Cucumber.js                  |
| **Exemplo**     | Validar se email é válido    | Usuário faz login com sucesso|

---


## 📄 Licença
Este projeto foi desenvolvido pelas alunas Camille Rodrigues e Rafaela Pereira para a disciplina de Teste de Software, ministrada pela professora Maria Luiza, na Universidade Estadual do Sudoeste da Bahia.
