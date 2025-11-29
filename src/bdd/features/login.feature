# ============================================================
# Cenário BDD para Login de Usuário
# Foca no comportamento de autenticação e logout
# ============================================================

Feature: User Authentication via Email

  Scenario: Successful login
    Given I have a registered email for login "teste@example.com"
    When I attempt login with email "teste@example.com" and password "StrongPassword123!"
    Then I should be logged in successfully

  Scenario: Failed login - email not registered
    Given I have no registered email for login
    When I attempt login with email "naoexiste@example.com" and password "StrongPassword123!"
    Then I should see error message "E-mail não cadastrado"

  Scenario: Failed login - incorrect password
    Given I have a registered email for login "teste@example.com"
    When I attempt login with email "teste@example.com" and password "senhaerrada"
    Then I should see error message "Senha incorreta"

  Scenario: Logout
    Given I am logged in for login with email "teste@example.com"
    When I perform logout from login
    Then I should be logged out successfully
