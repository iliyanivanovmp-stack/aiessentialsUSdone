'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

const ServicePageFooter = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <footer className="border-t border-gray-800 py-12 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-gray-500 text-sm">
            AIessentials by IvanovIV LLC 2025
          </div>

          <div className="flex space-x-6 text-gray-500 text-sm">
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-white transition-colors duration-200"
            >
              Privacy
            </button>
            <button
              onClick={() => setShowTerms(true)}
              className="hover:text-white transition-colors duration-200"
            >
              Terms
            </button>
            <a
              href="https://aiessentials.us/"
              className="hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <button
              onClick={() => setShowContact(true)}
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </button>
          </div>
        </motion.div>
      </footer>

      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 text-gray-300 text-sm leading-relaxed space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Aiessentials — Terms of Service</h3>
                <p className="text-gray-400">Website: aiessentials.us</p>
                <p className="text-gray-400">Operator: IvanovIv LLC (owner/operator of aiessentials.us), 30 N Gould St Ste N, Sheridan, WY 82801</p>
                <p className="text-gray-400 mt-2">Effective date: October 31, 2025</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">1) Who we are</h4>
                <p>Aiessentials is a brand operated by IvanovIv LLC, providing custom AI systems and automation services ("Services").</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">2) Using our services</h4>
                <p>You represent that you are a business user with authority to contract. You will provide accurate information and the access we request to deliver the Solution.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">3) Orders, fees, & refunds</h4>
                <p>Fees are as shown in your invoice/order. Payment is due upfront unless stated otherwise. Refunds follow our accompanying 60-Day Money-Back Guarantee (incorporated by reference). Stripe's processing fees are typically not returned by Stripe on refunds. Unless your order states otherwise, we refund your full service fee and we absorb Stripe's fee.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">4) Intellectual property</h4>
                <p>Upon full payment, you own the final deliverables created specifically for you. We retain ownership of our pre-existing tools, templates, prompts, and know-how; we grant you a perpetual, non-exclusive license to use them as embedded in the deliverables.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">5) Client responsibilities</h4>
                <p>Provide timely access (accounts, data, stakeholders), implement delivered changes, and maintain reasonable usage volumes needed for measurement and stability.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">6) Data protection</h4>
                <p>We handle personal data per our Privacy Policy and, where applicable, a Data Processing Addendum (DPA) if we process personal data on your behalf. If needed, email support@aiessentials.us to request our DPA.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">7) Confidentiality</h4>
                <p>Each party will protect the other's non-public information and use it only to deliver/receive the Services.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">8) Disclaimers & limitation of liability</h4>
                <p>Services are provided "as is." We do not promise uninterrupted or error-free operation. To the maximum extent permitted by law, our total aggregate liability for all claims is limited to the fees you paid for the Service giving rise to the claim. We do not exclude liability that cannot be excluded by law.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">9) Termination</h4>
                <p>Either party may terminate for material breach if not cured within 10 days of written notice. On termination, we will provide a reasonable handover of deliverables completed through the date.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">10) Governing law & disputes</h4>
                <p>Governing law: Wyoming, USA. Before formal action, both parties will try to resolve issues informally within 14 days of written notice.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">11) Changes</h4>
                <p>We may update these Terms; material changes will be posted with a new effective date.</p>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <p className="text-gray-400">Company contact: info@aiessentials.us  |  Address: 30 N Gould St Ste N, Sheridan, WY 82801</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
              <button
                onClick={() => setShowPrivacy(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 text-gray-300 text-sm leading-relaxed space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Aiessentials — Privacy Policy</h3>
                <p className="text-gray-400">Website: aiessentials.us</p>
                <p className="text-gray-400">Operator: IvanovIv LLC (owner/operator of aiessentials.us), 30 N Gould St Ste N, Sheridan, WY 82801</p>
                <p className="text-gray-400 mt-2">Effective date: October 31, 2025</p>
                <p className="text-gray-400 mt-2">Contact: info@aiessentials.us  |  Address: 30 N Gould St Ste N, Sheridan, WY 82801</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">What this covers</h4>
                <p>This policy explains what we collect, how we use it, who we share it with, and your rights. It applies to our website and services that link here.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Information we collect</h4>
                <p className="mb-2"><strong>Identifiers you give us:</strong> name, email, phone (via forms, inquiries, checkout).</p>
                <p className="mb-2"><strong>Payments:</strong> processed by Stripe. We do not see or store full card numbers.</p>
                <p><strong>Limited technical data:</strong> basic logs/analytics to operate, secure, and improve the site (no cross-context behavioral advertising).</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">How we use information</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide and support our services; respond to inquiries.</li>
                  <li>Process payments and prevent fraud.</li>
                  <li>Operate, secure, and improve our site.</li>
                  <li>Send service messages and, with consent where required, marketing.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Disclosure / sharing</h4>
                <p>We share data with service providers (hosting, security, email, payments via Stripe) under contract, and as required by law. We do not sell or share personal information for cross-context behavioral advertising.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Your rights</h4>
                <p className="mb-2"><strong>GDPR (EU/EEA/UK):</strong> access, rectify, erase, restrict, object, data portability, withdraw consent; complain to a supervisory authority.</p>
                <p><strong>California:</strong> know/access, correct, delete, and opt-out of sale or sharing.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Contact</h4>
                <p>Email: info@aiessentials.us  |  Address: 30 N Gould St Ste N, Sheridan, WY 82801</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 border border-gray-800 rounded-lg max-w-md w-full overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              <button
                onClick={() => setShowContact(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 text-gray-300 space-y-4">
              <p className="text-lg font-semibold text-white">Reach us out on:</p>
              <div className="space-y-3">
                <a
                  href="mailto:iliyan.ivanov.mp@gmail.com"
                  className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  iliyan.ivanov.mp@gmail.com
                </a>
                <a
                  href="tel:+12133971263"
                  className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (213) 397-1263
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ServicePageFooter;
