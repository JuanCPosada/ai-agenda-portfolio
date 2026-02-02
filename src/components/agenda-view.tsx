import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Clock } from 'lucide-react';

interface Event {
    id: string;
    title: string;
    description: string | null;
    startTime: Date;
    endTime: Date;
}

export function AgendaView({ events }: { events: Event[] }) {
    if (events.length === 0) {
        return (
            <div className="text-center p-12 text-neutral-500 animate-in fade-in zoom-in duration-500">
                <p>No events scheduled yet. Try adding one nicely!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow dark:bg-neutral-900">
                    <div className="h-2 bg-indigo-500 w-full" />
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg leading-tight truncate" title={event.title}>
                            {event.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{format(new Date(event.startTime), 'EEEE, MMMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                                {format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
                            </span>
                        </div>
                        {event.description && (
                            <p className="pt-2 text-neutral-500 italic truncate">
                                {event.description}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
