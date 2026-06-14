import Navbar from "@/app/components/Navbar";

export default function TermsPage() {
  return (
    <>
      <Navbar />
       <main className="min-h-screen bg-gray-200">
      <div className="max-w-5xl  mx-auto px-6 py-12">
        <h1 className="text-4xl text-black font-bold mb-4">
          Terms & Conditions
        </h1>

        <p className="text-gray-500 mb-10">
          Last Updated: June 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-8">
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Acceptance of Terms
            </h2>

            <p>
              By accessing or using Team Sphere, you agree to be
              bound by these Terms & Conditions. If you do not
              agree with any part of these terms, please do not
              use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Services
            </h2>

            <p>
              Team Sphere provides team collaboration, project
              management, communication tools, and productivity
              features for organizations and individuals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              User Accounts
            </h2>

            <p>
              You are responsible for maintaining the security
              of your account and password and for all activities
              conducted through your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Acceptable Use
            </h2>

            <ul className="list-disc pl-6">
              <li>Do not violate any applicable laws.</li>
              <li>Do not upload harmful content.</li>
              <li>Do not attempt unauthorized access.</li>
              <li>Do not disrupt platform functionality.</li>
              <li>Respect other users and their privacy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Intellectual Property
            </h2>

            <p>
              All content, branding, software, and materials
              available through Team Sphere remain the property
              of Team Sphere and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Limitation of Liability
            </h2>

            <p>
              Team Sphere shall not be liable for indirect,
              incidental, or consequential damages arising from
              the use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Changes to Terms
            </h2>

            <p>
              We may update these Terms & Conditions at any time.
              Continued use of Team Sphere constitutes acceptance
              of any revised terms.
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