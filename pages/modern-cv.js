import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import ContactForm from '../components/ContactForm';
import GitHubStats from '../components/GitHubStats';
import BackgroundVideo from '../components/BackgroundVideo';

const ModernCV = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const profileData = {
    name: "Uroš Orolicki",
    title: "Data DevOps Engineer & Cloud Infrastructure Specialist",
    location: "Belgrade, Serbia",
    email: "orolickiiuros@gmail.com",
    phone: "+381 60 310 5060",
    github: "https://github.com/urosorolicki",
    linkedin: "https://www.linkedin.com/in/urosorolicki/",
    
    about: `Passionate DevOps Engineer with 4+ years of experience in cloud infrastructure and automation. 
             Specializing in AWS, Kubernetes (EKS), Terraform, and GitOps with ArgoCD. 
             Experience in enterprise banking infrastructure and data analytics platforms.
             Expert in CI/CD automation, infrastructure as code, and observability solutions.`,
    
    experience: [
      {
        period: "Sep 2025 - Nov 2025",
        position: "Data DevOps Engineer",
        company: "BlueGrid.io",
        type: "Part-time",
        location: "Belgrade, Serbia · Remote",
        description: "Working with a data analytics and media intelligence platform focused on large-scale data processing and cloud automation.",
        achievements: [
          "Designed and automated multi-account AWS infrastructure using Terraform Cloud with OIDC authentication",
          "Built and maintained Kubernetes (EKS) clusters for data pipelines using Helm and ArgoCD", 
          "Implemented Elastic ECK stack with role-based security and snapshot automation",
          "Set up comprehensive observability with New Relic and Metricbeat dashboards",
          "Enhanced networking and VPC topology across environments for scalable data ingestion"
        ],
        skills: ["DevOps", "Amazon Web Services (AWS)", "Terraform", "Kubernetes", "ArgoCD"]
      },
      {
        period: "Nov 2023 - Aug 2025",
        position: "Cloud DevOps Engineer", 
        company: "Raiffeisen banka a.d. Beograd",
        type: "Full-time",
        location: "Belgrade, Serbia · Hybrid",
        description: "Managing AWS infrastructure across diverse accounts, optimizing resources for banking services.",
        achievements: [
          "Implemented Argo CD for continuous delivery within Kubernetes clusters",
          "Deployed and managed Kubernetes clusters for critical banking operations", 
          "Executed cloud migration strategies ensuring security and compliance",
          "Optimized AWS resources and cost management for multi-account infrastructure",
          "Built comprehensive monitoring and alerting systems for production environments"
        ],
        skills: ["DevOps", "AWS", "Kubernetes", "ArgoCD", "Terraform", "Monitoring"]
      },
      {
        period: "Jun 2022 - Oct 2023",
        position: "Backend Developer",
        company: "Freelance",
        type: "Part-time", 
        location: "Belgrade, Serbia · Remote",
        description: "Freelance backend development focusing on API development and database optimization.",
        achievements: [
          "Developed REST APIs using Python and FastAPI framework",
          "Implemented database design and optimization strategies",
          "Built automated testing and deployment pipelines",
          "Supported development team with infrastructure tasks",
          "Learned foundations of cloud technologies and automation"
        ],
        skills: ["Backend Development", "DevOps", "PostgreSQL", "CI/CD"]
      },
      {
        period: "Nov 2021 - May 2022",
        position: "Junior Developer", 
        company: "Ananas E-commerce",
        type: "Full-time",
        location: "Belgrade, Serbia",
        description: "Entry-level position where I started my professional journey in tech.",
        achievements: [
          "Learned software development fundamentals",
          "Gained experience with version control and team collaboration", 
          "Developed foundation for DevOps career path"
        ],
        skills: ["Software Development", "Git", "Team Collaboration"]
      }
    ],

    skills: {
      "Cloud & DevOps": [
        { name: "AWS", level: 90 },
        { name: "Kubernetes", level: 85 },
        { name: "Terraform", level: 88 },
        { name: "ArgoCD", level: 82 },
        { name: "Docker", level: 90 }
      ],
      "Programming & Scripting": [
        { name: "Python", level: 85 },
        { name: "Bash", level: 80 },
        { name: "JavaScript", level: 75 },
        { name: "YAML/JSON", level: 90 },
        { name: "SQL", level: 78 }
      ],
      "Monitoring & Observability": [
        { name: "New Relic", level: 85 },
        { name: "Prometheus", level: 80 },
        { name: "Grafana", level: 78 },
        { name: "ELK Stack", level: 82 },
        { name: "CloudWatch", level: 85 }
      ]
    },

    projects: [
      {
        name: "Multi-Account AWS Infrastructure",
        description: "Designed and implemented scalable AWS infrastructure across multiple accounts using Terraform Cloud with OIDC authentication for secure, automated deployments.",
        highlights: ["Terraform Cloud", "OIDC Authentication", "Multi-Account Strategy", "Infrastructure as Code"],
        technologies: ["AWS", "Terraform", "Kubernetes", "ArgoCD"]
      },
      {
        name: "Kubernetes Data Pipeline Platform",
        description: "Built and maintained EKS clusters for large-scale data processing pipelines with automated scaling and comprehensive monitoring.",
        highlights: ["Auto-scaling", "Data Processing", "High Availability", "Monitoring"],
        technologies: ["Kubernetes", "Helm", "AWS EKS", "New Relic"]
      },
      {
        name: "Banking Infrastructure Migration",
        description: "Led cloud migration strategy for critical banking services ensuring security compliance and zero-downtime deployment.",
        highlights: ["Zero Downtime", "Security Compliance", "Migration Strategy", "Cost Optimization"],
        technologies: ["AWS", "Kubernetes", "ArgoCD", "Terraform"]
      }
    ]
  };

  const sections = useMemo(() => ['about', 'experience', 'skills', 'projects', 'github', 'contact'], []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setNavOpen(false);

    if (typeof window === 'undefined') return;

    if (isMobile) {
      const target = document.getElementById(`section-${section}`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const shouldShowSection = (section) => isMobile || activeSection === section;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateLayout = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      if (window.innerWidth > 900) {
        setNavOpen(false);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    if (!isMobile || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (topEntry?.target?.dataset?.section) {
          setActiveSection(topEntry.target.dataset.section);
        }
      },
      { threshold: 0.35, rootMargin: '-20% 0px -40% 0px' }
    );

    const observed = sections
      .map(section => document.getElementById(`section-${section}`))
      .filter(Boolean);

    observed.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isMobile, sections]);

  return (
    <>
      <Head>
        <title>Uroš Orolicki - DevOps Engineer Portfolio</title>
        <meta name="description" content="DevOps Engineer specializing in AWS, Kubernetes, and cloud infrastructure automation" />
      </Head>
      <div className="page-root">
        <BackgroundVideo />
        <div className="page-shell">
          <div className="container">
        <nav className="main-nav">
          <div className="nav-brand">
            <span className="brand-text">UO</span>
          </div>
          <button
            className={`nav-toggle ${navOpen ? 'open' : ''}`}
            onClick={() => setNavOpen(prev => !prev)}
            aria-label="Toggle main navigation"
            aria-expanded={navOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${navOpen ? 'open' : ''}`}>
            {sections.map(section => (
              <button
                key={section}
                onClick={() => handleSectionChange(section)}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          <div className="nav-actions">
            <button 
              onClick={() => window.location.href = '/'}
              className="terminal-btn"
            >
              Terminal
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        {shouldShowSection('about') && (
          <section
            className="hero-section"
            id="section-about"
            data-section="about"
          >
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-name">{profileData.name}</h1>
                <h2 className="hero-title">{profileData.title}</h2>
                <p className="hero-description">{profileData.about}</p>
                
                <div className="hero-actions">
                  <button 
                    onClick={() => setActiveSection('contact')}
                    className="cta-button"
                  >
                    Get In Touch
                  </button>
                  <button 
                    onClick={() => setActiveSection('experience')}
                    className="secondary-button"
                  >
                    View Experience
                  </button>
                </div>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">4+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Projects Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Cloud Platforms</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Uptime Achieved</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {shouldShowSection('experience') && (
          <section
            className="experience-section"
            id="section-experience"
            data-section="experience"
          >
            <div className="section-header">
              <h2 className="section-title">Professional Experience</h2>
              <p className="section-subtitle">My journey in DevOps and Cloud Engineering</p>
            </div>
            
            <div className="experience-timeline">
              {profileData.experience.map((job, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3 className="exp-position">{job.position}</h3>
                    <h4 className="exp-company">{job.company}</h4>
                    <div className="exp-meta">
                      <span className="exp-period">{job.period}</span>
                      <span className="exp-type">{job.type}</span>
                      <span className="exp-location">{job.location}</span>
                    </div>
                    <p className="exp-description">{job.description}</p>
                    <ul className="exp-achievements">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                    <div className="exp-skills">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {shouldShowSection('skills') && (
          <section
            className="skills-section"
            id="section-skills"
            data-section="skills"
          >
            <div className="section-header">
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-subtitle">Technologies and tools I work with</p>
            </div>
            
            <div className="skills-grid">
              {Object.entries(profileData.skills).map(([category, skills]) => (
                <div key={category} className="skill-category">
                  <h3 className="category-title">{category}</h3>
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {shouldShowSection('projects') && (
          <section
            className="projects-section"
            id="section-projects"
            data-section="projects"
          >
            <div className="section-header">
              <h2 className="section-title">Key Projects</h2>
              <p className="section-subtitle">Notable projects and implementations</p>
            </div>
            
            <div className="projects-grid">
              {profileData.projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-highlights">
                    {project.highlights.map((highlight, i) => (
                      <span key={i} className="highlight-tag">{highlight}</span>
                    ))}
                  </div>
                  
                  <div className="project-tech">
                    <div className="tech-label">Technologies Used:</div>
                    <div className="tech-list">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GitHub Section */}
        {shouldShowSection('github') && (
          <section
            className="github-section-wrapper"
            id="section-github"
            data-section="github"
          >
            <div className="section-header">
              <h2 className="section-title">GitHub Activity</h2>
              <p className="section-subtitle">My latest repositories and contributions</p>
            </div>
            
            <div className="github-section">
              <GitHubStats />
            </div>
          </section>
        )}

        {/* Contact Section */}
        {shouldShowSection('contact') && (
          <section
            className="contact-section"
            id="section-contact"
            data-section="contact"
          >
            <div className="section-header">
              <h2 className="section-title">Let's Connect</h2>
              <p className="section-subtitle">Ready to discuss your next project?</p>
            </div>
            
            <div className="contact-content">
              <div className="contact-grid">
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">📧</div>
                    <div className="contact-details">
                      <div className="contact-label">Email</div>
                      <a href={`mailto:${profileData.email}`} className="contact-value">
                        {profileData.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">📱</div>
                    <div className="contact-details">
                      <div className="contact-label">Phone</div>
                      <a href={`tel:${profileData.phone}`} className="contact-value">
                        {profileData.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">💼</div>
                    <div className="contact-details">
                      <div className="contact-label">LinkedIn</div>
                      <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-value">
                        linkedin.com/in/urosorolicki
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">🐙</div>
                    <div className="contact-details">
                      <div className="contact-label">GitHub</div>
                      <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="contact-value">
                        github.com/urosorolicki
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="contact-form-wrapper">
                  <h3>Send me a message</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>
        )}
          </div>
        </div>
      </div>

      <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            overflow-x: hidden;
            width: 100%;
          }

          body {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
            color: #ffffff;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            min-height: 100vh;
          }

          .page-root {
            position: relative;
            min-height: 100vh;
            width: 100%;
            overflow: hidden;
          }

          .page-shell {
            position: relative;
            z-index: 1;
          }

          .container {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
          }

          /* Navigation */
          .main-nav {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-end;
          }

          .nav-brand {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff;
            backdrop-filter: blur(10px);
            background: rgba(15, 23, 42, 0.6);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .brand-text {
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .nav-links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-end;
          }

          .nav-toggle {
            display: none;
          }

          .nav-link {
            backdrop-filter: blur(10px);
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.9);
            font-size: 0.8rem;
            font-weight: 500;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
            min-width: 80px;
            text-align: center;
          }

          .nav-link:hover,
          .nav-link.active {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.15);
            transform: scale(1.05);
          }

          .nav-actions {
            display: flex;
            gap: 1rem;
          }

          .terminal-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
          }

          .terminal-btn:hover {
            background: rgba(255, 255, 255, 0.2);
          }

          /* Section Styles */
          section {
            padding: clamp(40px, 6vw, 60px) clamp(1.25rem, 4vw, 2.5rem) clamp(30px, 4vw, 50px);
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            scroll-margin-top: 20px;
          }

          .section-header {
            text-align: center;
            margin-bottom: 4rem;
          }

          .section-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .section-subtitle {
            font-size: 1.2rem;
            opacity: 0.8;
            font-weight: 400;
          }

          /* Hero Section */
          .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding-top: 80px;
          }

          .hero-content {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 4rem;
            align-items: center;
            width: 100%;
          }

          .hero-name {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #ffffff;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }

          .hero-title {
            font-size: 1.5rem;
            opacity: 0.9;
            margin-bottom: 2rem;
            font-weight: 400;
          }

          .hero-description {
            font-size: 1.1rem;
            line-height: 1.6;
            opacity: 0.9;
            margin-bottom: 3rem;
          }

          .hero-actions {
            display: flex;
            gap: 1.5rem;
          }

          .cta-button, .secondary-button {
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
            border: none;
          }

          .cta-button {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #ffffff;
          }

          .secondary-button {
            background: transparent;
            color: #ffffff;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
          }

          .secondary-button:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          .hero-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          .stat-item {
            background: rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            backdrop-filter: blur(10px);
          }

          .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 0.5rem;
          }

          .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
          }

          /* Experience Timeline */
          .experience-timeline {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
          }

          .experience-timeline::before {
            content: '';
            position: absolute;
            left: 30px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(135deg, #667eea, #764ba2);
          }

          .timeline-item {
            position: relative;
            padding-left: 80px;
            margin-bottom: 3rem;
          }

          .timeline-marker {
            position: absolute;
            left: 20px;
            top: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: 3px solid #ffffff;
          }

          .timeline-content {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
          }

          .exp-position {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          .exp-company {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 0.5rem;
          }

          .exp-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            opacity: 0.8;
          }

          .exp-description {
            line-height: 1.6;
            margin-bottom: 1.5rem;
            opacity: 0.9;
          }

          .exp-achievements {
            list-style: none;
            margin-bottom: 1.5rem;
          }

          .exp-achievements li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.5;
            opacity: 0.9;
          }

          .exp-achievements li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #4ade80;
            font-weight: bold;
          }

          .exp-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .skill-tag {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
          }

          /* Skills Section */
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
          }

          .skill-category {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
          }

          .category-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #ffffff;
          }

          .skill-item {
            margin-bottom: 1.5rem;
          }

          .skill-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }

          .skill-name {
            font-weight: 600;
          }

          .skill-percentage {
            color: #667eea;
            font-weight: 600;
          }

          .skill-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            overflow: hidden;
          }

          .skill-progress {
            height: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 4px;
            transition: width 0.3s ease;
          }

          /* Projects Section */
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
          }

          .project-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            transition: transform 0.3s ease;
          }

          .project-card:hover {
            transform: translateY(-5px);
          }

          .project-title {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }

          .project-description {
            line-height: 1.6;
            opacity: 0.9;
            margin-bottom: 1.5rem;
          }

          .project-highlights {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .highlight-tag {
            background: rgba(59, 130, 246, 0.3);
            color: #93c5fd;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
          }

          .tech-label {
            font-weight: 600;
            margin-bottom: 0.8rem;
            opacity: 0.9;
          }

          .tech-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tech-tag {
            background: rgba(34, 197, 94, 0.3);
            color: #86efac;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
          }

          /* GitHub Section */
          .github-section {
            margin-top: 3rem;
            width: 100%;
          }

          /* Contact Section */
          .contact-content {
            max-width: 1000px;
            margin: 0 auto;
          }

          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: start;
          }

          .contact-info {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .contact-form-wrapper {
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .contact-form-wrapper h3 {
            color: #ffffff;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            backdrop-filter: blur(10px);
            transition: transform 0.2s ease;
          }

          .contact-item:hover {
            transform: translateY(-2px);
          }

          .contact-icon {
            font-size: 1.5rem;
          }

          .contact-details {
            flex: 1;
          }

          .contact-label {
            font-size: 0.9rem;
            opacity: 0.8;
          }

          .contact-value {
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
          }

          .contact-value:hover {
            opacity: 0.8;
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .nav-brand {
              font-size: 1.2rem;
              padding: 0.4rem 0.8rem;
            }

            .nav-link {
              font-size: 0.75rem;
              padding: 0.3rem 0.6rem;
              min-width: 70px;
            }

            .terminal-btn {
              font-size: 0.75rem;
              padding: 0.3rem 0.6rem;
            }

            section {
              padding: 2rem 1.25rem;
            }

            .hero-section {
              padding-top: 2rem;
            }
          }

            .hero-content {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 2.5rem;
              max-width: 600px;
              margin: 0 auto;
            }

            .hero-name {
              font-size: 2.8rem;
              line-height: 1.1;
              margin-bottom: 0.5rem;
              color: #ffffff;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
              font-weight: 700;
            }

            .hero-title {
              font-size: 1.3rem;
              margin-bottom: 1.5rem;
              font-weight: 400;
            }

            .hero-description {
              font-size: 1rem;
              line-height: 1.6;
              margin-bottom: 2rem;
              opacity: 0.9;
            }

            .section-title {
              font-size: 2.2rem;
            }

            .hero-stats {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1rem;
              margin-top: 3rem;
            }

            .stat-item {
              padding: 1.5rem 1rem;
              text-align: center;
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.06);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .stat-number {
              font-size: 2rem;
              font-weight: 700;
              margin-bottom: 0.5rem;
            }

            .stat-label {
              font-size: 0.85rem;
              opacity: 0.8;
            }

            .hero-actions {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              margin-top: 2.5rem;
              align-items: center;
            }

            .cta-button, .secondary-button {
              width: 100%;
              max-width: 320px;
              padding: 1rem 2rem;
              font-size: 1rem;
              font-weight: 600;
              border-radius: 12px;
              transition: all 0.3s ease;
            }

            .cta-button {
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            }

            .secondary-button {
              background: rgba(255, 255, 255, 0.08);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .section-header {
              margin-bottom: 3rem;
            }

            .skills-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .skill-category {
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.06);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .projects-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            .project-card {
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.06);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .contact-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }

            .contact-form-wrapper {
              order: 1;
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.06);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .contact-info {
              order: 2;
            }

            .contact-item {
              border-radius: 12px;
              background: rgba(255, 255, 255, 0.06);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .experience-timeline {
              margin-left: 0;
              padding-left: 0;
            }

            .experience-timeline::before {
              left: 20px;
            }

            .timeline-item {
              padding-left: 60px;
              margin-bottom: 2rem;
            }

            .timeline-marker {
              left: 10px;
              width: 20px;
              height: 20px;
              border: 4px solid #0f172a;
              box-shadow: 0 0 0 2px #667eea;
            }

            .timeline-content {
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.06);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.1);
              padding: 2rem;
            }

            :global(.github-section .stats-container) {
              grid-template-columns: repeat(2, 1fr) !important;
            }

            :global(.github-section .recent-repos) {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 480px) {
            .main-nav {
              padding: 0.75rem;
            }

            .nav-brand {
              margin-bottom: 0.5rem;
            }

            .brand-text {
              font-size: 1.3rem;
            }

            .nav-links {
              gap: 0.4rem;
            }

            .nav-link {
              font-size: 0.75rem;
              padding: 0.5rem 0.75rem;
              min-width: 70px;
            }

            .terminal-btn {
              font-size: 0.75rem;
              padding: 0.5rem 1rem;
            }

            section {
              padding: 110px 1rem 45px;
            }

            section + section {
              padding-top: 45px;
            }

            .hero-name {
              font-size: 2.2rem;
              line-height: 1.1;
              color: #ffffff;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
              font-weight: 700;
            }

            .hero-title {
              font-size: 1.1rem;
              margin-bottom: 1rem;
            }

            .hero-description {
              font-size: 0.9rem;
              margin-bottom: 1.5rem;
            }

            .section-title {
              font-size: 1.8rem;
            }

            .hero-content {
              gap: 2rem;
            }

            .hero-stats {
              grid-template-columns: 1fr;
              gap: 1rem;
              margin-top: 2rem;
            }

            .stat-item {
              padding: 1.25rem 1rem;
            }

            .stat-number {
              font-size: 1.75rem;
            }

            .stat-label {
              font-size: 0.8rem;
            }

            .hero-actions {
              margin-top: 2rem;
            }

            .cta-button, .secondary-button {
              max-width: 100%;
              padding: 0.875rem 1.5rem;
            }

            .timeline-item {
              padding-left: 30px;
            }

            .timeline-marker {
              left: 5px;
              width: 6px;
              height: 6px;
            }

            .contact-item {
              padding: 1rem;
            }

            :global(.github-section .stats-container) {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
    </>
  );
};

export default ModernCV;