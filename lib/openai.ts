import OpenAI from 'openai';
import { lemmatize } from './lemmatize';
import { uniqueCommonWords } from './commonWords';

// Lazy initialize OpenAI client
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
    if (!openai) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('Missing OPENAI_API_KEY environment variable');
        }
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
}

// Cache for embeddings to reduce API calls
const embeddingsCache = new Map<string, number[]>();

// Pre-computed embeddings storage (will load from file if available)
let precomputedEmbeddings: Record<string, number[]> = {};
let isPrecomputedLoaded = false;

/**
 * Load pre-computed embeddings (if available)
 */
async function loadPrecomputedEmbeddings() {
    if (isPrecomputedLoaded) return;

    try {
        // Try to load from public/embeddings.json
        const response = await fetch('/embeddings.json');
        if (response.ok) {
            precomputedEmbeddings = await response.json();
            console.log(`Loaded ${Object.keys(precomputedEmbeddings).length} pre-computed embeddings`);
        }
    } catch (error) {
        console.log('No pre-computed embeddings found, will generate on demand');
    }

    isPrecomputedLoaded = true;
}

/**
 * Get embedding vector for a word
 */
export async function getEmbedding(word: string): Promise<number[]> {
    // Lemmatize the word first
    const lemma = lemmatize(word);
    const normalizedWord = lemma.toLowerCase().trim();

    // Load pre-computed embeddings if not already done
    await loadPrecomputedEmbeddings();

    // Check pre-computed embeddings
    if (precomputedEmbeddings[normalizedWord]) {
        return precomputedEmbeddings[normalizedWord];
    }

    // Check cache
    if (embeddingsCache.has(normalizedWord)) {
        return embeddingsCache.get(normalizedWord)!;
    }

    try {
        const client = getOpenAIClient();
        const response = await client.embeddings.create({
            model: 'text-embedding-3-small',
            input: normalizedWord,
        });

        const embedding = response.data[0].embedding;

        // Cache the result
        embeddingsCache.set(normalizedWord, embedding);

        return embedding;
    } catch (error) {
        console.error('Error getting embedding:', error);
        throw new Error('Failed to get word embedding');
    }
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) {
        throw new Error('Vectors must have same length');
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vec1.length; i++) {
        dotProduct += vec1[i] * vec2[i];
        norm1 += vec1[i] * vec1[i];
        norm2 += vec2[i] * vec2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

/**
 * Get similarity rank by comparing against common words
 * Lower rank = closer to target word
 */
export async function getSimilarityRank(guess: string, target: string): Promise<number> {
    const [guessEmbedding, targetEmbedding] = await Promise.all([
        getEmbedding(guess),
        getEmbedding(target),
    ]);

    const guessSimilarity = cosineSimilarity(guessEmbedding, targetEmbedding);

    // Compare against our word list to get accurate ranking
    let rank = 1;

    // Use all common words for comparison
    const wordsToCompare = uniqueCommonWords.slice(0, 300); // Use 300 words for reasonable performance

    for (const word of wordsToCompare) {
        if (word === lemmatize(guess) || word === lemmatize(target)) continue;

        try {
            const wordEmbedding = await getEmbedding(word);
            const wordSimilarity = cosineSimilarity(wordEmbedding, targetEmbedding);

            if (wordSimilarity > guessSimilarity) {
                rank++;
            }
        } catch (error) {
            console.error(`Error processing word ${word}:`, error);
        }
    }

    return rank;
}
