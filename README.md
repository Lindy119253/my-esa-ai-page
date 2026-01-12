# React Chatbot Template
本项目由阿里云ESA提供加速、计算和保护
<img width="7534" height="844" alt="6e6c86f0a37b9cd7efcf08c414696a4c_O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844" src="https://github.com/user-attachments/assets/4aec9dba-c5a8-42af-85ef-31105c347329" />
A beautiful, modern chatbot interface built with React, TypeScript, and Tailwind CSS. 

## Features

- ⚡ **🧠 Intelligent Code Understanding**
- Repository-Level Analysis​
- Connect GitHub repos for AI to understand your entire project structure
- Real-time Code Completion​
- Context-aware intelligent code suggestions
- Code Quality Checking​
- Detect issues and provide optimization suggestions
- Cross-File Reference Analysis​
- Smart function call and dependency tracking

- 🔧 **🚀 Performance Optimized**
- ⚡ Edge Computing​
- Global low-latency access via Alibaba Cloud ESA edge nodes
- 🧩 Intelligent Caching​
- Vector similarity-based caching for faster responses
- 📱 Lightweight Architecture​
- Built with Vite for instant hot reloads and optimized builds

- 🎯 **🎨 Modern Interface**
- 🌙 Dark Theme​
- Developer-friendly dark interface
- 📱 Fully Responsive​
- Perfect on desktop, tablet, and mobile
- ⌨️ Keyboard Shortcuts​
- Extensive shortcuts for coding efficiency
- 🎯 Advanced Syntax Highlighting​
- Integrated modern code editor
  
## Getting Started

### Prerequisites

- Node.js 16.0 or later
- npm or yarn
- Git 2.0 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-code-assistant.git
cd ai-code-assistant
```

2. Install dependencies:
```bash
npm install
# or using yarn
yarn install
```
3. Environment configuration
```bash
# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
OPENAI_API_KEY=your_openai_api_key_here
ESA_ACCESS_KEY=your_esa_access_key
GITHUB_TOKEN=your_github_personal_access_token
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/                 # React Components
│   ├── chat/                  # Chat related components
│   │   ├── Chat.tsx          # Main chat interface
│   │   ├── ChatInput.tsx     # Message input
│   │   ├── ChatMessage.tsx   # Message bubbles
│   │   └── MessageActions.tsx # Message actions menu
│   ├── code/                 # Code related components
│   │   ├── CodeEditor.tsx    # Code editor component
│   │   ├── CodeViewer.tsx    # Code viewer component
│   │   ├── FileTree.tsx      # File tree navigation
│   │   └── RepositoryPanel.tsx # Repository management
│   ├── ai/                   # AI functionality components
│   │   ├── CodeAnalysis.tsx  # Code analysis panel
│   │   ├── AutoComplete.tsx  # Auto-completion
│   │   └── Suggestions.tsx   # Intelligent suggestions
│   └── layout/               # Layout components
│       ├── Sidebar.tsx       # Sidebar layout
│       ├── Header.tsx        # Header navigation
│       └── Footer.tsx        # Status footer
├── hooks/                    # React Hooks
│   ├── useChat.ts           # Chat logic
│   ├── useCodeAnalysis.ts   # Code analysis logic
│   ├── useRepository.ts     # Repository management
│   └── useAI.ts             # AI service calls
├── services/                 # Business services
│   ├── api/                 # API calls
│   │   ├── chat.api.ts      # Chat APIs
│   │   ├── code.api.ts      # Code analysis APIs
│   │   └── repository.api.ts # Repository APIs
│   ├── storage/             # Storage services
│   │   ├── cache.ts         # Cache management
│   │   └── vectorDB.ts      # Vector database
│   └── ai/                  # AI services
│       ├── openai.ts        # OpenAI integration
│       └── embeddings.ts    # Vector embeddings
├── types/                   # TypeScript definitions
│   ├── chat.ts              # Chat related types
│   ├── code.ts              # Code related types
│   └── repository.ts        # Repository types
├── utils/                   # Utility functions
│   ├── codeParser.ts        # Code parser
│   ├── formatters.ts        # Formatting utilities
│   └── validators.ts        # Validation utilities
└── styles/                  # Styles
    ├── globals.css          # Global styles
    └── components/          # Component styles
```
## Repository Integration
Connect your GitHub repositories for deep contextual understanding:

```typescript
// Using repository hook in components
import { useRepository } from '../hooks/useRepository';

const CodeAssistant = () => {
  const { connectRepo, currentRepo, fileStructure } = useRepository();
  
  const handleRepoConnect = async (repoUrl: string) => {
    await connectRepo(repoUrl);
  };
  
  return (
    <div>
      <RepositoryPanel onConnect={handleRepoConnect} />
      {currentRepo && <FileTree structure={fileStructure} />}
    </div>
  );
};
```

## AI Code Analysis
Advanced code analysis capabilities:

```typescript
// Code quality checking example
const { analyzeCode, suggestions, issues } = useCodeAnalysis();

