# 💬 BatePapo — Chat Temporário

Chat em tempo real com salas por código. Mensagens somem quando todos saem.

---

## 🚀 Como subir no Glitch.com (5 minutos)

### Passo 1 — Crie sua conta
Acesse **glitch.com** e crie uma conta gratuita (pode usar Google).

### Passo 2 — Crie um novo projeto
- Clique em **"New Project"**
- Escolha **"glitch-hello-node"** (template Node.js)

### Passo 3 — Suba os arquivos
No editor do Glitch:
- Apague o conteúdo de `server.js` e cole o conteúdo do `server.js` deste projeto
- Apague o conteúdo de `package.json` e cole o conteúdo do `package.json` deste projeto
- Crie a pasta `public/` e dentro dela crie `index.html` colando o conteúdo do arquivo

### Passo 4 — Pronto!
O Glitch já instala as dependências e inicia o servidor automaticamente.
Seu link será algo como: `https://nome-do-projeto.glitch.me`

---

## 🔗 Como compartilhar com os colegas

1. Copie o link do seu projeto (ex: `https://meu-chat.glitch.me`)
2. Envie para os colegas pelo WhatsApp, Telegram, etc.
3. Todos entram no mesmo link
4. Cada um digita o nome e o **mesmo código de sala** (ex: `TURMA42`)
5. Pronto — estão conectados!

---

## ✨ Como funciona

- **Sem cadastro** — só nome + código de sala
- **Qualquer código funciona** — crie `REUNIAO`, `GALERA`, `TESTE`, qualquer coisa
- **Mensagens temporárias** — ficam na memória do servidor enquanto a sala tem gente
- **Sala some sozinha** — quando todos saem, as mensagens são apagadas automaticamente
- **Várias salas simultâneas** — cada código é uma sala separada e privada

---

## 📁 Estrutura do projeto

```
chat-app/
├── server.js        ← Servidor Node.js com Socket.io
├── package.json     ← Dependências
└── public/
    └── index.html   ← Interface do chat (tudo em um arquivo)
```

---

## 🛠 Dependências

- **express** — servidor web
- **socket.io** — comunicação em tempo real (WebSocket)
