// CÓDIGO PARA COLAR NO GOOGLE APPS SCRIPT
// Acesse: Extensões → Apps Script na sua planilha

function doPost(e) {
  try {
    // Log para debug
    Logger.log('Requisição recebida');
    
    // Obter a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Página1');
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Planilha "Página1" não encontrada'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse dos dados recebidos
    var data;
    try {
      data = JSON.parse(e.postData.contents);
      Logger.log('Dados recebidos: ' + JSON.stringify(data));
    } catch (parseError) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Erro ao fazer parse dos dados: ' + parseError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validar dados
    if (!data.numbers || !Array.isArray(data.numbers) || data.numbers.length === 0) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Números não fornecidos ou inválidos'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!data.buyer || !data.buyerPhone) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Dados do comprador incompletos'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Processar cada número
    var updatedNumbers = [];
    var errors = [];
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();
    
    data.numbers.forEach(function(number) {
      var found = false;
      
      // Procurar o número na planilha
      for (var i = 1; i < values.length; i++) { // Começa em 1 para pular cabeçalho
        // Converter para string e comparar
        var cellNumber = String(values[i][0]).padStart(3, '0');
        var searchNumber = String(number).padStart(3, '0');
        
        if (cellNumber === searchNumber) {
          found = true;
          
          // Verificar se já está vendido
          if (values[i][1] && values[i][1] !== '') {
            errors.push('Número ' + number + ' já está vendido para: ' + values[i][1]);
          } else {
            // Atualizar a linha
            sheet.getRange(i + 1, 2).setValue(data.buyer); // Coluna B - Nome
            sheet.getRange(i + 1, 3).setValue(data.buyerPhone); // Coluna C - Telefone
            sheet.getRange(i + 1, 4).setValue(data.seller || 'Site'); // Coluna D - Vendedor
            updatedNumbers.push(number);
            Logger.log('Número ' + number + ' atualizado com sucesso');
          }
          break;
        }
      }
      
      if (!found) {
        errors.push('Número ' + number + ' não encontrado na planilha');
      }
    });
    
    // Retornar resultado
    var response = {
      success: updatedNumbers.length > 0,
      updatedNumbers: updatedNumbers,
      errors: errors,
      message: updatedNumbers.length > 0 
        ? updatedNumbers.length + ' número(s) registrado(s) com sucesso!' 
        : 'Nenhum número foi atualizado'
    };
    
    Logger.log('Resposta: ' + JSON.stringify(response));
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Erro: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Erro no servidor: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste (opcional - execute para testar)
function testarScript() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        numbers: ['001', '002'],
        buyer: 'Teste Usuario',
        buyerPhone: '(11) 99999-9999',
        seller: 'Vendedor Teste'
      })
    }
  };
  
  var result = doPost(testData);
  Logger.log('Resultado do teste:');
  Logger.log(result.getContent());
}

// Made with Bob
