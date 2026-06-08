# Como Hospedar o Site da Rifa

O site precisa estar hospedado online para acessar o Google Sheets devido a restrições de CORS (Cross-Origin Resource Sharing).

## Opção 1: GitHub Pages (Recomendado)

### Passo 1: Criar conta no GitHub
1. Acesse https://github.com
2. Clique em "Sign up" e crie sua conta gratuita

### Passo 2: Criar repositório
1. Faça login no GitHub
2. Clique no botão "+" no canto superior direito
3. Selecione "New repository"
4. Nome do repositório: `rifa-romaria` (ou outro nome)
5. Marque "Public"
6. Clique em "Create repository"

### Passo 3: Fazer upload dos arquivos
1. Na página do repositório, clique em "uploading an existing file"
2. Arraste todos os arquivos do projeto:
   - index.html
   - styles.css
   - script.js
   - README.md
3. Clique em "Commit changes"

### Passo 4: Ativar GitHub Pages
1. No repositório, clique em "Settings"
2. No menu lateral, clique em "Pages"
3. Em "Source", selecione "main" branch
4. Clique em "Save"
5. Aguarde 1-2 minutos

### Passo 5: Acessar o site
Seu site estará disponível em:
```
https://SEU_USUARIO.github.io/rifa-romaria/
```

## Opção 2: Netlify (Mais Rápido)

### Método Drag & Drop
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta do projeto para a área indicada
3. Aguarde o upload
4. Seu site estará online em segundos!
5. URL gerada automaticamente (ex: `random-name-123.netlify.app`)

### Personalizar URL (Opcional)
1. Clique em "Site settings"
2. Clique em "Change site name"
3. Digite um nome (ex: `rifa-romaria-santa-terezinha`)
4. Seu site ficará: `rifa-romaria-santa-terezinha.netlify.app`

## Opção 3: Vercel

1. Acesse https://vercel.com
2. Faça login com GitHub
3. Clique em "Add New" > "Project"
4. Importe o repositório do GitHub
5. Clique em "Deploy"
6. Site online em segundos!

## Opção 4: Servidor Local com CORS Proxy

Se quiser testar localmente sem hospedar:

### Usando Python
```bash
# Instalar CORS proxy
pip install flask flask-cors

# Criar arquivo proxy.py
```

Conteúdo do `proxy.py`:
```python
from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/proxy')
def proxy():
    url = request.args.get('url')
    response = requests.get(url)
    return response.text

if __name__ == '__main__':
    app.run(port=5000)
```

Execute:
```bash
python proxy.py
```

Depois altere no `script.js`:
```javascript
const PROXY_URL = 'http://localhost:5000/proxy?url=';
const SHEET_URL = PROXY_URL + encodeURIComponent('https://docs.google.com/spreadsheets/d/...');
```

## Recomendação

**Use GitHub Pages ou Netlify** - são gratuitos, rápidos e não exigem configuração técnica.

## Após Hospedar

1. Teste o site acessando a URL
2. Verifique se os números carregam da planilha
3. Teste o modal clicando em um número
4. Compartilhe a URL com os participantes da romaria

## Domínio Personalizado (Opcional)

Se quiser um domínio próprio (ex: `rifa.paroquiasantaterezinha.com.br`):

1. Compre um domínio (Registro.br, GoDaddy, etc.)
2. Configure o DNS apontando para o serviço de hospedagem
3. No GitHub Pages/Netlify/Vercel, adicione o domínio customizado

## Suporte

Se tiver dúvidas:
- GitHub Pages: https://docs.github.com/pages
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs