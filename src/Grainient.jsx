import { useEffect, useRef } from 'react'

const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '')
  const value = Number.parseInt(
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized,
    16,
  )

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

const mix = (a, b, amount) => ({
  r: a.r + (b.r - a.r) * amount,
  g: a.g + (b.g - a.g) * amount,
  b: a.b + (b.b - a.b) * amount,
})

const toCssColor = ({ r, g, b }, alpha = 1) =>
  `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`

function Grainient({
  color1 = '#5e2409',
  color2 = '#000000',
  color3 = '#52747c',
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 0.8,
  grainAmount = 0,
  grainScale = 0.8,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })
    const parent = canvas.parentElement
    const c1 = hexToRgb(color1)
    const c2 = hexToRgb(color2)
    const c3 = hexToRgb(color3)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId
    let grainCache
    let resizeObserver
    let isDocumentHidden = document.hidden
    let lastFrameTime = 0
    const frameInterval = reducedMotion ? Infinity : 1000 / 18

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.1)
      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio))
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio))
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      grainCache = undefined
    }

    const buildGrain = (width, height, time) => {
      const grainCanvas = document.createElement('canvas')
      const scale = Math.max(0.28, grainScale * noiseScale)
      grainCanvas.width = Math.max(1, Math.floor(width * scale))
      grainCanvas.height = Math.max(1, Math.floor(height * scale))
      const grainContext = grainCanvas.getContext('2d')
      const image = grainContext.createImageData(grainCanvas.width, grainCanvas.height)
      const seed = grainAnimated ? time * 0.00008 : 0.37

      for (let index = 0; index < image.data.length; index += 4) {
        const x = index / 4
        const value =
          Math.sin(x * 12.9898 + seed * 78233.19) *
          Math.cos(x * 78.233 + seed * 139.17)
        const shade = 128 + (value - Math.floor(value)) * 255 * grainAmount
        image.data[index] = shade
        image.data[index + 1] = shade
        image.data[index + 2] = shade
        image.data[index + 3] = Math.min(90, 255 * grainAmount)
      }

      grainContext.putImageData(image, 0, 0)
      return grainCanvas
    }

    const draw = (time = 0) => {
      frameId = 0

      if (isDocumentHidden) {
        frameId = window.requestAnimationFrame(draw)
        return
      }

      if (!reducedMotion && time - lastFrameTime < frameInterval) {
        frameId = window.requestAnimationFrame(draw)
        return
      }

      lastFrameTime = time
      const rect = parent.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const t = reducedMotion ? 0 : time * 0.001 * timeSpeed
      const rotation = (blendAngle + Math.sin(t * 0.4) * rotationAmount * 0.01) * (Math.PI / 180)
      const diagonal = Math.hypot(width, height)
      const centerOffsetX = width * 0.5 + centerX * width * 0.5
      const centerOffsetY = height * 0.5 + centerY * height * 0.5
      const x1 = centerOffsetX + Math.cos(rotation) * diagonal
      const y1 = centerOffsetY + Math.sin(rotation) * diagonal
      const x2 = centerOffsetX - Math.cos(rotation) * diagonal
      const y2 = centerOffsetY - Math.sin(rotation) * diagonal
      const balance = Math.max(0.05, Math.min(0.95, 0.5 + colorBalance * 0.25))
      const softness = Math.max(0.001, Math.min(0.45, blendSoftness))

      context.clearRect(0, 0, width, height)
      context.filter = `contrast(${contrast}) saturate(${saturation}) brightness(${gamma})`

      const gradient = context.createLinearGradient(x1, y1, x2, y2)
      gradient.addColorStop(0, toCssColor(c1))
      gradient.addColorStop(Math.max(0, balance - softness), toCssColor(mix(c1, c2, 0.52)))
      gradient.addColorStop(balance, toCssColor(c2))
      gradient.addColorStop(Math.min(1, balance + softness), toCssColor(mix(c2, c3, 0.58)))
      gradient.addColorStop(1, toCssColor(c3))
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      context.globalCompositeOperation = 'screen'
      for (let i = 0; i < 4; i += 1) {
        const phase = t * warpSpeed + i * 1.7
        const radius = (Math.min(width, height) * (0.42 + i * 0.08)) / zoom
        const x =
          centerOffsetX +
          Math.cos(phase * 0.57) * warpAmplitude * warpStrength +
          Math.sin(phase * 0.23) * width * 0.12
        const y =
          centerOffsetY +
          Math.sin(phase * 0.51) * warpAmplitude * warpStrength +
          Math.cos(phase * 0.19) * height * 0.1
        const blob = context.createRadialGradient(x, y, 0, x, y, radius)
        const blobColor = i % 2 === 0 ? c3 : c1
        blob.addColorStop(0, toCssColor(blobColor, 0.32 / (i + 1)))
        blob.addColorStop(0.48, toCssColor(blobColor, 0.1))
        blob.addColorStop(1, toCssColor(blobColor, 0))
        context.fillStyle = blob
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
      }

      context.globalCompositeOperation = 'overlay'
      context.strokeStyle = toCssColor(c3, 0.08)
      context.lineWidth = 1
      for (let i = 0; i < warpFrequency; i += 1) {
        context.beginPath()
        for (let x = -40; x <= width + 40; x += 18) {
          const y =
            height * (0.25 + i / (warpFrequency + 2)) +
            Math.sin(x * 0.01 * noiseScale + t * warpSpeed + i) *
              warpAmplitude *
              warpStrength *
              0.22
          if (x === -40) context.moveTo(x, y)
          else context.lineTo(x, y)
        }
        context.stroke()
      }

      context.filter = 'none'
      context.globalCompositeOperation = 'source-over'
      if (grainAmount > 0) {
        if (!grainCache || grainAnimated) grainCache = buildGrain(width, height, time)
        context.globalAlpha = Math.min(0.5, grainAmount)
        context.drawImage(grainCache, 0, 0, width, height)
        context.globalAlpha = 1
      }

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    if (!reducedMotion) {
      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(parent)
    }

    const handleVisibilityChange = () => {
      isDocumentHidden = document.hidden

      if (!isDocumentHidden && !reducedMotion && !frameId) {
        frameId = window.requestAnimationFrame(draw)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [
    color1,
    color2,
    color3,
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
  ])

  return <canvas ref={canvasRef} className="grainient-canvas" aria-hidden="true" />
}

export default Grainient
