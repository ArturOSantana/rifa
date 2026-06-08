# Como Publicar a Planilha do Google Sheets

Para o site funcionar corretamente, você precisa publicar a planilha na web. Siga estes passos:

## Passo 1: Abrir a Planilha

Acesse: https://docs.google.com/spreadsheets/d/1QL9hka6P8SG_2un3JAsQWgs8mu7E44K3SXZOhTjF69k/edit

## Passo 2: Publicar na Web

1. No menu superior, clique em **Arquivo**
2. Selecione **Compartilhar**
3. Clique em **Publicar na Web**
4. Na janela que abrir:
   - Em "Link", selecione **Toda a planilha** ou **Sheet1**
   - Em formato, escolha **Página da Web**
   - Marque a opção **"Publicar automaticamente quando forem feitas alterações"**
5. Clique no botão **Publicar**
6. Confirme clicando em **OK**

## Passo 3: Verificar Permissões

1. Clique no botão **Compartilhar** (canto superior direito)
2. Em "Acesso geral", selecione **Qualquer pessoa com o link**
3. Certifique-se de que está como **Leitor**
4. Clique em **Concluído**

## Passo 4: Testar o Site

1. Abra o arquivo `index.html` no navegador
2. Aguarde alguns segundos
3. Os números devem carregar da planilha

## Estrutura da Planilha

Certifique-se de que sua planilha tem estas colunas na primeira linha:

| Numero | Nome | Telefone | Vendedor |
|--------|------|----------|----------|

### Exemplos de Preenchimento:

**Número Disponível:**
| Numero | Nome | Telefone | Vendedor |
|--------|------|----------|----------|
| 001    |      |          |          |

**Número Vendido:**
| Numero | Nome | Telefone | Vendedor |
|--------|------|----------|----------|
| 002    | João Silva | 11987654321 | Maria Santos |

## Solução de Problemas

### Erro: "Erro ao carregar os números"

**Causa:** A planilha não está publicada ou não tem permissões corretas

**Solução:**
1. Verifique se seguiu todos os passos acima
2. Aguarde 1-2 minutos após publicar
3. Recarregue a página (F5)

### Dados de Exemplo Aparecem

**Causa:** O site não conseguiu acessar a planilha

**Solução:**
1. Abra o Console do navegador (F12)
2. Veja os erros na aba "Console"
3. Verifique se a planilha está publicada
4. Confirme que as permissões estão corretas

### Como Abrir o Console do Navegador

- **Chrome/Edge:** Pressione F12 ou Ctrl+Shift+I (Cmd+Option+I no Mac)
- **Firefox:** Pressione F12 ou Ctrl+Shift+K (Cmd+Option+K no Mac)
- **Safari:** Ative primeiro em Preferências > Avançado > "Mostrar menu Desenvolver", depois Cmd+Option+C

## Dicas

- Sempre deixe a primeira linha com os cabeçalhos
- Para números disponíveis, deixe Nome, Telefone e Vendedor vazios
- Para números vendidos, preencha todas as colunas
- As alterações na planilha aparecem no site em até 30 segundos
- O telefone será formatado automaticamente (ex: 11987654321 → (11) 98765-4321)

## Precisa de Ajuda?

Se ainda tiver problemas:
1. Verifique se a planilha está acessível pelo link
2. Teste abrir o link em uma aba anônima do navegador
3. Confirme que a planilha tem dados (pelo menos os cabeçalhos)