# ⚠️ PASSO A PASSO URGENTE - ATUALIZAR APPS SCRIPT

## 🎯 O PROBLEMA:
O código no Google Apps Script ainda está com "Sheet1" ao invés de "Página1"

## ✅ SOLUÇÃO (SIGA EXATAMENTE):

### **PASSO 1: Abrir o Apps Script**
1. Abra sua planilha: https://docs.google.com/spreadsheets/d/1QL9hka6P8SG_2un3JAsQWgs8mu7E44K3SXZOhTjF69k
2. No menu superior, clique em **Extensões**
3. Clique em **Apps Script**
4. Uma nova aba vai abrir com o editor de código

### **PASSO 2: Deletar o Código Antigo**
1. No editor que abriu, você verá um código
2. Clique dentro do código
3. Pressione **Ctrl+A** (seleciona tudo)
4. Pressione **Delete** (apaga tudo)
5. A tela deve ficar em branco

### **PASSO 3: Copiar o Código Novo**
1. Abra o arquivo **apps-script-code.js** no seu computador
2. Pressione **Ctrl+A** (seleciona tudo)
3. Pressione **Ctrl+C** (copia)

### **PASSO 4: Colar o Código Novo**
1. Volte para a aba do Apps Script (que está em branco)
2. Clique dentro da área de código
3. Pressione **Ctrl+V** (cola)
4. Verifique se apareceu o código completo
5. **IMPORTANTE**: Procure pela linha que tem `'Página1'` - deve estar assim:
   ```javascript
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Página1');
   ```

### **PASSO 5: Salvar**
1. Clique no ícone de **disquete** 💾 (Salvar)
2. OU pressione **Ctrl+S**
3. Aguarde aparecer "Salvo" no topo

### **PASSO 6: Reimplantar**
1. Clique no botão **Implantar** (canto superior direito)
2. Clique em **Gerenciar implantações**
3. Você verá uma lista com sua implantação
4. Clique no ícone de **lápis** ✏️ (editar) ao lado da implantação
5. Em "Versão", clique e selecione **Nova versão**
6. Clique em **Implantar**
7. Clique em **Concluído**
8. Feche a janela

### **PASSO 7: Testar**
1. Volte para seu site
2. Pressione **F5** (recarregar)
3. Preencha o formulário novamente
4. Clique em "Registrar Venda"
5. Abra o Console (F12)
6. Veja a resposta - agora deve aparecer:
   ```
   {"success":true,"updatedNumbers":["001"]...}
   ```

## 🔍 COMO VERIFICAR SE FEZ CERTO:

No Apps Script, procure esta linha (deve estar na linha 10):
```javascript
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Página1');
```

Se estiver escrito **'Sheet1'** ou **'Planilha1'**, você NÃO atualizou o código!

## ❌ ERROS COMUNS:

1. **Não deletou o código antigo** - Delete TUDO antes de colar o novo
2. **Não salvou** - Clique no disquete 💾
3. **Não reimplantou** - Precisa criar uma NOVA VERSÃO
4. **Copiou o código errado** - Use o arquivo apps-script-code.js

## 📞 AINDA COM PROBLEMA?

Se ainda aparecer "Sheet1 não encontrada", significa que:
- Você não atualizou o código OU
- Você não reimplantou OU
- Você está usando a URL antiga

**Siga os passos EXATAMENTE como está escrito acima!**