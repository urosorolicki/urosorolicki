import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, TerminalSquare, Moon, Sun, Download } from "lucide-react";

// ===== Editable profile data =====
const PROFILE = {
  name: "Uroš Orolicki",
  title: "DevOps Engineer",
  location: "Belgrade, Serbia",
  email: "orolickiiuros@gmail.com",
  phone: "+381 60 310 5060",
  github: "https://github.com/urosorolicki",
  linkedin: "https://www.linkedin.com/in/urosorolicki/",
  cv: "/Uros_Orolicki_CV_Modern.pdf", // local or hosted link to CV
  summary:
    "DevOps Engineer focused on AWS, Kubernetes, Terraform, and CI/CD automation. I build scalable, reliable systems and smooth developer workflows.",
  skills: {
    Cloud: ["AWS (multi-account)", "Cost optimization", "Security best practices"],
    Containers: ["Docker", "Kubernetes (EKS)"],
    "Infrastructure as Code": ["Terraform"],
    CI_CD: ["GitHub Actions", "Argo CD", "Argo Workflows"],
    Monitoring: ["SumoLogic", "Sentry"],
    Programming: ["Python", "JavaScript (basic)"] ,
    Databases: ["MySQL"],
    VCS: ["Git"],
  },
  experience: [
    {
      role: "Cloud DevOps Engineer",
      company: "Raiffeisen Bank AD Beograd",
      period: "Nov 2023 – Oct 2025",
      bullets: [
        "Managed AWS infrastructure across multiple accounts; optimized resources and costs.",
        "Implemented Argo CD; automated progressive, reliable deployments.",
        "Deployed and maintained Kubernetes clusters for mission‑critical apps.",
        "Partnered with security/compliance to meet banking standards.",
      ],
    },
    {
      role: "DevOps Engineer",
      company: "Ananas E‑Commerce",
      period: "Sep 2022 – Nov 2023",
      bullets: [
        "Maintained and scaled microservices infrastructure.",
        "Built CI/CD with GitHub Actions + Argo CD; managed Terraform and EKS.",
        "Introduced observability with SumoLogic and Sentry.",
        "Supported developers; improved deployment lead time.",
      ],
    },
    {
      role: "Junior Software Engineer (Backend/DevOps)",
      company: "Ananas E‑Commerce",
      period: "May 2022 – Sep 2022",
      bullets: [
        "Contributed to backend services and internal automation.",
        "Helped evolve CI/CD pipelines and testing workflows.",
      ],
    },
    {
      role: "Junior Developer",
      company: "Ananas E‑Commerce",
      period: "Nov 2021 – May 2022",
      bullets: [
        "Built internal web tools and reusable UI components.",
        "Integrated Algolia search to speed up discovery.",
      ],
    },
  ],
  projects: [
    {
      name: "EKS GitOps Platform",
      desc:
        "Cluster-level GitOps with Argo CD: app-of-apps pattern, environment segregation (dev/stage/prod), and automated rollbacks.",
    },
    {
      name: "Infra-as-Code Foundation",
      desc:
        "Terraform modules for AWS accounts, VPC, EKS, IAM roles, and cost guardrails; reusable for multiple teams.",
    },
  ],
};

const Caret = ({ theme }) => (
  <span
    className={`inline-block w-2 h-5 align-text-bottom ml-0.5 ${
      theme === "dark" ? "bg-green-400" : "bg-zinc-800"
    } animate-pulse`}
  />
);

// Typewriter component for realistic typing effect
const TypeWriter = ({ text, speed = 30, onComplete, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) {
      onComplete?.();
      return;
    }

    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
        setTimeout(() => onComplete?.(), 100);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  if (typeof text !== 'string') {
    // If text is JSX/component, render it directly
    useEffect(() => {
      onComplete?.();
    }, [onComplete]);
    return <div className={className}>{text}</div>;
  }

  return (
    <div className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </div>
  );
};

const Prompt = ({ theme }) => (
  <span className="mr-2 select-none">
    <span className={theme === "dark" ? "text-green-400" : "text-zinc-800"}>uros@devcraft</span>
    <span className="text-zinc-500">:</span>
    <span className={theme === "dark" ? "text-cyan-400" : "text-zinc-700"}>~/portfolio</span>
    <span className="text-zinc-500">$</span>
  </span>
);

