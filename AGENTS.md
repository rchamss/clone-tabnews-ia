# AGENTS.md

## Visão Geral do Projeto

- **Nome**: `clone-tabnews-ia`
- **Objetivo**: Implementação do TabNews para o `curso.dev`, desenvolvida em conjunto com agentes de IA.

## Stack Tecnológica

- **Framework**: Next.js com **App Router** (diretório `app/`).
- **Biblioteca de UI**: React.
- **Linguagem**: JavaScript (`.js`).
- **Tipografia**: `next/font/google` (fonte `Google_Sans`).
- **Estilização**: CSS global (`app/globals.css`).
- **Gerenciador de pacotes**: npm (com `package-lock.json`).

## Estrutura de Arquivos

- `README.md`: Descrição principal do projeto.
- `package.json` / `package-lock.json`: Manifesto de dependências e scripts do projeto.
- `.gitignore`: Ignora `node_modules/`, `.next/`, `out/` e `.DS_Store`.
- `app/`: Diretório principal da aplicação Next.js App Router:
  - `app/layout.js`: Layout raiz (`RootLayout`), define `lang="pt-BR"`, `metadata` e carrega a fonte e o CSS global.
  - `app/page.js`: Rota raiz (`/`) com o componente `Home`.
  - `app/globals.css`: Estilos globais da aplicação.

## Comandos Úteis

Definidos em `package.json`:

- `npm run dev` — executa o servidor de desenvolvimento (`next dev`).
- `npm run build` — gera o build de produção (`next build`).
- `npm start` — inicia a aplicação em modo de produção (`next start`).

## Convenções para Agentes

- Manter a estrutura baseada no App Router em `app/` e arquivos JavaScript (`.js`), salvo solicitação em contrário.
- Manter o atributo de idioma `pt-BR` e textos voltados ao público em português do Brasil, alinhados ao propósito do projeto.
- Consultar `package.json` sempre que precisar verificar dependências e scripts disponíveis antes de introduzir novas ferramentas ou pacotes.
