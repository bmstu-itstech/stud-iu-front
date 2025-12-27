import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

function getContentType(ext: string) {
    const map: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
    };
    return map[ext] || "application/octet-stream";
}

const UPLOAD_DIR = "/app/public/uploads";

export async function GET(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const filePathParams = params.path;
    const fileName = filePathParams.join("/");

    const fullPath = path.join(UPLOAD_DIR, fileName);

    if (!fs.existsSync(fullPath)) {
        console.error(`[API] ❌ Файл не найден: ${fullPath}`);
        try {
            const dir = path.dirname(fullPath);
            console.log(`[API] Содержимое папки ${dir}:`, fs.readdirSync(dir));
        } catch (e) {
            console.log(`[API] Папка ${path.dirname(fullPath)} не существует или недоступна`);
        }
        return new NextResponse("File not found", { status: 404 });
    }

    try {
        const fileBuffer = fs.readFileSync(fullPath);
        const ext = path.extname(fullPath).toLowerCase();

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": getContentType(ext),
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch {
        return new NextResponse("Error reading file", { status: 500 });
    }
}
