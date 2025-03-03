"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export default function TextMasking() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [effect, setEffect] = useState<"gradient" | "shape" | "line" | "image">("gradient")

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Clear previous content
    container.innerHTML = ""

    if (effect === "gradient") {
      // Create gradient mask effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full"

      const textElement = document.createElement("h2")
      textElement.className = "text-7xl md:text-8xl font-bold text-transparent bg-clip-text"
      textElement.style.backgroundImage = "linear-gradient(90deg, #f59e0b, #ef4444, #8b5cf6, #3b82f6)"
      textElement.style.backgroundSize = "200% 100%"
      textElement.textContent = "MASKED"

      wrapper.appendChild(textElement)
      container.appendChild(wrapper)

      // Animate the gradient
      gsap.to(textElement, {
        backgroundPosition: "-200% 0%",
        duration: 4,
        repeat: -1,
        ease: "linear",
      })
    } else if (effect === "shape") {
      // Create SVG shape mask effect
      container.innerHTML = `
        <div class="relative flex justify-center items-center h-full w-full">
          <svg width="500" height="150" viewBox="0 0 500 150" class="overflow-visible">
            <defs>
              <mask id="textMask">
                <rect width="100%" height="100%" fill="white" />
                <circle cx="250" cy="75" r="20" fill="black">
                  <animate attributeName="r" values="20;150;20" dur="4s" repeatCount="indefinite" />
                </circle>
              </mask>
            </defs>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                  fontSize="80" fontWeight="bold" fill="white" mask="url(#textMask)">
              REVEALED
            </text>
          </svg>
        </div>
      `
    } else if (effect === "line") {
      // Create line drawing mask effect
      container.innerHTML = `
        <div class="relative flex justify-center items-center h-full w-full">
          <svg width="500" height="150" viewBox="0 0 500 150" class="overflow-visible">
            <defs>
              <mask id="lineMask">
                <rect width="100%" height="100%" fill="black" />
                <line x1="0" y1="75" x2="0" y2="75" stroke="white" strokeWidth="150">
                  <animate attributeName="x2" values="0;500" dur="2s" fill="freeze" />
                </line>
              </mask>
            </defs>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                  fontSize="80" fontWeight="bold" fill="white" mask="url(#lineMask)">
              UNVEILED
            </text>
          </svg>
        </div>
      `

      // Restart the animation when switching to this effect
      const svgElement = container.querySelector("svg")
      if (svgElement) {
        svgElement.innerHTML = svgElement.innerHTML
      }
    } else if (effect === "image") {
      // Create image mask effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full overflow-hidden"

      // Create the text element that will be masked
      const textElement = document.createElement("h2")
      textElement.className = "text-7xl md:text-8xl font-bold relative z-10"
      textElement.textContent = "TEXTURED"
      textElement.style.color = "transparent"
      textElement.style.webkitTextStroke = "2px white"
      textElement.style.backgroundClip = "text"
      textElement.style.webkitBackgroundClip = "text"

      // Create a div for the animated background
      const bgElement = document.createElement("div")
      bgElement.className = "absolute inset-0 z-0"
      bgElement.style.backgroundImage = "url('/placeholder.svg?height=400&width=800')"
      bgElement.style.backgroundSize = "cover"
      bgElement.style.filter = "hue-rotate(0deg)"

      // Create a mask container
      const maskContainer = document.createElement("div")
      maskContainer.className = "absolute inset-0 z-20 mix-blend-screen"
      maskContainer.style.clipPath = "url(#textPath)"

      // Create a colorful background for the mask
      const colorBg = document.createElement("div")
      colorBg.className = "w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"

      maskContainer.appendChild(colorBg)
      wrapper.appendChild(bgElement)
      wrapper.appendChild(textElement)
      wrapper.appendChild(maskContainer)
      container.appendChild(wrapper)

      // Add SVG definitions for the clip path
      const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svgDefs.style.position = "absolute"
      svgDefs.style.width = "0"
      svgDefs.style.height = "0"
      svgDefs.innerHTML = `
        <defs>
          <clipPath id="textPath">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                  fontSize="80" fontWeight="bold">TEXTURED</text>
          </clipPath>
        </defs>
      `
      wrapper.appendChild(svgDefs)

      // Animate the background
      gsap.to(bgElement, {
        backgroundPosition: "100% 100%",
        filter: "hue-rotate(360deg)",
        duration: 10,
        repeat: -1,
        ease: "linear",
      })

      // Animate the mask color
      gsap.to(colorBg, {
        backgroundPosition: "100% 0%",
        duration: 3,
        repeat: -1,
        ease: "linear",
      })
    }
  }, [effect])

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="h-40 md:h-48 w-full flex items-center justify-center mb-8 overflow-hidden">
        {/* Content will be dynamically generated */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={effect === "gradient" ? "default" : "outline"} onClick={() => setEffect("gradient")}>
          Gradient Mask
        </Button>
        <Button variant={effect === "shape" ? "default" : "outline"} onClick={() => setEffect("shape")}>
          Shape Reveal
        </Button>
        <Button variant={effect === "line" ? "default" : "outline"} onClick={() => setEffect("line")}>
          Line Mask
        </Button>
        <Button variant={effect === "image" ? "default" : "outline"} onClick={() => setEffect("image")}>
          Texture Mask
        </Button>
      </div>
    </div>
  )
}

