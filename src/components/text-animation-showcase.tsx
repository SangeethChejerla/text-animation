"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SplitTextReveal from "@/components/animations/split-text-reveal"
import KineticTypography from "@/components/animations/kinetic-typography"
import TextMasking from "@/components/animations/text-masking"
import Text3DTransformations from "@/components/animations/text-3d-transformations"
import MorphingText from "@/components/animations/morphing-text"
import AnimatedBackgrounds from "@/components/animations/animated-backgrounds"
import AdvancedTypewriter from "@/components/animations/advanced-typewriter"
import ScrollTriggeredText from "@/components/animations/scroll-triggered-text"
import TextDistortion from "@/components/animations/text-distortion"


export default function TextAnimationShowcase() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("split-text")

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Tabs defaultValue="split-text" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
        <TabsTrigger value="split-text">Split Text</TabsTrigger>
        <TabsTrigger value="kinetic">Kinetic</TabsTrigger>
        <TabsTrigger value="masking">Masking</TabsTrigger>
        <TabsTrigger value="3d-text">3D Text</TabsTrigger>
        <TabsTrigger value="morphing">Morphing</TabsTrigger>
        <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
        <TabsTrigger value="typewriter">Typewriter</TabsTrigger>
        <TabsTrigger value="scroll">Scroll</TabsTrigger>
        <TabsTrigger value="distortion">Distortion</TabsTrigger>
      </TabsList>

      <div className="bg-zinc-900 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
        <TabsContent value="split-text" className="w-full">
          <SplitTextReveal />
        </TabsContent>
        <TabsContent value="kinetic" className="w-full">
          <KineticTypography />
        </TabsContent>
        <TabsContent value="masking" className="w-full">
          <TextMasking />
        </TabsContent>
        <TabsContent value="3d-text" className="w-full">
          <Text3DTransformations />
        </TabsContent>
        <TabsContent value="morphing" className="w-full">
          <MorphingText />
        </TabsContent>
        <TabsContent value="backgrounds" className="w-full">
          <AnimatedBackgrounds />
        </TabsContent>
        <TabsContent value="typewriter" className="w-full">
          <AdvancedTypewriter />
        </TabsContent>
        <TabsContent value="scroll" className="w-full">
          <ScrollTriggeredText />
        </TabsContent>
        <TabsContent value="distortion" className="w-full">
          <TextDistortion />
        </TabsContent>
      </div>
    </Tabs>
  )
}

