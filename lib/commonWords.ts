// Top 500 most common English words for pre-computing embeddings
export const commonWords = [
    // Agriculture-related words (ensure good performance for this week's word)
    'farm', 'crop', 'agriculture', 'farming', 'soil', 'plant', 'harvest',
    'field', 'grain', 'wheat', 'corn', 'rice', 'vegetable', 'fruit', 'livestock',
    'cattle', 'animal', 'grow', 'cultivate', 'seed', 'fertilizer', 'tractor',
    'barn', 'rural', 'land', 'farmer', 'produce', 'organic', 'irrigation',

    // Top common words
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',

    // Common nouns
    'man', 'woman', 'child', 'world', 'life', 'hand', 'part', 'place', 'case', 'point',
    'government', 'company', 'number', 'group', 'problem', 'fact', 'water', 'food', 'money', 'business',
    'system', 'program', 'question', 'work', 'school', 'state', 'family', 'student', 'law', 'power',
    'war', 'history', 'party', 'result', 'change', 'morning', 'reason', 'research', 'girl', 'guy',
    'moment', 'air', 'teacher', 'force', 'education', 'health', 'person', 'art', 'door', 'history',

    // Common verbs
    'run', 'walk', 'talk', 'eat', 'drink', 'sleep', 'think', 'write', 'read', 'play',
    'work', 'live', 'love', 'hate', 'like', 'want', 'need', 'try', 'help', 'start',
    'stop', 'buy', 'sell', 'pay', 'meet', 'include', 'continue', 'set', 'learn', 'change',
    'lead', 'understand', 'watch', 'follow', 'stop', 'create', 'speak', 'read', 'allow', 'add',
    'spend', 'grow', 'open', 'win', 'offer', 'remember', 'consider', 'appear', 'buy', 'wait',

    // Common adjectives
    'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old',
    'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important',
    'few', 'public', 'bad', 'same', 'able', 'political', 'social', 'economic', 'national', 'American',
    'full', 'international', 'local', 'real', 'federal', 'private', 'recent', 'major', 'likely', 'possible',
    'true', 'low', 'current', 'strong', 'military', 'clear', 'white', 'black', 'short', 'human',

    // Nature & environment
    'nature', 'environment', 'earth', 'sun', 'moon', 'star', 'sky', 'ocean', 'sea', 'river',
    'mountain', 'tree', 'forest', 'desert', 'island', 'beach', 'rain', 'snow', 'wind', 'fire',
    'weather', 'climate', 'temperature', 'season', 'spring', 'summer', 'fall', 'winter', 'natural', 'planet',

    // Food & drink
    'food', 'water', 'bread', 'meat', 'fish', 'chicken', 'rice', 'vegetable', 'fruit', 'apple',
    'orange', 'banana', 'coffee', 'tea', 'milk', 'juice', 'wine', 'beer', 'sugar', 'salt',
    'egg', 'cheese', 'butter', 'oil', 'soup', 'salad', 'sandwich', 'pizza', 'cake', 'chocolate',

    // Animals
    'animal', 'dog', 'cat', 'bird', 'fish', 'horse', 'cow', 'pig', 'chicken', 'sheep',
    'goat', 'lion', 'tiger', 'bear', 'elephant', 'monkey', 'snake', 'rabbit', 'mouse', 'bee',

    // Technology
    'computer', 'phone', 'internet', 'technology', 'software', 'hardware', 'website', 'email', 'data', 'system',
    'network', 'digital', 'online', 'machine', 'device', 'screen', 'camera', 'video', 'image', 'file',

    // Body parts
    'body', 'head', 'face', 'eye', 'ear', 'nose', 'mouth', 'hand', 'arm', 'leg',
    'foot', 'finger', 'toe', 'neck', 'back', 'chest', 'stomach', 'heart', 'brain', 'skin',

    // Colors
    'color', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray',
    'black', 'white', 'dark', 'light', 'bright', 'pale', 'deep', 'vivid',

    // Actions & activities
    'activity', 'action', 'movement', 'exercise', 'sport', 'game', 'music', 'song', 'dance', 'art',
    'book', 'story', 'movie', 'show', 'play', 'performance', 'event', 'party', 'meeting', 'conference',

    // Emotions & states
    'happy', 'sad', 'angry', 'excited', 'bored', 'tired', 'hungry', 'thirsty', 'sick', 'healthy',
    'strong', 'weak', 'fast', 'slow', 'hot', 'cold', 'warm', 'cool', 'wet', 'dry',

    // Time
    'second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'today', 'tomorrow', 'yesterday',
    'morning', 'afternoon', 'evening', 'night', 'past', 'present', 'future', 'early', 'late', 'now',

    // Places
    'place', 'city', 'town', 'village', 'country', 'state', 'nation', 'world', 'home', 'house',
    'building', 'office', 'school', 'hospital', 'church', 'store', 'shop', 'market', 'restaurant', 'hotel',
    'street', 'road', 'avenue', 'park', 'garden', 'yard', 'room', 'kitchen', 'bedroom', 'bathroom',
];

// Remove duplicates
export const uniqueCommonWords = Array.from(new Set(commonWords));
