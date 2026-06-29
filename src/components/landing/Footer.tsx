import { Github, Heart, Instagram, Linkedin } from "lucide-react";
import { SiMeetup, SiWhatsapp } from "react-icons/si";

const SOCIALS = [
  { href: "https://www.instagram.com/awssbg.srmist/", label: "Instagram", icon: Instagram },
  { href: "https://in.linkedin.com/company/awssbg-srmist", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.meetup.com/awssbg-srmist/", label: "Meetup", icon: SiMeetup },
  { href: "https://github.com/AWSSBG-at-SRMIST", label: "GitHub", icon: Github },
  { href: "https://chat.whatsapp.com/Ckmq15FNNjVIGftTJhIlgZ", label: "WhatsApp Community", icon: SiWhatsapp },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-on-surface/10 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-8">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6">
          <div className="flex flex-col items-center gap-1 md:items-start text-center md:text-left text-on-surface-variant text-sm font-medium">
            <span>&copy; {year} AWS Student Builder Group at SRMIST</span>
            <span className="flex items-center gap-1.5">
              Made with <Heart size={12} className="text-primary fill-primary" /> by Tech Team @AWS SBG at SRMIST.
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center md:justify-end">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center border-2 border-on-surface/15 text-on-surface-variant hover:border-primary hover:text-primary transition-colors duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