const asList = (items) => (
  <ul className="list-disc pl-5 space-y-1">
    {items.map((i, idx) => (
      <li key={idx}>{i}</li>
    ))}
  </ul>
);

const renderBanner = () => (
  <pre className="whitespace-pre-wrap leading-5">
{String.raw`  __  __           _      ____       _      _      _      
 |  \/  | ___  _| |_ ___/ __ \ ___ | | ___| | ___| | ___ 
 | |\/| |/ _ \| | __/ _ \ / _\` |/ _ \| |/ _ \ |/ _ \ |/ _ \
 | |  | | (_) | | ||  __/ | (_| | (_) | |  __/ |  __/ |  __/
 |_|  |_|\___/|_|\__\___|  \__,_|\___/|_|\___|_|\___|_|\___|
`}
    <span className="block mt-2 text-sm text-zinc-400">
      {PROFILE.name} — {PROFILE.title}
    </span>
  </pre>
);

const renderAbout = () => (
  <div className="space-y-2">
    <p>{PROFILE.summary}</p>
    <p>
      <b>Location:</b> {PROFILE.location} · <b>Email:</b>{" "}
      <a className="underline" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a> · <b>Phone:</b> {PROFILE.phone}
    </p>
  </div>
);

const renderSkills = (args = []) => {
  const category = args[0]?.toLowerCase();
  
  if (category) {
    const skillCategories = Object.keys(PROFILE.skills).map(k => k.toLowerCase().replace("_", "/"));
    const matchedKey = Object.keys(PROFILE.skills).find(k => 
      k.toLowerCase().replace("_", "/").includes(category)
    );
    
    if (matchedKey) {
      return (
        <div>
          <span className="font-semibold">{matchedKey.replace("_", "/")}: </span>
          <span className="text-zinc-200/90 dark:text-zinc-300">{PROFILE.skills[matchedKey].join(", ")}</span>
        </div>
      );
    } else {
      return (
        <div>
          Category '{category}' not found. Available: {skillCategories.join(", ")}
        </div>
      );
    }
  }

  return (
    <div className="space-y-2">
      {Object.entries(PROFILE.skills).map(([k, v]) => (
        <div key={k}>
          <span className="font-semibold">{k.replace("_", "/")}: </span>
          <span className="text-zinc-200/90 dark:text-zinc-300">{v.join(", ")}</span>
        </div>
      ))}
    </div>
  );
};

const renderExperience = (args = []) => {
  const recent = args.includes("--recent") || args.includes("-r");
  const experiences = recent ? PROFILE.experience.slice(0, 2) : PROFILE.experience;
  
  return (
    <div className="space-y-4">
      {experiences.map((e, i) => (
        <div key={i}>
          <div className="font-semibold">
            {e.role} — {e.company} <span className="text-zinc-500">({e.period})</span>
          </div>
          {asList(e.bullets)}
        </div>
      ))}
      {recent && (
        <div className="text-zinc-500 text-sm">
          Showing recent experience only. Use 'experience' for full history.
        </div>
      )}
    </div>
  );
};

const renderProjects = () => (
  <div className="space-y-3">
    {PROFILE.projects.map((p, i) => (
      <div key={i}>
        <div className="font-semibold">{p.name}</div>
        <p className="text-zinc-200/90 dark:text-zinc-300">{p.desc}</p>
      </div>
    ))}
  </div>
);

const renderLinks = () => (
  <div className="flex flex-wrap gap-4 items-center">
    <a className="inline-flex items-center gap-2 underline" href={PROFILE.github} target="_blank" rel="noreferrer">
      <Github className="w-4 h-4" /> github.com/urosorolicki
    </a>
    <a className="inline-flex items-center gap-2 underline" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
      <Linkedin className="w-4 h-4" /> linkedin.com/in/urosorolicki
    </a>
    <a className="inline-flex items-center gap-2 underline" href={`mailto:${PROFILE.email}`}>
      <Mail className="w-4 h-4" /> {PROFILE.email}
    </a>
  </div>
);

const renderDownload = () => (
  <div>
    <a href={PROFILE.cv} download className="inline-flex items-center gap-2 underline">
      <Download className="w-4 h-4" /> Download CV
    </a>
  </div>
);

