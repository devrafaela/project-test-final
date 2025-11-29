# ============================================================
# Cenário BDD para Registro de Usuário (Mantido para Compatibilidade)
# Foca no comportamento de criação de conta
# ============================================================

Feature: User Registration
  As a new user
  I want to register
  So that I can create an account in the system

  Scenario: Successful registration
    Given I am on the registration page
    When I register with username "newuser" and password "StrongPassword123!"
    Then my account should be created
