'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/shared/ui/Typography';

interface Props {
    text?: string | null;
}

export const ExpandableDescription = ({ text }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return null;

    const isLongText = text.length > 250;

    return (
        <div className="flex flex-col items-start gap-2 max-w-4xl transition-all duration-300">
            <Text
                level={2}
                className={cn(
                    "text-gray-200 drop-shadow-md leading-relaxed opacity-90 transition-all",
                    !isExpanded && isLongText ? "line-clamp-4" : ""
                )}
            >
                {text}
            </Text>

            {isLongText && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-400 hover:text-blue-300 font-bold text-lg uppercase tracking-wider transition-colors focus:outline-none border-b border-transparent hover:border-blue-300 pb-0.5"
                >
                    {isExpanded ? 'Свернуть' : 'Подробнее...'}
                </button>
            )}
        </div>
    );
};
