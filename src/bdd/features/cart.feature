# Cenário BDD para Adição de Itens de Mercado (Aleatórios)
# Foca no comportamento de adicionar itens aleatórios após login e calcular total
# Este arquivo define cenários para testar a funcionalidade de itens aleatórios

Feature: Adição de Itens de Mercado Aleatórios
  Como usuário logado
  Eu quero adicionar itens aleatórios
  Para ver o total dos preços selecionados

  Scenario: Adicionar itens aleatórios e calcular total
    Dado que eu estou logado com email "teste@example.com"
    Quando eu adiciono "Item Aleatório 1" com preço 15
    E eu adiciono "Item Aleatório 2" com preço 20
    Então o total deve ser 35