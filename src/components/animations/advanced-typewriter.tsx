"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"


export default function AdvancedTypewriter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [effect, setEffect] = useState<"handwriting" | "typewriter" | "code" | "erasing">("handwriting")

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Clear previous content
    container.innerHTML = ""

    if (effect === "handwriting") {
      // Create SVG handwriting effect
      container.innerHTML = `
        <div class="relative flex justify-center items-center h-full w-full">
          <svg width="500" height="150" viewBox="0 0 500 150">
            <path id="handwritingPath" 
                  d="M 50,75 Q 100,25 150,75 T 250,75 T 350,75 T 450,75" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="0 1000"
                  strokeDashoffset="0">
              <animate attributeName="stroke-dasharray" 
                       from="0 1000" 
                       to="1000 0" 
                       dur="4s" 
                       begin="0s" 
                       fill="freeze" />
            </path>
            
            <text>
              <textPath href="#handwritingPath" startOffset="0%" fontSize="60" fontFamily="cursive" fill="white">
                Handwriting
              </textPath>
            </text>
          </svg>
        </div>
      `
    } else if (effect === "typewriter") {
      // Create advanced typewriter effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full"

      const textElement = document.createElement("h2")
      textElement.className = "text-5xl md:text-6xl font-mono relative"

      // Create cursor element
      const cursor = document.createElement("span")
      cursor.className = "absolute h-12 w-0.5 bg-white animate-pulse"
      cursor.style.right = "-10px"
      cursor.style.top = "10px"

      wrapper.appendChild(textElement)
      wrapper.appendChild(cursor)
      container.appendChild(wrapper)

      // Text to type
      const fullText = "Typewriter Effect"
      let currentIndex = 0

      // Typing function with variable speed
      function typeNextChar() {
        if (currentIndex < fullText.length) {
          // Add next character
          textElement.textContent += fullText[currentIndex]
          currentIndex++

          // Random typing speed for realism
          const typingSpeed = Math.random() * 100 + 50

          // Position cursor
          cursor.style.left = `${textElement.offsetWidth + 4}px`

          // Type next character
          setTimeout(typeNextChar, typingSpeed)
        } else {
          // When done, wait and restart
          setTimeout(() => {
            textElement.textContent = ""
            currentIndex = 0
            typeNextChar()
          }, 2000)
        }
      }

      // Start typing
      typeNextChar()
    } else if (effect === "code") {
      // Create code typing effect with syntax highlighting
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full"

      const codeBlock = document.createElement("pre")
      codeBlock.className = "text-left text-sm md:text-base font-mono bg-zinc-800 p-4 rounded-md w-full max-w-md"

      // Create cursor element
      const cursor = document.createElement("span")
      cursor.className = "inline-block h-5 w-0.5 bg-white animate-pulse"

      wrapper.appendChild(codeBlock)
      container.appendChild(wrapper)

      // Code to type
      const codeLines = [
        '<span class="text-blue-400">function</span> <span class="text-yellow-300">animate</span>() {',
        '  <span class="text-purple-400">const</span> text = <span class="text-green-400">"Hello World"</span>;',
        '  <span class="text-blue-400">return</span> text;',
        "}",
      ]

      let currentLineIndex = 0
      let currentCharIndex = 0
      let currentLine = document.createElement("div")
      codeBlock.appendChild(currentLine)

      // Typing function
      function typeCode() {
        if (currentLineIndex < codeLines.length) {
          const line = codeLines[currentLineIndex]

          if (currentCharIndex === 0) {
            // Start new line
            currentLine.innerHTML = ""
          }

          if (currentCharIndex < line.length) {
            // Add next character
            currentLine.innerHTML += line[currentCharIndex]
            currentCharIndex++

            // Random typing speed
            const typingSpeed = Math.random() * 50 + 30
            setTimeout(typeCode, typingSpeed)
          } else {
            // Line complete, move to next line
            currentLineIndex++
            currentCharIndex = 0

            if (currentLineIndex < codeLines.length) {
              currentLine = document.createElement("div")
              codeBlock.appendChild(currentLine)

              // Pause between lines
              setTimeout(typeCode, 400)
            } else {
              // All done, restart after delay
              setTimeout(() => {
                codeBlock.innerHTML = ""
                currentLineIndex = 0
                currentCharIndex = 0
                currentLine = document.createElement("div")
                codeBlock.appendChild(currentLine)
                typeCode()
              }, 3000)
            }
          }
        }
      }

      // Start typing
      typeCode()
    } else if (effect === "erasing") {
      // Create typing and erasing effect
      const wrapper = document.createElement("div")
      wrapper.className = "relative flex justify-center items-center h-full w-full"

      const textElement = document.createElement("h2")
      textElement.className = "text-5xl md:text-6xl font-mono"

      // Create cursor element
      const cursor = document.createElement("span")
      cursor.className = "inline-block h-12 w-0.5 bg-white animate-pulse ml-1"

      wrapper.appendChild(textElement)
      wrapper.appendChild(cursor)
      container.appendChild(wrapper)

      // Words to cycle through
      const words = ["Type", "Erase", "Repeat", "Animate"]
      let currentWordIndex = 0
      let isTyping = true
      let currentText = ""

      // Typing function
      function updateText() {
        const currentWord = words[currentWordIndex]

        if (isTyping) {
          // Typing phase
          if (currentText.length < currentWord.length) {
            currentText = currentWord.substring(0, currentText.length + 1)
            textElement.textContent = currentText

            setTimeout(updateText, Math.random() * 100 + 50)
          } else {
            // Word complete, pause before erasing
            isTyping = false
            setTimeout(updateText, 1500)
          }
        } else {
          // Erasing phase
          if (currentText.length > 0) {
            currentText = currentText.substring(0, currentText.length - 1)
            textElement.textContent = currentText

            setTimeout(updateText, Math.random() * 50 + 30)
          } else {
            // Word erased, move to next word
            isTyping = true
            currentWordIndex = (currentWordIndex + 1) % words.length
            setTimeout(updateText, 500)
          }
        }
      }

      // Start animation
      updateText()
    }
  }, [effect])

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="h-40 md:h-48 w-full flex items-center justify-center mb-8 overflow-hidden">
        {/* Content will be dynamically generated */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant={effect === "handwriting" ? "default" : "outline"} onClick={() => setEffect("handwriting")}>
          Handwriting
        </Button>
        <Button variant={effect === "typewriter" ? "default" : "outline"} onClick={() => setEffect("typewriter")}>
          Typewriter
        </Button>
        <Button variant={effect === "code" ? "default" : "outline"} onClick={() => setEffect("code")}>
          Code Typing
        </Button>
        <Button variant={effect === "erasing" ? "default" : "outline"} onClick={() => setEffect("erasing")}>
          Type & Erase
        </Button>
      </div>
    </div>
  )
}

