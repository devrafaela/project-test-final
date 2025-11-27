# Cenário BDD para Adição de Itens de Mercado
# Foca no comportamento de adicionar itens após login e calcular total
# Este arquivo define cenários para testar a funcionalidade de carrinho/itens

Feature: Adição de Itens de Mercado
  Como usuário logado
  Eu quero adicionar itens de mercado
  Para ver o total dos preços

  Scenario: Adicionar item e calcular total
    Dado que eu estou logado com email "teste@example.com"
    Quando eu adiciono "Arroz" com preço 10
    E eu adiciono "Leite" com preço 5
    Então o total deve ser 15