import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function saveFile(file: File | unknown, folder: string): Promise<string | null> {
    if (!file) {
        return null;
    }

    if (typeof (file as File).arrayBuffer !== 'function') {
        console.log('⚠️ saveFile: получен невалидный файл (возможно, строка или null):', file);
        return null;
    }

    try {
        const fileObj = file as File;

        if (fileObj.size === 0) {
            return null;
        }

        const bytes = await fileObj.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const safeName = fileObj.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${timestamp}-${safeName}`;

        const uploadDir = path.join(process.cwd(), 'uploads', folder);
        const filePath = path.join(uploadDir, filename);

        await mkdir(uploadDir, { recursive: true });

        await writeFile(filePath, buffer);
        
        return `/uploads/${folder}/${filename}`;
    } catch (e) {
        console.error('❌ Ошибка при сохранении файла:', e);
        return null;
    }
}
