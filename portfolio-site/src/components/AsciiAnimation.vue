<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let mouseX = 0
let mouseY = 0

// ASCII characters for different density levels
const ASCII_CHARS = ['#', '0', '?', '*', '+', ':', '.', ' ']
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
        baseChar: pattern,
        offsetX: 0,
        offsetY: 0,
        targetOffsetX: 0,
        targetOffsetY: 0
      })
    }
  }
}

// Create patterns similar to the image (speech bubbles, scattered chars)
const getPattern = (x: number, y: number, cols: number, rows: number): string => {
  const centerX = cols / 2
  const centerY = rows / 2
  const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
  
  // Create speech bubble patterns
  const bubble1X = cols * 0.25
  const bubble1Y = rows * 0.3
  const bubble1Dist = Math.sqrt(Math.pow(x - bubble1X, 2) + Math.pow(y - bubble1Y, 2))
  
  const bubble2X = cols * 0.7
  const bubble2Y = rows * 0.4
  const bubble2Dist = Math.sqrt(Math.pow(x - bubble2X, 2) + Math.pow(y - bubble2Y, 2))
  
  const bubble3X = cols * 0.5
  const bubble3Y = rows * 0.7
  const bubble3Dist = Math.sqrt(Math.pow(x - bubble3X, 2) + Math.pow(y - bubble3Y, 2))
  
  // Speech bubble 1 (large)
  if (bubble1Dist < 15) {
    if (bubble1Dist > 13) return '#'
    if (bubble1Dist < 3) return ' '
    return '#'
  }
  
  // Speech bubble 2 (medium, with D's)
  if (bubble2Dist < 10) {
    if (bubble2Dist > 8.5) return '0'
    if (bubble2Dist < 2) return ' '
    return 'D'
  }
  
  // Speech bubble 3 (with question marks)
  if (bubble3Dist < 12) {
    if (bubble3Dist > 10.5) return '?'
    if (bubble3Dist < 2.5) return ' '
    return '?'
  }
  
  // Add scattered elements
  const noise = Math.sin(x * 0.5) * Math.cos(y * 0.3)
  if (noise > 0.85) return '/'
  if (noise < -0.85) return ':'
  if (Math.random() > 0.95) return '*'
  if (Math.random() > 0.97) return '+'
  
  return ' '
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
    // Calculate cursor influence
    const dx = mouseX - cell.x
    const dy = mouseY - cell.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
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
    
    // Draw character
    if (cell.baseChar !== ' ' && ctx) {
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
