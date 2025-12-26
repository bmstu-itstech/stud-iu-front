import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    mode?: 'compact' | 'minified' | 'full';
}

export const EventCardSkeleton: FC<Props> = ({ mode = 'full' }) => {
    const baseClass = "rounded-3xl bg-gray-200 overflow-hidden animate-pulse";

    if (mode === 'compact') {
        return (
            <div className={cn(baseClass, "max-w-220 w-[350px] h-[152px] flex")}>
                <div className="flex flex-col gap-4 p-6 flex-1 justify-center">
                    <div className="h-6 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 rounded w-full" />
                </div>
                <div className="bg-gray-300 rounded-3xl w-100 min-w-100 h-100 min-h-100 m-auto mr-6" />
            </div>
        );
    }

    return (
        <div className={cn(baseClass, mode === 'minified' ? "max-w-173 md:w-[270px]" : "max-w-220 w-[350px]")}>
            <div className="bg-gray-300 w-full h-[110px]" />
            <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-full" />
                {mode === 'full' && <div className="h-4 bg-gray-300 rounded w-5/6" />}
            </div>
        </div>
    );
};

export default EventCardSkeleton;
