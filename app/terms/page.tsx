import type {Metadata} from 'next'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - WhyNotAct',
  description: 'Terms of service for WhyNotAct.org',
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy text-white py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
            Terms of Service
          </h1>
          <p className="text-gray-300 mt-2">
            Last updated: February 11, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-12">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            Welcome to Why Not Act (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or the &quot;Site&quot;). By accessing or using our website, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Site.
          </p>

          <h2>1. Description of Service</h2>
          <p>
            Why Not Act provides online quizzes for entertainment and informational purposes. Our quizzes are freely accessible and do not require account creation or registration. Quiz responses are collected anonymously and are not linked to any individual user.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            You must be at least 13 years of age to use this Site. By using the Site, you represent and warrant that you meet this age requirement. If you are under 18, you should review these Terms with a parent or guardian.
          </p>

          <h2>3. Use of the Site</h2>
          <p>
            You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:
          </p>
          <ul>
            <li>Use the Site in any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>Attempt to interfere with, compromise the system integrity or security of, or decipher any transmissions to or from the servers running the Site.</li>
            <li>Use any automated system, including bots, scrapers, or crawlers, to access the Site without our express written permission.</li>
            <li>Introduce any viruses, trojans, worms, or other malicious or technologically harmful material.</li>
            <li>Attempt to gain unauthorized access to any portion of the Site, other systems, or networks connected to the Site.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on the Site, including but not limited to text, graphics, logos, images, quiz content, and software, is the property of Why Not Act or its content suppliers and is protected by United States and international copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise use any content from the Site without our prior written consent.
          </p>

          <h2>5. Quiz Results and Content</h2>
          <p>
            Quiz results are provided for entertainment and general informational purposes only. They do not constitute professional advice of any kind, including but not limited to medical, legal, financial, or psychological advice. You should not rely on quiz results to make any decisions.
          </p>
          <p>
            We make no representations or warranties about the accuracy, completeness, or reliability of any quiz content or results.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p className="uppercase text-sm tracking-wide">
            The Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            We do not warrant that the Site will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p className="uppercase text-sm tracking-wide">
            To the fullest extent permitted by applicable law, in no event shall Why Not Act, its affiliates, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, use, or goodwill, arising out of or in connection with your use of the Site, whether based on warranty, contract, tort (including negligence), or any other legal theory, even if we have been advised of the possibility of such damages.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h2>9. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site with an updated &quot;Last Updated&quot; date. Your continued use of the Site after any changes constitutes your acceptance of the revised Terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Commonwealth of Virginia, without regard to its conflict of law provisions.
          </p>

          <h2>11. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining provisions remain in full force and effect.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            <a href="mailto:contact@whynotact.org">contact@whynotact.org</a><br />
            Why Not Act
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} WhyNotAct.org. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
