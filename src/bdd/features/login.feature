# Cenário BDD para Autenticação de Usuário
# Escrito em Gherkin (linguagem natural) para focar no comportamento do usuário
# Este arquivo define cenários de login e logout

Feature: Autenticação de Usuário
  Como um usuário
  Eu quero fazer login e logout
  Para acessar o sistema de forma segura

  Scenario: Login bem-sucedido
    Dado que eu me registrei com usuário "usuario1" e senha "Senha123"
    Quando eu faço login com usuário "usuario1" e senha "Senha123"
    Então eu devo estar logado

  Scenario: Login falhado
    Dado que eu não me registrei
    Quando eu faço login com usuário "usuario1" e senha "errada"
    Então eu não devo estar logado

  Scenario: Logout
    Dado que eu estou logado com usuário "usuario1"
    Quando eu faço logout
    Então eu devo estar deslogado