const handleCodeAnalysis = async (code: string, language: string) => {
  const result = await analyzeCode({
    code,
    language,
    rules: ['performance', 'security', 'best-practices']
  });
  
  // Handle analysis results
  console.log('Code issues:', result.issues);
  console.log('Optimization suggestions:', result.suggestions);
};
```

## Edge Computing Configuration
Leverage ESA edge computing for optimal performance:

```javascript
// esa.config.js
export default {
  runtime: 'edge',
  regions: ['global'],
  functions: {
    'api/chat': {
      memory: 1024,
      timeout: 30
    },
    'api/analyze': {
      memory: 2048,
      timeout: 60
    }
  },
  caching: {
    patterns: [
      {
        pattern: '/api/analyze/**',
        strategy: 'network-first',
        maxAge: 3600
      }
    ]
  }
};
```

## Customization

### Theme Customization
Modify tailwind.config.jsfor interface customization:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        code: {
          background: '#1a1b26',
          comment: '#565f89',
          keyword: '#bb9af7',
          string: '#9ece6a'
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace']
      }
    }
  }
}
```

### AI Model Configuration
Configure AI services in .envfile:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4-turbo-preview

# Optional: Other AI Services
ANTHROPIC_API_KEY=your-antropic-key
GEMINI_API_KEY=your-gemini-key

# Vector Database Configuration
VECTOR_DB_URL=your-vector-db-url
EMBEDDING_MODEL=text-embedding-3-small
```

## 📚 Available Scripts
```bash
# Development Commands
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Code linting
npm run type-check    # TypeScript type checking

# Testing Commands
npm run test          # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run test:coverage # Test coverage report

# Analysis Commands
npm run analyze       # Bundle analysis
npm run bundle-report # Generate bundle report
```

## 🌐 Deployment to Alibaba Cloud ESA

## Automatic Deployment
Pre-configured GitHub Actions for automatic deployment on push to main branch:

```yaml
# .github/workflows/deploy.yml
name: Deploy to ESA

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run build
      
      - name: Deploy to ESA
        uses: aliyun/esa-deploy-action@v1
        with:
          access-key: ${{ secrets.ESA_ACCESS_KEY }}
          secret-key: ${{ secrets.ESA_SECRET_KEY }}
          dist-dir: dist
```

## Manual Deployment

```bash
# Install ESA CLI
npm install -g @aliyun/esa-cli

# Build project
npm run build

# Deploy to ESA
esa deploy --dist-dir dist --region global
```

## 🔍 Feature Demonstrations

## Basic Chat Functionality

```typescript
// Send message example
const { sendMessage, messages, isLoading } = useChat();

const handleSendMessage = (content: string) => {
  sendMessage({
    content,
    type: 'text',
    context: {
      currentFile: 'src/components/Chat.tsx',
      repository: 'my-project'
    }
  });
};
```

## Code Analysis Features

```typescript
// Analyze code example
const { analyze, results } = useCodeAnalysis();

// Analyze specific code block
const analysis = await analyze(`
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
`, 'javascript');

// Get optimization suggestions
console.log(analysis.suggestions);
```

## Repository Integration

```typescript
// Connect GitHub repository
const { connect, isConnected, repository } = useRepository();

// Connect repository
await connect('https://github.com/username/repo');

// Search code in repository
const results = await repository.search('function calculateTotal');
```

## 🤝 Contributing

We welcome community contributions! Please read our contributing guidelines:

1. Fork the project
2. Create a feature branch​ (git checkout -b feature/AmazingFeature)
3. Commit your changes​ (git commit -m 'Add some AmazingFeature')
4. Push to the branch​ (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Development Standards

Write type-safe code with TypeScript
Follow ESLint and Prettier configurations
Write unit tests for new features
Update relevant documentation
Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the LICENSE
file for details.

## 🆘 Frequently Asked Questions
Q: How to configure custom AI models?
A: Set corresponding environment variables in .envfile or modify model settings in configuration files.

Q: Which code repositories are supported?
A: Currently primarily supports GitHub, with GitLab, Bitbucket support planned.

Q: How to extend support for new programming languages?
A: Add new language parsers in src/utils/codeParser.ts.

Q: Getting out of memory errors during deployment?
A: Adjust memory configuration in esa.config.jsor optimize bundle size.

## 📞 Technical Support

- • 📧 Email Support: support@example.com
- • 💬 Community Discussions: https://github.com/your-username/ai-code-assistant/discussions
- • 🐛 Issue Reporting: https://github.com/your-username/ai-code-assistant/issues
- • 📖 Documentation: https://github.com/your-username/ai-code-assistant/wiki

If this project helps you, please give it a ⭐️!
Made with ❤️ and lots of ☕️

