# Cenário BDD para Registro de Usuário (Mantido para Compatibilidade)
# Foca no comportamento de criação de conta
# Este cenário testa o registro, embora o principal seja no TDD

Feature: Registro de Usuário
  Como um novo usuário
  Eu quero me registrar
  Para criar uma conta no sistema

  Scenario: Registro bem-sucedido
    Dado que eu estou na página de registro
    Quando eu me registro com usuário "novousuario" e senha "SenhaForte123!"
    Então minha conta deve ser criada