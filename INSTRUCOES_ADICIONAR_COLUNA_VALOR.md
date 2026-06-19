# 📋 Instruções para Adicionar Coluna "Valor" na Planilha

## 🎯 Objetivo
Adicionar suporte para a coluna "Valor" na planilha Google Sheets e no Apps Script, permitindo que cada número vendido tenha seu preço registrado (R$ 5,00 para números antigos e R$ 10,00 para novos).

---

## ⚠️ IMPORTANTE - Leia Antes de Começar

- ✅ O código JavaScript (`script.js`) **JÁ ESTÁ PRONTO** e suporta a coluna Valor
- 📝 Você precisa modificar apenas a **planilha** e o **Apps Script**
- 💾 Faça backup da planilha antes de começar
- 🔒 Mantenha a planilha aberta durante todo o processo

---

## 📊 PARTE 1: Modificar a Planilha Google Sheets

### Passo 1: Abrir a Planilha
1. Acesse sua planilha do Google Sheets
2. Certifique-se de estar na aba correta (geralmente "Página1")

### Passo 2: Adicionar a Coluna E (Valor)
1. Clique na célula **E1** (primeira linha, coluna E)
2. Digite: **Valor**
3. Pressione **Enter**

### Passo 3: Formatar a Coluna E
1. Selecione toda a coluna E clicando no cabeçalho da coluna
2. Vá em **Formatar** → **Número** → **Moeda**
3. Isso formatará os valores como R$ automaticamente

### Passo 4: Preencher Valores dos Números Já Vendidos

**⚠️ ATENÇÃO:** Preencha APENAS os números que já foram vendidos (que têm nome na coluna B)

#### Opção A: Preenchimento Manual (Recomendado para poucos números)
1. Para cada linha que tem um **nome na coluna B** (número vendido):
   - Clique na célula da coluna E dessa linha
   - Digite: **5**
   - Pressione **Enter**
   - O Google Sheets formatará automaticamente como **R$ 5,00**

#### Opção B: Preenchimento com Fórmula (Recomendado para muitos números)
1. Clique na célula **E2** (primeira linha de dados)
2. Digite a seguinte fórmula:
   ```
   =SE(B2<>""; 5; "")
   ```
3. Pressione **Enter**
4. Arraste a fórmula para baixo até a última linha com dados
5. Depois, copie toda a coluna E e cole como **valores** (Ctrl+Shift+V) para remover as fórmulas

**Explicação da fórmula:**
- `SE(B2<>""; 5; "")` = Se a célula B2 não estiver vazia, coloque 5, senão deixe em branco
- Isso preenche automaticamente R$ 5,00 para todos os números já vendidos

### Passo 5: Verificar o Resultado

Sua planilha deve estar assim:

| A (Número) | B (Nome) | C (Telefone) | D (Vendedor) | E (Valor) |
|------------|----------|--------------|--------------|-----------|
| 1 | João Silva | (11) 98765-4321 | Paulo | R$ 5,00 |
| 2 | | | | |
| 3 | Maria Santos | (11) 91234-5678 | Lucia | R$ 5,00 |
| 4 | | | | |

✅ **Números vendidos:** Têm nome na coluna B e R$ 5,00 na coluna E  
✅ **Números disponíveis:** Coluna B vazia e coluna E vazia

---

## 🔧 PARTE 2: Modificar o Apps Script

### Passo 1: Abrir o Editor do Apps Script
1. Na planilha, vá em **Extensões** → **Apps Script**
2. Uma nova aba será aberta com o editor de código

### Passo 2: Localizar a Função `doPost`

Procure no código a função que começa com:
```javascript
function doPost(e) {
```

### Passo 3: Identificar o Código Atual

O código atual deve estar parecido com isto:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById('ID_DA_PLANILHA').getActiveSheet();
  
  data.numbers.forEach(number => {
    const row = parseInt(number);
    sheet.getRange(row, 2).setValue(data.buyer);      // Coluna B
    sheet.getRange(row, 3).setValue(data.buyerPhone); // Coluna C
    sheet.getRange(row, 4).setValue(data.seller);     // Coluna D
  });
  
  return ContentService.createTextOutput(JSON.stringify({success: true}));
}
```

### Passo 4: Adicionar a Linha para Salvar o Valor

**⚠️ IMPORTANTE:** Adicione APENAS uma linha nova. Não apague nada!

Adicione esta linha **ANTES** do `});`:

```javascript
sheet.getRange(row, 5).setValue(data.price);      // Coluna E - NOVO
```

### Passo 5: Código Completo Atualizado

O código final deve ficar assim:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById('ID_DA_PLANILHA').getActiveSheet();
  
  data.numbers.forEach(number => {
    const row = parseInt(number);
    sheet.getRange(row, 2).setValue(data.buyer);      // Coluna B - Nome
    sheet.getRange(row, 3).setValue(data.buyerPhone); // Coluna C - Telefone
    sheet.getRange(row, 4).setValue(data.seller);     // Coluna D - Vendedor
    sheet.getRange(row, 5).setValue(data.price);      // Coluna E - Valor ✨ NOVO
  });
  
  return ContentService.createTextOutput(JSON.stringify({success: true}));
}
```

### Passo 6: Salvar o Código
1. Clique no ícone de **disquete** 💾 ou pressione **Ctrl+S**
2. Aguarde a mensagem "Projeto salvo"

### Passo 7: Criar Nova Implantação

**⚠️ CRÍTICO:** Você DEVE criar uma nova implantação para que as mudanças tenham efeito!

