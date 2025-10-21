import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Head from 'next/head';

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
    style={{
      display: 'inline-block',
      width: '8px',
      height: '20px',
      backgroundColor: '#4ade80',
      marginLeft: '2px',
      animation: 'blink 1s infinite'
    }}
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

    // If text is not a string (JSX element), render directly without typewriter
    if (typeof text !== 'string') {
      setIsComplete(true);
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

  // If text is JSX element, render it directly
  if (typeof text !== 'string') {
    return <div>{text}</div>;
  }

  return (
    <div>
      <span style={{ whiteSpace: 'pre-wrap' }}>{displayText}</span>
      {!isComplete && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
    </div>
  );
};

const Prompt = ({ theme }) => (
  <span style={{ marginRight: '8px', userSelect: 'none' }}>
    <span style={{ color: '#4ade80' }}>uros@devcraft</span>
    <span style={{ color: '#666' }}>:</span>
    <span style={{ color: '#67e8f9' }}>~/portfolio</span>
    <span style={{ color: '#666' }}>$</span>
  </span>
);

const asList = (items) => (
  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
    {items.map((i, idx) => (
      <li key={idx} style={{ marginBottom: '4px' }}>{i}</li>
    ))}
  </ul>
);

const renderBanner = () => (
  <pre style={{ whiteSpace: 'pre-wrap', lineHeight: '1.2' }}>
{String.raw`  __  __           _      ____       _      _      _      
 |  \/  | ___  _| |_ ___/ __ \ ___ | | ___| | ___| | ___ 
 | |\/| |/ _ \| | __/ _ \ / _\` |/ _ \| |/ _ \ |/ _ \ |/ _ \
 | |  | | (_) | | ||  __/ | (_| | (_) | |  __/ |  __/ |  __/
 |_|  |_|\___/|_|\__\___|  \__,_|\___/|_|\___|_|\___|_|\___|
`}
    <span style={{ display: 'block', marginTop: '8px', fontSize: '14px', color: '#888' }}>
      {PROFILE.name} — {PROFILE.title}
    </span>
  </pre>
);

const renderAbout = () => (
  <div>
    <p style={{ marginBottom: '8px' }}>{PROFILE.summary}</p>
    <p>
      <b>Location:</b> {PROFILE.location} · <b>Email:</b>{" "}
      <a style={{ textDecoration: 'underline', color: '#67e8f9' }} href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a> · <b>Phone:</b> {PROFILE.phone}
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
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      if (theme === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [theme, mounted]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [pointer, setPointer] = useState(-1);
  const [lines, setLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [showTouchHelper, setShowTouchHelper] = useState(false);
  const idRef = useRef(0);
  const scrollerRef = useRef(null);
  const inputRef = useRef(null);

  // Load history from localStorage after mount
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const saved = localStorage.getItem("terminal-history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    }
  }, [mounted]);

  // Detect mobile/touch devices
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                      ('ontouchstart' in window) || 
                      (window.innerWidth <= 768);
      setShowTouchHelper(isMobile);
    }
  }, [mounted]);

  // Focus input when terminal is clicked (especially useful on mobile)
  const handleTerminalClick = useCallback(() => {
    if (inputRef.current && !inputDisabled) {
      inputRef.current.focus();
    }
  }, [inputDisabled]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("terminal-history", JSON.stringify(history));
    }
  }, [history, mounted]);

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
            // Return plain text version of skills
            const skillsText = Object.entries(PROFILE.skills)
              .map(([category, skills]) => `${category.replace("_", "/")}: ${skills.join(", ")}`)
              .join("\n");
            return <pre className="whitespace-pre-wrap">{skillsText}</pre>;
            
          case "experience.json":
            return <pre className="text-xs overflow-auto whitespace-pre-wrap">{JSON.stringify(PROFILE.experience, null, 2)}</pre>;
            
          case "README.md":
            const readmeText = `# ${PROFILE.name}

${PROFILE.summary}

## Quick Start
Type \`help\` to see available commands.

## Skills
${Object.entries(PROFILE.skills).map(([k, v]) => `- ${k.replace("_", "/")}: ${v.join(", ")}`).join("\n")}

## Contact
- Email: ${PROFILE.email}
- Phone: ${PROFILE.phone}
- Location: ${PROFILE.location}`;
            return <pre className="whitespace-pre-wrap">{readmeText}</pre>;
            
          case "contacts.vcf":
            const vcfText = `BEGIN:VCARD
VERSION:3.0
FN:${PROFILE.name}
ORG:${PROFILE.title}
EMAIL:${PROFILE.email}
TEL:${PROFILE.phone}
ADR:;;${PROFILE.location};;;;
URL:${PROFILE.github}
URL:${PROFILE.linkedin}
END:VCARD`;
            return <pre className="whitespace-pre-wrap">{vcfText}</pre>;
            
          case "projects.md":
            const projectsText = `# Projects

${PROFILE.projects.map(p => `## ${p.name}
${p.desc}`).join("\n\n")}`;
            return <pre className="whitespace-pre-wrap">{projectsText}</pre>;
            
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

  useEffect(() => {
    if (mounted) {
      pushOutput(renderBanner());
      pushOutput(
        <div className="mt-1">
          Type <code>help</code> to get started.
        </div>
      );
    }
  }, [mounted]);

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
        // Use typewriter for text-based commands only
        const useTypewriter = ['about', 'quote'].includes(command);
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
        const matches = knownCommands.filter(c => c.startsWith(currentWord.toLowerCase()));
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          // Find common prefix
          let commonPrefix = matches[0];
          for (let i = 1; i < matches.length; i++) {
            while (!matches[i].startsWith(commonPrefix)) {
              commonPrefix = commonPrefix.slice(0, -1);
            }
          }
          
          if (commonPrefix.length > currentWord.length) {
            setInput(commonPrefix);
          } else {
            // Show all matches like real terminal
            pushOutput(
              <div className="grid grid-cols-3 gap-2 text-cyan-400">
                {matches.map((match, i) => (
                  <span key={i}>{match}</span>
                ))}
              </div>
            );
          }
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
          } else if (matches.length > 1) {
            pushOutput(
              <div className="flex flex-wrap gap-2 text-yellow-400">
                {matches.map((match, i) => (
                  <span key={i}>{match}</span>
                ))}
              </div>
            );
          }
        } else if (command === 'cat') {
          const files = ['README.md', 'skills.txt', 'experience.json', 'projects.md', 'contacts.vcf'];
          const matches = files.filter(f => f.toLowerCase().startsWith(currentWord.toLowerCase()));
          if (matches.length === 1) {
            words[words.length - 1] = matches[0];
            setInput(words.join(' '));
          } else if (matches.length > 1) {
            pushOutput(
              <div className="flex flex-wrap gap-2 text-cyan-400">
                {matches.map((match, i) => (
                  <span key={i}>{match}</span>
                ))}
              </div>
            );
          }
        }
      }
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-zinc-900" />; // Simple loading state
  }

  return (
    <>
      <Head>
        <title>{PROFILE.name} - {PROFILE.title}</title>
        <meta name="description" content={PROFILE.summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#000000', 
        color: '#ffffff',
        fontFamily: 'Consolas, Monaco, "Lucida Console", monospace',
        padding: '20px'
      }}>
        
        {/* Terminal window */}
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          border: '2px solid #333',
          backgroundColor: '#000'
        }}>
          {/* window chrome */}
          <div style={{
            padding: '10px',
            borderBottom: '1px solid #333',
            backgroundColor: '#111',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27ca3f' }}></span>
            </div>
            <span style={{ fontSize: '12px', color: '#888' }}>terminal</span>
          </div>

          {/* terminal content */}
          <div
            ref={scrollerRef}
            onClick={handleTerminalClick}
            className="terminal"
            style={{
              height: '500px',
              overflowY: 'auto',
              padding: '20px',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontFamily: 'Consolas, Monaco, "Lucida Console", monospace',
              fontSize: '14px',
              lineHeight: '1.3',
              fontWeight: 'normal',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            {lines.map((l) => (
              <div key={l.id} style={{ marginBottom: '4px' }}>
                {l.useTypewriter ? (
                  <TypeWriter 
                    text={l.node}
                    speed={20}
                    onComplete={() => onTypewriterComplete(l.id)}
                  />
                ) : (
                  l.node
                )}
              </div>
            ))}

            {/* input line */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Prompt theme={theme} />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={inputDisabled}
                style={{
                  flex: '1',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontFamily: 'Consolas, Monaco, "Lucida Console", monospace',
                  fontSize: '14px',
                  lineHeight: '1.3',
                  fontWeight: 'normal',
                  padding: '0',
                  margin: '0',
                  caretColor: '#4ade80',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  opacity: inputDisabled ? 0.5 : 1
                }}
                autoFocus
                aria-label="terminal input"
              />
            </div>
          </div>

          {/* touch helper */}
          {showTouchHelper && (
            <div style={{
              textAlign: 'center',
              padding: '10px',
              backgroundColor: '#111',
              fontSize: '12px',
              color: '#666'
            }}>
              <div>Tap terminal to focus. Use virtual keyboard.</div>
              <div style={{ marginTop: '5px' }}>Try: help, about, skills cloud</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}