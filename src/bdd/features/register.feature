# Cenário BDD para Registro de Usuário (Funcionalidade Adicional)
# Foca no comportamento de criação de conta

Feature: Registro de Usuário
  Como um novo usuário
  Eu quero me registrar
  Para criar uma conta no sistema

  Scenario: Registro bem-sucedido
    Dado que eu estou na página de registro
    Quando eu me registro com usuário "novousuario" e senha "SenhaForte123"
    Então minha conta deve ser criada