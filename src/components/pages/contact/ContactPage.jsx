export default function ContactPage() {
  return (
    <section className="w-full min-h-screen bg-[#f5f5f5] px-5 md:px-8 max-sm:pt-[10vh] lg:px-[3vw] py-10 lg:py-[4vw] flex flex-col box-border">

      {/* Outer: stacked on mobile, side-by-side on lg — stretches full height */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-[4vw] w-full flex-1">

        {/* ── Left Side ── */}
        <div className="flex flex-col gap-8 lg:gap-0 lg:justify-between lg:w-[42%] shrink-0">
          <div>
            <h1 className="text-[2.6rem] sm:text-[4rem] lg:text-[5rem] leading-[0.95] font-normal tracking-[-0.08rem] text-black">
              Contact us
            </h1>
            <p className="mt-5 lg:mt-12 max-w-sm text-base sm:text-lg lg:text-[1.3rem] leading-relaxed text-black/70">
              Get in touch with us for any enquiries and questions
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-5 sm:gap-8 lg:gap-[4rem]">
            {["Behance", "Instagram", "Telegram"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm sm:text-base text-black font-medium hover:opacity-50 transition-opacity duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right Side ── flex-col + flex-1 so it fills full height */}
        <div className="flex flex-col w-full min-w-0 flex-1">

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-y-8 sm:gap-y-12 md:gap-y-16">

            {/* General Inquiries */}
            <div className="w-full sm:w-1/2 sm:pr-8 lg:pr-[4vw] min-w-0">
              <span className="text-sm sm:text-base lg:text-[1.5rem] text-black/40 lowercase tracking-wide">
                general inquiries
              </span>
              <div className="mt-3 sm:mt-4 flex flex-col gap-1">
                <p className="text-sm sm:text-base  text-black break-all">
                  work@horizonstudio.work
                </p>
                <p className="text-sm sm:text-base  text-black">
                  +7 911 296 92 17
                </p>
              </div>
            </div>

            {/* Careers */}
            <div className="w-full sm:w-1/2 min-w-0">
              <span className="text-sm sm:text-base lg:text-[1.5rem] text-black/40 lowercase tracking-wide">
                careers
              </span>
              <div className="mt-3 sm:mt-4">
                <p className="text-sm sm:text-base  text-black break-all">
                  hr@horizonstudio.work
                </p>
              </div>
            </div>

            {/* Collaborations */}
            <div className="w-full sm:w-1/2 sm:pr-8 lg:pr-[4vw] min-w-0">
              <span className="text-sm sm:text-base lg:text-[1.5rem] text-black/40 lowercase tracking-wide">
                collaborations
              </span>
              <div className="mt-3 sm:mt-4 flex flex-col gap-1">
                <p className="text-sm sm:text-base  text-black break-all">
                  n.karpova@horizonstudio.work
                </p>
                <p className="text-sm sm:text-base  text-black">
                  +7 931 212 16 07
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="w-full sm:w-1/2 min-w-0">
              <span className="text-sm sm:text-base lg:text-[1.2rem] text-black/40 lowercase tracking-wide">
                address
              </span>
              <div className="mt-3 sm:mt-4">
                <p className="text-sm sm:text-base  leading-relaxed text-black">
                  191189, St. Petersburg,
                  <br />
                  Moika River Embankment 67-69
                </p>
              </div>
            </div>
          </div>

          {/* Image — flex-1 + min-h-0 makes it fill ALL remaining vertical space */}
          <div className="mt-8 sm:mt-10 lg:mt-[5rem] flex-1 min-h-0 w-full">
            <div className="overflow-hidden rounded-lg w-full h-full bg-amber-300">
              <img
                src="/images/contact-room.jpg"
                alt="Interior Design"
                className="block w-full h-[200px] sm:h-[300px] lg:h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}