import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-20 reveal">
      <div className="max-w-3xl mx-auto px-margin-desktop">
        <div className="bg-surface/50 backdrop-blur-xl border border-primary/20 rounded-[2rem] p-8 md:p-12 text-center text-on-surface space-y-6 relative overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all duration-500 group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="font-display text-headline-md md:text-headline-lg relative z-10 font-bold">
            Ready to Build <span className="text-primary">Something Meaningful?</span>
          </h2>
          <p className="text-on-surface-variant text-body-md md:text-body-lg max-w-lg mx-auto relative z-10">
            Join 150+ students who are defining the future of cloud
            and technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4 relative z-10">
            <Link href="https://www.meetup.com/awssbg-srmist/events/" target="_blank" className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md font-bold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300">
              Join Community
            </Link>
            <Link href="/events" className="border border-outline-variant text-on-surface px-8 py-3 rounded-xl font-label-md font-bold hover:bg-surface-variant hover:-translate-y-0.5 transition-all duration-300">
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
