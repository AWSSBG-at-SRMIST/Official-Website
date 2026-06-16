"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { EventsHero } from "@/components/events/EventsHero";
import { FeaturedEvent } from "@/components/events/FeaturedEvent";
import { EventCard } from "@/components/events/EventCard";
import { BuildersInAction } from "@/components/events/BuildersInAction";
import { mockEvents } from "@/components/events/mockData";

export default function EventsPage() {
  const featuredEvent = mockEvents.find(e => e.isFeatured) || mockEvents[0];
  
  // Filter out the featured event from the rest
  const remainingEvents = mockEvents.filter(e => e.id !== featuredEvent.id);
  
  const upcomingEvents = remainingEvents.filter(e => e.status === "upcoming").slice(0, 6);
  const pastEvents = remainingEvents.filter(e => e.status === "past").slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="pt-24 min-h-screen text-on-surface antialiased overflow-hidden selection:bg-primary-container selection:text-white pb-0 relative z-10">
        
        {/* 1. Hero Section */}
        <EventsHero />

        {/* 2. Featured Event Section */}
        {/* <FeaturedEvent event={featuredEvent} /> */}

        {/* 3. Upcoming Events Section */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface mb-4">
              Upcoming Events
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              Register for our next technical deep-dives and hands-on bootcamps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} isSecondaryFeatured={i === 0} />
            ))}
          </div>
        </section>

        {/* 4. Builders In Action Section */}
        {/* <BuildersInAction /> */}

        {/* 5. Past Highlights Section */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-on-surface mb-4 opacity-80">
              Past Highlights
            </h2>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              Catch up on the content and resources from our previous sessions.
            </p>
          </div>
          {/* We apply a subtle grayscale to the past events grid to differentiate it visually */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80 hover:opacity-100 transition-opacity duration-500">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
