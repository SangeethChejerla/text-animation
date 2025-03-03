"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollTriggeredText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [effect, setEffect] = useState<"reveal" | "parallax" | "scrub" | "pin">("reveal")

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Clear previous content and kill any active ScrollTriggers
    container.innerHTML = ""
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Create a scrollable container to demonstrate scroll effects
    const scrollContainer = document.createElement("div")
    scrollContainer.className = "h-[400px] overflow-y-auto p-4 bg-zinc-800 rounded-lg"
    scrollContainer.style.scrollbarWidth = "thin"
    scrollContainer.style.scrollbarColor = "#4b5563 #1f2937"

    // Add content based on selected effect
    if (effect === "reveal") {
      // Create scroll reveal effect
      scrollContainer.innerHTML = `
        <div class="h-[200px] flex items-center justify-center mb-8">
          <p class="text-zinc-500">↓ Scroll Down ↓</p>
        </div>
        
        <div class="reveal-section mb-8 opacity-0 transform translate-y-10">
          <h3 class="text-3xl font-bold mb-2">Scroll Reveal</h3>
          <p class="text-zinc-300">This text reveals as you scroll down.</p>
        </div>
        
        <div class="reveal-section mb-8 opacity-0 transform translate-y-10">
          <h3 class="text-3xl font-bold mb-2">Staggered Reveal</h3>
          <p class="text-zinc-300">Elements can reveal one after another.</p>
        </div>
        
        <div class="reveal-section mb-8 opacity-0 transform translate-y-10">
          <h3 class="text-3xl font-bold mb-2">Fade In</h3>
          <p class="text-zinc-300">With custom easing and timing.</p>
        </div>
        
        <div class="h-[100px]"></div>
      `

      // Set up scroll triggers
      const sections = scrollContainer.querySelectorAll(".reveal-section")

      sections.forEach((section, index) => {
        gsap.to(section, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            scroller: scrollContainer,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        })
      })
    } else if (effect === "parallax") {
      // Create parallax scroll effect
      scrollContainer.innerHTML = `
        <div class="h-[200px] flex items-center justify-center mb-8">
          <p class="text-zinc-500">↓ Scroll Down ↓</p>
        </div>
        
        <div class="parallax-container relative h-[300px] mb-8 overflow-hidden rounded-lg">
          <div class="parallax-bg absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
          <div class="parallax-text absolute inset-0 flex items-center justify-center">
            <h2 class="text-5xl font-bold text-white">Parallax</h2>
          </div>
        </div>
        
        <div class="parallax-container relative h-[300px] mb-8 overflow-hidden rounded-lg">
          <div class="parallax-bg absolute inset-0 bg-gradient-to-br from-red-600 to-yellow-600"></div>
          <div class="parallax-text absolute inset-0 flex items-center justify-center">
            <h2 class="text-5xl font-bold text-white">Scrolling</h2>
          </div>
        </div>
        
        <div class="parallax-container relative h-[300px] mb-8 overflow-hidden rounded-lg">
          <div class="parallax-bg absolute inset-0 bg-gradient-to-br from-green-600 to-teal-600"></div>
          <div class="parallax-text absolute inset-0 flex items-center justify-center">
            <h2 class="text-5xl font-bold text-white">Effect</h2>
          </div>
        </div>
        
        <div class="h-[100px]"></div>
      `

      // Set up parallax effects
      const containers = scrollContainer.querySelectorAll(".parallax-container")

      containers.forEach((container) => {
        const bg = container.querySelector(".parallax-bg")
        const text = container.querySelector(".parallax-text")

        if (bg && text) {
          // Background moves slower than scroll
          gsap.to(bg, {
            y: 100,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              scroller: scrollContainer,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })

          // Text moves faster than scroll (opposite direction)
          gsap.to(text, {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              scroller: scrollContainer,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        }
      })
    } else if (effect === "scrub") {
      // Create scrubbing text effect
      scrollContainer.innerHTML = `
        <div class="h-[200px] flex items-center justify-center mb-8">
          <p class="text-zinc-500">↓ Scroll Down ↓</p>
        </div>
        
        <div class="scrub-container relative h-[400px] mb-8 overflow-hidden">
          <div class="scrub-progress h-1 bg-blue-500 w-0 mb-8"></div>
          
          <div class="scrub-text-container relative h-[100px] flex items-center justify-center overflow-hidden">
            <h2 class="scrub-text text-6xl font-bold">SCRUBBING</h2>
          </div>
          
          <div class="scrub-chars-container relative h-[100px] flex items-center justify-center mt-8">
            <div class="flex">
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">S</span>
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">C</span>
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">R</span>
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">U</span>
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">B</span>
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">B</span>
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">I</span>
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">N</span>
              <span class="scrub-char text-5xl font-bold inline-block mx-1 opacity-0">G</span>
            </div>
          </div>
        </div>
        
        <div class="h-[300px]"></div>
      `

      // Set up scrubbing animations
      const scrubContainer = scrollContainer.querySelector(".scrub-container")
      const progressBar = scrollContainer.querySelector(".scrub-progress")
      const scrubText = scrollContainer.querySelector(".scrub-text")
      const scrubChars = scrollContainer.querySelectorAll(".scrub-char")

      if (scrubContainer && progressBar && scrubText && scrubChars.length) {
        // Progress bar animation
        gsap.to(progressBar, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: scrubContainer,
            scroller: scrollContainer,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        })

        // Main text animation
        gsap.fromTo(
          scrubText,
          { x: -300, opacity: 0 },
          {
            x: 300,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scrubContainer,
              scroller: scrollContainer,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            },
          },
        )

        // Character-by-character animation
        scrubChars.forEach((char, index) => {
          gsap.to(char, {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: scrubContainer,
              scroller: scrollContainer,
              start: `top ${80 - index * 5}%`,
              end: `top ${40 - index * 5}%`,
              scrub: true,
            },
          })
        })
      }
    } else if (effect === "pin") {
      // Create pin and reveal effect
      scrollContainer.innerHTML = `
        <div class="h-[200px] flex items-center justify-center">
          <p class="text-zinc-500">↓ Scroll Down ↓</p>
        </div>
        
        <div class="pin-section relative h-[100px] mb-8">
          <div class="pin-content flex items-center justify-center h-full">
            <h2 class="text-4xl font-bold">Pinned Section</h2>
          </div>
        </div>
        
        <div class="reveal-panel mb-4 p-4 bg-zinc-700 rounded-lg opacity-0">
          <h3 class="text-xl font-bold">First Panel</h3>
          <p>This content reveals while the header stays pinned.</p>
        </div>
        
        <div class="reveal-panel mb-4 p-4 bg-zinc-700 rounded-lg opacity-0">
          <h3 class="text-xl font-bold">Second Panel</h3>
          <p>Scroll-based storytelling is effective for engagement.</p>
        </div>
        
        <div class="reveal-panel mb-4 p-4 bg-zinc-700 rounded-lg opacity-0">
          <h3 class="text-xl font-bold">Third Panel</h3>
          <p>Each panel can trigger different animations.</p>
        </div>
        
        <div class="h-[200px]"></div>
      `

      // Set up pin and reveal animations
      const pinSection = scrollContainer.querySelector(".pin-section")
      const pinContent = scrollContainer.querySelector(".pin-content")
      const panels = scrollContainer.querySelectorAll(".reveal-panel")

      if (pinSection && pinContent && panels.length) {
        // Pin the header
        ScrollTrigger.create({
          trigger: pinSection,
          scroller: scrollContainer,
          start: "top 20%",
          end: "bottom top-=300",
          pin: true,
          pinSpacing: false,
        })

        // Reveal panels one by one
        panels.forEach((panel, index) => {
          gsap.to(panel, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: panel,
              scroller: scrollContainer,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          })
        })
      }
    }

    container.appendChild(scrollContainer)
  }, [effect])

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="w-full mb-4">
        {/* Content will be dynamically generated */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={effect === "reveal" ? "default" : "outline"} onClick={() => setEffect("reveal")}>
          Scroll Reveal
        </Button>
        <Button variant={effect === "parallax" ? "default" : "outline"} onClick={() => setEffect("parallax")}>
          Parallax
        </Button>
        <Button variant={effect === "scrub" ? "default" : "outline"} onClick={() => setEffect("scrub")}>
          Scrubbing
        </Button>
        <Button variant={effect === "pin" ? "default" : "outline"} onClick={() => setEffect("pin")}>
          Pin & Reveal
        </Button>
      </div>
    </div>
  )
}

