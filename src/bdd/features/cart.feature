# Cenário BDD para Carrinho de Compras (Funcionalidade Adicional)
# Foca no comportamento de adicionar itens ao carrinho

Feature: Carrinho de Compras
  Como um usuário logado
  Eu quero adicionar itens ao meu carrinho
  Para fazer compras

  Scenario: Adicionar item ao carrinho
    Dado que eu estou logado com usuário "usuario1"
    Quando eu adiciono "Maçã" ao carrinho
    Então o carrinho deve conter "Maçã"