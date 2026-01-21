'use client'

import {useState} from 'react'
import {ChevronDown} from 'lucide-react'
import {motion, AnimatePresence} from 'framer-motion'
import {fadeInUp, staggerContainer} from '@/lib/animations'

const faqs = [
  {
    question: 'Will this replace legal immigration?',
    answer: 'No. This program is specifically designed for undocumented immigrants already living in the United States. It does not affect or replace the existing legal immigration system. Those who wish to immigrate legally will continue to use established channels.',
  },
  {
    question: 'What about border security?',
    answer: 'Border security remains essential and is complementary to this program. By creating a practical path for those already here, we can focus border resources on genuine security threats rather than people seeking to reunite with families or find work. The program includes requirements that support national security goals.',
  },
  {
    question: 'Why a fine-based path?',
    answer: 'Fines serve multiple purposes: they acknowledge that immigration violations occurred, they generate revenue instead of costs, and they demonstrate commitment from participants. The fine structure is designed to be meaningful but achievable, and alternatives exist for those who cannot pay.',
  },
  {
    question: 'What if people cannot afford the fines?',
    answer: 'The program includes service-based alternatives for those who cannot afford financial penalties. Participants can contribute through community service hours, creating a path that works regardless of economic status while still requiring accountability.',
  },
  {
    question: 'What protects participants from exploitation?',
    answer: 'The program includes strong worker protections and oversight mechanisms. By bringing people out of the shadows, they gain access to legal protections, fair wages, and safe working conditions. Exploitation becomes much harder when workers have legal status.',
  },
  {
    question: 'Why not just deport everyone?',
    answer: 'Mass deportation would cost an estimated $315 billion or more, devastate industries dependent on immigrant labor, separate millions of families (including 4.4 million U.S. citizen children), and remove billions in tax contributions. Our approach generates revenue while strengthening communities.',
  },
  {
    question: 'What about people with criminal records?',
    answer: 'The program has clear guidelines regarding criminal history. Those with serious criminal convictions would not be eligible. However, minor infractions or offenses directly related to immigration status would be evaluated on a case-by-case basis with public safety as the priority.',
  },
  {
    question: 'Why should conservatives support this?',
    answer: 'This approach emphasizes accountability, generates revenue instead of costs, enhances national security by bringing people into the system, supports businesses and the economy, and respects the rule of law. It\'s a practical, fiscally responsible solution.',
  },
  {
    question: 'Why should progressives support this?',
    answer: 'This approach keeps families together, protects vulnerable workers, provides a humane path forward for millions, reduces exploitation and fear in immigrant communities, and creates a more just system. It prioritizes human dignity while being politically achievable.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faqs" className="py-20 md:py-28 bg-gray-50">
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
            Questions & Answers
          </motion.span>
          <motion.h2
            className="heading-section text-3xl md:text-4xl lg:text-5xl text-navy mb-4"
            variants={fadeInUp}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl" variants={fadeInUp}>
            Common questions about our approach to immigration reform
          </motion.p>
        </motion.div>

        {/* FAQ Grid - Two Columns */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-50px'}}
            variants={staggerContainer}
          >
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
                variants={fadeInUp}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 flex items-start justify-between text-left group"
                >
                  <span className="flex items-start gap-4">
                    <span className="text-brand-600 font-bold text-lg shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-bold text-navy group-hover:text-brand-600 transition-colors text-lg">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-brand-600 shrink-0 ml-4 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="pb-6 pl-12 overflow-hidden"
                      initial={{height: 0, opacity: 0}}
                      animate={{height: 'auto', opacity: 1}}
                      exit={{height: 0, opacity: 0}}
                      transition={{duration: 0.3, ease: 'easeOut'}}
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-50px'}}
            variants={staggerContainer}
          >
            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, idx) => {
              const index = idx + Math.ceil(faqs.length / 2)
              return (
                <motion.div
                  key={index}
                  className="border-b border-gray-200 last:border-b-0"
                  variants={fadeInUp}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 flex items-start justify-between text-left group"
                  >
                    <span className="flex items-start gap-4">
                      <span className="text-brand-600 font-bold text-lg shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-bold text-navy group-hover:text-brand-600 transition-colors text-lg">
                        {faq.question}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-brand-600 shrink-0 ml-4 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        className="pb-6 pl-12 overflow-hidden"
                        initial={{height: 0, opacity: 0}}
                        animate={{height: 'auto', opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3, ease: 'easeOut'}}
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
