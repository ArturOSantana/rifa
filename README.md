# Site de Rifa - Romaria dos Jovens

Site para consulta de números disponíveis da rifa em prol da Romaria dos Jovens da Paróquia Santa Terezinha ao Santuário de Nossa Senhora Aparecida.

## Características

- Design responsivo otimizado para celular
- Visualização de números de 001 a 300
- Integração com Google Sheets
- Filtros: Todos, Disponíveis, Vendidos
- Busca por número específico
- Atualização automática a cada 30 segundos
- Estatísticas em tempo real

## Configuração do Google Sheets

### Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Configure as colunas da seguinte forma:

| Numero | Nome | Telefone | Vendedor |
|--------|------|----------|----------|
| 001    |      |          |          |
| 002    | João Silva | 11987654321 | Maria Santos |
| 003    |      |          |          |
| ...    | ...  | ...      | ...      |

**Importante:**
- Coluna A: **Numero** (001, 002, 003, etc.)
- Coluna B: **Nome** (nome completo do comprador - deixe vazio se disponível)
- Coluna C: **Telefone** (telefone do comprador com DDD - deixe vazio se disponível)
- Coluna D: **Vendedor** (nome de quem vendeu - deixe vazio se disponível)
- A primeira linha deve conter os cabeçalhos
- **Números disponíveis**: deixe as colunas B, C e D vazias
- **Números vendidos**: preencha Nome, Telefone e Vendedor

### Passo 2: Publicar a Planilha

1. Na planilha, clique em **Arquivo** > **Compartilhar** > **Publicar na Web**
2. Selecione a aba que deseja publicar
3. Em "Link", escolha **Página da Web**
4. Clique em **Publicar**

### Passo 3: Configuração Automática

**A planilha já está configurada!** O site está conectado à planilha:
```
https://docs.google.com/spreadsheets/d/1QL9hka6P8SG_2un3JAsQWgs8mu7E44K3SXZOhTjF69k/edit
```

Se você quiser usar outra planilha:
1. Abra o arquivo `script.js`
2. Na linha 2, substitua a URL pela sua planilha no formato:
   ```javascript
   const SHEET_URL = 'https://docs.google.com/spreadsheets/d/SEU_ID_DA_PLANILHA/gviz/tq?tqx=out:json&sheet=Sheet1';
   ```
3. Para obter o ID: copie a parte entre `/d/` e `/edit` da URL da sua planilha

## Como Usar

### Modo de Desenvolvimento Local

1. Abra o arquivo `index.html` diretamente no navegador
2. Ou use um servidor local:
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   ```
3. Acesse `http://localhost:8000` no navegador

### Hospedagem

Você pode hospedar gratuitamente em:

- **GitHub Pages**
  1. Crie um repositório no GitHub
  2. Faça upload dos arquivos
  3. Ative GitHub Pages nas configurações
  
- **Netlify**
  1. Arraste a pasta do projeto para netlify.com/drop
  2. Site publicado instantaneamente

- **Vercel**
  1. Importe o projeto no vercel.com
  2. Deploy automático

## Estrutura de Arquivos

```
rifa/
├── index.html      # Página principal
├── styles.css      # Estilos e design responsivo
├── script.js       # Lógica e integração com Google Sheets
└── README.md       # Este arquivo
```

## Funcionalidades

### Visualização de Detalhes
- **Clique em qualquer número** para ver informações detalhadas
- Para números **disponíveis**: mostra que está disponível para compra
- Para números **vendidos**: mostra:
  - Nome do comprador
  - Telefone do comprador (formatado automaticamente)
  - Nome do vendedor
  - Telefone do vendedor (formatado automaticamente)

### Filtros
- **Todos**: Mostra todos os números (001-300)
- **Disponíveis**: Mostra apenas números disponíveis
- **Vendidos**: Mostra apenas números já vendidos

### Busca
- Digite um número (ex: 15 ou 015)
- Clique em "Buscar" ou pressione Enter
- O número será destacado e centralizado na tela

### Estatísticas
- Total de números
- Números disponíveis
- Números vendidos

## Atualizando os Números

Para atualizar o status dos números:

1. Acesse sua planilha do Google Sheets
2. Para marcar um número como **vendido**:
   - Coluna B (Nome): Nome completo do comprador
   - Coluna C (Telefone): Telefone com DDD (ex: 11987654321)
   - Coluna D (Vendedor): Nome de quem vendeu
3. Para marcar um número como **disponível**:
   - Deixe as colunas B, C e D vazias
4. As alterações aparecerão no site em até 30 segundos

**Dica:** O telefone será formatado automaticamente no site (ex: 11987654321 vira (11) 98765-4321)

## Personalização

### Cores
Edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #2c5aa0;      /* Cor principal */
    --secondary-color: #1a3a6b;    /* Cor secundária */
    --success-color: #27ae60;      /* Cor para disponível */
    --danger-color: #c0392b;       /* Cor para vendido */
}
```

### Textos
Edite o arquivo `index.html` para alterar:
- Título da página
- Nome da paróquia
- Destino da romaria
- Mensagens informativas

## Suporte

Para dúvidas ou problemas:
1. Verifique se a planilha está publicada corretamente
2. Confirme se a URL no `script.js` está correta
3. Abra o Console do navegador (F12) para ver erros

## Modo de Exemplo

Se a URL do Google Sheets não estiver configurada, o site funcionará em modo de exemplo com dados aleatórios para você testar a interface.