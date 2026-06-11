import Link from "next/link";
import { LayoutGrid, ExternalLink } from "lucide-react";

export function ProjectShowcase() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-desktop reveal" id="projects">
      <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg">
        <div className="max-w-xl">
          <h2 className="font-headline-lg text-headline-lg mb-4">Project Showcase</h2>
          <p className="text-body-lg text-on-surface-variant">
            Exceptional products built by our community members using modern cloud
            stacks.
          </p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-primary font-bold">
          View All Projects
          <LayoutGrid size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {/* Card 1 */}
        <div className="group bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden card-shadow hover:-translate-y-2 transition-all duration-300">
          <div className="h-48 bg-surface-variant relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="Project Sentry Sentinel"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoiWxctn6ULzX31P4M3jC6SWoAaVyZRhM0vtqMftxrwMVvDkj9ihn3ciUE6JxfsCiOF9b-wWLImtYPtXdD-iR8eU2yGqoh-FX0VPLAsI-OBtUP3cgVA07kPLmeffrOkw4CgcATF6TAw4rWay3As8_r8vO4lflxFHM1uy3_xD-3ZqsHa-kduuEtEiEjBIU7eWreMfFFqIT016PZ3-vnWygYqaEFjRUHYIIrUnfpTvqM4PdbsLuxhOgzEsL3Ua4AhUFld8pU1QPNLCk"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Live
            </div>
          </div>
          <div className="p-8 space-y-4">
            <div className="flex gap-2">
              <span className="bg-surface-container text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                AWS Lambda
              </span>
              <span className="bg-surface-container text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Next.js
              </span>
            </div>
            <h4 className="font-headline-md text-headline-md">Sentry Sentinel</h4>
            <p className="text-body-md text-on-surface-variant line-clamp-2">
              Autonomous cloud security auditing tool that monitors S3 buckets for
              public access in real-time.
            </p>
            <div className="pt-4 flex justify-between items-center border-t border-outline-variant/20">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-dim"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-dim"></div>
              </div>
              <Link className="text-on-surface hover:text-primary transition-colors hover:scale-110" href="/projects/sentry-sentinel">
                <ExternalLink size={20} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="group bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden card-shadow hover:-translate-y-2 transition-all duration-300">
          <div className="h-48 bg-surface-variant overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="Project EduLens AI"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfpGDpOUja5EnW2H_JuM7ENQc3ePlxdPl_qop5Z4Ly1LOHKkpBaemWHGhv3nCBtJpk38o2DYas4z1vMY2IQsJ3BzKKOxNwyHsDwIMtmyr6n5vY5MrApUZMmHpnc9D24qxvdezp5h3Bv0_WAwHDPn7H5VOaKZx6Nlqhvy4A9ftj6RsxHEy-ozwNrGamutWg3QLNFa50GFQAqNJGogowVS46-nwq3bZ4WcySdBfyhQGt3G8b7Gc7ToP0pYmLdnAd-ridi-0wKL0cXFA"
            />
          </div>
          <div className="p-8 space-y-4">
            <div className="flex gap-2">
              <span className="bg-surface-container text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                PyTorch
              </span>
              <span className="bg-surface-container text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                SageMaker
              </span>
            </div>
            <h4 className="font-headline-md text-headline-md">EduLens AI</h4>
            <p className="text-body-md text-on-surface-variant line-clamp-2">
              A personalized learning assistant that generates custom curriculum
              based on student performance.
            </p>
            <div className="pt-4 flex justify-between items-center border-t border-outline-variant/20">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-dim"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-dim"></div>
              </div>
              <Link className="text-on-surface hover:text-primary transition-colors hover:scale-110" href="/projects/edulens-ai">
                <ExternalLink size={20} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="group bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden card-shadow hover:-translate-y-2 transition-all duration-300">
          <div className="h-48 bg-surface-variant overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="Project Pulse Dash"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzsT7qi20ZIQPUUjKiZGY5ztkUQSdBM3D5utWBCca_rZFLuRo2pzbRAgoBUAVo088M6mHohWxSiC1P0ynxLHUnxAsA6lfgPHpZOeB_PvpYhFGMI7u_7ju3SIXvLQAkma5dwsUHIR_JihicHL0wSESDgp9NNJ-9jhbxBQbZXgJ7EWsKY3iBA9KS1DHZvHRhnfTvmvHJzwRXCZhU7dS5eY5H6dyTu6KjmjHc9PhUQVroWYrr0jgD1ULngI8GpLo3_pEgPtYBNkvJ8nQ"
            />
          </div>
          <div className="p-8 space-y-4">
            <div className="flex gap-2">
              <span className="bg-surface-container text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                React
              </span>
              <span className="bg-surface-container text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                AppSync
              </span>
            </div>
            <h4 className="font-headline-md text-headline-md">Pulse Dash</h4>
            <p className="text-body-md text-on-surface-variant line-clamp-2">
              Real-time collaboration dashboard for remote engineering teams to
              manage deployment pipelines.
            </p>
            <div className="pt-4 flex justify-between items-center border-t border-outline-variant/20">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-dim"></div>
              </div>
              <Link className="text-on-surface hover:text-primary transition-colors hover:scale-110" href="/projects/pulse-dash">
                <ExternalLink size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
