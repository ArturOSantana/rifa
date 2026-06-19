# Sistema de Rifa Online

Sistema web para gerenciamento de rifas com integração ao Google Sheets.

## 🚀 Funcionalidades

- Visualização de números disponíveis e vendidos
- Registro de vendas pelos vendedores
- Integração automática com Google Sheets
- Cálculo automático de valores (R$ 10,00 por número)
- Barra de progresso da meta
- Sistema de pagamento via PIX

## 📋 Configuração

1. Configure o ID da sua planilha no arquivo `script.js`:
```javascript
const SHEET_ID = 'SEU_ID_AQUI';
```

2. Configure a URL do Google Apps Script no arquivo `script.js`:
```javascript
const APPS_SCRIPT_URL = 'SUA_URL_AQUI';
```

3. Configure sua chave PIX no arquivo `index.html`:
```html
<input type="text" id="pixKey" value="SUA_CHAVE_PIX" readonly>
```

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