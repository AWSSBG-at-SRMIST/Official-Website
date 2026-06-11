import { Code, Brain, Cloud, Globe, Settings, Rocket } from "lucide-react";

export function CommunityMarquee() {
  return (
    <section className="py-12 border-y border-outline-variant/20 bg-white/70 backdrop-blur-sm overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        <div className="flex items-center gap-12 px-6">
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Code size={32} /> <span className="text-outline">SOFTWARE ENGINEERING</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Brain size={32} /> <span className="text-outline">AI/ML</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Cloud size={32} /> <span className="text-outline">CLOUD COMPUTING</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Globe size={32} /> <span className="text-outline">OPEN SOURCE</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Settings size={32} /> <span className="text-outline">DEVOPS</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Rocket size={32} /> <span className="text-outline">HACKATHONS</span>
          </div>
        </div>
        <div className="flex items-center gap-12 px-6">
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Code size={32} /> <span className="text-outline">SOFTWARE ENGINEERING</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Brain size={32} /> <span className="text-outline">AI/ML</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Cloud size={32} /> <span className="text-outline">CLOUD COMPUTING</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Globe size={32} /> <span className="text-outline">OPEN SOURCE</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Settings size={32} /> <span className="text-outline">DEVOPS</span>
          </div>
          <div className="flex items-center gap-3 text-headline-md font-bold opacity-30 hover:opacity-100 hover:text-primary transition-all duration-300 cursor-default">
            <Rocket size={32} /> <span className="text-outline">HACKATHONS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
