import { CornerBrackets } from "@/components/ui/CornerBrackets";

export function BuildTogetherCta() {
  return (
    <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
      <div className="relative border-2 border-primary/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <CornerBrackets />
        <div className="text-center md:text-left">
          <h2 className="font-display font-bold text-[32px] sm:text-[44px] md:text-[56px] leading-[0.98] tracking-tight">
            Become a <span className="text-primary">Builder.</span>
          </h2>
          <p className="text-label-md text-on-surface-variant mt-3 max-w-md">
            Connect with the community, follow our meetups, and be ready when recruitment opens.
          </p>
        </div>
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
