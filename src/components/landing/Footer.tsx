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
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-on-surface-variant text-body-md font-label-md flex flex-wrap items-center gap-2">
          <span>&copy; {year} AWS Student Builder Group at SRMIST</span>
          <span className="text-on-surface-variant/40">|</span>
          <span className="flex items-center gap-1.5">
            Made with <Heart size={13} className="text-primary fill-primary" /> by Tech Team @AWS SBG at SRMIST.
          </span>
        </p>
        <div className="flex gap-3">
          {SOCIALS.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 flex items-center justify-center border-2 border-on-surface/15 text-on-surface-variant hover:border-primary hover:text-primary transition-colors duration-200"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
