"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function TextDistortion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [effect, setEffect] = useState<"glitch" | "wave" | "pixelate" | "noise">("glitch");
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Animation frame reference to manage requestAnimationFrame
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Clear previous content and stop any ongoing animations
    container.innerHTML = "";
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // **Glitch Effect**
    if (effect === "glitch") {
      // Create a wrapper div for positioning
      const wrapper = document.createElement("div");
      wrapper.className = "relative flex justify-center items-center h-full w-full";
      
      // Main text element
      const textElement = document.createElement("h2");
      textElement.className = "text-6xl md:text-7xl font-bold relative";
      textElement.textContent = "GLITCH";
      
      // Create glitch layers
      for (let i = 0; i < 5; i++) {
        const glitchLayer = document.createElement("h2");
        glitchLayer.className = `glitch-layer-${i} text-6xl md:text-7xl font-bold absolute top-0 left-0 opacity-0`;
        glitchLayer.textContent = "GLITCH";
        
        // Assign random colors to glitch layers
        const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff"];
        glitchLayer.style.color = colors[i % colors.length];
        
        wrapper.appendChild(glitchLayer);
      }
      
      wrapper.appendChild(textElement);
      container.appendChild(wrapper);
      
      if (isAnimating) {
        const glitchLayers = wrapper.querySelectorAll("[class^='glitch-layer-']");
        
        function glitchAnimation() {
          // Randomly animate frames for performance
          if (Math.random() > 0.8) {
            glitchLayers.forEach((layer) => {
              if (Math.random() > 0.5) {
                // Apply random transformations
                gsap.to(layer, {
                  x: (Math.random() - 0.5) * 20,
                  y: (Math.random() - 0.5) * 10,
                  skewX: (Math.random() - 0.5) * 10,
                  skewY: (Math.random() - 0.5) * 10,
                  opacity: Math.random() * 0.5,
                  duration: 0.1,
                  ease: "power1.inOut"
                });
              } else {
                // Reset transformations
                gsap.to(layer, {
                  x: 0,
                  y: 0,
                  skewX: 0,
                  skewY: 0,
                  opacity: 0,
                  duration: 0.1,
                  ease: "power1.inOut"
                });
              }
            });
          }
          
          // Occasionally glitch the main text
          if (Math.random() > 0.95) {
            gsap.to(textElement, {
              x: (Math.random() - 0.5) * 10,
              y: (Math.random() - 0.5) * 5,
              skewX: (Math.random() - 0.5) * 5,
              duration: 0.1,
              ease: "power1.inOut",
              onComplete: () => {
                gsap.to(textElement, {
                  x: 0,
                  y: 0,
                  skewX: 0,
                  duration: 0.1,
                  ease: "power1.inOut"
                });
              }
            });
          }
          
          animationRef.current = requestAnimationFrame(glitchAnimation);
        }
        
        glitchAnimation();
      }
    } 
    // **Wave Effect**
    else if (effect === "wave") {
      const wrapper = document.createElement("div");
      wrapper.className = "relative flex justify-center items-center h-full w-full";
      
      // Create canvas for wave effect
      const canvas = document.createElement("canvas");
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      canvas.className = "absolute inset-0";
      canvasRef.current = canvas;
      
      wrapper.appendChild(canvas);
      container.appendChild(wrapper);
      
      const ctx = canvas.getContext("2d");
      if (ctx && isAnimating) {
        let phase = 0;
        const text = "WAVE";
        
        function drawWaveText() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          ctx.font = "bold 80px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          const metrics = ctx.measureText(text);
          const textWidth = metrics.width;
          
          // Draw text with wave distortion
          for (let i = 0; i < textWidth; i += 4) {
            const x = canvas.width / 2 - textWidth / 2 + i;
            const y = canvas.height / 2 + Math.sin(phase + i * 0.05) * 15;
            
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, 0, 4, canvas.height);
            ctx.clip();
            ctx.fillStyle = `hsl(${(i / textWidth) * 60 + 200}, 70%, 60%)`;
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
            ctx.restore();
          }
          
          phase += 0.1;
          animationRef.current = requestAnimationFrame(drawWaveText);
        }
        
        drawWaveText();
      }
    } 
    // **Pixelate Effect**
    else if (effect === "pixelate") {
      const wrapper = document.createElement("div");
      wrapper.className = "relative flex justify-center items-center h-full w-full";
      
      const canvas = document.createElement("canvas");
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      canvas.className = "absolute inset-0";
      canvasRef.current = canvas;
      
      wrapper.appendChild(canvas);
      container.appendChild(wrapper);
      
      const ctx = canvas.getContext("2d");
      if (ctx && isAnimating) {
        const text = "PIXELS";
        let pixelSize = 10;
        let direction = -1;
        
        function drawPixelatedText() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          const offscreenCanvas = document.createElement("canvas");
          offscreenCanvas.width = canvas.width;
          offscreenCanvas.height = canvas.height;
          const offCtx = offscreenCanvas.getContext("2d");
          
          if (offCtx) {
            offCtx.font = "bold 80px sans-serif";
            offCtx.textAlign = "center";
            offCtx.textBaseline = "middle";
            offCtx.fillStyle = "white";
            offCtx.fillText(text, offscreenCanvas.width / 2, offscreenCanvas.height / 2);
            
            // Pixelate by drawing rectangles
            for (let y = 0; y < canvas.height; y += pixelSize) {
              for (let x = 0; x < canvas.width; x += pixelSize) {
                const pixelData = offCtx.getImageData(x, y, 1, 1).data;
                if (pixelData[3] > 0) {
                  ctx.fillStyle = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
                  ctx.fillRect(x, y, pixelSize, pixelSize);
                }
              }
            }
            
            pixelSize += direction;
            if (pixelSize <= 2 || pixelSize >= 20) {
              direction *= -1;
            }
          }
          
          animationRef.current = requestAnimationFrame(drawPixelatedText);
        }
        
        drawPixelatedText();
      }
    } 
    // **Noise Effect**
    else if (effect === "noise") {
      const wrapper = document.createElement("div");
      wrapper.className = "relative flex justify-center items-center h-full w-full";
      
      const canvas = document.createElement("canvas");
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      canvas.className = "absolute inset-0";
      canvasRef.current = canvas;
      
      wrapper.appendChild(canvas);
      container.appendChild(wrapper);
      
      const ctx = canvas.getContext("2d");
      if (ctx && isAnimating) {
        const text = "NOISE";
        const noiseAmount = 30;
        
        function drawNoiseText() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          ctx.font = "bold 80px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "white";
          ctx.fillText(text, canvas.width / 2, canvas.height / 2);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Apply noise to text pixels
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
              data[i] = Math.max(0, Math.min(255, data[i] + (Math.random() - 0.5) * noiseAmount));
              data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + (Math.random() - 0.5) * noiseAmount));
              data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + (Math.random() - 0.5) * noiseAmount));
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          animationRef.current = requestAnimationFrame(drawNoiseText);
        }
        
        drawNoiseText();
      }
    }
    
    // Cleanup function to stop animations on unmount or effect change
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [effect, isAnimating]);
  
  return (
    <div ref={containerRef} className="h-screen w-full bg-gray-900 flex items-center justify-center">
      {/* Controls can be added here */}
    </div>
  );
}