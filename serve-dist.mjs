import { createReadStream, existsSync, statSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.join(__dirname, 'dist')
const host = '127.0.0.1'
const port = 4174

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

const resolveFilePath = (urlPath) => {
  const pathname = decodeURIComponent(urlPath.split('?')[0])
  const cleanPath = pathname === '/' ? '/index.html' : pathname
  const absolutePath = path.normalize(path.join(distDir, cleanPath))

  if (!absolutePath.startsWith(distDir)) {
    return null
  }

  if (existsSync(absolutePath) && statSync(absolutePath).isFile()) {
    return absolutePath
  }

  return path.join(distDir, 'index.html')
}

const server = http.createServer(async (request, response) => {
  const filePath = resolveFilePath(request.url || '/')

  if (!filePath) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  try {
    const extension = path.extname(filePath).toLowerCase()
    const contentType = mimeTypes[extension] || 'application/octet-stream'

    response.writeHead(200, { 'Content-Type': contentType })

    if (extension === '.html') {
      response.end(await readFile(filePath))
      return
    }

    createReadStream(filePath).pipe(response)
  } catch (error) {
    response.writeHead(500)
    response.end(`Server error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
})

server.listen(port, host, () => {
  console.log(`Portfolio preview running at http://${host}:${port}/`)
})
