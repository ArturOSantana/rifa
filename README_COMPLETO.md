# Sistema de Rifa Online - Paróquia Santa Terezinha

Sistema completo para gerenciamento de rifas online com integração ao Google Sheets.

## 🎯 Funcionalidades

- ✅ Visualização de números disponíveis e vendidos
- ✅ Busca de números específicos
- ✅ Filtros (Todos, Disponíveis, Vendidos)
- ✅ Formulário de reserva online
- ✅ Integração com Google Sheets
- ✅ Cálculo automático de valores
- ✅ Barra de progresso da meta
- ✅ Sistema de PIX para pagamento
- ✅ Responsivo (mobile-friendly)

## 💰 Sistema de Preços

- **Promoção**: 3 números por R$ 10,00
- **Valor individual**: R$ 3,33 por número
- **Cálculo automático**: O sistema calcula automaticamente o valor total baseado na quantidade de números

## 📋 Configuração Inicial

### 1. Preparar a Planilha do Google Sheets

Sua planilha deve ter a seguinte estrutura:

| A (Número) | B (Nome) | C (Telefone) | D (Vendedor) |
|------------|----------|--------------|--------------|
| 001        |          |              |              |
| 002        |          |              |              |
| 003        |          |              |              |
| ...        |          |              |              |
| 300        |          |              |              |

**Importante**: 
- A primeira linha deve conter os cabeçalhos
- Os números devem estar no formato 001, 002, 003, etc.
- Deixe as colunas B, C e D vazias para números disponíveis

### 2. Configurar o Google Apps Script

Siga o guia detalhado em: **CONFIGURAR_APPS_SCRIPT.md**

Resumo dos passos:
1. Abra sua planilha → Extensões → Apps Script
2. Cole o código fornecido no arquivo de instruções
3. Implante como Web App
4. Copie a URL gerada
5. Cole a URL no arquivo `script.js` na constante `APPS_SCRIPT_URL`

### 3. Configurar o ID da Planilha

No arquivo `script.js`, atualize o ID da sua planilha:

```javascript
const SHEET_ID = 'SEU_ID_DA_PLANILHA_AQUI';
```

Para encontrar o ID:
- Abra sua planilha
- Copie o ID da URL: `https://docs.google.com/spreadsheets/d/[ID_AQUI]/edit`

### 4. Hospedar o Site

Escolha uma das opções gratuitas:

#### GitHub Pages (Recomendado)
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings → Pages
4. Selecione a branch main
5. Seu site estará em: `https://seu-usuario.github.io/nome-repo`

#### Netlify
1. Acesse netlify.com
2. Arraste a pasta do projeto
3. Site publicado automaticamente

#### Vercel
1. Acesse vercel.com
2. Importe o repositório do GitHub
3. Deploy automático

## 📁 Estrutura de Arquivos

```
rifa/
├── index.html                    # Página principal
├── styles.css                    # Estilos
├── script.js                     # Lógica JavaScript
├── README.md                     # Documentação básica
├── README_COMPLETO.md           # Este arquivo
├── CONFIGURAR_APPS_SCRIPT.md    # Guia do Apps Script
├── INSTRUCOES_PLANILHA.md       # Instruções da planilha
└── COMO_HOSPEDAR.md             # Guia de hospedagem
```

## 🎨 Personalização

### Alterar Cores
Edite o arquivo `styles.css` para mudar as cores do tema.

### Alterar Meta
No arquivo `script.js`:
```javascript
const GOAL_AMOUNT = 1000; // Meta em reais
```

### Alterar Preços
No arquivo `script.js`:
```javascript
const PRICE_PER_NUMBER = 10 / 3; // R$ 3,33 por número
const PROMO_PRICE = 10;          // 3 números por R$ 10,00
const PROMO_QUANTITY = 3;
```

### Alterar Chave PIX
No arquivo `index.html`, procure por:
```html
<input type="text" id="pixKey" value="SUA_CHAVE_PIX_AQUI" readonly>
```

### Alterar Informações da Paróquia
Edite o arquivo `index.html`:
- Título: `<h1>Rifa - Romaria dos Jovens</h1>`
- Subtítulo: `<p class="subtitle">Paróquia Santa Terezinha</p>`
- Destino: `<p class="destination">Destino: Santuário de Nossa Senhora Aparecida</p>`

## 🔄 Como Funciona

### Fluxo de Reserva

1. **Usuário preenche o formulário**
   - Nome completo
   - Telefone (WhatsApp)
   - Números desejados (separados por vírgula)
   - Nome do vendedor (opcional)

2. **Sistema valida os dados**
   - Verifica se os números existem
   - Verifica se estão disponíveis
   - Calcula o valor total

3. **Dados são enviados ao Google Sheets**
   - Via Google Apps Script
   - Atualiza a planilha em tempo real

4. **Confirmação exibida**
   - Modal com resumo da reserva
   - Instruções de pagamento
   - Chave PIX para copiar

5. **Atualização automática**
   - Interface atualiza os números vendidos
   - Barra de progresso atualizada
   - Estatísticas atualizadas

### Sistema de Backup

O sistema possui um backup local (localStorage) que:
- Salva reservas mesmo se o Google Sheets falhar
- Mantém dados entre recarregamentos da página
- Sincroniza quando a conexão é restabelecida

## 🛠️ Solução de Problemas

### Números não aparecem
- Verifique se o ID da planilha está correto
- Certifique-se de que a planilha está publicada
- Verifique o console do navegador (F12) para erros

### Reserva não salva na planilha
- Verifique se a URL do Apps Script está configurada
- Certifique-se de que o script foi implantado corretamente
- Verifique se autorizou as permissões do script

### Erro de CORS
- Certifique-se de que o Apps Script está configurado como "Qualquer pessoa"
- Reimplante o script se necessário

### Dados não atualizam
- O sistema atualiza automaticamente a cada 30 segundos
- Você pode forçar atualização recarregando a página (F5)

## 📱 Compatibilidade

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile (iOS e Android)

## 🔒 Segurança

**Importante**: Este sistema é básico e adequado para rifas pequenas. Para produção em larga escala, considere:

- Adicionar autenticação de usuários
- Implementar rate limiting
- Validar origem das requisições
- Adicionar logs de auditoria
- Usar HTTPS obrigatório
- Implementar sistema de confirmação por email/SMS

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a seção de Solução de Problemas
2. Consulte os arquivos de documentação
3. Verifique o console do navegador para erros

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins não comerciais.

## 🙏 Créditos

Desenvolvido para a Paróquia Santa Terezinha
Romaria dos Jovens ao Santuário de Nossa Senhora Aparecida

---

**Made with ❤️ by Bob**