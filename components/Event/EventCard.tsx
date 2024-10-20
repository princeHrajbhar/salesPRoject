"use client";

import React from 'react';

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Tech Innovation Workshop',
    date: '2024-10-25',
    description: 'Join us for a workshop on the latest in tech innovation.',
  },
  {
    id: 2,
    title: 'Entrepreneurship Panel Discussion',
    date: '2024-11-10',
    description: 'A panel discussion with successful entrepreneurs sharing their insights.',
  },
];

const pastEvents: Event[] = [
  {
    id: 1,
    title: 'Startup Pitch Competition',
    date: '2024-09-15',
    description: 'Teams pitched their innovative ideas to a panel of judges.',
  },
  {
    id: 2,
    title: 'Career Fair 2024',
    date: '2024-08-30',
    description: 'Connect with top companies and explore career opportunities.',
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-white mb-8">Events</h1>

      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
        <h2 className="text-3xl font-semibold text-white mb-4">Upcoming Events</h2>
        {upcomingEvents.map((event) => (
          <div key={event.id} className="border-b border-gray-700 pb-4 mb-4 last:border-none">
            <h3 className="text-xl font-bold text-yellow-400">{event.title}</h3>
            <p className="text-gray-300">{event.date}</p>
            <p className="text-gray-400">{event.description}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-white mb-4">Past Events</h2>
        {pastEvents.map((event) => (
          <div key={event.id} className="border-b border-gray-700 pb-4 mb-4 last:border-none">
            <h3 className="text-xl font-bold text-yellow-400">{event.title}</h3>
            <p className="text-gray-300">{event.date}</p>
            <p className="text-gray-400">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
