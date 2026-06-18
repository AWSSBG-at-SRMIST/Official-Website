import { Github, Heart, Instagram, Linkedin, Mail, Users } from "lucide-react";

const SOCIALS = [
  { href: "https://www.instagram.com/awssbg.srmist/", label: "Instagram", icon: Instagram },
  { href: "https://in.linkedin.com/company/awssbg-srmist", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.meetup.com/awssbg-srmist/", label: "Meetup", icon: Users },
  { href: "https://github.com/awssbg-srmist", label: "GitHub", icon: Github },
];

const CONTACTS = [
  {
    index: "01",
    label: "For Queries",
    email: "awssbg.srmist@gmail.com",
  },
  {
    index: "02",
    label: "For Sponsorships & Partnerships",
    email: "sponsorship.awssbg.srmist@gmail.com",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-container-lowest border-t-2 border-on-surface/10">
      <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        {/* Contact + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="flex flex-col border-t border-l border-on-surface/10">
            {CONTACTS.map((contact) => (
              <div key={contact.index} className="p-6 border-r border-b border-on-surface/10">
                <div className="font-display text-xs text-primary tracking-[0.2em] mb-3">{contact.index}</div>
                <p className="text-xs uppercase tracking-[0.15em] text-on-surface-variant/60 mb-2">
                  {contact.label}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 font-bold text-on-surface hover:text-primary transition-colors break-all"
                >
                  <Mail size={16} className="shrink-0" />
                  {contact.email}
                </a>
              </div>
            ))}
          </div>

          <div className="relative border-2 border-on-surface/10 min-h-[220px]">
            <div className="absolute -top-2.5 -left-2.5 w-5 h-5 border-l-2 border-t-2 border-primary z-10" />
            <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-r-2 border-b-2 border-primary z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3691771246167!2d80.03442323922259!3d12.81940405530423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f76c4db87a47%3A0x341fa471f8027d68!2sSRM%20University%2C%20Kattankulathur%2C%20Tamil%20Nadu%20603203!5e0!3m2!1sen!2sin!4v1781783778800!5m2!1sen!2sin"
              className="w-full h-full min-h-[220px] grayscale-[15%] contrast-[1.1]"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="AWS Student Builder Group at SRMIST — SRM University, Kattankulathur"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-2 border-on-surface/10 flex flex-col md:flex-row justify-between items-center gap-6">
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
                className="w-9 h-9 flex items-center justify-center border-2 border-on-surface/15 text-on-surface-variant hover:border-primary hover:text-primary transition-colors duration-200"
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
