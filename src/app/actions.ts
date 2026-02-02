'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || "file:./dev.db",
        },
    },
});


// Schema for the event structure we want to extract
const eventSchema = z.object({
    title: z.string().describe('The title of the event'),
    description: z.string().optional().describe('Additional details about the event'),
    startTime: z.string().describe('ISO string of the start time (e.g., 2023-10-27T10:00:00.000Z)'),
    endTime: z.string().describe('ISO string of the end time'),
});

export async function parseEventFromText(input: string) {
    try {
        const { object } = await generateObject({
            model: openai('gpt-4o'), // Or 'gpt-3.5-turbo'
            schema: eventSchema,
            prompt: `Extract calendar event details from the following text. Today's date is ${new Date().toISOString()}. Text: "${input}"`,
        });

        // Save to database
        const event = await prisma.event.create({
            data: {
                title: object.title,
                description: object.description,
                startTime: new Date(object.startTime),
                endTime: new Date(object.endTime),
                isSmartlyScheduled: true,
            },
        });

        return { success: true, event };
    } catch (error) {
        console.error('Failed to parse event:', error);
        return { success: false, error: 'Failed to create event from text.' };
    }
}

export async function getEvents() {
    return await prisma.event.findMany({
        orderBy: { startTime: 'asc' },
    });
}
