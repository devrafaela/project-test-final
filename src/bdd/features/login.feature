# Cenário BDD para Autenticação com Email
# Escrito em Gherkin para focar no comportamento do usuário
# Este arquivo define cenários de login e logout usando email

Feature: Autenticação com Email
  Como um usuário
  Eu quero fazer login e logout
  Para acessar o sistema de mercado

  Scenario: Login bem-sucedido
    Dado que eu tenho um email "teste@example.com" cadastrado
    Quando eu faço login com email "teste@example.com" e senha "Senha123"
    Então eu devo estar logado

  Scenario: Login falhado
    Dado que eu não tenho email cadastrado
    Quando eu faço login com email "invalido@example.com" e senha "errada"
    Então eu não devo estar logado

  Scenario: Logout
    Dado que eu estou logado com email "teste@example.com"
    Quando eu faço logout
    Então eu devo estar deslogado