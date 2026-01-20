// Weekly word configuration
export interface WeeklyWord {
    weekNumber: number;
    word: string;
    startDate: string;
    category?: string;
}

// Current week's configuration
export const currentWeek: WeeklyWord = {
    weekNumber: 170,
    word: 'agriculture',
    startDate: '2026-01-20',
    category: 'Industry'
};

// Calculate week number based on date  
export function getWeekNumber(date: Date = new Date()): number {
    // Starting from week 1 on Jan 1, 2023
    const startDate = new Date('2023-01-01');
    const diffTime = Math.abs(date.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7) + 1;
}

// Get current week's word
export function getCurrentWord(): WeeklyWord {
    return currentWeek;
}
