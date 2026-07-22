# 🚀 GUIA - Deploy GitHub + Firebase + Vercel

## 📋 OVERVIEW

```
Seu Computador
    ↓ (push código)
GitHub (repositório)
    ↓ (detecta mudança)
Vercel (build automático)
    ↓ (deploy)
Server Online (mozcommunity-app.vercel.app)
    ↓ (conecta com)
Firebase (autenticação + dados + fotos)
```

---

## PASSO 1: Preparar GitHub (5 min)

### 1.1 Criar Repositório no GitHub

```
1. Ir github.com
2. Clique "+" (canto superior direito)
3. "New repository"
4. Nome: mozcommunity-app
5. Descrição: "MozCommunity v5.0 - App Técnico"
6. Público ou Privado (recomendado Privado)
7. Clique "Create repository"
8. ✅ Repositório criado!
```

### 1.2 Git no Seu Computador

**Se não tem Git instalado:**
```
Windows: https://git-scm.com/download/win
Mac: https://git-scm.com/download/mac
Linux: sudo apt-get install git
```

**Configurar Git (primeira vez):**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 1.3 Fazer Upload Ficheiros para GitHub

**Opção A: Linha de Comando (Recomendado)**

```bash
# 1. Criar pasta local
mkdir mozcommunity-app
cd mozcommunity-app

# 2. Copiar ficheiros para pasta:
# - mozcommunity_app_v5.html
# - manifest.json
# - sw.js
# - (documentação opcional)

# 3. Inicializar Git
git init

# 4. Adicionar todos ficheiros
git add .

# 5. Fazer commit
git commit -m "v5.0 Initial commit - MozCommunity App"

# 6. Adicionar repositório remoto
git remote add origin https://github.com/seu-usuario/mozcommunity-app.git

# 7. Fazer push
git branch -M main
git push -u origin main

# ✅ Ficheiros no GitHub!
```

**Opção B: GitHub Desktop (Visual)**

```
1. Baixar GitHub Desktop (desktop.github.com)
2. Login com conta GitHub
3. File → Clone Repository
4. Selecionar seu repositório
5. Adicionar ficheiros na pasta
6. "Publish repository"
7. ✅ Ficheiros no GitHub!
```

**Opção C: Upload Direto (Mais Simples)**

```
1. Ir GitHub (seu repositório)
2. Clique "Add file" → "Upload files"
3. Arrastar ficheiros:
   ├─ mozcommunity_app_v5.html
   ├─ manifest.json
   └─ sw.js
4. Clique "Commit changes"
5. ✅ Ficheiros no GitHub!
```

---

## PASSO 2: Configurar Firebase (10 min)

### 2.1 Criar Projeto Firebase

```
1. Ir console.firebase.google.com
2. Clique "Adicionar projeto"
3. Nome: "mozcommunity-platform"
4. Desativar Google Analytics (opcional)
5. Clique "Criar projeto"
6. ⏳ Aguarde 1-2 minutos
7. ✅ Projeto criado!
```

### 2.2 Criar Web App

```
1. No projeto Firebase
2. Clique ícone "</>" (Adicionar app web)
3. Nome do app: "MozCommunity Tech App"
4. Clique "Registar app"
5. ⏳ Aguarde...
6. Clique "Copiar" (botão ao lado de código)
7. Salvar em bloco de notas (vamos precisar)
```

**Credenciais que vão parecer:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "mozcommunity-platform.firebaseapp.com",
  projectId: "mozcommunity-platform",
  storageBucket: "mozcommunity-platform.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

### 2.3 Ativar Authentication

```
1. Menu esquerdo → Build → Authentication
2. Clique "Começar"
3. "Email/Password"
4. Toggle "Ativar"
5. Clique "Guardar"
6. ✅ Authentication pronta!
```

### 2.4 Criar Firestore Database

