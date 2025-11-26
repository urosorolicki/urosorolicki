import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

const ModernTerminalCV = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~');
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const commands = {
    help: {
      description: 'Show available commands',
      action: () => {
        return `
<div class="help-section">
  <div class="help-header">🚀 Available Commands:</div>
  <div class="command-list">
    <div class="command-item"><span class="cmd">about</span> - Learn about Uroš Orolicki</div>
    <div class="command-item"><span class="cmd">experience</span> - Professional experience</div>
    <div class="command-item"><span class="cmd">skills</span> - Technical skills & expertise</div>
    <div class="command-item"><span class="cmd">projects</span> - Featured projects</div>
    <div class="command-item"><span class="cmd">contact</span> - Get in touch</div>
    <div class="command-item"><span class="cmd">resume</span> - Download resume</div>
    <div class="command-item"><span class="cmd">clear</span> - Clear terminal</div>
    <div class="command-item"><span class="cmd">modern</span> - Switch to modern portfolio</div>
  </div>
</div>`;
      }
    },

    about: {
      description: 'Learn about Uroš Orolicki',
      action: () => {
        return `
<div class="about-section">
  <div class="profile-header">
    <div class="avatar">UO</div>
    <div class="profile-info">
      <h2 class="name">Uroš Orolicki</h2>
      <div class="title">Data DevOps Engineer & Cloud Infrastructure Specialist</div>
    </div>
  </div>
  
  <div class="bio">
    <p>🚀 Passionate DevOps Engineer with 4+ years of experience in cloud infrastructure and automation.</p>
    <p>☁️ Specializing in AWS, Kubernetes (EKS), Terraform, and GitOps with ArgoCD.</p>
    <p>🏦 Experience in enterprise banking infrastructure and data analytics platforms.</p>
    <p>🛠️ Expert in CI/CD automation, infrastructure as code, and observability solutions.</p>
  </div>

  <div class="stats-grid">
    <div class="stat"><span class="number">4+</span><span class="label">Years Experience</span></div>
    <div class="stat"><span class="number">3</span><span class="label">Major Companies</span></div>
    <div class="stat"><span class="number">Banking</span><span class="label">& Data Analytics</span></div>
  </div>
</div>`;
      }
    },

    experience: {
      description: 'Show professional experience',
      action: () => {
        return `
<div class="experience-section">
  <div class="job">
    <div class="job-header">
      <div class="period">Sep 2025 - Nov 2025</div>
      <div class="position">Data DevOps Engineer</div>
      <div class="company">BlueGrid.io · Part-time</div>
    </div>
    <div class="job-content">
      <p>Working with a data analytics and media intelligence platform focused on large-scale data processing and cloud automation.</p>
      <ul class="achievements">
        <li>✓ Designed and automated multi-account AWS infrastructure using Terraform Cloud with OIDC authentication</li>
        <li>✓ Built and maintained Kubernetes (EKS) clusters for data pipelines using Helm and ArgoCD</li>
        <li>✓ Implemented Elastic ECK stack with role-based security and snapshot automation</li>
        <li>✓ Set up comprehensive observability with New Relic and Metricbeat dashboards</li>
        <li>✓ Enhanced networking and VPC topology across environments for scalable data ingestion</li>
      </ul>
    </div>
  </div>

  <div class="job">
    <div class="job-header">
      <div class="period">Nov 2023 - Aug 2025</div>
      <div class="position">Cloud DevOps Engineer</div>
      <div class="company">Raiffeisen banka a.d. Beograd · Full-time</div>
    </div>
    <div class="job-content">
      <p>Managing AWS infrastructure across diverse accounts, optimizing resources for banking services.</p>
      <ul class="achievements">
        <li>✓ Implemented Argo CD for continuous delivery within Kubernetes clusters</li>
        <li>✓ Deployed and managed Kubernetes clusters for critical banking operations</li>
        <li>✓ Executed cloud migration strategies ensuring security and compliance</li>
        <li>✓ Automated deployment pipelines using Terraform, reducing deployment times</li>
        <li>✓ Optimized workflows and enhanced team productivity during cloud migration</li>
      </ul>
    </div>
  </div>

  <div class="job">
    <div class="job-header">
      <div class="period">Sep 2022 - Nov 2023</div>
      <div class="position">DevOps Engineer</div>
      <div class="company">Ananas E-commerce · Full-time</div>
    </div>
    <div class="job-content">
      <p>Daily support tasks for developers working with AWS, Kubernetes, and automation tools.</p>
      <ul class="achievements">
        <li>✓ Created several CI/CD pipelines using GitHub Actions and ArgoCD</li>
        <li>✓ Maintained infrastructure and microservices used daily</li>
        <li>✓ Monitored platform performance through SumoLogic and Sentry</li>
        <li>✓ Worked extensively with Terraform, Argo Workflows, and Kubernetes</li>
      </ul>
    </div>
  </div>

  <div class="job">
    <div class="job-header">
      <div class="period">May 2022 - Sep 2022</div>
      <div class="position">Junior Software Engineer - Backend/DevOps</div>
      <div class="company">Ananas E-commerce</div>
    </div>
    <div class="job-content">
      <p>Started as Junior Developer and transitioned to backend/DevOps role.</p>
      <ul class="achievements">
        <li>✓ Gained experience with CI/CD, PostgreSQL, and DevOps practices</li>
        <li>✓ Supported development team with infrastructure tasks</li>
        <li>✓ Learned foundations of cloud technologies and automation</li>
      </ul>
    </div>
  </div>

  <div class="job">
    <div class="job-header">
      <div class="period">Nov 2021 - May 2022</div>
      <div class="position">Junior Developer</div>
      <div class="company">Ananas E-commerce</div>
    </div>
    <div class="job-content">
      <p>Entry-level position where I started my professional journey in tech.</p>
      <ul class="achievements">
        <li>✓ Learned software development fundamentals</li>
        <li>✓ Gained experience with version control and team collaboration</li>
        <li>✓ Developed foundation for DevOps career path</li>
      </ul>
    </div>
  </div>
</div>`;
      }
    },

    skills: {
      description: 'Show technical skills',
      action: () => {
        return `
<div class="skills-section">
  <div class="skill-category">
    <div class="category-title">☁️ Cloud Platforms</div>
    <div class="skill-list">
      <div class="skill-item"><span class="skill-name">AWS</span><div class="skill-bar"><div class="skill-fill" style="width: 95%"></div></div><span class="skill-percent">95%</span></div>
      <div class="skill-item"><span class="skill-name">Azure</span><div class="skill-bar"><div class="skill-fill" style="width: 85%"></div></div><span class="skill-percent">85%</span></div>
      <div class="skill-item"><span class="skill-name">GCP</span><div class="skill-bar"><div class="skill-fill" style="width: 80%"></div></div><span class="skill-percent">80%</span></div>
    </div>
  </div>

  <div class="skill-category">
    <div class="category-title">🐳 Containerization</div>
    <div class="skill-list">
      <div class="skill-item"><span class="skill-name">Docker</span><div class="skill-bar"><div class="skill-fill" style="width: 95%"></div></div><span class="skill-percent">95%</span></div>
      <div class="skill-item"><span class="skill-name">Kubernetes</span><div class="skill-bar"><div class="skill-fill" style="width: 90%"></div></div><span class="skill-percent">90%</span></div>
      <div class="skill-item"><span class="skill-name">Helm</span><div class="skill-bar"><div class="skill-fill" style="width: 85%"></div></div><span class="skill-percent">85%</span></div>
    </div>
  </div>

  <div class="skill-category">
    <div class="category-title">🏗️ Infrastructure as Code</div>
    <div class="skill-list">
      <div class="skill-item"><span class="skill-name">Terraform</span><div class="skill-bar"><div class="skill-fill" style="width: 95%"></div></div><span class="skill-percent">95%</span></div>
      <div class="skill-item"><span class="skill-name">Ansible</span><div class="skill-bar"><div class="skill-fill" style="width: 90%"></div></div><span class="skill-percent">90%</span></div>
      <div class="skill-item"><span class="skill-name">CloudFormation</span><div class="skill-bar"><div class="skill-fill" style="width: 85%"></div></div><span class="skill-percent">85%</span></div>
    </div>
  </div>

  <div class="skill-category">
    <div class="category-title">🔧 CI/CD & Monitoring</div>
    <div class="skill-list">
      <div class="skill-item"><span class="skill-name">Jenkins</span><div class="skill-bar"><div class="skill-fill" style="width: 90%"></div></div><span class="skill-percent">90%</span></div>
      <div class="skill-item"><span class="skill-name">GitLab CI</span><div class="skill-bar"><div class="skill-fill" style="width: 95%"></div></div><span class="skill-percent">95%</span></div>
      <div class="skill-item"><span class="skill-name">Prometheus</span><div class="skill-bar"><div class="skill-fill" style="width: 90%"></div></div><span class="skill-percent">90%</span></div>
    </div>
  </div>
</div>`;
      }
    },

    projects: {
      description: 'Show featured projects',
      action: () => {
        return `
<div class="projects-section">
  <div class="project">
    <div class="project-header">
      <div class="project-icon">📊</div>
      <div class="project-title">BlueGrid.io Data Analytics Platform</div>
    </div>
    <div class="project-description">
      Designed and automated multi-account AWS infrastructure for large-scale data processing and media intelligence platform.
    </div>
    <div class="project-metrics">
      <span class="metric">Multi-Account AWS</span>
      <span class="metric">OIDC Authentication</span>
      <span class="metric">Data Pipeline Automation</span>
    </div>
    <div class="tech-stack">
      <span class="tech">Terraform Cloud</span>
      <span class="tech">EKS</span>
      <span class="tech">ArgoCD</span>
      <span class="tech">Elastic ECK</span>
      <span class="tech">New Relic</span>
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <div class="project-icon">🏦</div>
      <div class="project-title">Raiffeisen Bank Cloud Migration</div>
    </div>
    <div class="project-description">
      Led cloud migration strategies for critical banking systems, ensuring security, compliance, and high availability on AWS.
    </div>
    <div class="project-metrics">
      <span class="metric">Banking Compliance</span>
      <span class="metric">High Availability</span>
      <span class="metric">Automated Deployments</span>
    </div>
    <div class="tech-stack">
      <span class="tech">AWS Multi-Account</span>
      <span class="tech">Kubernetes</span>
      <span class="tech">ArgoCD</span>
      <span class="tech">Terraform</span>
      <span class="tech">Cortex</span>
      <span class="tech">Datadog</span>
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <div class="project-icon">🛒</div>
      <div class="project-title">Ananas E-commerce Infrastructure</div>
    </div>
    <div class="project-description">
      Built and maintained microservices infrastructure with comprehensive CI/CD pipelines and monitoring solutions.
    </div>
    <div class="project-metrics">
      <span class="metric">Microservices</span>
      <span class="metric">GitHub Actions</span>
      <span class="metric">24/7 Monitoring</span>
    </div>
    <div class="tech-stack">
      <span class="tech">AWS</span>
      <span class="tech">Kubernetes</span>
      <span class="tech">Argo Workflows</span>
      <span class="tech">SumoLogic</span>
      <span class="tech">Sentry</span>
      <span class="tech">PostgreSQL</span>
    </div>
  </div>
</div>`;
      }
    },

    contact: {
      description: 'Get contact information',
      action: () => {
        return `
<div class="contact-section">
  <div class="contact-header">
    <h3>📬 Let's Connect</h3>
    <p>Ready to discuss your next DevOps project?</p>
  </div>

  <div class="contact-methods">
    <div class="contact-item">
      <div class="contact-icon">📧</div>
      <div class="contact-details">
        <div class="contact-label">Email</div>
        <div class="contact-value">uros.orolicki@example.com</div>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-icon">💼</div>
      <div class="contact-details">
        <div class="contact-label">LinkedIn</div>
        <div class="contact-value">linkedin.com/in/urosorolicki</div>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-icon">🐙</div>
      <div class="contact-details">
        <div class="contact-label">GitHub</div>
        <div class="contact-value">github.com/urosorolicki</div>
      </div>
    </div>

    <div class="contact-item">
      <div class="contact-icon">📍</div>
      <div class="contact-details">
        <div class="contact-label">Location</div>
        <div class="contact-value">Serbia (Remote Available)</div>
      </div>
    </div>
  </div>
</div>`;
      }
    },

    resume: {
      description: 'Download resume',
      action: () => {
        return `
<div class="resume-section">
  <div class="resume-header">
    <div class="resume-icon">📄</div>
    <h3>Resume Download</h3>
  </div>
  <p>Click the link below to download my latest resume:</p>
  <a href="/Uros_Orolicki_CV.pdf" target="_blank" class="download-link">
    📥 Download Resume (PDF)
  </a>
</div>`;
      }
    },

    clear: {
      description: 'Clear the terminal',
      action: () => {
        setHistory([]);
        return null;
      }
    },

    modern: {
      description: 'Switch to modern portfolio',
      action: () => {
        window.location.href = '/modern-cv';
        return 'Redirecting to modern portfolio...';
      }
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newEntry = {
      command: cmd,
      output: null,
      timestamp: new Date().toLocaleTimeString()
    };

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd].action();
      if (output !== null) {
        newEntry.output = output;
      }
    } else {
      newEntry.output = `<div class="error">Command '${cmd}' not found. Type 'help' for available commands.</div>`;
    }

    if (trimmedCmd !== 'clear') {
      setHistory(prev => [...prev, newEntry]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Show welcome message
    const welcomeMessage = {
      command: 'welcome',
      output: `
<div class="welcome-section">
  <div class="welcome-header">
    <div class="terminal-title">🚀 Uroš Orolicki - DevOps Engineer Terminal</div>
    <div class="welcome-subtitle">Welcome to my interactive CV terminal!</div>
  </div>
  <div class="welcome-content">
    <p>Type <span class="highlight">help</span> to see available commands.</p>
    <p>Navigate through my professional experience using terminal commands.</p>
  </div>
</div>`,
      timestamp: new Date().toLocaleTimeString()
    };
    setHistory([welcomeMessage]);
  }, []);

  return (
    <>
      <Head>
        <title>Uroš Orolicki - DevOps Engineer Terminal</title>
        <meta name="description" content="Interactive Terminal CV - DevOps Engineer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-controls">
              <div className="control red"></div>
              <div className="control yellow"></div>
              <div className="control green"></div>
            </div>
            <div className="terminal-title">uroš@portfolio:~</div>
            <div className="terminal-actions">
              <button 
                onClick={() => window.location.href = '/modern-cv'}
                className="modern-btn"
                title="Switch to Modern Portfolio"
              >
                Modern View
              </button>
            </div>
          </div>

          <div className="terminal-body" ref={outputRef}>
            <div className="terminal-content">
              {history.map((entry, index) => (
                <div key={index} className="terminal-entry">
                  {entry.command !== 'welcome' && (
                    <div className="command-line">
                      <span className="prompt">
                        <span className="user">uroš</span>
                        <span className="separator">@</span>
                        <span className="host">portfolio</span>
                        <span className="separator">:</span>
                        <span className="path">{currentPath}</span>
                        <span className="prompt-symbol">$</span>
                      </span>
                      <span className="command-text">{entry.command}</span>
                    </div>
                  )}
                  {entry.output && (
                    <div 
                      className="command-output" 
                      dangerouslySetInnerHTML={{ __html: entry.output }} 
                    />
                  )}
                </div>
              ))}

              <div className="input-line">
                <span className="prompt">
                  <span className="user">uroš</span>
                  <span className="separator">@</span>
                  <span className="host">portfolio</span>
                  <span className="separator">:</span>
                  <span className="path">{currentPath}</span>
                  <span className="prompt-symbol">$</span>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="terminal-input"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .terminal-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            font-family: 'JetBrains Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          }

          .terminal-window {
            width: 100%;
            max-width: 1000px;
            max-height: 90vh;
            background: #1e293b;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid #334155;
          }

          .terminal-header {
            background: #334155;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #475569;
          }

          .terminal-controls {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }

          .control {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }

          .control.red { background: #ef4444; }
          .control.yellow { background: #f59e0b; }
          .control.green { background: #10b981; }

          .terminal-title {
            color: #e2e8f0;
            font-weight: 500;
            font-size: 0.9rem;
          }

          .terminal-actions {
            display: flex;
            gap: 1rem;
          }

          .modern-btn {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
          }

          .modern-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }

          .terminal-body {
            height: 70vh;
            overflow-y: auto;
            padding: 1.5rem;
            background: #1e293b;
          }

          .terminal-body::-webkit-scrollbar {
            width: 8px;
          }

          .terminal-body::-webkit-scrollbar-track {
            background: #334155;
          }

          .terminal-body::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 4px;
          }

          .terminal-body::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }

          .terminal-entry {
            margin-bottom: 1rem;
          }

          .command-line {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .input-line {
            display: flex;
            align-items: center;
          }

          .prompt {
            display: flex;
            align-items: center;
            margin-right: 0.5rem;
            flex-shrink: 0;
          }

          .user {
            color: #10b981;
            font-weight: 600;
          }

          .separator {
            color: #64748b;
            margin: 0 0.1rem;
          }

          .host {
            color: #3b82f6;
            font-weight: 600;
          }

          .path {
            color: #8b5cf6;
            font-weight: 500;
          }

          .prompt-symbol {
            color: #e2e8f0;
            margin-left: 0.3rem;
            font-weight: bold;
          }

          .command-text {
            color: #e2e8f0;
            font-weight: 500;
          }

          .terminal-input {
            background: transparent;
            border: none;
            color: #e2e8f0;
            font-family: inherit;
            font-size: 1rem;
            outline: none;
            width: 100%;
            caret-color: #3b82f6;
          }

          .command-output {
            margin-left: 1rem;
            padding: 1rem 0;
            border-left: 2px solid #334155;
            padding-left: 1rem;
          }

          /* Welcome Section */
          .welcome-section {
            padding: 1rem 0;
          }

          .welcome-header {
            margin-bottom: 1.5rem;
          }

          .terminal-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 0.5rem;
          }

          .welcome-subtitle {
            color: #94a3b8;
            font-size: 1rem;
          }

          .welcome-content p {
            color: #e2e8f0;
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }

          .highlight {
            background: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-weight: 600;
          }

          /* Help Section */
          .help-section {
            padding: 1rem 0;
          }

          .help-header {
            font-size: 1.2rem;
            font-weight: 600;
            color: #3b82f6;
            margin-bottom: 1rem;
          }

          .command-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 0.5rem;
          }

          .command-item {
            padding: 0.5rem;
            background: rgba(59, 130, 246, 0.05);
            border-radius: 6px;
            border: 1px solid rgba(59, 130, 246, 0.1);
          }

          .cmd {
            color: #60a5fa;
            font-weight: 600;
            margin-right: 0.5rem;
          }

          /* About Section */
          .about-section {
            padding: 1.5rem 0;
          }

          .profile-header {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: rgba(59, 130, 246, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(59, 130, 246, 0.1);
          }

          .avatar {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.8rem;
            font-weight: 700;
          }

          .name {
            color: #3b82f6;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
          }

          .title {
            color: #94a3b8;
            font-size: 1.1rem;
            font-weight: 500;
          }

          .bio {
            margin-bottom: 2rem;
          }

          .bio p {
            color: #e2e8f0;
            line-height: 1.7;
            margin-bottom: 0.8rem;
            font-size: 1.05rem;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          .stat {
            text-align: center;
            padding: 1rem;
            background: rgba(139, 92, 246, 0.05);
            border-radius: 8px;
            border: 1px solid rgba(139, 92, 246, 0.1);
          }

          .stat .number {
            display: block;
            font-size: 2rem;
            font-weight: 800;
            color: #8b5cf6;
            margin-bottom: 0.3rem;
          }

          .stat .label {
            color: #94a3b8;
            font-size: 0.9rem;
            font-weight: 500;
          }

          /* Experience Section */
          .experience-section {
            padding: 1rem 0;
          }

          .job {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: rgba(16, 185, 129, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(16, 185, 129, 0.1);
          }

          .job-header {
            margin-bottom: 1rem;
          }

          .period {
            color: #10b981;
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 0.3rem;
          }

          .position {
            color: #3b82f6;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 0.2rem;
          }

          .company {
            color: #94a3b8;
            font-weight: 500;
          }

          .job-content p {
            color: #e2e8f0;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .achievements {
            list-style: none;
            padding: 0;
          }

          .achievements li {
            color: #94a3b8;
            margin-bottom: 0.5rem;
            line-height: 1.5;
          }

          /* Skills Section */
          .skills-section {
            padding: 1rem 0;
          }

          .skill-category {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: rgba(245, 158, 11, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(245, 158, 11, 0.1);
          }

          .category-title {
            color: #f59e0b;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .skill-item {
            display: grid;
            grid-template-columns: 150px 1fr 60px;
            align-items: center;
            gap: 1rem;
            margin-bottom: 0.8rem;
          }

          .skill-name {
            color: #e2e8f0;
            font-weight: 500;
          }

          .skill-bar {
            height: 8px;
            background: rgba(245, 158, 11, 0.1);
            border-radius: 4px;
            overflow: hidden;
          }

          .skill-fill {
            height: 100%;
            background: linear-gradient(90deg, #f59e0b, #fbbf24);
            border-radius: 4px;
            transition: width 0.3s ease;
          }

          .skill-percent {
            color: #f59e0b;
            font-weight: 600;
            text-align: right;
          }

          /* Projects Section */
          .projects-section {
            padding: 1rem 0;
          }

          .project {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: rgba(139, 92, 246, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(139, 92, 246, 0.1);
          }

          .project-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .project-icon {
            font-size: 2rem;
          }

          .project-title {
            color: #8b5cf6;
            font-size: 1.2rem;
            font-weight: 600;
          }

          .project-description {
            color: #e2e8f0;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .project-metrics {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .metric {
            background: rgba(59, 130, 246, 0.1);
            color: #60a5fa;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
          }

          .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tech {
            background: rgba(16, 185, 129, 0.1);
            color: #34d399;
            padding: 0.3rem 0.6rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
          }

          /* Contact Section */
          .contact-section {
            padding: 1.5rem 0;
          }

          .contact-header {
            margin-bottom: 2rem;
            text-align: center;
            padding: 1.5rem;
            background: rgba(59, 130, 246, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(59, 130, 246, 0.1);
          }

          .contact-header h3 {
            color: #3b82f6;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          .contact-header p {
            color: #94a3b8;
            font-size: 1.1rem;
          }

          .contact-methods {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(16, 185, 129, 0.05);
            border-radius: 8px;
            border: 1px solid rgba(16, 185, 129, 0.1);
          }

          .contact-icon {
            font-size: 1.5rem;
            width: 50px;
            text-align: center;
          }

          .contact-label {
            color: #10b981;
            font-weight: 600;
            font-size: 0.9rem;
          }

          .contact-value {
            color: #e2e8f0;
            font-weight: 500;
          }

          /* Resume Section */
          .resume-section {
            padding: 1.5rem;
            background: rgba(139, 92, 246, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(139, 92, 246, 0.1);
            text-align: center;
          }

          .resume-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .resume-icon {
            font-size: 2rem;
          }

          .resume-section h3 {
            color: #8b5cf6;
            font-size: 1.3rem;
            font-weight: 700;
          }

          .resume-section p {
            color: #e2e8f0;
            margin: 1rem 0;
            line-height: 1.6;
          }

          .download-link {
            display: inline-block;
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.2s ease;
          }

          .download-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
          }

          /* Error Messages */
          .error {
            color: #ef4444;
            font-weight: 500;
            padding: 0.5rem;
            background: rgba(239, 68, 68, 0.1);
            border-radius: 6px;
            border: 1px solid rgba(239, 68, 68, 0.2);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .terminal-container {
              padding: 1rem;
            }

            .terminal-window {
              max-height: 95vh;
            }

            .terminal-body {
              height: 80vh;
              padding: 1rem;
            }

            .terminal-header {
              padding: 0.8rem 1rem;
            }

            .profile-header {
              flex-direction: column;
              text-align: center;
            }

            .stats-grid {
              grid-template-columns: 1fr;
            }

            .contact-methods {
              grid-template-columns: 1fr;
            }

            .skill-item {
              grid-template-columns: 1fr;
              gap: 0.5rem;
            }

            .skill-name {
              margin-bottom: 0.3rem;
            }

            .project-metrics {
              justify-content: center;
            }

            .command-list {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 480px) {
            .terminal-header {
              flex-direction: column;
              gap: 1rem;
            }

            .name {
              font-size: 1.5rem;
            }

            .avatar {
              width: 60px;
              height: 60px;
              font-size: 1.4rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ModernTerminalCV;