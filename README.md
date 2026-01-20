# Hot and Cold - AI Word Guessing Game

A delightfully frustrating word guessing game powered by OpenAI embeddings. Built as a Base app mini app.

## 🎮 How to Play

Guess the secret word by typing related words. The AI will rank your guess based on semantic similarity using OpenAI's text embeddings. Lower ranks mean you're closer to the answer!

**Current Week:** #170 - "agriculture"

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
OPENAI_API_KEY=your-api-key-here
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-onchainkit-key-here (optional)
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
app/
├── api/guess/route.ts       # Serverless API endpoint
├── components/              # React components
│   ├── GuessInput.tsx      
│   ├── GuessHistory.tsx    
│   ├── ProgressBar.tsx     
│   ├── Menu.tsx            
│   └── HowToPlay.tsx       
├── page.tsx                 # Main game page
├── layout.tsx              
└── globals.css             

lib/
├── openai.ts                # OpenAI embeddings client
├── gameLogic.ts             # Game processing logic
└── wordConfig.ts            # Weekly word configuration

public/
└── frame.json               # Base app manifest
```

## 🎨 Features

- **AI-Powered Rankings**: Uses OpenAI's `text-embedding-3-small` for semantic similarity
- **Weekly Words**: New secret word every week
- **Progress Tracking**: Visual progress bar and feedback messages
- **Persistent State**: Game progress saved in local storage
- **Smart Caching**: Reduces API calls by caching embeddings
- **Sort & Filter**: Sort guesses by time or rank
- **Responsive Design**: Works on all screen sizes

## 🔧 Configuration

### Changing the Secret Word

Edit `lib/wordConfig.ts`:

```typescript
export const currentWeek: WeeklyWord = {
  weekNumber: 171,
  word: 'your-new-word',
  startDate: '2026-01-27',
  category: 'Category'
};
```

### Customizing Theme

Edit colors in `app/globals.css`:

```css
:root {
  --background: #0a0a0f;
  --hot-start: #ff3b3b;
  --hot-end: #ff8800;
  --cold-start: #00d4ff;
  --cold-end: #00a8cc;
}
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
npx vercel
```

### Configure Base App

1. Update `public/frame.json` with your deployment URL
2. Add screenshots and icon images
3. Submit to Base app directory

## 💰 Cost Optimization

The game uses OpenAI embeddings which incur API costs:
- ~$0.00002 per guess (with `text-embedding-3-small`)
- Caching reduces costs for repeated words
- Consider rate limiting for production use

## 📝 License

ISC

## 🙏 Acknowledgments

- Inspired by the Hot and Cold game on Reddit
- Built with Next.js and OnchainKit
- Powered by OpenAI embeddings
