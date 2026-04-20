# Reformas EBS — Site Institucional

Site institucional da **Reformas EBS**, empresa de construção e reformas de alto padrão com atuação em São Paulo e Alagoas.

## Tecnologias

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/) (Auth + Firestore)
- [Sonner](https://sonner.emilkowal.ski/) (notificações toast)

## Funcionalidades

- **Home** — hero com foto real, grade de serviços, prévia do portfólio e depoimentos
- **Galeria** — 70 fotos reais com grid masonry e lightbox navegável
- **Serviços** — detalhamento completo dos serviços oferecidos
- **Portfólio** — projetos realizados
- **Sobre** — história e valores da empresa
- **Contato** — formulários de orçamento e parceria salvos no Firestore + envio via WhatsApp
- **Avaliações** — sistema real com login, onde clientes criam, editam e removem avaliações
- **Painel Admin** (`/admin`) — visualização de orçamentos e parcerias recebidos (acesso restrito)
- **Autenticação** — login com Google ou e-mail/senha, recuperação de senha

## Rodando o projeto

### Pré-requisitos

- Node.js 18+
- Conta no [Firebase](https://firebase.google.com/)

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as credenciais do Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Desenvolvimento

```bash
npm run dev
```

Acesse em `http://localhost:5173`

### Build para produção

```bash
npm run build
```

## Firebase — Configuração

### Autenticação

Habilite os seguintes provedores em **Authentication → Sign-in method**:
- Google
- E-mail/Senha

### Regras do Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.userId;
    }

    match /orcamentos/{id} {
      allow create: if true;
      allow read, delete: if request.auth != null
        && request.auth.token.email in ['seu@email.com'];
    }

    match /parcerias/{id} {
      allow create: if true;
      allow read, delete: if request.auth != null
        && request.auth.token.email in ['seu@email.com'];
    }

  }
}
```

> Substitua `seu@email.com` pelo e-mail do administrador.

## Painel Admin

Acesse `/admin` logado com o e-mail cadastrado como administrador em `src/app/components/Navbar.tsx` e `src/app/pages/Admin.tsx`.

## Deploy

Ao hospedar (Vercel, Netlify etc.), cadastre as variáveis do `.env` no painel da plataforma — o arquivo não é enviado ao repositório.

---

Desenvolvido por [Breno Silva](mailto:breno.ss1808@gmail.com) · [LinkedIn](https://www.linkedin.com/in/brenodevsilva/)