const renderHelp = () => (
  <div className="space-y-1">
    <div>Available commands:</div>
    {asList([
      "help — show available commands",
      "banner — show ASCII banner",
      "about — short profile and contact",
      "skills [category] — tech stack (try: skills cloud)",
      "experience [--recent] — work history",
      "projects — highlights",
      "links — GitHub/LinkedIn/E-mail",
      "download-cv — download my CV",
      "",
      "Terminal commands:",
      "whoami — current user",
      "pwd — current directory", 
      "ls [-l] — list files",
      "cat <file> — display file contents",
      "grep <pattern> — search for pattern",
      "",
      "Fun stuff:",
      "matrix — enter the matrix",
      "quote — random programming quote",
      "theme — toggle light/dark",
      "clear — clear screen",
    ])}
    <div className="text-xs text-zinc-500 mt-2">
      Tip: Use ↑/↓ to navigate command history. Press Tab to autocomplete.
      <br />Try: skills cloud, experience --recent, cat README.md, ls -l
    </div>
  </div>
);

export default function PortfolioTerminal() {
  const [theme, setTheme] = useState(() => (
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  ));
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState(() => {
    // Load history from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("terminal-history");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [pointer, setPointer] = useState(-1);
  const [lines, setLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const idRef = useRef(0);
  const scrollerRef = useRef(null);
  const inputRef = useRef(null);

  // Focus input when terminal is clicked (especially useful on mobile)
  const handleTerminalClick = useCallback(() => {
    if (inputRef.current && !inputDisabled) {
      inputRef.current.focus();
    }
  }, [inputDisabled]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("terminal-history", JSON.stringify(history));
    }
  }, [history]);

  const COMMANDS = useMemo(
    () => ({
      help: () => renderHelp(),
      banner: () => renderBanner(),
      about: () => renderAbout(),
      skills: (args) => renderSkills(args),
      experience: (args) => renderExperience(args),
      projects: () => renderProjects(),
      links: () => renderLinks(),
      "download-cv": () => renderDownload(),
      // New terminal-like commands
      whoami: () => <div>{PROFILE.name.toLowerCase().replace(" ", "")}</div>,
      pwd: () => <div>/home/{PROFILE.name.toLowerCase().replace(" ", "")}/portfolio</div>,
      ls: (args) => {
        const files = ["README.md", "skills.txt", "experience.json", "projects.md", "contacts.vcf"];
        const showDetails = args.includes("-l") || args.includes("--long");
        if (showDetails) {
          return (
            <div className="font-mono">
              <div>total {files.length}</div>
              {files.map((file, i) => (
                <div key={i}>
                  -rw-r--r-- 1 {PROFILE.name.toLowerCase().replace(" ", "")} staff {Math.floor(Math.random() * 9999 + 1000)} Oct {21 - i} 12:3{i} {file}
                </div>
              ))}
            </div>
          );
        }
        return <div className="flex flex-wrap gap-4">{files.map((f, i) => <span key={i} className="text-cyan-400">{f}</span>)}</div>;
      },
      cat: (args) => {
        if (!args.length) return <div>cat: missing file operand</div>;
        const file = args[0];
        switch (file) {
          case "skills.txt":
            return renderSkills();
          case "experience.json":
            return <pre className="text-xs overflow-auto">{JSON.stringify(PROFILE.experience, null, 2)}</pre>;
          case "README.md":
            return (
              <div>
                <h1 className="text-xl font-bold mb-2"># {PROFILE.name}</h1>
                <p>{PROFILE.summary}</p>
                <p className="mt-2">## Quick Start</p>
                <p>Type `help` to see available commands.</p>
              </div>
            );
          default:
            return <div>cat: {file}: No such file or directory</div>;
        }
      },
      grep: (args) => {
        if (args.length < 1) return <div>grep: missing search pattern</div>;
        const pattern = args[0].toLowerCase();
        const results = [];
        
        // Search through skills
        Object.entries(PROFILE.skills).forEach(([category, skills]) => {
          skills.forEach(skill => {
            if (skill.toLowerCase().includes(pattern)) {
              results.push(`skills.txt:${category}: ${skill}`);
            }
          });
        });
        
        // Search through experience
        PROFILE.experience.forEach((exp, i) => {
          if (exp.role.toLowerCase().includes(pattern) || 
              exp.company.toLowerCase().includes(pattern) ||
              exp.bullets.some(bullet => bullet.toLowerCase().includes(pattern))) {
            results.push(`experience.json:${i}: ${exp.role} at ${exp.company}`);
          }
        });
        
        return results.length > 0 ? (
          <div>{results.map((r, i) => <div key={i} className="text-yellow-400">{r}</div>)}</div>
        ) : (
          <div>grep: no matches found</div>
        );
      },
      // Easter eggs
      matrix: () => {
        const chars = "01";
        const matrix = Array.from({ length: 10 }, () => 
          Array.from({ length: 50 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
        );
        return (
          <div className="text-green-400 font-mono text-xs leading-tight">
            {matrix.map((row, i) => <div key={i}>{row}</div>)}
          </div>
        );
      },
      quote: () => {
        const quotes = [
          "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
          "\"The best error message is the one that never shows up.\" - Thomas Fuchs",
          "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" - Martin Fowler",
          "\"DevOps is not a team, it's a mindset.\" - Anonymous",
        ];
        return <div className="italic text-zinc-400">{quotes[Math.floor(Math.random() * quotes.length)]}</div>;
      },
      theme: () => {
        setTheme(t => t === "dark" ? "light" : "dark");
        return (
          <div>
            Theme toggled. Current: <b>{theme === "dark" ? "light" : "dark"}</b>
          </div>
        );
      },
      clear: () => null,
    }),
    [theme]
  );

  // --- lightweight self-test to catch regressions (runs once in dev) ---
  useEffect(() => {
    try {
      const required = [
        "help",
        "banner",
        "about",
        "skills",
        "experience",
        "projects",
        "links",
        "download-cv",
        "theme",
        "clear",
      ];
      required.forEach((k) => {
        // eslint-disable-next-line no-console
        console.assert(typeof COMMANDS[k] === "function", `Missing command: ${k}`);
      });
    } catch (_) {}
  }, [COMMANDS]);

  useEffect(() => {
    pushOutput(renderBanner());
    pushOutput(
      <div className="mt-1">
        Type <code>help</code> to get started.
      </div>
    );
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const knownCommands = useMemo(() => Object.keys(COMMANDS), [COMMANDS]);

  function pushOutput(node, useTypewriter = false) {
    const lineId = ++idRef.current;
    setLines((prev) => [...prev, { id: lineId, node, useTypewriter, isTyping: useTypewriter }]);
    
    if (useTypewriter) {
      setIsTyping(true);
      setInputDisabled(true);
    }
  }

  const onTypewriterComplete = useCallback((lineId) => {
    setLines(prev => prev.map(line => 
      line.id === lineId ? { ...line, isTyping: false } : line
    ));
    setIsTyping(false);
    setInputDisabled(false);
  }, []);

  function parseCommand(cmdString) {
    // Simple command parsing - splits on spaces but respects quotes
    const args = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < cmdString.length; i++) {
      const char = cmdString[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === ' ' && !inQuotes) {
        if (current) {
          args.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }
    
    if (current) {
      args.push(current);
    }
    
    return {
      command: args[0]?.toLowerCase() || '',
      args: args.slice(1)
    };
  }

  function onRun(cmdRaw) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    // echo command
    pushOutput(
      <div className="flex items-start">
        <Prompt theme={theme} />
        <span className="whitespace-pre-wrap break-words">{cmd}</span>
      </div>
    );

    setHistory((h) => (h[h.length - 1] === cmd ? h : [...h, cmd]));
    setPointer(-1);
    setInput("");

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const { command, args } = parseCommand(cmd);
    const fn = COMMANDS[command];
    
    if (fn) {
      const output = fn(args);
      if (output) {
        // Use typewriter for certain commands
        const useTypewriter = ['about', 'quote', 'cat'].includes(command);
        pushOutput(output, useTypewriter);
      }
    } else {
      pushOutput(
        <div>
          Command not found: <b>{command}</b>. Try <code>help</code>.
        </div>
      );
    }
  }

  function onKeyDown(e) {
    if (inputDisabled) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter") {
      onRun(input);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setPointer((p) => {
        const next = p === -1 ? history.length - 1 : Math.max(0, p - 1);
        setInput(history[next] ?? "");
        return next;
      });
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setPointer((p) => {
        const next = p < history.length - 1 ? p + 1 : -1;
        setInput(next === -1 ? "" : history[next]);
        return next;
      });
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const words = input.split(' ');
      const currentWord = words[words.length - 1];
      
      if (words.length === 1) {
        // Autocomplete command
        const matches = knownCommands.filter(c => c.startsWith(currentWord));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          // Show available options
          pushOutput(
            <div className="text-zinc-500">
              Available: {matches.join(', ')}
            </div>
          );
        }
      } else {
        // Autocomplete arguments for specific commands
        const command = words[0];
        if (command === 'skills') {
          const categories = Object.keys(PROFILE.skills).map(k => k.toLowerCase().replace('_', '/'));
          const matches = categories.filter(c => c.startsWith(currentWord.toLowerCase()));
          if (matches.length === 1) {
            words[words.length - 1] = matches[0];
            setInput(words.join(' '));
          }
        } else if (command === 'cat') {
          const files = ['README.md', 'skills.txt', 'experience.json'];
          const matches = files.filter(f => f.startsWith(currentWord));
          if (matches.length === 1) {
            words[words.length - 1] = matches[0];
            setInput(words.join(' '));
          }
        }
      }
    }
  }

  return (
    <div className="min-h-dvh w-full bg-zinc-50 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Top bar */}
      <div className="mx-auto max-w-4xl px-4 pt-6 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalSquare className="w-5 h-5" />
          <div className="font-semibold tracking-tight">{PROFILE.name}</div>
          <div className="text-zinc-500">— {PROFILE.title}</div>
        </div>
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800/10 dark:border-zinc-100/10 px-3 py-1.5 text-sm hover:bg-zinc-800/5 dark:hover:bg-white/5"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Theme
        </button>
      </div>

      {/* Terminal window */}
      <div className="mx-auto max-w-4xl px-2 sm:px-4 pb-10">
        <div className="rounded-2xl border border-zinc-800/10 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 shadow-xl backdrop-blur">
          {/* window chrome */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-zinc-800/10 dark:border-white/10">
            <div className="flex gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/90"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/90"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/90"></span>
            </div>
            <div className="ml-2 text-xs sm:text-sm text-zinc-500 truncate">
              {PROFILE.name.toLowerCase().replaceAll(" ", "-")}:~/portfolio — zsh
            </div>
          </div>

          {/* scrollable output */}
          <div
            ref={scrollerRef}
            onClick={handleTerminalClick}
            className="h-[50vh] sm:h-[60vh] lg:h-[65vh] overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm cursor-text"
          >
            <AnimatePresence initial={false}>
              {lines.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="leading-6"
                >
                  {l.useTypewriter ? (
                    <TypeWriter 
                      text={l.node}
                      speed={20}
                      onComplete={() => onTypewriterComplete(l.id)}
                    />
                  ) : (
                    l.node
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* input line */}
            <div className="flex items-start">
              <Prompt theme={theme} />
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={inputDisabled}
                  className={`w-full bg-transparent outline-none caret-transparent ${
                    inputDisabled ? 'opacity-50' : ''
                  }`}
                  autoFocus
                  aria-label="terminal input"
                />
                <div className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-words">
                  {input}
                  {!inputDisabled && <Caret theme={theme} />}
                  {inputDisabled && <span className="text-zinc-500 animate-pulse">_</span>}
                </div>
              </div>
            </div>
          </div>
          {/* END scrollable output */}
        </div>
        {/* END terminal card */}

        {/* Quick links under terminal */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs sm:text-sm">
          <a className="inline-flex items-center gap-1.5 underline touch-manipulation" href={PROFILE.github} target="_blank" rel="noreferrer">
            <Github className="w-3 h-3 sm:w-4 sm:h-4" /> GitHub
          </a>
          <a className="inline-flex items-center gap-1.5 underline touch-manipulation" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" /> LinkedIn
          </a>
          <a className="inline-flex items-center gap-1.5 underline touch-manipulation" href={`mailto:${PROFILE.email}`}>
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" /> Email
          </a>
          <a className="inline-flex items-center gap-1.5 underline touch-manipulation" href={PROFILE.cv} download>
            <Download className="w-3 h-3 sm:w-4 sm:h-4" /> CV
          </a>
        </div>
        
        {/* Mobile helper text */}
        <div className="block sm:hidden mt-4 text-xs text-zinc-500 text-center">
          <div>Tap terminal to focus. Use virtual keyboard.</div>
          <div className="mt-1">Try: help, about, skills cloud</div>
        </div>
      </div>
      {/* END outer container padding */}
    </div>
  );
}
