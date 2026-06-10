export function AboutSection() {
  return (
    <section className="py-stack-lg max-w-container-max mx-auto px-margin-desktop reveal" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
        <div className="space-y-stack-md">
          <h2 className="font-headline-lg text-headline-lg">Built for Builders</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            At AWS SBG SRMIST, we believe that the best way to learn is by
            getting your hands dirty. Our community is structured to provide
            students with real-world problems and the modern toolsets required
            to solve them.
          </p>
          <div className="grid grid-cols-2 gap-stack-md py-4">
            <div className="space-y-2">
              <h4 className="font-headline-md text-primary">Practical Learning</h4>
              <p className="text-label-md text-on-surface-variant">
                Move beyond documentation with guided project-based workshops.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-headline-md text-primary">Global Network</h4>
              <p className="text-label-md text-on-surface-variant">
                Connect with AWS experts and builders from chapters worldwide.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low rounded-3xl p-stack-md relative overflow-hidden h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover rounded-2xl shadow-sm"
            alt="Students collaborating"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXvF_uTQ5ki9lBsOLBG7hjqIC-h8ccK0mJIqhx6Ma67UCWRM-SyjgeAkL3OyboGQdPjIb85T3dkp7e6IUdQ02ekNpUWlPA1k48bpciFoDE8A83jpJCPaILTeWzjMKdOgNTgeapBUx2JORxBnrXoKLECBMRRE_7Op3Ap42TXoz92E95OAobBBtuGdaRqnS7VtSU7g1gIoKd7hSdmbLSsXLfVcGgivIXjSQpIGORMaEunrbvlata6wvkJoisnIYY8iKO3VY4XEor47U"
          />
        </div>
      </div>
    </section>
  );
}
