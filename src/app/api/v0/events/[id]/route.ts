import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { saveFile } from '@/lib/upload';
import { ensureAdmin } from '@/lib/auth-check';
import type { EventType } from '@prisma/client';

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: Props) {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const event = await db.event.findUnique({
        where: { id },
        include: { images: true },
    });

    if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(event);
}

export async function PUT(req: NextRequest, { params }: Props) {
    if (!await ensureAdmin()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    try {
        const formData = await req.formData();

        const type = formData.get('type') as EventType;
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const place = formData.get('place') as string;
        const color = formData.get('color') as string;
        const startDatetimeStr = formData.get('start_datetime') as string;

        const registration_link = formData.get('registration_link') as string;
        const album_link = formData.get('album_link') as string;

        const imageFile = formData.get('images') as File;

        await db.event.update({
            where: { id },
            data: {
                type,
                name,
                description,
                place,
                color,
                start_datetime: new Date(startDatetimeStr),
                registration_link: (type === 'FUTURE' && registration_link) ? registration_link : null,
                album_link: (type === 'PAST' && album_link) ? album_link : null,
            }
        });

        if (imageFile && imageFile.size > 0) {
            const path = await saveFile(imageFile, 'events');
            if (path) {
                await db.eventImage.deleteMany({ where: { event_id: id } });
                await db.eventImage.create({
                    data: {
                        image: path,
                        event_id: id
                    }
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: Props) {
    if (!await ensureAdmin()) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr);

    await db.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
