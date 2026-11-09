// Verifica se todo arquivo local referenciado (href/src) nos HTML existe no repositório.
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmls = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
let erros = 0;

for (const html of htmls) {
  const conteudo = fs.readFileSync(path.join(root, html), "utf8");
  const refs = [...conteudo.matchAll(/(?:href|src)="([^"]*)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (!ref || /^(https?:|mailto:|#|data:)/.test(ref)) continue;
    const alvo = decodeURIComponent(ref.split(/[?#]/)[0]);
    if (!fs.existsSync(path.join(root, alvo))) {
      console.error(`✗ ${html}: arquivo não encontrado -> ${ref}`);
      erros++;
    }
  }
}

if (erros) {
  console.error(`\n${erros} referência(s) quebrada(s).`);
  process.exit(1);
}
console.log(`✓ ${htmls.length} páginas verificadas, nenhuma referência quebrada.`);