```
1. Menu esquerdo → Build → Firestore Database
2. Clique "Criar database"
3. Região: Selecione mais próxima (ex: europe-west1)
4. Modo: Teste (depois mudamos para Produção)
5. Clique "Criar"
6. ⏳ Aguarde...
7. ✅ Firestore criada!
```

### 2.5 Criar Storage para Fotos

```
1. Menu esquerdo → Build → Storage
2. Clique "Começar"
3. Regras de segurança: Teste
4. Localização: Mesma do Firestore
5. Clique "Criar"
6. ⏳ Aguarde...
7. ✅ Storage criado!
```

### 2.6 Copiar Credenciais para App

```
1. Abrir mozcommunity_app_v5.html (em editor de texto)
2. Procurar: const firebaseConfig = {
3. Substituir com suas credenciais do Firebase:

ANTES:
const firebaseConfig = {
    apiKey: "AIzaSyDemoKeyReplace_com_sua_chave",
    projectId: "mozcommunity-platform",
    ...
};

DEPOIS:
const firebaseConfig = {
    apiKey: "AIzaSyD1a2b3c4d5e6f7g8h9i0j1k2l3",
    authDomain: "mozcommunity-platform.firebaseapp.com",
    projectId: "mozcommunity-platform",
    storageBucket: "mozcommunity-platform.appspot.com",
    messagingSenderId: "123456789123",
    appId: "1:123456789123:web:abc123def456ghi"
};

4. Guardar ficheiro
```

### 2.7 Fazer Push para GitHub

```bash
# Na pasta mozcommunity-app:

git add .
git commit -m "Adicionar Firebase credentials"
git push
```

---

## PASSO 3: Deploy em Vercel (5 min)

### 3.1 Criar Conta Vercel

```
1. Ir vercel.com
2. Clique "Sign Up"
3. Opções:
   ├─ GitHub (recomendado)
   ├─ GitLab
   └─ Bitbucket
4. Selecionar "GitHub"
5. Autorizar Vercel acessar GitHub
6. ✅ Conta criada!
```

### 3.2 Conectar GitHub ao Vercel

```
1. Logar em vercel.com
2. Dashboard → "New Project"
3. Clique "Import a Git Repository"
4. Procurar "mozcommunity-app"
5. Clique "Import"
6. ⏳ Aguarde...
7. ✅ Projeto importado!
```

### 3.3 Configurar Deployment

```
1. Framework: "Other" (é HTML puro)
2. Build Command: (deixar vazio)
3. Output Directory: (deixar vazio)
4. Environment Variables: (não precisa)
5. Clique "Deploy"
6. ⏳ Vercel faz build e deploy
7. Aguarde 1-2 minutos...
8. ✅ URL aparece: https://mozcommunity-app.vercel.app
```

### 3.4 Configurar Domain Personalizado (Opcional)

```
1. Dashboard Vercel → Seu projeto
2. Settings → Domains
3. Adicionar domínio seu (ex: app.mozcommunity.org)
4. Seguir instruções DNS
5. ✅ Domínio conectado!
```

---

## PASSO 4: Regras de Segurança Firebase (10 min)

### 4.1 Firestore Security Rules

```
1. Firebase Console → Firestore Database
2. Clique aba "Regras"
3. Substituir com:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cada utilizador vê apenas seus dados
    match /users/{userId}/infraestruturas/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Supervisor/Admin podem ver todos
    match /users/{userId}/infraestruturas/{document=**} {
      allow read: if request.auth.token.role == 'supervisor' || request.auth.token.role == 'admin';
    }
  }
}

4. Clique "Publicar"
5. ✅ Regras guardadas!
```

### 4.2 Storage Security Rules

```
1. Firebase Console → Storage
2. Clique aba "Regras"
3. Substituir com:

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Cada utilizador envia suas fotos
    match /fotos/{userId}/{allPaths=**} {
      allow read: if request.auth.uid == userId || 
                     request.auth.token.role == 'supervisor' ||
                     request.auth.token.role == 'admin';
      allow write: if request.auth.uid == userId;
    }
  }
}

4. Clique "Publicar"
5. ✅ Regras guardadas!
```