1. Clique em **Implantar** → **Nova implantação**
2. Clique no ícone de **engrenagem** ⚙️ ao lado de "Selecionar tipo"
3. Escolha **Aplicativo da Web**
4. Configure:
   - **Descrição:** "Adicionado suporte para coluna Valor"
   - **Executar como:** Eu (seu email)
   - **Quem tem acesso:** Qualquer pessoa
5. Clique em **Implantar**
6. Clique em **Autorizar acesso**
7. Escolha sua conta do Google
8. Clique em **Avançado** → **Ir para [nome do projeto] (não seguro)**
9. Clique em **Permitir**
10. **COPIE A NOVA URL** que aparece (ela será diferente da anterior)

### Passo 8: Atualizar a URL no Código JavaScript

**⚠️ IMPORTANTE:** Se você criou uma nova implantação, a URL mudou!

1. Abra o arquivo `script.js` do seu projeto
2. Localize a linha 3:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/...';
   ```
3. Substitua pela **nova URL** que você copiou no passo anterior
4. Salve o arquivo

---

## ✅ PARTE 3: Checklist de Verificação

Use esta lista para confirmar que tudo está funcionando:

### Verificação da Planilha
- [ ] Coluna E existe com cabeçalho "Valor"
- [ ] Coluna E está formatada como moeda (R$)
- [ ] Todos os números já vendidos têm R$ 5,00 na coluna E
- [ ] Números disponíveis têm a coluna E vazia

### Verificação do Apps Script
- [ ] Código do Apps Script foi atualizado
- [ ] Linha `sheet.getRange(row, 5).setValue(data.price);` foi adicionada
- [ ] Código foi salvo (ícone de disquete)
- [ ] Nova implantação foi criada
- [ ] Nova URL foi copiada
- [ ] URL foi atualizada no arquivo `script.js`

### Teste Funcional
- [ ] Abra o site da rifa no navegador
- [ ] Faça uma venda de teste (use um número disponível)
- [ ] Verifique se o número foi marcado como vendido
- [ ] **Verifique se R$ 10,00 aparece na coluna E da planilha**
- [ ] Verifique se o progresso da meta foi atualizado corretamente

---

## 🧪 Como Fazer um Teste Completo

### Teste 1: Venda de Número Novo
1. Abra o site da rifa
2. Role até a seção "Registrar Venda"
3. Preencha:
   - **Vendedor:** Seu Nome
   - **Comprador:** Teste Comprador
   - **Telefone:** (11) 99999-9999
   - **Números:** 299 (ou outro número disponível)
   - **Senha:** 1911
4. Clique em "Confirmar Venda"
5. Aguarde a confirmação
6. **Abra a planilha** e verifique:
   - ✅ Linha 299 deve ter o nome "Teste Comprador"
   - ✅ Coluna E (Valor) deve mostrar **R$ 10,00**

### Teste 2: Verificar Progresso da Meta
1. No site, role até o topo
2. Verifique a seção "Progresso da Meta"
3. O valor arrecadado deve incluir:
   - R$ 5,00 × (quantidade de números antigos vendidos)
   - R$ 10,00 × (quantidade de números novos vendidos)

---

## 🔍 Solução de Problemas

### Problema: Coluna E não aparece na planilha
**Solução:** Certifique-se de que adicionou o cabeçalho "Valor" na célula E1

### Problema: Valores não aparecem como R$ 5,00
**Solução:** Formate a coluna E como moeda (Formatar → Número → Moeda)

### Problema: Nova venda não salva o valor R$ 10,00
**Soluções:**
1. Verifique se adicionou a linha `sheet.getRange(row, 5).setValue(data.price);` no Apps Script
2. Confirme que salvou o código (ícone de disquete)
3. **IMPORTANTE:** Verifique se criou uma **nova implantação**
4. Confirme que atualizou a URL no `script.js` com a nova URL da implantação

### Problema: Erro ao fazer venda
**Soluções:**
1. Abra o Console do navegador (F12)
2. Veja se há erros em vermelho
3. Verifique se a URL do Apps Script está correta no `script.js`
4. Confirme que a nova implantação tem permissão "Qualquer pessoa"

### Problema: Valores antigos não aparecem
**Solução:** Você precisa preencher manualmente os R$ 5,00 para números já vendidos (Parte 1, Passo 4)

---

## 📝 Notas Importantes

### Sobre os Valores
- **R$ 5,00:** Números vendidos ANTES desta atualização (preencher manualmente)
- **R$ 10,00:** Números vendidos DEPOIS desta atualização (preenchido automaticamente)

### Sobre a Implantação
- Cada vez que você modifica o Apps Script, precisa criar uma **nova implantação**
- A URL muda a cada nova implantação
- Sempre atualize a URL no `script.js` após criar nova implantação

### Sobre o Cálculo da Meta
O código JavaScript já calcula corretamente:
- Soma todos os valores da coluna E para números vendidos
- Mostra o progresso em relação à meta de R$ 1.000,00
- Atualiza automaticamente a cada venda

---

## 🎉 Conclusão

Após seguir todos os passos:

✅ Sua planilha terá 5 colunas (A, B, C, D, E)  
✅ Números antigos terão R$ 5,00 registrado  
✅ Novas vendas salvarão R$ 10,00 automaticamente  
✅ O progresso da meta será calculado corretamente  
✅ O sistema estará completo e funcional  

---

## 📞 Suporte

Se encontrar problemas:
1. Revise cada passo desta instrução
2. Verifique o checklist de verificação
3. Consulte a seção de solução de problemas
4. Verifique o console do navegador (F12) para erros

**Boa sorte! 🍀**