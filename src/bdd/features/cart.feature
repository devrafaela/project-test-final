# ============================================================
# Cenário BDD para Adição de Itens de Mercado Aleatórios
# Foca em adicionar itens aleatórios após login e verificar total
# ============================================================

Feature: Adding Random Market Items
  As a logged-in user
  I want to add random items
  So that I can see the total of selected prices

  Scenario: Add random items and calculate total
    Given I am logged in for cart with email "teste@example.com"
    When I add "Random Item 1" with price 15 to cart
    And I add "Random Item 2" with price 20 to cart
    Then the total in cart should be 35