---

## PASSO 5: Testar Aplicação (10 min)

### 5.1 Abrir App Online

```
1. Ir https://mozcommunity-app.vercel.app
   (ou seu domínio personalizado)
2. ✅ App carrega online!
```

### 5.2 Criar Conta

```
1. Preenche:
   ├─ Nome Completo: "João Silva"
   ├─ Email: "joao@teste.com"
   └─ Palavra-passe: "Teste123"
2. Clique "Criar Conta"
3. Firebase cria utilizador
4. ⏳ Login automático
5. ✅ Dentro da app!
```

### 5.3 Criar Registo

```
1. Aba "Novo Registo"
2. Preenche:
   ├─ Nome: "Estrada Teste"
   ├─ Tipo: "Estrada/Ponte"
   ├─ Província: "Cabo Delgado"
   ├─ Distrito: "Pemba"
   └─ Localidade: "Pemba"
3. Clique "Obter Coordenadas" (GPS automático)
4. Preenche Status (Planeado)
5. Clique "Guardar Localmente"
6. ✅ Registo guardado!
```

### 5.4 Verificar Sincronização

```
1. Verificar internet (WiFi ligado)
2. Clicar "Sincronizar" (header)
3. Status mostra: "Sincronizando..."
4. ⏳ Aguarde 2-5 segundos
5. Status mostra: "✅ Sincronizado"
6. Ir "Meus Registos"
7. Ver registo criado
8. ✅ Sincronização funcionando!
```

### 5.5 Verificar Firebase

```
1. Firebase Console → Firestore
2. Collection "users" deve existir
3. Dentro: seu userId
4. Dentro: "infraestruturas"
5. Deve ter seu registo criado
6. ✅ Dados em Firebase!
```

### 5.6 Testar Offline

```
1. Desativar internet (WiFi/dados)
2. Criar novo registo
3. Guardar
4. Ver "Meus Registos"
5. Adicionar visita com foto
6. ✅ Tudo funciona offline!
7. Reativar internet
8. App sincroniza automaticamente
9. Ver dados em Firebase Console
10. ✅ Sincronização após reconectar!
```

---

## PASSO 6: GitHub Updates Automáticos (Bonus)

### Sempre que fizer Mudanças

```bash
# 1. Fazer mudanças no código local
# (editar mozcommunity_app_v5.html, etc)

# 2. Testar localmente (abrir em browser)

# 3. Fazer push para GitHub
git add .
git commit -m "Descrição da mudança"
git push

# 4. Vercel detecta mudança automaticamente
# 5. Build automático
# 6. Deploy automático
# 7. Site atualiza em 30 segundos
# ✅ Tudo automático!
```

---

## 🔧 TROUBLESHOOTING

### "Vercel mostra erro 404"

**Causa:** Ficheiros não foram detectados

**Solução:**
```
1. Verificar GitHub tem ficheiros
2. Redeployer em Vercel:
   └─ Dashboard → Seu projeto
   └─ Deployments
   └─ Clique último deployment
   └─ Clique "Redeploy"
3. Aguarde 1-2 min
4. Testar novamente
```

### "Firebase config inválido"

**Causa:** Credenciais incorretas

**Solução:**
```
1. Firebase Console
2. Copiar credenciais novamente
3. Abrir mozcommunity_app_v5.html
4. Procurar const firebaseConfig
5. Verificar cada campo:
   ├─ apiKey (começa com AIzaSy)
   ├─ authDomain (.firebaseapp.com)
   ├─ projectId
   ├─ storageBucket
   └─ appId
6. Se algo está diferente, corrigir
7. Fazer push GitHub
8. Vercel faz deploy automático
9. Testar novamente
```

### "Login não funciona"

**Causa:** Authentication não ativada em Firebase

**Solução:**
```
1. Firebase Console
2. Build → Authentication
3. Verificar "Email/Password" está ativado (toggle verde)
4. Se não, clique para ativar
5. Testar login novamente
```

