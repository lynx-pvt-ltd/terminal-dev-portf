import React, { useState, useEffect, useRef } from 'react';
import { Terminal, User, Code, Briefcase, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: string;
}

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Alex Chen\'s Portfolio Terminal v2.1.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: {
      description: 'Show all available commands',
      execute: () => [
        'Available Commands:',
        '─────────────────',
        'help          - Show this help message',
        'about         - Learn about me',
        'experience    - View my work experience',
        'projects      - See my recent projects',
        'skills        - Check out my technical skills',
        'contact       - Get in touch with me',
        'resume        - Download my resume',
        'clear         - Clear the terminal',
        'whoami        - Display current user',
        'date          - Show current date and time',
        '',
        'Pro tip: Use ↑/↓ arrow keys to navigate command history!'
      ]
    },
    about: {
      description: 'Learn about me',
      execute: () => [
        'About Alex Chen',
        '──────────────',
        'Hey there! 👋',
        '',
        'I\'m a passionate Full-Stack Developer with 5+ years of experience',
        'building scalable web applications and mobile solutions.',
        '',
        'I love turning complex problems into simple, beautiful, and',
        'intuitive solutions. When I\'m not coding, you can find me',
        'exploring new technologies, contributing to open source, or',
        'enjoying a good cup of coffee ☕',
        '',
        'Location: San Francisco, CA',
        'Current Role: Senior Software Engineer @ TechCorp'
      ]
    },
    experience: {
      description: 'View work experience',
      execute: () => [
        'Work Experience',
        '───────────────',
        '',
        '🏢 Senior Software Engineer @ TechCorp (2022 - Present)',
        '   • Led development of microservices architecture serving 1M+ users',
        '   • Improved application performance by 40% through optimization',
        '   • Mentored 5 junior developers and conducted code reviews',
        '',
        '🚀 Full-Stack Developer @ StartupXYZ (2020 - 2022)',
        '   • Built and deployed 15+ web applications using React/Node.js',
        '   • Implemented CI/CD pipelines reducing deployment time by 60%',
        '   • Collaborated with design team to create pixel-perfect UIs',
        '',
        '💻 Frontend Developer @ WebSolutions (2019 - 2020)',
        '   • Developed responsive websites for 20+ clients',
        '   • Integrated third-party APIs and payment gateways',
        '   • Maintained 99.9% uptime across all client projects'
      ]
    },
    projects: {
      description: 'See recent projects',
      execute: () => [
        'Recent Projects',
        '──────────────',
        '',
        '🎯 TaskMaster Pro - Project Management Platform',
        '   Tech: React, Node.js, PostgreSQL, Docker',
        '   • Real-time collaboration with 10K+ active users',
        '   • Advanced analytics and reporting dashboard',
        '   Link: https://taskmaster-pro.com',
        '',
        '🛒 E-Commerce Analytics Dashboard',
        '   Tech: Vue.js, Python, MongoDB, AWS',
        '   • Real-time sales tracking and inventory management',
        '   • Machine learning-powered sales predictions',
        '   Link: https://github.com/alexchen/ecommerce-analytics',
        '',
        '📱 WeatherBot - iOS/Android App',
        '   Tech: React Native, OpenWeather API, Firebase',
        '   • 50K+ downloads on app stores',
        '   • AI-powered weather recommendations',
        '   Link: https://weatherbot-app.com',
        '',
        '🔐 SecureVault - Password Manager',
        '   Tech: Electron, Rust, SQLCipher',
        '   • End-to-end encryption for password storage',
        '   • Biometric authentication support',
        '   Link: https://github.com/alexchen/securevault'
      ]
    },
    skills: {
      description: 'Technical skills',
      execute: () => [
        'Technical Skills',
        '───────────────',
        '',
        '💻 Programming Languages:',
        '   JavaScript/TypeScript  ████████████████████ 95%',
        '   Python                ██████████████████   90%',
        '   Java                  ████████████████     80%',
        '   Go                    ██████████████       70%',
        '   Rust                  ████████             40%',
        '',
        '⚛️  Frontend Technologies:',
        '   React/Next.js         ████████████████████ 95%',
        '   Vue.js               ██████████████████   90%',
        '   Angular              ████████████████     80%',
        '   Svelte               ██████████           50%',
        '',
        '🔧 Backend Technologies:',
        '   Node.js              ████████████████████ 95%',
        '   Express/Fastify      ████████████████████ 95%',
        '   Django/Flask         ██████████████████   90%',
        '   Spring Boot          ████████████████     80%',
        '',
        '🗄️  Databases:',
        '   PostgreSQL           ████████████████████ 95%',
        '   MongoDB              ██████████████████   90%',
        '   Redis                ████████████████     80%',
        '   MySQL                ████████████████     80%',
        '',
        '☁️  Cloud & DevOps:',
        '   AWS                  ██████████████████   90%',
        '   Docker               ██████████████████   90%',
        '   Kubernetes           ██████████████       70%',
        '   GitHub Actions       ████████████████     80%'
      ]
    },
    contact: {
      description: 'Get in touch',
      execute: () => [
        'Contact Information',
        '──────────────────',
        '',
        '📧 Email: alex.chen.dev@gmail.com',
        '🐙 GitHub: https://github.com/alexchen',
        '💼 LinkedIn: https://linkedin.com/in/alexchen-dev',
        '🐦 Twitter: @alexchen_dev',
        '📱 Phone: +1 (555) 123-4567',
        '',
        '📍 Location: San Francisco, CA',
        '🌐 Website: https://alexchen.dev',
        '',
        'Feel free to reach out for collaborations, job opportunities,',
        'or just to say hello! I\'m always open to interesting conversations.'
      ]
    },
    resume: {
      description: 'Download resume',
      execute: () => [
        'Resume Download',
        '──────────────',
        '',
        '📄 Downloading resume...',
        '✅ Resume downloaded successfully!',
        '',
        'File: Alex_Chen_Resume.pdf',
        'Size: 245 KB',
        '',
        'Direct link: https://alexchen.dev/resume.pdf'
      ]
    },
    whoami: {
      description: 'Display current user',
      execute: () => ['alex@portfolio:~$ Full-Stack Developer | Problem Solver | Coffee Enthusiast']
    },
    date: {
      description: 'Show current date and time',
      execute: () => [new Date().toString()]
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        setHistory([]);
        return [];
      }
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [
      ...history,
      { type: 'command', content: `alex@portfolio:~$ ${cmd}` }
    ];

    if (trimmedCmd === '') {
      setHistory(newHistory);
      return;
    }

    if (commands[trimmedCmd as keyof typeof commands]) {
      const output = commands[trimmedCmd as keyof typeof commands].execute();
      const outputLines = output.map(line => ({ type: 'output' as const, content: line }));
      setHistory([...newHistory, ...outputLines, { type: 'output', content: '' }]);
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', content: `Command not found: ${cmd}` },
        { type: 'output', content: 'Type "help" to see available commands.' },
        { type: 'output', content: '' }
      ]);
    }

    // Add to command history
    if (trimmedCmd !== '') {
      setCommandHistory(prev => [trimmedCmd, ...prev.slice(0, 49)]); // Keep last 50 commands
    }
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono flex">
      {/* Developer Image Sidebar */}
      <div className="hidden md:flex w-80 bg-gray-800 border-r border-gray-700 flex-col items-center justify-center p-8">
        <a
          href="https://linkedin.com/in/alexchen-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-green-400 group-hover:border-green-300 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-400/25">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Alex Chen - Developer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-400 text-gray-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ExternalLink size={16} />
          </div>
        </a>
        
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Alex Chen</h2>
          <p className="text-green-400 mb-4">Full-Stack Developer</p>
          
          <div className="flex space-x-4 justify-center">
            <a
              href="https://github.com/alexchen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/alexchen-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:alex.chen.dev@gmail.com"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700 w-full">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-xs text-gray-400">
            <div className="flex items-center mb-1">
              <User size={12} className="mr-1" />
              <span>Online</span>
            </div>
            <div className="flex items-center mb-1">
              <Code size={12} className="mr-1" />
              <span>Coding...</span>
            </div>
            <div className="flex items-center">
              <Briefcase size={12} className="mr-1" />
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="flex-1 flex flex-col">
        {/* Terminal Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 text-center text-gray-400 text-sm flex items-center justify-center">
            <Terminal size={16} className="mr-2" />
            Alex Chen's Portfolio Terminal
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 space-y-1"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, index) => (
            <div
              key={index}
              className={`${
                line.type === 'command'
                  ? 'text-white'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : 'text-green-400'
              } whitespace-pre-wrap break-words`}
            >
              {line.content}
            </div>
          ))}

          {/* Command Input */}
          <div className="flex items-center">
            <span className="text-green-400 mr-2">alex@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white caret-green-400"
              autoFocus
              spellCheck={false}
            />
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 text-xs text-gray-400 flex justify-between items-center">
          <div>Press TAB for autocompletion • Use ↑/↓ for command history</div>
          <div className="flex items-center space-x-4">
            <span>Ready</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;