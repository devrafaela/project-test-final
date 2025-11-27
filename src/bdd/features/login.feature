# Cenário BDD para Autenticação com Email (Ajustado para Validações e Mensagens)
# Escrito em Gherkin para focar no comportamento do usuário
# Este arquivo define cenários de login com validações rigorosas e mensagens específicas

Feature: Autenticação com Email
  Como um usuário
  Eu quero fazer login e logout
  Para acessar o sistema de mercado

  Scenario: Login bem-sucedido
    Dado que eu tenho um email "teste@example.com" cadastrado
    Quando eu faço login com email "teste@example.com" e senha "Senha123!"
    Então eu devo estar logado

  Scenario: Login falhado - Email não cadastrado
    Dado que eu não tenho email cadastrado
    Quando eu faço login com email "naoexiste@example.com" e senha "Senha123!"
    Então eu devo ver "E-mail não cadastrado"

  Scenario: Login falhado - Senha incorreta
    Dado que eu tenho um email "teste@example.com" cadastrado
    Quando eu faço login com email "teste@example.com" e senha "senhaerrada"
    Então eu devo ver "Senha incorreta"

  Scenario: Logout
    Dado que eu estou logado com email "teste@example.com"
    Quando eu faço logout
    Então eu devo estar deslogado