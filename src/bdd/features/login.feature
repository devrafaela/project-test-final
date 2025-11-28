# ============================================================
# Cenário BDD para Autenticação com Email
# Foca no comportamento do usuário ao logar e deslogar
# Inclui validações de email cadastrado, senha correta e mensagens de erro
# ============================================================

Feature: Autenticação de Usuário via Email
  Como usuário do sistema de mercado
  Eu quero poder logar e deslogar com meu email
  Para acessar minhas funcionalidades de forma segura

  # ==========================================================
  # Scenario 1: Login bem-sucedido
  # ==========================================================
  Scenario: Login bem-sucedido
    Dado que eu tenho um email "teste@example.com" cadastrado
    Quando eu faço login com email "teste@example.com" e senha "Senha123!"
    Então eu devo estar logado

  # ==========================================================
  # Scenario 2: Login falhado - Email não cadastrado
  # ==========================================================
  Scenario: Login falhado - Email não cadastrado
    Dado que eu não tenho email cadastrado
    Quando eu faço login com email "naoexiste@example.com" e senha "Senha123!"
    Então eu devo ver "E-mail não cadastrado"

  # ==========================================================
  # Scenario 3: Login falhado - Senha incorreta
  # ==========================================================
  Scenario: Login falhado - Senha incorreta
    Dado que eu tenho um email "teste@example.com" cadastrado
    Quando eu faço login com email "teste@example.com" e senha "senhaerrada"
    Então eu devo ver "Senha incorreta"

  # ==========================================================
  # Scenario 4: Logout
  # ==========================================================
  Scenario: Logout
    Dado que eu estou logado com email "teste@example.com"
    Quando eu faço logout
    Então eu devo estar deslogado
