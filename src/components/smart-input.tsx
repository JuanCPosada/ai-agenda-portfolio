'use client';

import { useState } from 'react';
import { parseEventFromText } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SmartInput() {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCreate = async () => {
        if (!input.trim()) return;
        setIsLoading(true);

        try {
            const result = await parseEventFromText(input);
            if (result.success) {
                setInput('');
                router.refresh(); // Refresh to show new event
            } else {
                alert('Failed to create event');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg bg-white/50 backdrop-blur-sm border-neutral-200/60 dark:bg-neutral-900/50 dark:border-neutral-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Smart Agenda Assistant
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea
                    placeholder="e.g., Lunch with Sarah tomorrow at 12:30pm..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="resize-none min-h-[100px] text-lg p-4 bg-transparent"
                />
                <div className="flex justify-end">
                    <Button
                        onClick={handleCreate}
                        disabled={isLoading || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md hover:shadow-lg"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Scheduling...
                            </>
                        ) : (
                            'Add to Agenda'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
