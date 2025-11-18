<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let mouseX = 0
let mouseY = 0

// ASCII characters for different density levels
  const ASCII_CHARS = ['-', 'z', '!', '*', '+', '.', ':', ',']
const GRID_SIZE = 12
const INFLUENCE_RADIUS = 100

interface AsciiCell {
  x: number
  y: number
  char: string
  baseChar: string
  offsetX: number
  offsetY: number
  targetOffsetX: number
  targetOffsetY: number
  speed: number
}

let cells: AsciiCell[] = []

const initCanvas = () => {
  if (!canvas.value) return
  
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.value.getBoundingClientRect()
  
  canvas.value.width = rect.width * dpr
  canvas.value.height = rect.height * dpr
  
  ctx = canvas.value.getContext('2d')
  if (!ctx) return
  
  ctx.scale(dpr, dpr)
  canvas.value.style.width = `${rect.width}px`
  canvas.value.style.height = `${rect.height}px`
  
  // Initialize cells
  cells = []
  const cols = Math.floor(rect.width / GRID_SIZE)
  const rows = Math.floor(rect.height / GRID_SIZE)
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pattern = getPattern(x, y, cols, rows)
      cells.push({
        x: x * GRID_SIZE,
        y: y * GRID_SIZE,
        char: pattern,
        baseChar: '',
        offsetX: 0,
        offsetY: 0,
        targetOffsetX: 0,
        targetOffsetY: 0,
        speed: pattern !== ' ' ? 0.5 + Math.random() * 1.5 : 0,
      })
    }
  }
}

// Create patterns similar to the image (speech bubbles, scattered chars)
const getPattern = (x: number, y: number, cols: number, rows: number): string => {
  const centerX = cols / 2
  const centerY = rows / 2
  const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
  
  
  // Add scattered elements
  const noise = Math.sin(x * 0.5) * Math.cos(y * 0.3)
  if (noise > 0.5) return '(:'
  return '🍂'
}

const handleMouseMove = (e: MouseEvent) => {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return
  
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
}

const animate = () => {
  if (!ctx || !canvas.value) return
  
  const rect = canvas.value.getBoundingClientRect()
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, rect.width, rect.height)
  
  ctx.font = '12px monospace'
  ctx.fillStyle = '#ffffff'
  
  // Update and draw cells
  cells.forEach(cell => {
    // Only animate non-empty cells
    if (cell.baseChar === ' ') return

    // Calculate cursor influence
    const dx = mouseX - cell.x - cell.offsetX
    const dy = mouseY - cell.y - cell.offsetY
    const dist = Math.sqrt(dx * dx + dy * dy)

    let pushX = 0
    let pushY = 0


    if (dist < INFLUENCE_RADIUS) {
      const force = (INFLUENCE_RADIUS - dist) / INFLUENCE_RADIUS
      cell.targetOffsetX = (dx / dist) * force * 20
      cell.targetOffsetY = (dy / dist) * force * 20
    } else {
      cell.targetOffsetX = 0
      cell.targetOffsetY = 0
    }
    
    // Smooth interpolation
    cell.offsetX += (cell.targetOffsetX - cell.offsetX) * 0.1
    cell.offsetY += (cell.targetOffsetY - cell.offsetY) * 0.1
    // Move cell down and add wobble
    cell.y += cell.speed/8
    cell.offsetX = Math.sin(0) * 5 + pushX
    cell.offsetY = pushY
    // Move cell down and add wobble
    cell.y += cell.speed/8
    cell.offsetX = Math.sin(0) * 5 + pushX
    cell.offsetY = pushY
    // Draw character


    // Reset to top when off screen
    if (cell.y + cell.offsetY > rect.height + 20) {
      cell.y = -20 - Math.random() * 50  // Stagger the reset positions
      cell.x = Math.random() * rect.width
      // Optionally reassign a new character
      const chars = [',', '!', 'x', '*', '+', '.', ':', ',']
      cell.baseChar = chars[(Math.floor(Math.random() * chars.length))] ?? '*'
      cell.char = cell.baseChar
    }
    // Draw character
    if (ctx) {
      ctx.fillText(
        cell.baseChar,
        cell.x + cell.offsetX,
        cell.y + cell.offsetY
      )
    }
  })
  
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  initCanvas()
  animate()
  window.addEventListener('resize', initCanvas)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', initCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <canvas ref="canvas" class="ascii-canvas"></canvas>
</template>

<style scoped>
.ascii-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
