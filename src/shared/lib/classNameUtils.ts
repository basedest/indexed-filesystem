import { twMerge } from 'tailwind-merge';

export function cx(...args: unknown[]): string {
    return args
        .flat()
        .filter((x) => typeof x === 'string')
        .join(' ')
        .trim();
}

export function cn(...args: unknown[]): string {
    return twMerge(cx(args));
}
