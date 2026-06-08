# Como Configurar o Google Apps Script para Salvar Reservas

## Passo 1: Abrir o Editor de Scripts

1. Abra sua planilha do Google Sheets
2. No menu superior, clique em **Extensões** → **Apps Script**
3. Uma nova aba será aberta com o editor de código

## Passo 2: Criar o Script

1. Delete qualquer código que estiver no editor
2. Cole o código abaixo:

```javascript
function doPost(e) {
  try {
    // Obter a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    
    // Parse dos dados recebidos
    var data = JSON.parse(e.postData.contents);
    
    // Validar dados
    if (!data.numbers || !data.buyer || !data.buyerPhone) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Dados incompletos'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Processar cada número
    var updatedNumbers = [];
    var errors = [];
    
    data.numbers.forEach(function(number) {
      // Encontrar a linha do número
      var dataRange = sheet.getDataRange();
      var values = dataRange.getValues();
      
      for (var i = 1; i < values.length; i++) { // Começa em 1 para pular cabeçalho
        if (values[i][0] == number) {
          // Verificar se já está vendido
          if (values[i][1] && values[i][1] !== '') {
            errors.push(number + ' já está vendido');
          } else {
            // Atualizar a linha
            sheet.getRange(i + 1, 2).setValue(data.buyer); // Coluna B - Nome
            sheet.getRange(i + 1, 3).setValue(data.buyerPhone); // Coluna C - Telefone
            sheet.getRange(i + 1, 4).setValue(data.seller || 'Site'); // Coluna D - Vendedor
            updatedNumbers.push(number);
          }
          break;
        }
      }
    });
    
    // Retornar resultado
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      updatedNumbers: updatedNumbers,
      errors: errors,
      message: 'Números reservados com sucesso!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Erro: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (opcional)
function testarScript() {
  var testData = {
    numbers: ['001', '002'],
    buyer: 'Teste',
    buyerPhone: '(11) 99999-9999',
    seller: 'Vendedor Teste'
  };
  
  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(e);
  Logger.log(result.getContent());
}
```

## Passo 3: Implantar como Web App

1. No editor de Apps Script, clique em **Implantar** → **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Selecionar tipo"
3. Escolha **Aplicativo da Web**
4. Configure:
   - **Descrição**: "API de Reserva de Rifas"
   - **Executar como**: "Eu (seu email)"
   - **Quem tem acesso**: "Qualquer pessoa"
5. Clique em **Implantar**
6. **IMPORTANTE**: Copie a **URL do aplicativo da Web** que aparecerá
   - Exemplo: `https://script.google.com/macros/s/ABC123.../exec`

## Passo 4: Autorizar o Script

1. Na primeira vez, você precisará autorizar o script
2. Clique em **Revisar permissões**
3. Escolha sua conta do Google
4. Clique em **Avançado** → **Ir para [nome do projeto] (não seguro)**
5. Clique em **Permitir**

## Passo 5: Configurar no Site

1. Abra o arquivo `script.js` do seu site
2. Procure por `const APPS_SCRIPT_URL`
3. Cole a URL que você copiou no Passo 3

```javascript
const APPS_SCRIPT_URL = 'SUA_URL_AQUI';
```

## Testando

1. Após configurar tudo, acesse seu site
2. Preencha o formulário de reserva
3. Clique em "Reservar Números"
4. Verifique se os dados foram salvos na planilha

## Solução de Problemas

### Erro de CORS
- Certifique-se de que "Quem tem acesso" está como "Qualquer pessoa"
- Reimplante o script se necessário

### Dados não aparecem na planilha
- Verifique se o nome da aba é "Sheet1"
- Verifique se as colunas estão na ordem correta (Número, Nome, Telefone, Vendedor)

### Erro 403
- Verifique se você autorizou o script corretamente
- Tente reimplantar o script

## Estrutura da Planilha

Certifique-se de que sua planilha tem as seguintes colunas:

| A (Número) | B (Nome) | C (Telefone) | D (Vendedor) |
|------------|----------|--------------|--------------|
| 001        |          |              |              |
| 002        |          |              |              |
| ...        |          |              |              |

## Segurança

⚠️ **IMPORTANTE**: Este script permite que qualquer pessoa adicione dados à sua planilha. Para produção, considere:
- Adicionar autenticação
- Validar origem das requisições
- Limitar taxa de requisições
- Adicionar logs de auditoria