import type {Metadata} from 'next'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - WhyNotAct',
  description: 'Privacy policy for WhyNotAct.org',
}

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-300 mt-2">
            Last updated: February 11, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-12">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            Why Not Act (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates https://whynotact.org/ (the &quot;Site&quot;). This Privacy Policy explains how we collect, use, and protect information when you use our Site.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Information We Do NOT Collect</h3>
          <p>
            We do not collect any personally identifiable information (PII). Specifically, we do not collect:
          </p>
          <ul>
            <li>Names</li>
            <li>Email addresses</li>
            <li>Phone numbers</li>
            <li>Physical addresses</li>
            <li>Payment information</li>
            <li>Social Security numbers or government-issued IDs</li>
            <li>Account credentials (we do not require registration)</li>
          </ul>

          <h3>Information We Do Collect</h3>
          <p>
            We collect quiz responses on an anonymous, aggregated basis. These responses are not linked to any individual user and cannot be used to identify you. This data is used solely to improve quiz content and analyze general trends in quiz responses.
          </p>

          <h3>Automatically Collected Technical Information</h3>
          <p>
            Like most websites, our servers may automatically collect limited technical information when you visit the Site, which may include:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URL</li>
            <li>Pages visited and time spent on pages</li>
            <li>Date and time of visit</li>
            <li>General geographic region (country or city level, derived from IP address)</li>
          </ul>
          <p>
            This information is collected in aggregate form and is not used to personally identify any individual visitor. IP addresses are not stored in a way that can be linked to quiz responses.
          </p>

          <h2>2. Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies or similar technologies for basic Site functionality and analytics. These may include:
          </p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the Site to function properly (e.g., remembering your progress within a quiz session).</li>
            <li><strong>Analytics Cookies:</strong> Used to understand how visitors interact with the Site in aggregate. We may use third-party analytics services such as Google Analytics, which collects information anonymously and reports website trends without identifying individual visitors.</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling cookies may affect some Site functionality.
          </p>

          <h2>3. How We Use Collected Information</h2>
          <p>
            The anonymous and technical information we collect is used to:
          </p>
          <ul>
            <li>Operate and maintain the Site</li>
            <li>Improve quiz content and user experience</li>
            <li>Analyze general usage trends and aggregate quiz response patterns</li>
            <li>Monitor and prevent technical issues</li>
          </ul>

          <h2>4. How We Share Information</h2>
          <p>
            Because we do not collect personally identifiable information, we have no PII to share, sell, or disclose.
          </p>
          <p>
            Aggregated, anonymous quiz response data or general site usage statistics may be shared publicly or with third parties for research, analysis, or informational purposes. This data cannot be used to identify any individual.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect the information collected through the Site. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>6. Children&apos;s Privacy</h2>
          <p>
            Our Site does not knowingly collect personally identifiable information from anyone, including children under the age of 13. Since we do not collect PII from any users, no special data collection occurs for children. However, the Site is intended for users aged 13 and older. If you are a parent or guardian and believe your child has provided personal information to us, please contact us and we will take steps to address the concern.
          </p>

          <h2>7. Third-Party Links and Services</h2>
          <p>
            The Site may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
          <p>
            If we use third-party analytics services, those services may collect information in accordance with their own privacy policies.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have certain rights regarding your data. Since we do not collect personally identifiable information, most data subject requests (such as access, correction, or deletion of personal data) are not applicable. However, you may:
          </p>
          <ul>
            <li><strong>Opt out of cookies</strong> by adjusting your browser settings.</li>
            <li><strong>Contact us</strong> with any privacy-related questions or concerns.</li>
          </ul>

          <h3>For California Residents (CCPA)</h3>
          <p>
            We do not sell personal information. Since we do not collect PII, the rights under the California Consumer Privacy Act regarding access, deletion, and opt-out of sale of personal information are generally not applicable.
          </p>

          <h3>For European Visitors (GDPR)</h3>
          <p>
            Since we do not collect personally identifiable information, the data processing obligations under the General Data Protection Regulation are minimal. To the extent any automatically collected technical data constitutes personal data under GDPR, our lawful basis for processing is legitimate interest in operating and improving the Site.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Your continued use of the Site after any changes constitutes your acceptance of the revised Privacy Policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
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
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              Terms of Service
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
