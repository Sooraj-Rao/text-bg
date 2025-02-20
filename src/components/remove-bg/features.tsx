import { Zap, Image, Clock } from "lucide-react"

export default function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
          Why Choose BgBegone?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Zap className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Remove backgrounds in seconds, not minutes. Our AI processes images at lightning speed.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Pixel Perfect</h3>
            <p className="text-gray-600">
              Get clean, precise cutouts every time. Our AI handles even the most complex images with ease.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Clock className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Time Saver</h3>
            <p className="text-gray-600">
              Save hours on manual editing. Batch process multiple images at once for maximum efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

