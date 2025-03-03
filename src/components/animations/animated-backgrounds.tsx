"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export default function AnimatedBackgrounds() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [effect, setEffect] = useState<"gradient" | "particles" | "wave" | "video">("gradient")

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Clear previous content
    container.innerHTML = ""

    if (effect === "gradient") {
      // Create animated gradient background text
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full"

      const textElement = document.createElement("h2")
      textElement.className = "text-7xl md:text-8xl font-bold text-transparent bg-clip-text"
      textElement.style.backgroundImage = "linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6, #3b82f6, #10b981, #f59e0b)"
      textElement.style.backgroundSize = "600% 100%"
      textElement.textContent = "GRADIENT"

      wrapper.appendChild(textElement)
      container.appendChild(wrapper)

      // Animate the gradient
      gsap.to(textElement, {
        backgroundPosition: "-600% 0%",
        duration: 10,
        repeat: -1,
        ease: "linear",
      })
    } else if (effect === "particles") {
      // Create particle background text
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full overflow-hidden"

      // Create canvas for particles
      const canvas = document.createElement("canvas")
      canvas.className = "absolute inset-0 z-0"
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight

      // Create text element
      const textElement = document.createElement("h2")
      textElement.className = "text-7xl md:text-8xl font-bold relative z-10 mix-blend-difference"
      textElement.textContent = "PARTICLES"

      wrapper.appendChild(canvas)
      wrapper.appendChild(textElement)
      container.appendChild(wrapper)

      // Initialize particle system
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = []
        const particleCount = 50

        // Create particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          })
        }

        // Animation function
        function animateParticles() {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Update and draw particles
          for (let i = 0; i < particleCount; i++) {
            const p = particles[i]

            // Update position
            p.x += p.speedX
            p.y += p.speedY

            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

            // Draw particle
            ctx?.beginPath()
            ctx?.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = p.color
            ctx?.fill()
          }

          // Draw connections between nearby particles
          for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 100) {
                ctx?.beginPath()
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`
                ctx.lineWidth = 0.5
                ctx?.moveTo(particles[i].x, particles[i].y)
                ctx?.lineTo(particles[j].x, particles[j].y)
                ctx?.stroke()
              }
            }
          }

          requestAnimationFrame(animateParticles)
        }

        // Start animation
        animateParticles()
      }
    } else if (effect === "wave") {
      // Create wave background text using SVG
      container.innerHTML = `
        <div class="relative flex justify-center items-center h-full w-full overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <mask id="waveMask">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                      fontSize="80" fontWeight="bold" fill="white">
                  WAVES
                </text>
              </mask>
            </defs>
            
            <!-- Wave 1 -->
            <path class="wave wave1" fill="url(#waveGradient)" opacity="0.7" mask="url(#waveMask)"
                  d="M0,100 C150,160 350,0 500,100 C650,200 750,80 800,100 L800,200 L0,200 Z">
              <animate attributeName="d" 
                       values="M0,100 C150,160 350,0 500,100 C650,200 750,80 800,100 L800,200 L0,200 Z;
                               M0,100 C150,40 350,200 500,100 C650,0 750,120 800,100 L800,200 L0,200 Z;
                               M0,100 C150,160 350,0 500,100 C650,200 750,80 800,100 L800,200 L0,200 Z" 
                       dur="10s" repeatCount="indefinite" />
            </path>
            
            <!-- Wave 2 -->
            <path class="wave wave2" fill="url(#waveGradient)" opacity="0.5" mask="url(#waveMask)"
                  d="M0,120 C100,180 300,40 400,120 C500,200 700,80 800,120 L800,200 L0,200 Z">
              <animate attributeName="d" 
                       values="M0,120 C100,180 300,40 400,120 C500,200 700,80 800,120 L800,200 L0,200 Z;
                               M0,120 C100,60 300,220 400,120 C500,20 700,180 800,120 L800,200 L0,200 Z;
                               M0,120 C100,180 300,40 400,120 C500,200 700,80 800,120 L800,200 L0,200 Z" 
                       dur="8s" repeatCount="indefinite" />
            </path>
            
            <!-- Wave 3 -->
            <path class="wave wave3" fill="url(#waveGradient)" opacity="0.3" mask="url(#waveMask)"
                  d="M0,140 C200,200 250,60 500,140 C750,220 650,100 800,140 L800,200 L0,200 Z">
              <animate attributeName="d" 
                       values="M0,140 C200,200 250,60 500,140 C750,220 650,100 800,140 L800,200 L0,200 Z;
                               M0,140 C200,80 250,220 500,140 C750,60 650,180 800,140 L800,200 L0,200 Z;
                               M0,140 C200,200 250,60 500,140 C750,220 650,100 800,140 L800,200 L0,200 Z" 
                       dur="12s" repeatCount="indefinite" />
            </path>
          </svg>
          
          <h2 class="text-7xl md:text-8xl font-bold absolute z-10 text-white mix-blend-overlay">WAVES</h2>
        </div>
      `
    } else if (effect === "video") {
      // Create video background text
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full overflow-hidden"

      // Create text with video background
      const textContainer = document.createElement("div")
      textContainer.className = "relative"

      const textElement = document.createElement("h2")
      textElement.className = "text-7xl md:text-8xl font-bold text-transparent bg-clip-text relative z-10"
      textElement.style.backgroundImage = "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))"
      textElement.textContent = "VIDEO"

      // Create canvas for dynamic background
      const canvas = document.createElement("canvas")
      canvas.className = "absolute inset-0 -z-10"
      canvas.width = 500
      canvas.height = 200

      textContainer.appendChild(canvas)
      textContainer.appendChild(textElement)
      wrapper.appendChild(textContainer)
      container.appendChild(wrapper)

      // Initialize canvas animation
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Create a dynamic pattern that looks like TV static or noise
        function drawNoise() {
          const imageData = ctx.createImageData(canvas.width, canvas.height)
          const data = imageData.data

          for (let i = 0; i < data.length; i += 4) {
            const value = Math.floor(Math.random() * 255)
            data[i] = value // red
            data[i + 1] = value // green
            data[i + 2] = value // blue
            data[i + 3] = 50 // alpha
          }

          ctx?.putImageData(imageData, 0, 0)
          requestAnimationFrame(drawNoise)
        }

        // Start animation
        drawNoise()
      }
    }
  }, [effect])

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="h-40 md:h-48 w-full flex items-center justify-center mb-8 overflow-hidden">
        {/* Content will be dynamically generated */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={effect === "gradient" ? "default" : "outline"} onClick={() => setEffect("gradient")}>
          Gradient
        </Button>
        <Button variant={effect === "particles" ? "default" : "outline"} onClick={() => setEffect("particles")}>
          Particles
        </Button>
        <Button variant={effect === "wave" ? "default" : "outline"} onClick={() => setEffect("wave")}>
          Waves
        </Button>
        <Button variant={effect === "video" ? "default" : "outline"} onClick={() => setEffect("video")}>
          Video/Noise
        </Button>
      </div>
    </div>
  )
}

