import Image from "next/image";

export const metadata = {
  title: "Microsoft Teams Clone - Meet, Chat and Collaborate",
  description:
    "Connect with your team instantly through secure video meetings, messaging and collaboration tools.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-200 to-gray-200">
      {/* Header */}
    <nav className="flex items-center justify-between bg-white px-4 sm:px-6 h-16 shadow-sm">
  {/* Left */}
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden">
      <Image
        src="/images/logo.png"
        alt="Company Logo"
        width={90}
        height={90}
        priority
        className="object-contain"
      />
    </div>
  </div>

  {/* Right */}
  <div className="flex items-center gap-2 sm:gap-4">
    <button className="text-indigo-800 text-sm sm:text-base font-medium hover:text-indigo-700 transition whitespace-nowrap">
      Sign in
    </button>

    {/* Divider */}
    <div className="hidden sm:block h-6 w-px bg-gray-300"></div>

    <button className="bg-indigo-800 hover:bg-indigo-700 text-white text-sm sm:text-base px-3 sm:px-6 py-2 rounded-lg sm:rounded-xl font-medium transition whitespace-nowrap">
      Sign up
    </button>
  </div>
</nav>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Meet, Chat, and
              <br />
              <span className="text-indigo-800">Collaborate</span>
              <br />
              Anywhere
            </h1>

            <p className="mt-8 text-lg text-gray-600 max-w-xl leading-relaxed">
              Connect with your team instantly through secure video meetings,
              messaging, and collaboration tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {/* Start Meeting */}
           <div className="flex flex-col gap-4">
  <button className="flex items-center justify-center gap-2 bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition">
    <img src="/icons/video.png" alt="Video" className="w-5 h-5" />
    Start a Meeting for Free
  </button>

  <button className="flex items-center justify-center gap-2 bg-white border-2 border-indigo-800 hover:bg-indigo-50 text-indigo-800 px-8 py-4 rounded-xl font-semibold shadow-lg transition">
    <img src="/icons/user.png" alt="User" className="w-5 h-5" />
    Join a Meeting
  </button>
</div>
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