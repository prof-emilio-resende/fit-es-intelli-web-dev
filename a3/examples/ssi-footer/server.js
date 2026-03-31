/**
 * Servidor SSI (Server Side Includes)
 *
 * Processa diretivas <!--#include file="..." --> nos arquivos HTML
 * antes de enviá-los ao cliente — o browser nunca vê a diretiva,
 * só recebe o HTML final já montado.
 *
 * Nenhuma dependência externa: apenas Node.js nativo.
 */

const http = require('http')
const fs   = require('fs')
const path = require('path')

const PUBLIC = path.join(__dirname, 'public')
const PORT   = 3001

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
}

/**
 * Substitui todas as ocorrências de <!--#include file="caminho" -->
 * pelo conteúdo do arquivo referenciado.
 * baseDir é o diretório do arquivo HTML que contém a diretiva.
 */
function processSSI(html, baseDir) {
  return html.replace(/<!--#include file="([^"]+)"\s*-->/g, (match, filePath) => {
    const fullPath = path.join(baseDir, filePath)
    try {
      return fs.readFileSync(fullPath, 'utf-8')
    } catch {
      console.error(`[SSI] fragment não encontrado: ${fullPath}`)
      return `<!-- SSI: fragment "${filePath}" not found -->`
    }
  })
}

http.createServer((req, res) => {
  const urlPath  = req.url === '/' ? '/index.html' : req.url
  const filePath = path.join(PUBLIC, urlPath)
  const ext      = path.extname(filePath)

  try {
    let content = fs.readFileSync(filePath, 'utf-8')

    if (ext === '.html') {
      content = processSSI(content, path.dirname(filePath))
    }

    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' })
    res.end(content)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }

}).listen(PORT, () => {
  console.log(`SSI server running → http://localhost:${PORT}`)
})
