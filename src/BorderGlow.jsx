import { useRef } from 'react'

function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
}) {
  const ref = useRef(null)

  const updateGlow = (event) => {
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const edgeDistance = Math.min(x, y, rect.width - x, rect.height - y)
    const edgeOpacity = Math.max(0, 1 - edgeDistance / edgeSensitivity)

    element.style.setProperty('--border-glow-x', `${x}px`)
    element.style.setProperty('--border-glow-y', `${y}px`)
    element.style.setProperty('--border-glow-opacity', String(edgeOpacity * glowIntensity))
  }

  const hideGlow = () => {
    ref.current?.style.setProperty('--border-glow-opacity', '0')
  }

  return (
    <div
      ref={ref}
      className={`border-glow ${animated ? 'border-glow--animated' : ''} ${className}`}
      onPointerMove={updateGlow}
      onPointerLeave={hideGlow}
      style={{
        '--border-glow-radius': `${borderRadius}px`,
        '--border-glow-size': `${glowRadius * 2}px`,
        '--border-glow-color': glowColor,
        '--border-glow-bg': backgroundColor,
        '--border-glow-cone': `${coneSpread}deg`,
        '--border-glow-colors': colors.join(', '),
      }}
    >
      <div className="border-glow__edge" aria-hidden="true" />
      <div className="border-glow__content">{children}</div>
    </div>
  )
}

export default BorderGlow