### "Fotos não fazem upload"

**Causa:** Storage não criado ou regras incorretas

**Solução:**
```
1. Firebase Console → Storage
2. Verificar "Storage" existe
3. Ver aba "Regras"
4. Verificar regra permite write
5. Se necessário, corrigir:
   └─ allow write: if request.auth != null;
6. Testar upload novamente
```

### "Sincronização lenta"

**Causa:** Internet fraca ou Firebase sobrecarregado

**Solução:**
```
1. Verificar velocidade internet
2. Conectar WiFi (mais rápido que dados)
3. Tentar em hora diferente
4. Firebase geralmente é rápido
5. Se persistir, contactar Firebase support
```

---

## 📊 ARQUITETURA FINAL

```
SEU GITHUB (Repositório)
├─ mozcommunity_app_v5.html
├─ manifest.json
├─ sw.js
└─ (docs)

         ↓ (webhook)

VERCEL (Servidor)
├─ Build automático
├─ Deploy automático
└─ URL: mozcommunity-app.vercel.app

         ↓ (conecta com)

FIREBASE
├─ Authentication (login)
├─ Firestore (dados)
└─ Storage (fotos)

         ↓ (usa)

TÉCNICO
├─ Login app
├─ Cria registos (offline)
├─ Tira fotos
└─ Sincroniza dados

         ↓ (supervisor ve)

SUPERVISOR
├─ Dashboard
├─ Dados em tempo real
└─ Fotos de cada visita
```

---

## ✅ CHECKLIST FINAL

### GitHub
- [ ] Repositório criado
- [ ] Ficheiros no repositório
- [ ] Credenciais Firebase adicionadas
- [ ] Código no main branch

### Firebase
- [ ] Projeto criado
- [ ] Web App registada
- [ ] Authentication ativada (Email/Password)
- [ ] Firestore Database criada
- [ ] Storage criado
- [ ] Regras de segurança configuradas

### Vercel
- [ ] Conta criada (com GitHub)
- [ ] Repositório importado
- [ ] Deploy automático funcionando
- [ ] URL acessível
- [ ] HTTPS ativado (automático)

### Testes
- [ ] App carrega online
- [ ] Criar conta funciona
- [ ] Login funciona
- [ ] Criar registo funciona
- [ ] GPS funciona
- [ ] Sincronização funciona
- [ ] Fotos fazem upload
- [ ] Firebase tem dados
- [ ] Offline funciona
- [ ] Reconectar sincroniza

### Pronto!
- [ ] ✅ APP ONLINE E FUNCIONANDO!

---

## 🎉 PRÓXIMAS AÇÕES

### HOJE
1. Fazer push código para GitHub ✅
2. Configurar Firebase ✅
3. Deploy em Vercel ✅
4. Testar aplicação ✅

### SEMANA QUE VEM
1. Treinar técnicos (como usar)
2. Treinar supervisor (dashboard)
3. Testes em produção
4. Iniciar uso real

### FUTURO
1. Domínio personalizado
2. Certificado HTTPS (automático Vercel)
3. Analytics
4. Backup automático

---

## 📞 RESUMO FINAL

Você agora tem:

```
✅ Código em GitHub (versionado + backup)
✅ Firebase configurado (autenticação + dados + fotos)
✅ Servidor online 24/7 (Vercel)
✅ Deploy automático (push GitHub = deploy Vercel)
✅ App funcionando (https://mozcommunity-app.vercel.app)
✅ Tudo testado e pronto
```

**Próximo passo:**
1. Faça push do código para GitHub
2. Aguarde deploy automático em Vercel
3. Abra URL
4. Crie conta
5. Use a app! 🚀

---

**Versão:** 5.0 Completa
**Data:** 22 de Julho de 2026
**Status:** ✅ PRONTO PARA PRODUÇÃO

Bem-vindo ao MozCommunity Online! 🌐📱✨
