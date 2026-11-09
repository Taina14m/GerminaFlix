# GerminaFlix

[![CI/CD GerminaFlix](https://github.com/Taina14m/GerminaFlix/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Taina14m/GerminaFlix/actions/workflows/ci-cd.yml)

Catálogo de filmes em HTML e CSS.

**Site publicado:** https://taina14m.github.io/GerminaFlix/

## Pipeline CI/CD

O workflow `.github/workflows/ci-cd.yml` roda no GitHub Actions:

- **CI** (todo push e pull request para a `main`): instala as dependências, verifica links quebrados, valida o HTML, gera a imagem Docker e testa o container.
- **CD** (só em push na `main`, depois da CI passar): publica a imagem no GitHub Container Registry, extrai o site de dentro dela, publica no GitHub Pages e confere se a versão nova está no ar.

## Rodar localmente

```bash
npm install
npm test                      # verificações da CI

docker build -t germinaflix .
docker run -p 8080:80 germinaflix
# abrir http://localhost:8080
```
