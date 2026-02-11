'use client'

import {ExternalLink} from 'lucide-react'
import {motion} from 'framer-motion'
import {fadeInUp, staggerContainer} from '@/lib/animations'

const references = [
  {
    title: 'FWD.us',
    url: 'https://www.fwd.us',
    description:
      'A bipartisan political organization that believes America\'s families, communities, and economy thrive when more people can pursue their potential.',
  },
]

export function ReferencesSection() {
  return (
    <section id="references" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          variants={staggerContainer}
        >
          <motion.span className="section-label mb-4 block" variants={fadeInUp}>
            Resources
          </motion.span>
          <motion.h2
            className="heading-section text-3xl md:text-4xl lg:text-5xl text-navy mb-4"
            variants={fadeInUp}
          >
            References
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl" variants={fadeInUp}>
            Learn more from these organizations and resources working on immigration reform
          </motion.p>
        </motion.div>

        {/* References Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainer}
        >
          {references.map((ref, index) => (
            <motion.a
              key={index}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-l-4 border-brand-600 bg-gray-50 p-8 hover:bg-gray-100 transition-colors"
              variants={fadeInUp}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-navy uppercase tracking-wide group-hover:text-brand-600 transition-colors">
                  {ref.title}
                </h3>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors shrink-0 ml-4" />
              </div>
              <p className="text-gray-600 leading-relaxed">{ref.description}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
