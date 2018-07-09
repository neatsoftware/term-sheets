import { createGIF } from 'gifshot'
import { DELAY_TYPE_START, DELAY_TYPE_CHAR, DELAY_TYPE_SUBMIT, DELAY_OUTPUT_LINE } from '../components/terminal'

const GIF_FRAME_RATE = 200
const GIF_RESTART_DELAY = 1000

export function exportProject(state) {
  return {
    svg: exportSvg,
    html: exportHtml,
    gif: exportGif
  }[state.exportType](state)
}

function exportSvg({ terminalEl: element, width, height }) {
  return new Promise(resolve => {
    const content = buildSvg(element, width, height)
    const blob = new Blob([content], { type: 'image/svg+xml' })
    downloadBlob(blob, 'svg')
    resolve()
  })
}

function exportHtml({ terminalEl: element }) {
  return new Promise(resolve => {
    const css = buildCss()
    const markup = element.innerHTML
    const content = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}${css}</style></head><body>${markup}</body></html>`
    const blob = new Blob([content], { type: 'text/html' })
    downloadBlob(blob, 'html')
    resolve()
  })
}

function exportGif({ terminalEl: element, width, height, commands, speed }) {
  return new Promise((resolve, reject) => {
    const totalTime = commands.reduce((time, command) => {
      const inputTime =
        (DELAY_TYPE_START + DELAY_TYPE_CHAR * Array.from(command.input).length + DELAY_TYPE_SUBMIT) / speed
      const outputTime = command.output ? (DELAY_OUTPUT_LINE * command.output.length) / speed : 0
      return time + inputTime + outputTime
    }, GIF_RESTART_DELAY)
    const numFrames = totalTime / GIF_FRAME_RATE

    const img = new Image()
    img.onload = e =>
      buildGifFrames(e.target, width, height, numFrames).then(frameImages => {
        createGIF(
          {
            numFrames,
            images: frameImages,
            sampleInterval: 20,
            numWorkers: 4,
            gifWidth: width,
            gifHeight: height
          },
          result => {
            const { error, image: gifBase64 } = result
            if (error) reject(error)
            resolve(downloadUrl(gifBase64, 'gif'))
          }
        )
      })
    img.src = `data:image/svg+xml,${encodeURIComponent(buildSvg(element, width, height))}`
  })
}

function buildGifFrames(img, width, height, numFrames) {
  return Promise.all(
    Array.apply(null, Array(Math.ceil(numFrames))).map(
      (_, i) =>
        new Promise(resolve => {
          setTimeout(() => {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            canvas.getContext('2d').drawImage(img, 0, 0)
            resolve(canvas.toDataURL())
          }, i * GIF_FRAME_RATE)
        })
    )
  )
}

function buildSvg(element, width, height) {
  const css = buildCss()
  const markup = new XMLSerializer().serializeToString(element)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><style>${css}</style>${markup}</foreignObject></svg>`
}

function buildCss() {
  return [].slice
    .call(document.getElementById('terminalCss').sheet.cssRules)
    .reduce((string, rule) => string + rule.cssText, '')
    .replace(/\n/g, '')
}

function downloadUrl(url, ext) {
  const a = document.createElement('a')
  a.href = url
  a.download = `term-sheet-${Date.now()}.${ext}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function downloadBlob(blob, ext) {
  downloadUrl(URL.createObjectURL(blob), ext)
  URL.revokeObjectURL(blob)
}
