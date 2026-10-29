# Wesley Carvalho — Portfólio & Site Pessoal

Site pessoal e portfólio profissional do **Wesley Carvalho**, Engenheiro de Software Full Stack &
Arquiteto de Soluções (Fortaleza/CE).

**Site:** https://wesleycarvalho.vercel.app
**Repositório:** https://github.com/Meckwes/wesleycarvalho

---

## 📦 Estrutura

```
wesley-portfolio/
├── index.html                  # Página única (landing)
├── assets/
│   ├── tailwind.css            # CSS compilado (gerado)
│   └── main.js                 # Interações: header, menu, reveal, abas, form
├── images/                     # WebP otimizado + mockups SVG
│   ├── case-diarialog.svg      # Mockup da interface do DiáriaLog
│   ├── case-automation.svg     # Diagrama de arquitetura da plataforma
│   ├── case-*.webp             # Thumbnails dos cases
│   ├── wesley-photo.webp       # Foto do hero
│   └── og-preview-v7.jpg       # Preview social (WhatsApp/LinkedIn)
├── demos/
│   └── diarialog/index.html    # App DiáriaLog (client-side, funciona offline)
├── cv/
│   └── wesley-carvalho-cv.pdf  # Currículo A4 (1 página)
├── src/input.css               # Fonte do Tailwind (tokens + componentes)
├── tailwind.config.js          # Design system em tokens
├── vercel.json                 # Headers de segurança e cache
└── README.md
```

## 🧱 Stack do site

- **HTML5 + TailwindCSS 3.4** (compilado para CSS estático — sem CDN em produção)
- **JavaScript vanilla** — sem framework, sem build step no deploy
- **Fontes:** Inter + Plus Jakarta Sans + JetBrains Mono
- **Design system:** tokens no `tailwind.config.js` (cores, sombras, keyframes, easings)

### Paleta

| Token | Valor | Uso |
|---|---|---|
| `ink-950` | `#090D16` | Fundo principal |
| `ink-900` | `#111827` | Cards |
| `brand` | `#84CC16` | Accent (verde-lima) |
| `ember` | `#F97316` | Accent secundário |
| `slate-50/400/500` | — | Hierarquia de texto |

## 🔨 Rebuild do CSS

O `assets/tailwind.css` já está compilado e versionado — o site sobe na Vercel sem build nenhum.
Pra mexer no estilo, edite `src/input.css` e recompile:

```bash
npm install -D tailwindcss@3.4
npx tailwindcss -c tailwind.config.js -i src/input.css -o assets/tailwind.css --minify
```

## 🚀 Deploy

Vercel Hobby, com auto-deploy via GitHub (branch `main` → produção).

- Repo local: `C:\Users\WESLEY RODRIGUES\.minimax\agents\mavis\workspace\wesley-portfolio`
- Projeto Vercel: `wesleycarvalho` (`prj_2R7GtgunEdRHQUXp3EWn5QmAVbus`, team `team_bGn04kZ9wPJSeePZ5VlHL3cP`)
- `vercel.json` sem `buildCommand`/`installCommand` → o Vercel serve os arquivos estáticos direto

**Fluxo (local first):** edita no VS Code → valida local → `git commit` → `git push` → CI da Vercel faz o deploy.

## 📦 DiáriaLog — app de controle de turnos

App client-side em `demos/diarialog/index.html` (um único arquivo, sem dependências).

**Regras implementadas:**

- **Semana de trabalho:** ISO week (segunda → domingo)
- **Semana de repasse:** semana de trabalho + 1
- **Janela de repasse:** terça 00:00 → sexta 22:00
- **Status automático:** `Previsto` → `Em trânsito` → `Pago` / `Atrasado`
- **Turno noturno:** se a saída < entrada, soma 24h (virada de meia-noite)
- **Conferência:** valor depositado por semana + diferença contra o previsto

**Dados:** persistem em `localStorage` (chave `diarialog.v1`). Exporta JSON/CSV pelo menu `⋮`.
`?demo=1` na URL carrega dados de exemplo.

## 🔗 Links

- WhatsApp: https://wa.me/5541984898998
- LinkedIn: https://www.linkedin.com/in/wesleyr-carvalho
- GitHub: https://github.com/Meckwes
- Fity (case): https://fityai.vercel.app

---

© 2026 Wesley Carvalho · Arquitetado com código limpo e paixão por tecnologia.
