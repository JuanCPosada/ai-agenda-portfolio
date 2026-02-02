import { getEvents } from '@/app/actions';
import { AgendaView } from '@/components/agenda-view';
import { SmartInput } from '@/components/smart-input';

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4 pt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent pb-2">
            AI Smart Agenda
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Focus on your work, not your schedule. Just type what you need to do, and we'll handle the logistics.
          </p>
        </header>

        <section className="relative z-10">
          <SmartInput />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Your Agenda</h2>
            <div className="text-sm text-neutral-500">
              {events.length} event{events.length !== 1 ? 's' : ''} scheduled
            </div>
          </div>
          <AgendaView events={events} />
        </section>
      </div>
    </main>
  );
}
