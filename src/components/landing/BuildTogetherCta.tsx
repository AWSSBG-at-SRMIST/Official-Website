export function BuildTogetherCta() {
  return (
    <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
      <div className="relative border-2 border-primary/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-l-2 border-t-2 border-primary" />
        <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-r-2 border-b-2 border-primary" />
        <h2 className="font-display font-bold text-[32px] sm:text-[44px] md:text-[56px] leading-[0.98] tracking-tight text-center md:text-left">
          Let&rsquo;s Build <span className="text-primary">Together.</span>
        </h2>
        <a
          href="https://www.meetup.com/awssbg-srmist/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-primary text-on-primary px-8 py-4 font-bold uppercase tracking-wide hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 duration-200"
        >
          Join Community
        </a>
      </div>
    </div>
  );
}
