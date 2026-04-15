# 🎮 Mega Man X — Maverick Hunter Base

> Landing Page premium com a evolução de combate dos Maverick Hunters de **Mega Man X1** até **X6**, incluindo um detonado completo de X1.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

- **Design Cyberpunk** — Glassmorphism, efeitos glitch e partículas animadas
- **Cápsula Holográfica Interativa** — Explore os arquivos de X, Zero e Dr. Light
- **Evolução X1→X6** — Cards tipográficos com detalhes de cada era
- **Detonado Completo de X1** — Ordem de fases, itens, armaduras e estratégias para todos os bosses
- **100% Estático** — HTML, CSS e JS puro, sem dependências de build

## 📁 Estrutura do Projeto

```
Landing Page/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions — deploy automático
├── assets/
│   ├── css/
│   │   └── styles.css          # Estilização completa (cyberpunk theme)
│   └── js/
│       └── script.js           # Partículas, parallax e interações
├── index.html                  # Página principal
├── .gitignore                  # Arquivos ignorados pelo Git
└── README.md                   # Este arquivo
```

## 🚀 Deploy no GitHub Pages

### Passo a passo

1. **Crie um repositório no GitHub**
   - Acesse [github.com/new](https://github.com/new)
   - Dê um nome ao repositório (ex: `megaman-x-landing`)
   - Deixe como **Public** (obrigatório para Pages no plano gratuito)
   - **Não** marque nenhuma opção de inicialização (README, .gitignore, etc.)

2. **Inicialize o Git e faça o push**
   ```bash
   cd "d:\Landing Page"
   git init
   git add .
   git commit -m "feat: landing page Mega Man X com detonado X1"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/megaman-x-landing.git
   git push -u origin main
   ```

3. **Ative o GitHub Pages**
   - No repositório, vá em **Settings** → **Pages**
   - Em **Source**, selecione **GitHub Actions**
   - O workflow `deploy.yml` já está configurado e será executado automaticamente no push

4. **Acesse seu site** 🎉
   ```
   https://SEU_USUARIO.github.io/megaman-x-landing/
   ```

### Deploy automático

O workflow em `.github/workflows/deploy.yml` faz deploy automático a cada push na branch `main`. Não é necessário nenhum build — o site é enviado diretamente como está.

## 🖥️ Desenvolvimento Local

Basta abrir `index.html` no navegador, ou usar um servidor local:

```bash
# Com Python
python -m http.server 8000

# Com Node.js (npx)
npx -y http-server . -p 8000
```

Acesse: `http://localhost:8000`

## 🎨 Stack

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Glassmorphism, animações, glitch effects |
| JavaScript | Partículas, parallax, interação holográfica |
| Google Fonts | Orbitron (títulos) + Inter (corpo) |
| GitHub Actions | CI/CD para deploy automático |

## 📜 Licença

Este projeto é um conceito fan-made. Mega Man X e todos os personagens relacionados são propriedade da **Capcom**.
