# Sistema de Rifa Online

Sistema web para gerenciamento de rifas com integração ao Google Sheets.

## 🚀 Funcionalidades

- Visualização de números disponíveis e vendidos
- Registro de vendas pelos vendedores
- Integração automática com Google Sheets
- Cálculo automático do valor de acordo com o preço configurado por número
- Barra de progresso da meta
- Sistema de pagamento via PIX

## 📋 Configuração

1. Copie `config.example.js` para `config.js`. Esse arquivo é ignorado pelo Git para proteger suas configurações:
```javascript
cp config.example.js config.js
```

2. Preencha os valores reais em `config.js`, incluindo `SHEET_ID`, `APPS_SCRIPT_URL`, `PIX_KEY`, `SELLER_PASSWORD` e `ADM_PASSWORD`. O botão **Administração** só abre o painel após carregar esse arquivo e a senha configurada em `ADM_PASSWORD` ser informada.

> Não publique nem envie o `config.js` ao repositório. Sem ele, o JavaScript do site não é inicializado e os botões não funcionam.

## ⚙️ Informações da rifa no painel ADM

Após entrar no painel **Administração**, edite nome, data, preço por número, meta, chave PIX e prêmios. Informe cada prêmio em uma linha no formato `posição | descrição` e salve.

As alterações ficam salvas no armazenamento local do navegador usado pelo administrador. Elas não são sincronizadas com outros dispositivos ou visitantes; para publicar as alterações para todos, é necessário implementar persistência de configurações no Apps Script.

## 📁 Estrutura da Planilha

A planilha deve ter as seguintes colunas na aba "Página1":

| A (Número) | B (Nome) | C (Telefone) | D (Vendedor) |
|------------|----------|--------------|--------------|
| 001        |          |              |              |
| 002        |          |              |              |
| ...        |          |              |              |

## 🎯 Como Usar

1. Vendedor acessa o site
2. Preenche o formulário com dados do comprador
3. Sistema registra automaticamente na planilha
4. Números ficam marcados como vendidos

## 💰 Sistema de Preços

- Cada número = R$ 10,00
- 2 números = R$ 20,00
- 3 números = R$ 30,00
- E assim por diante...

## 🔧 Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Sheets API
- Google Apps Script

---

Desenvolvido para Paróquia Santa Terezinha