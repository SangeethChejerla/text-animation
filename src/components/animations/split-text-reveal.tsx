"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export default function SplitTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationType, setAnimationType] = useState<"chars" | "words" | "lines">("chars")
  const [direction, setDirection] = useState<"from-left" | "from-right" | "from-top" | "from-bottom" | "random">(
    "from-left",
  )

  const text = "Split Text Reveals"
  const subtext = "Professional staggered animations"

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing animations
    gsap.killTweensOf(containerRef.current.querySelectorAll(".char, .word, .line"))

    const container = containerRef.current
    let elements: HTMLElement[] = []

    // Reset the container
    container.innerHTML = ""

    // Create main heading
    const heading = document.createElement("h2")
    heading.className = "text-4xl md:text-5xl font-bold mb-2"

    // Create subheading
    const subheading = document.createElement("p")
    subheading.className = "text-xl md:text-2xl text-zinc-400"

    // Split text based on animation type
    if (animationType === "chars") {
      // Split main text into characters
      text.split("").forEach((char) => {
        const span = document.createElement("span")
        span.className = "char inline-block"
        span.textContent = char === " " ? "\u00A0" : char
        heading.appendChild(span)
      })

      // Split subtext into characters
      subtext.split("").forEach((char) => {
        const span = document.createElement("span")
        span.className = "char inline-block"
        span.textContent = char === " " ? "\u00A0" : char
        subheading.appendChild(span)
      })

      elements = [
        ...Array.from(heading.querySelectorAll(".char")),
        ...Array.from(subheading.querySelectorAll(".char")),
      ] as HTMLElement[]
    } else if (animationType === "words") {
      // Split main text into words
      text.split(" ").forEach((word) => {
        const span = document.createElement("span")
        span.className = "word inline-block mr-2"
        span.textContent = word
        heading.appendChild(span)
      })

      // Split subtext into words
      subtext.split(" ").forEach((word) => {
        const span = document.createElement("span")
        span.className = "word inline-block mr-2"
        span.textContent = word
        subheading.appendChild(span)
      })

      elements = [
        ...Array.from(heading.querySelectorAll(".word")),
        ...Array.from(subheading.querySelectorAll(".word")),
      ] as HTMLElement[]
    } else if (animationType === "lines") {
      // For lines, we'll just create two lines (heading and subheading)
      const line1 = document.createElement("span")
      line1.className = "line block"
      line1.textContent = text
      heading.appendChild(line1)

      const line2 = document.createElement("span")
      line2.className = "line block"
      line2.textContent = subtext
      subheading.appendChild(line2)

      elements = [
        ...Array.from(heading.querySelectorAll(".line")),
        ...Array.from(subheading.querySelectorAll(".line")),
      ] as HTMLElement[]
    }

    container.appendChild(heading)
    container.appendChild(subheading)

    // Set initial state based on direction
    elements.forEach((el) => {
      gsap.set(el, {
        opacity: 0,
        y: direction === "from-top" ? -50 : direction === "from-bottom" ? 50 : 0,
        x: direction === "from-left" ? -50 : direction === "from-right" ? 50 : 0,
      })
    })

    // Animate elements
    gsap.to(elements, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      x: 0,
      stagger:
        direction === "random"
          ? {
              each: 0.05,
              from: "random",
            }
          : {
              each: 0.05,
              from: direction === "from-right" || direction === "from-bottom" ? "end" : "start",
            },
      ease: "power3.out",
    })
  }, [animationType, direction])

  const replay = () => {
    // Re-trigger the effect
    const currentType = animationType
    setAnimationType("chars")
    setTimeout(() => setAnimationType(currentType), 10)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={containerRef}
        className="text-center mb-8 h-24 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Content will be dynamically generated */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <Button variant={animationType === "chars" ? "default" : "outline"} onClick={() => setAnimationType("chars")}>
          Characters
        </Button>
        <Button variant={animationType === "words" ? "default" : "outline"} onClick={() => setAnimationType("words")}>
          Words
        </Button>
        <Button variant={animationType === "lines" ? "default" : "outline"} onClick={() => setAnimationType("lines")}>
          Lines
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <Button
          variant={direction === "from-left" ? "default" : "outline"}
          onClick={() => setDirection("from-left")}
          size="sm"
        >
          From Left
        </Button>
        <Button
          variant={direction === "from-right" ? "default" : "outline"}
          onClick={() => setDirection("from-right")}
          size="sm"
        >
          From Right
        </Button>
        <Button
          variant={direction === "from-top" ? "default" : "outline"}
          onClick={() => setDirection("from-top")}
          size="sm"
        >
          From Top
        </Button>
        <Button
          variant={direction === "from-bottom" ? "default" : "outline"}
          onClick={() => setDirection("from-bottom")}
          size="sm"
        >
          From Bottom
        </Button>
        <Button
          variant={direction === "random" ? "default" : "outline"}
          onClick={() => setDirection("random")}
          size="sm"
        >
          Random
        </Button>
      </div>

      <Button onClick={replay}>Replay Animation</Button>
    </div>
  )
}

