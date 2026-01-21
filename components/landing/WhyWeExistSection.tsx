'use client'

import {motion} from 'framer-motion'
import {X, ArrowRight} from 'lucide-react'
import {fadeInUp, staggerContainer} from '@/lib/animations'

export function WhyWeExistSection() {
  return (
    <section id="mission" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="section-label mb-4 block">Our Mission</span>
            <h2 className="heading-section text-3xl md:text-4xl lg:text-5xl text-navy mb-6">
              Why We Exist
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              For decades, America has been stuck between two impossible choices.
            </p>
          </motion.div>

          {/* The False Choice - Visual Comparison */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12"
            variants={fadeInUp}
          >
            {/* Option 1 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gray-50 border-t-4 border-red-500 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      Mass Deportation
                    </h3>
                    <p className="text-gray-600">
                      Costly, disruptive, and economically devastating. It tears
                      apart families and communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gray-50 border-t-4 border-gray-400 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-200 flex items-center justify-center">
                    <X className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      No Real Reform
                    </h3>
                    <p className="text-gray-600">
                      The status quo helps no one. Political gridlock leaves
                      millions in limbo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Cost of Inaction */}
          <motion.p
            className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12"
            variants={fadeInUp}
          >
            Meanwhile, millions of undocumented immigrants live in fear,
            businesses lack workers, border communities struggle, and political
            division deepens.
          </motion.p>

          {/* The Third Way - Hero Moment */}
          <motion.div className="relative mb-16" variants={fadeInUp}>
            <div className="bg-navy p-10 md:p-14">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 text-brand-400 text-sm font-bold uppercase tracking-wider mb-4">
                  <span className="w-8 h-px bg-brand-400" />
                  There is another way
                  <span className="w-8 h-px bg-brand-400" />
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                  We believe there is a third option.
                </h3>
                <p className="text-gray-300 text-lg">
                  Practical solutions that respect the rule of law, strengthen
                  our economy, and honor our values as a nation of immigrants.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Who We Are + Approach */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            variants={fadeInUp}
          >
            <div>
              <p className="text-lg text-gray-700 mb-6">
                <span className="font-bold text-brand-600">WhyNotAct.org</span>{' '}
                is a nonpartisan nonprofit dedicated to exploring practical,
                humane, and economically sound solutions to the immigration
                crisis.
              </p>
              <p className="text-gray-600">
                We don't tell you what to think. We help you discover where you
                stand and connect you with meaningful ways to make your voice
                heard.
              </p>
            </div>

            <div className="bg-brand-50 p-8 border-l-4 border-brand-600">
              <p className="text-xl md:text-2xl font-medium text-navy mb-4">
                Our approach starts with something simple:
              </p>
              <p className="text-2xl md:text-3xl font-bold text-brand-600 flex items-center gap-3">
                Listening
                <ArrowRight className="w-6 h-6" />
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
