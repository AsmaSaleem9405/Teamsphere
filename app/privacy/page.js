import Navbar from "@/app/components/Navbar";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
 <main className="min-h-screen bg-gray-200">
      <div className="max-w-5xl bg-gray-200 mx-auto px-6 py-12">
        <h1 className="text-4xl text-black font-bold mb-4">
          Privacy Policy
        </h1>

        <p className="text-gray-500 mb-10">
          Last Updated: June 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Information We Collect
            </h2>

            <ul className="list-disc pl-6">
              <li>Name and profile information</li>
              <li>Email address</li>
              <li>Account credentials</li>
              <li>Usage analytics</li>
              <li>Device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              How We Use Information
            </h2>

            <ul className="list-disc pl-6">
              <li>Provide and improve services</li>
              <li>Communicate with users</li>
              <li>Ensure platform security</li>
              <li>Respond to support requests</li>
              <li>Analyze service performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Data Sharing
            </h2>

            <p>
              We do not sell personal information. Information
              may be shared with trusted service providers when
              necessary to operate Team Sphere.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Data Security
            </h2>

            <p>
              We implement industry-standard security measures
              to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Cookies
            </h2>

            <p>
              Team Sphere uses cookies and similar technologies
              to enhance user experience and platform
              performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Your Rights
            </h2>

            <ul className="list-disc pl-6">
              <li>Access your information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of data</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy periodically.
              Updates become effective immediately after
              publication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Contact Us
            </h2>

            <p>
              Email: support@teamsphere.com
            </p>
          </section>
        </div>
      </div>
      </main>
    </>
  );
}