"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export default function KineticTypography() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [effect, setEffect] = useState<"pulse" | "wave" | "explosion" | "bounce">("pulse")

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const text = "KINETIC"

    // Clear previous content
    container.innerHTML = ""

    // Create wrapper for the text
    const wrapper = document.createElement("div")
    wrapper.className = "relative flex justify-center items-center h-full w-full"

    // Split text into characters
    text.split("").forEach((char, index) => {
      const charEl = document.createElement("div")
      charEl.className = "char relative inline-block text-6xl md:text-8xl font-bold mx-1"
      charEl.textContent = char
      charEl.dataset.index = index.toString()
      wrapper.appendChild(charEl)
    })

    container.appendChild(wrapper)

    // Get all character elements
    const chars = container.querySelectorAll(".char")

    // Kill any existing animations
    gsap.killTweensOf(chars)

    // Reset positions
    gsap.set(chars, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      color: "white",
    })

    // Apply the selected effect
    if (effect === "pulse") {
      // Pulsing effect with color changes
      chars.forEach((char, i) => {
        gsap.to(char, {
          scale: 1.4,
          color: "#3b82f6",
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: i * 0.1,
        })
      })
    } else if (effect === "wave") {
      // Wave effect
      chars.forEach((char, i) => {
        gsap.to(char, {
          y: -30,
          rotation: 10,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        })
      })
    } else if (effect === "explosion") {
      // Explosion effect
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })

      // Initial state
      gsap.set(chars, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
      })

      // Gather together
      tl.to(chars, {
        scale: 0.5,
        duration: 0.5,
        ease: "back.in(1.7)",
        x: 0,
        y: 0,
      })

      // Explode outward
      tl.to(chars, {
        scale: 1.5,
        opacity: 0.7,
        duration: 0.7,
        ease: "power4.out",
        x: (i) => (Math.random() - 0.5) * 150,
        y: (i) => (Math.random() - 0.5) * 150,
        rotation: () => (Math.random() - 0.5) * 90,
        stagger: {
          each: 0.02,
          from: "center",
        },
      })

      // Return to normal
      tl.to(chars, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
        stagger: {
          each: 0.03,
          from: "random",
        },
      })
    } else if (effect === "bounce") {
      // Bounce effect
      chars.forEach((char, i) => {
        gsap.to(char, {
          y: -40,
          ease: "power1.inOut",
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          delay: i * 0.1,
        })

        // Squash effect at the bottom
        gsap.to(char, {
          scaleY: 0.8,
          scaleX: 1.2,
          ease: "power1.inOut",
          duration: 0.2,
          repeat: -1,
          yoyo: true,
          delay: i * 0.1 + 0.2,
        })
      })
    }
  }, [effect])

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="h-40 md:h-48 w-full flex items-center justify-center mb-8 overflow-hidden">
        {/* Content will be dynamically generated */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={effect === "pulse" ? "default" : "outline"} onClick={() => setEffect("pulse")}>
          Pulse
        </Button>
        <Button variant={effect === "wave" ? "default" : "outline"} onClick={() => setEffect("wave")}>
          Wave
        </Button>
        <Button variant={effect === "explosion" ? "default" : "outline"} onClick={() => setEffect("explosion")}>
          Explosion
        </Button>
        <Button variant={effect === "bounce" ? "default" : "outline"} onClick={() => setEffect("bounce")}>
          Bounce
        </Button>
      </div>
    </div>
  )
}

