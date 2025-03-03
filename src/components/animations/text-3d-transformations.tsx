"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export default function Text3DTransformations() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [effect, setEffect] = useState<"rotate" | "perspective" | "layers" | "fold">("rotate")

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Clear previous content
    container.innerHTML = ""

    if (effect === "rotate") {
      // Create 3D rotating text
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full perspective-[1000px]"

      const textElement = document.createElement("h2")
      textElement.className = "text-6xl md:text-7xl font-bold transform-style-3d"
      textElement.textContent = "3D TEXT"
      textElement.style.transformStyle = "preserve-3d"

      wrapper.appendChild(textElement)
      container.appendChild(wrapper)

      // Animate the 3D rotation
      gsap.to(textElement, {
        rotationY: 360,
        duration: 6,
        repeat: -1,
        ease: "linear",
      })
    } else if (effect === "perspective") {
      // Create perspective text effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full perspective-[1000px]"

      // Create characters with individual perspective
      const text = "DEPTH"
      text.split("").forEach((char, index) => {
        const charEl = document.createElement("span")
        charEl.className = "inline-block text-6xl md:text-7xl font-bold mx-1"
        charEl.textContent = char
        charEl.style.transformStyle = "preserve-3d"

        wrapper.appendChild(charEl)

        // Animate each character with different perspective
        gsap.to(charEl, {
          rotateX: () => Math.sin(index * 0.5) * 40,
          rotateY: () => Math.cos(index * 0.5) * 40,
          z: () => Math.sin(index) * 50,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        })
      })

      container.appendChild(wrapper)
    } else if (effect === "layers") {
      // Create layered 3D text effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full perspective-[1000px]"

      // Create multiple layers of the same text
      const text = "LAYERS"
      const layers = 10

      for (let i = 0; i < layers; i++) {
        const layerEl = document.createElement("div")
        layerEl.className = "absolute text-6xl md:text-7xl font-bold"
        layerEl.textContent = text
        layerEl.style.color = i === 0 ? "white" : `rgba(255, 255, 255, ${0.8 - (i / layers) * 0.8})`
        layerEl.style.transformStyle = "preserve-3d"
        layerEl.style.transform = `translateZ(${-i * 5}px)`

        wrapper.appendChild(layerEl)
      }

      container.appendChild(wrapper)

      // Animate the entire stack
      gsap.to(wrapper, {
        rotateY: 20,
        rotateX: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    } else if (effect === "fold") {
      // Create folding text effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full perspective-[1000px]"

      // Create text that folds like a book or accordion
      const text = "FOLDING"

      text.split("").forEach((char, index) => {
        const charEl = document.createElement("span")
        charEl.className = "inline-block text-6xl md:text-7xl font-bold origin-bottom"
        charEl.textContent = char
        charEl.style.transformStyle = "preserve-3d"

        wrapper.appendChild(charEl)

        // Set initial state
        gsap.set(charEl, {
          rotateX: 0,
        })

        // Create folding animation
        gsap.to(charEl, {
          rotateX: -90,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.1,
        })
      })

      container.appendChild(wrapper)
    }
  }, [effect])

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="h-40 md:h-48 w-full flex items-center justify-center mb-8 overflow-hidden">
        {/* Content will be dynamically generated */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={effect === "rotate" ? "default" : "outline"} onClick={() => setEffect("rotate")}>
          3D Rotation
        </Button>
        <Button variant={effect === "perspective" ? "default" : "outline"} onClick={() => setEffect("perspective")}>
          Perspective
        </Button>
        <Button variant={effect === "layers" ? "default" : "outline"} onClick={() => setEffect("layers")}>
          Layered Depth
        </Button>
        <Button variant={effect === "fold" ? "default" : "outline"} onClick={() => setEffect("fold")}>
          Folding
        </Button>
      </div>
    </div>
  )
}

