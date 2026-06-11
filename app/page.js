import Image from "next/image";

export const metadata = {
  title: "Microsoft Teams Clone - Meet, Chat and Collaborate",
  description:
    "Connect with your team instantly through secure video meetings, messaging and collaboration tools.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-300 to-gray-200">
      {/* Header */}
      <header className="container mx-auto px-6 py-5">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Company Logo"
              width={100}
              height={100}
              priority
            />
            <span className="text-xl font-semibold text-gray-900">
              Microsoft Teams
            </span>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            <button className="text-indigo-600 font-medium hover:text-indigo-700 transition">
              Sign in
            </button>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-medium transition">
              Sign up
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Meet, Chat, and
              <br />
              <span className="text-indigo-600">Collaborate</span>
              <br />
              Anywhere
            </h1>

            <p className="mt-8 text-lg text-gray-600 max-w-xl leading-relaxed">
              Connect with your team instantly through secure video meetings,
              messaging, and collaboration tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {/* Start Meeting */}
             <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition">
  <img src="/icons/camera.png" alt="Gallery" className="w-5 h-5" />
  Start a Meeting for Free
</button>
<button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition">
  <img src="/icons/user.png" alt="Gallery" className="w-5 h-5" />
  Join a Meeting
</button>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative flex justify-center">
            {/* Background Shapes */}
            
            {/* Main Meeting Image */}
            <div className="relative z-10">
              <Image
                src="/images/main-bg1.png"
                alt="Video Conference Meeting"
                width={700}
                height={500}
                className="rounded-3xl shadow-2xl"
                priority
              />

            

              {/* Reactions */}
              <div className="absolute -bottom-5 left-5 bg-white rounded-2xl shadow-lg px-5 py-3 flex gap-3 text-2xl">
                <span>👋</span>
                <span>❤️</span>
                <span>😂</span>
                <span>😮</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}