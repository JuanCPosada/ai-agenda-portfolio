'use server';

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Schema for the event structure we want to extract
const eventSchema = z.object({
    title: z.string().describe('The title of the event'),
    description: z.string().optional().describe('Additional details about the event'),
    startTime: z.string().describe('ISO string of the start time (e.g., 2023-10-27T10:00:00.000Z)'),
    endTime: z.string().describe('ISO string of the end time'),
});

export async function parseEventFromText(input: string) {
    try {
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.error('MISSING API KEY: GOOGLE_GENERATIVE_AI_API_KEY is not defined in .env');
            return { success: false, error: 'API Key missing' };
        }
        console.log('Parsing text:', input);
        const { object } = await generateObject({
            model: google('gemini-2.5-flash'),
            schema: eventSchema,
            prompt: `Extract calendar event details from the following text. Today's date is ${new Date().toISOString()}. Text: "${input}"`,
        });
        console.log('Parsed object:', object);

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
        console.log('Saved event:', event);

        return { success: true, event };
    } catch (error) {
        console.error('DETAILED ERROR:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { success: false, error: errorMessage };
    }
}

export async function getEvents() {
    return await prisma.event.findMany({
        orderBy: { startTime: 'asc' },
    });
}
