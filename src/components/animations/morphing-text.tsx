"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export default function MorphingText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [effect, setEffect] = useState<"basic" | "liquid" | "glitch" | "elastic">("basic")
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Clear previous content and animations
    container.innerHTML = ""
    gsap.killTweensOf("*")

    if (effect === "basic") {
      // Create basic morphing text effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full"

      const words = ["MORPHING", "CHANGING", "SHIFTING", "TRANSFORMING"]

      const textElement = document.createElement("h2")
      textElement.className = "text-6xl md:text-7xl font-bold"
      textElement.textContent = words[0]

      wrapper.appendChild(textElement)
      container.appendChild(wrapper)

      if (isAnimating) {
        // Create the morphing animation
        let currentIndex = 0

        const morphInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % words.length

          // Fade out
          gsap.to(textElement, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              // Change text
              textElement.textContent = words[currentIndex]

              // Fade in
              gsap.to(textElement, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              })
            },
          })
        }, 2000)

        // Clean up interval on component unmount or effect change
        return () => clearInterval(morphInterval)
      }
    } else if (effect === "liquid") {
      // Create liquid morphing text effect using SVG
      container.innerHTML = `
        <div class="relative flex justify-center items-center h-full w-full">
          <svg width="500" height="150" viewBox="0 0 500 150">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                  fontSize="70" fontWeight="bold" fill="white" class="liquid-text">
              LIQUID
            </text>
            <filter id="liquidFilter">
              <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="3" result="turbulence" />
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
        </div>
      `

      const textElement = container.querySelector(".liquid-text")

      if (textElement && isAnimating) {
        // Animate the liquid effect
        gsap.to(textElement, {
          attr: { filter: "url(#liquidFilter)" },
          duration: 0.1,
          repeat: -1,
        })

        // Animate the turbulence
        const turbulence = container.querySelector("feTurbulence")
        if (turbulence) {
          gsap.to(turbulence, {
            attr: { baseFrequency: "0.03" },
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        }
      }
    } else if (effect === "glitch") {
      // Create glitch morphing text effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full"

      // Main text
      const textElement = document.createElement("h2")
      textElement.className = "text-6xl md:text-7xl font-bold relative"
      textElement.textContent = "GLITCH"

      // Glitch layers
      const glitchBefore = document.createElement("h2")
      glitchBefore.className = "text-6xl md:text-7xl font-bold absolute top-0 left-0 text-red-500 opacity-70"
      glitchBefore.textContent = "GLITCH"
      glitchBefore.style.clipPath = "polygon(0 0, 100% 0, 100% 45%, 0 45%)"
      glitchBefore.style.transform = "translateX(-5px)"

      const glitchAfter = document.createElement("h2")
      glitchAfter.className = "text-6xl md:text-7xl font-bold absolute top-0 left-0 text-blue-500 opacity-70"
      glitchAfter.textContent = "GLITCH"
      glitchAfter.style.clipPath = "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)"
      glitchAfter.style.transform = "translateX(5px)"

      wrapper.appendChild(glitchBefore)
      wrapper.appendChild(textElement)
      wrapper.appendChild(glitchAfter)
      container.appendChild(wrapper)

      if (isAnimating) {
        // Animate the glitch effect
        const glitchTimeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 2,
        })

        for (let i = 0; i < 10; i++) {
          // Random glitch movements
          glitchTimeline.to([glitchBefore, glitchAfter], {
            x: () => (Math.random() - 0.5) * 20,
            y: () => (Math.random() - 0.5) * 5,
            skewX: () => (Math.random() - 0.5) * 10,
            duration: 0.1,
            ease: "power4.inOut",
          })
        }

        // Return to normal
        glitchTimeline.to([glitchBefore, glitchAfter], {
          x: 0,
          y: 0,
          skewX: 0,
          duration: 0.5,
          ease: "power4.out",
        })
      }
    } else if (effect === "elastic") {
      // Create elastic morphing text effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full"

      const words = ["STRETCH", "ELASTIC", "BOUNCE", "SPRING"]

      const textElement = document.createElement("h2")
      textElement.className = "text-6xl md:text-7xl font-bold"
      textElement.textContent = words[0]

      wrapper.appendChild(textElement)
      container.appendChild(wrapper)

      if (isAnimating) {
        // Create the elastic morphing animation
        let currentIndex = 0

        const morphInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % words.length

          // Stretch out
          gsap.to(textElement, {
            scaleX: 1.5,
            scaleY: 0.7,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              // Change text
              textElement.textContent = words[currentIndex]

              // Bounce back with elastic effect
              gsap.to(textElement, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
              })
            },
          })
        }, 2500)

        // Clean up interval on component unmount or effect change
        return () => clearInterval(morphInterval)
      }
    }
  }, [effect, isAnimating])

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="h-40 md:h-48 w-full flex items-center justify-center mb-8 overflow-hidden">
        {/* Content will be dynamically generated */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <Button variant={effect === "basic" ? "default" : "outline"} onClick={() => setEffect("basic")}>
          Basic Morph
        </Button>
        <Button variant={effect === "liquid" ? "default" : "outline"} onClick={() => setEffect("liquid")}>
          Liquid
        </Button>
        <Button variant={effect === "glitch" ? "default" : "outline"} onClick={() => setEffect("glitch")}>
          Glitch
        </Button>
        <Button variant={effect === "elastic" ? "default" : "outline"} onClick={() => setEffect("elastic")}>
          Elastic
        </Button>
      </div>

      <Button variant={isAnimating ? "default" : "outline"} onClick={() => setIsAnimating(!isAnimating)}>
        {isAnimating ? "Pause Animation" : "Start Animation"}
      </Button>
    </div>
  )
}

