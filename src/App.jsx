import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function App() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  // Bag animation values while the hero section scrolls
  const y = useTransform(scrollYProgress, [0, 1], ['-25vh', '0vh'])
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1.15, 1, 0.9])
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 0])
  const glow = useTransform(scrollYProgress, [0, 1], [1, 0])
  const shadow = useTransform(scrollYProgress, [0, 1], [30, 8])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [1, 1, 0.2, 0])
  const navBg = useTransform(scrollYProgress, [0, 0.1, 0.6, 1], [0, 0.35, 0.8, 1])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Simple navbar that becomes more opaque as you scroll */}
      <motion.header
        style={{ backgroundColor: navBg.to(v => `rgba(255,255,255,${v})`), backdropFilter: 'saturate(140%) blur(8px)' }}
        className="fixed inset-x-0 top-0 z-40 border-b border-neutral-200/60"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-white font-bold">B</span>
            <span className="font-semibold tracking-tight">Brag Bags</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-700">
            <a href="#products" className="hover:text-neutral-900">Products</a>
            <a href="#story" className="hover:text-neutral-900">Story</a>
            <a href="#contact" className="hover:text-neutral-900">Contact</a>
          </nav>
        </div>
      </motion.header>

      {/* HERO + Scroll-animated bag */}
      <section ref={containerRef} className="relative min-h-[220vh]">
        <div className="pt-32 sm:pt-36 lg:pt-40 pb-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div style={{ opacity: headerOpacity }} className="max-w-2xl">
              <p className="uppercase tracking-widest text-xs text-neutral-500">New Collection</p>
              <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-[1.05]">
                The bag that loves a good brag
              </h1>
              <p className="mt-5 text-neutral-600 text-base sm:text-lg">
                Crafted from recycled fibers with cloud-soft straps. Follow it as it glides into our lineup while you scroll.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#products" className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-5 py-3 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">Shop now</a>
                <a href="#story" className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-3 text-sm font-medium hover:bg-white transition-colors">Learn more</a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sticky stage where the bag animates into the products section */}
        <div className="sticky top-20 sm:top-24 lg:top-28 z-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              aria-label="Hero bag"
              style={{ y, scale, rotate }}
              className="mx-auto w-full max-w-3xl"
            >
              <div className="relative">
                <motion.div
                  style={{ boxShadow: shadow.to(s => `0 ${s}px ${Math.max(24, s*1.6)}px rgba(0,0,0,0.15)`) }}
                  className="rounded-[28px] overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800"
                >
                  {/* Simple SVG illustration of a bag */}
                  <div className="relative aspect-[4/3]">
                    <svg viewBox="0 0 800 600" className="h-full w-full">
                      <defs>
                        <linearGradient id="bagBody" x1="0" x2="1">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                        <linearGradient id="bagShadow" x1="0" x2="1">
                          <stop offset="0%" stopColor="#0b4aa8" />
                          <stop offset="100%" stopColor="#123e8a" />
                        </linearGradient>
                      </defs>
                      {/* Handle */}
                      <path d="M260 210 C260 140 540 140 540 210" fill="none" stroke="#0f172a" strokeWidth="26" strokeLinecap="round" />
                      {/* Body */}
                      <path d="M140 230 H660 Q700 232 708 276 L742 470 Q750 520 710 540 L90 540 Q50 520 58 470 L92 276 Q100 232 140 230 Z" fill="url(#bagBody)" />
                      {/* Front pocket */}
                      <path d="M160 360 H640 Q660 362 664 380 L676 460 Q680 490 650 500 L150 500 Q120 490 124 460 L136 380 Q140 362 160 360 Z" fill="url(#bagShadow)" opacity="0.9" />
                      {/* Logo dot */}
                      <circle cx="405" cy="430" r="10" fill="#e2e8f0" />
                    </svg>

                    {/* Glow */}
                    <motion.div
                      style={{ opacity: glow }}
                      className="pointer-events-none absolute -inset-6 rounded-[32px] blur-2xl"
                    >
                      <div className="h-full w-full rounded-[32px] bg-gradient-to-r from-sky-400/30 via-blue-500/20 to-indigo-500/30" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product section that the bag scrolls into */}
      <section id="products" className="relative z-20 -mt-20 pb-24 sm:pb-28 lg:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12 lg:mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold">Featured products</h2>
              <p className="mt-2 text-neutral-600">Minimal forms. Maximum function.</p>
            </div>
            <a href="#" className="hidden sm:inline-flex text-sm font-medium text-neutral-700 hover:text-neutral-900">View all</a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Brag Pack — Sky', price: '$129' },
              { name: 'Brag Tote — Obsidian', price: '$99' },
              { name: 'Brag Sling — Indigo', price: '$79' },
              { name: 'Weekender — Mist', price: '$159' },
              { name: 'Everyday — Sand', price: '$109' },
              { name: 'Mini — Coral', price: '$69' },
            ].map((p, i) => (
              <motion.a
                key={p.name}
                href="#"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20% 0px -10% 0px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-xl" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-neutral-800 group-hover:underline underline-offset-4">{p.name}</h3>
                    <span className="text-neutral-900 font-semibold">{p.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">Water-resistant. 3-year warranty.</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 sm:grid-cols-2 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">Designed for the city. Ready for anywhere.</h3>
            <p className="mt-3 text-neutral-600">
              Every Brag bag is engineered for comfort and longevity using recycled materials and low-impact dyes. Built to carry your day with pride.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100" />
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-16 sm:py-20 bg-neutral-950 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-bold">Join the Brag List</h4>
            <p className="mt-2 text-neutral-300">Get early access to drops and limited colors.</p>
          </div>
          <form className="w-full sm:w-auto flex gap-3">
            <input type="email" placeholder="you@example.com" className="w-full sm:w-80 rounded-md border border-white/20 bg-white/5 px-4 py-3 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-400" />
            <button className="rounded-md bg-white text-neutral-900 px-5 font-medium">Subscribe</button>
          </form>
        </div>
        <div className="mt-10 text-center text-neutral-400 text-sm">© {new Date().getFullYear()} Brag Bags</div>
      </section>
    </div>
  )
}

export default App
