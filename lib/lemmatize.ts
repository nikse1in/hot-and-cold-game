// Common word lemmatization mapping
export const lemmaMap: Record<string, string> = {
    // Verbs - agriculture related
    'farming': 'farm',
    'farms': 'farm',
    'farmed': 'farm',
    'planting': 'plant',
    'plants': 'plant',
    'planted': 'plant',
    'growing': 'grow',
    'grows': 'grow',
    'grew': 'grow',
    'grown': 'grow',
    'harvesting': 'harvest',
    'harvests': 'harvest',
    'harvested': 'harvest',
    'cultivating': 'cultivate',
    'cultivates': 'cultivate',
    'cultivated': 'cultivate',

    // Nouns - agriculture related
    'crops': 'crop',
    'fields': 'field',
    'farmers': 'farmer',
    'seeds': 'seed',
    'animals': 'animal',
    'cattle': 'cattle',
    'livestock': 'livestock',

    // Common verbs
    'running': 'run',
    'runs': 'run',
    'ran': 'run',
    'going': 'go',
    'goes': 'go',
    'went': 'go',
    'gone': 'go',
    'making': 'make',
    'makes': 'make',
    'made': 'make',
    'doing': 'do',
    'does': 'do',
    'did': 'do',
    'done': 'do',
    'having': 'have',
    'has': 'have',
    'had': 'have',
    'being': 'be',
    'is': 'be',
    'are': 'be',
    'was': 'be',
    'were': 'be',
    'been': 'be',

    // Common nouns
    'words': 'word',
    'things': 'thing',
    'people': 'person',
    'times': 'time',
    'ways': 'way',
    'days': 'day',
    'years': 'year',
    'works': 'work',
    'lives': 'life',
    'hands': 'hand',
    'parts': 'part',
    'places': 'place',
    'cases': 'case',
    'points': 'point',
    'groups': 'group',
    'problems': 'problem',
    'facts': 'fact',
};

/**
 * Convert a word to its base form (lemma)
 * Example: "running" -> "run", "crops" -> "crop"
 */
export function lemmatize(word: string): string {
    const lower = word.toLowerCase().trim();
    return lemmaMap[lower] || lower;
}

/**
 * Check if two words are the same after lemmatization
 */
export function isSameLemma(word1: string, word2: string): boolean {
    return lemmatize(word1) === lemmatize(word2);
}
