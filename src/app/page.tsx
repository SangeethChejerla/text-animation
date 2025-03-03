import TextAnimationShowcase from "@/components/text-animation-showcase"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Professional Text Animation Techniques</h1>
        <TextAnimationShowcase />
      </div>
    </main>
  )
}

