import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const ModernCV = () => {
  const [activeSection, setActiveSection] = useState('about');

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
          "Automated deployment pipelines using Terraform, reducing deployment times",
          "Optimized workflows and enhanced team productivity during cloud migration"
        ],
        skills: ["Cortex", "Datadog", "AWS", "Kubernetes", "Terraform", "ArgoCD"]
      },
      {
        period: "Sep 2022 - Nov 2023", 
        position: "DevOps Engineer",
        company: "Ananas E-commerce",
        type: "Full-time",
        location: "Belgrade, Serbia",
        description: "Daily support tasks for developers working with AWS, Kubernetes, and automation tools.",
        achievements: [
          "Created several CI/CD pipelines using GitHub Actions and ArgoCD",
          "Maintained infrastructure and microservices used daily",
          "Monitored platform performance through SumoLogic and Sentry", 
          "Worked extensively with Terraform, Argo Workflows, and Kubernetes"
        ],
        skills: ["Continuous Integration (CI)", "PostgreSQL", "AWS", "Kubernetes", "GitHub Actions"]
      },
      {
        period: "May 2022 - Sep 2022",
        position: "Junior Software Engineer - Backend/DevOps",
        company: "Ananas E-commerce", 
        type: "Full-time",
        location: "Belgrade, Serbia",
        description: "Started as Junior Developer and transitioned to backend/DevOps role.",
        achievements: [
          "Gained experience with CI/CD, PostgreSQL, and DevOps practices",
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
      "Cloud Platforms": {
        "AWS": 95,
        "Multi-Account Management": 90,
        "Cost Optimization": 85
      },
      "Containerization": {
        "Docker": 95,
        "Kubernetes (EKS)": 90,
        "Helm": 85
      },
      "Infrastructure as Code": {
        "Terraform": 95,
        "Terraform Cloud": 90,
        "CloudFormation": 80
      },
      "CI/CD & Automation": {
        "ArgoCD": 95,
        "GitHub Actions": 90,
        "Argo Workflows": 85
      },
      "Monitoring & Observability": {
        "New Relic": 90,
        "SumoLogic": 85,
        "Sentry": 85,
        "Datadog": 80,
        "Metricbeat": 75
      },
      "Databases": {
        "PostgreSQL": 80,
        "Elastic Stack": 75
      }
    },

    projects: [
      {
        title: "BlueGrid.io Data Analytics Platform",
        description: "Designed and automated multi-account AWS infrastructure for large-scale data processing and media intelligence platform.",
        technologies: ["Terraform Cloud", "EKS", "ArgoCD", "Elastic ECK", "New Relic", "OIDC"],
        highlights: ["Multi-Account AWS", "OIDC Authentication", "Data Pipeline Automation"]
      },
      {
        title: "Raiffeisen Bank Cloud Migration", 
        description: "Led cloud migration strategies for critical banking systems, ensuring security, compliance, and high availability on AWS.",
        technologies: ["AWS Multi-Account", "Kubernetes", "ArgoCD", "Terraform", "Cortex", "Datadog"],
        highlights: ["Banking Compliance", "High Availability", "Automated Deployments"]
      },
      {
        title: "Ananas E-commerce Infrastructure",
        description: "Built and maintained microservices infrastructure with comprehensive CI/CD pipelines and monitoring solutions.", 
        technologies: ["AWS", "Kubernetes", "Argo Workflows", "SumoLogic", "Sentry", "PostgreSQL"],
        highlights: ["Microservices", "GitHub Actions", "24/7 Monitoring"]
      }
    ]
  };

  const sections = ['about', 'experience', 'skills', 'projects', 'contact'];

  return (
    <>
      <Head>
        <title>Uroš Orolicki - Modern Portfolio</title>
        <meta name="description" content="Modern Portfolio - Data DevOps Engineer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="portfolio-container">
        {/* Navigation */}
        <nav className="main-nav">
          <div className="nav-brand">
            <span className="brand-text">UO</span>
          </div>
          <div className="nav-links">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
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
              Terminal View
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        {activeSection === 'about' && (
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-name">{profileData.name}</h1>
                <h2 className="hero-title">{profileData.title}</h2>
                <p className="hero-location">📍 {profileData.location}</p>
                <p className="hero-description">{profileData.about}</p>
                
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">4+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">3</span>
                    <span className="stat-label">Major Companies</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">Banking</span>
                    <span className="stat-label">& Data Analytics</span>
                  </div>
                </div>

                <div className="hero-actions">
                  <a href={`mailto:${profileData.email}`} className="cta-button primary">
                    Get In Touch
                  </a>
                  <a href="/Uros_Orolicki_CV.pdf" target="_blank" className="cta-button secondary">
                    Download CV
                  </a>
                </div>
              </div>
              
              <div className="hero-visual">
                <div className="profile-circle">
                  <span className="profile-initials">UO</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <section className="experience-section">
            <div className="section-header">
              <h2 className="section-title">Professional Experience</h2>
              <p className="section-subtitle">My journey through different roles and companies</p>
            </div>
            
            <div className="experience-timeline">
              {profileData.experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="experience-header">
                      <div className="exp-title-section">
                        <h3 className="exp-position">{exp.position}</h3>
                        <div className="exp-company">
                          {exp.company} · {exp.type}
                        </div>
                        <div className="exp-meta">
                          <span className="exp-period">{exp.period}</span>
                          <span className="exp-location">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="exp-description">{exp.description}</p>
                    
                    <ul className="exp-achievements">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                    
                    <div className="exp-skills">
                      {exp.skills.map((skill, i) => (
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
        {activeSection === 'skills' && (
          <section className="skills-section">
            <div className="section-header">
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-subtitle">Technologies and tools I work with</p>
            </div>
            
            <div className="skills-grid">
              {Object.entries(profileData.skills).map(([category, skills]) => (
                <div key={category} className="skill-category">
                  <h3 className="category-title">{category}</h3>
                  <div className="skills-list">
                    {Object.entries(skills).map(([skill, level]) => (
                      <div key={skill} className="skill-item">
                        <div className="skill-header">
                          <span className="skill-name">{skill}</span>
                          <span className="skill-level">{level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-fill" 
                            style={{ width: `${level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <section className="projects-section">
            <div className="section-header">
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">Key projects and achievements</p>
            </div>
            
            <div className="projects-grid">
              {profileData.projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-highlights">
                    {project.highlights.map((highlight, i) => (
                      <span key={i} className="highlight-tag">{highlight}</span>
                    ))}
                  </div>
                  
                  <div className="project-tech">
                    <div className="tech-label">Technologies:</div>
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

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="contact-section">
            <div className="section-header">
              <h2 className="section-title">Let's Connect</h2>
              <p className="section-subtitle">Ready to discuss your next project?</p>
            </div>
            
            <div className="contact-content">
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
            </div>
          </section>
        )}

        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .portfolio-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #ffffff;
          }

          /* Navigation */
          .main-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-brand {
            font-size: 1.5rem;
            font-weight: 700;
          }

          .brand-text {
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .nav-links {
            display: flex;
            gap: 2rem;
          }

          .nav-link {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: all 0.2s ease;
          }

          .nav-link:hover,
          .nav-link.active {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
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
          }

          .terminal-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
          }

          /* Sections */
          section {
            padding: 120px 2rem 60px;
            max-width: 1200px;
            margin: 0 auto;
          }

          .section-header {
            text-align: center;
            margin-bottom: 4rem;
          }

          .section-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.8));
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
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #ffffff, rgba(255, 255, 255, 0.9));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-title {
            font-size: 1.5rem;
            font-weight: 500;
            opacity: 0.9;
            margin-bottom: 0.5rem;
          }

          .hero-location {
            font-size: 1rem;
            opacity: 0.8;
            margin-bottom: 2rem;
          }

          .hero-description {
            font-size: 1.2rem;
            line-height: 1.7;
            opacity: 0.9;
            margin-bottom: 3rem;
          }

          .hero-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .stat-item {
            text-align: center;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            backdrop-filter: blur(10px);
          }

          .stat-number {
            display: block;
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
          }

          .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
            font-weight: 500;
          }

          .hero-actions {
            display: flex;
            gap: 1rem;
          }

          .cta-button {
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            font-size: 1rem;
          }

          .cta-button.primary {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .cta-button.secondary {
            background: transparent;
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .cta-button:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.3);
          }

          .hero-visual {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .profile-circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
          }

          .profile-initials {
            font-size: 3rem;
            font-weight: 800;
            color: #ffffff;
          }

          /* Experience Section */
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
            background: rgba(255, 255, 255, 0.2);
          }

          .timeline-item {
            position: relative;
            margin-bottom: 3rem;
            padding-left: 80px;
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
            align-items: center;
            margin-bottom: 0.5rem;
          }

          .skill-name {
            font-weight: 600;
          }

          .skill-level {
            font-size: 0.9rem;
            opacity: 0.8;
          }

          .skill-bar {
            height: 6px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            overflow: hidden;
          }

          .skill-fill {
            height: 100%;
            background: linear-gradient(90deg, #4ade80, #22c55e);
            border-radius: 3px;
            transition: width 0.5s ease;
          }

          /* Projects Section */
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
          }

          .project-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            transition: transform 0.2s ease;
          }

          .project-card:hover {
            transform: translateY(-5px);
          }

          .project-title {
            font-size: 1.4rem;
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

          /* Contact Section */
          .contact-content {
            max-width: 600px;
            margin: 0 auto;
          }

          .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
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
            font-size: 2rem;
            width: 60px;
            text-align: center;
          }

          .contact-label {
            font-weight: 600;
            margin-bottom: 0.3rem;
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

          /* Responsive Design */
          @media (max-width: 768px) {
            .main-nav {
              flex-direction: column;
              gap: 1rem;
              padding: 1rem;
            }

            .nav-links {
              order: 2;
            }

            .nav-actions {
              order: 1;
            }

            section {
              padding: 140px 1rem 60px;
            }

            .hero-content {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 2rem;
            }

            .hero-name {
              font-size: 2.5rem;
            }

            .section-title {
              font-size: 2rem;
            }

            .hero-stats {
              grid-template-columns: 1fr;
            }

            .skills-grid,
            .projects-grid {
              grid-template-columns: 1fr;
            }

            .contact-info {
              grid-template-columns: 1fr;
            }

            .timeline-item {
              padding-left: 60px;
            }

            .experience-timeline::before {
              left: 20px;
            }

            .timeline-marker {
              left: 10px;
            }
          }

          @media (max-width: 480px) {
            .nav-links {
              flex-wrap: wrap;
              justify-content: center;
            }

            .hero-actions {
              flex-direction: column;
              align-items: center;
            }

            .cta-button {
              width: 200px;
              text-align: center;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ModernCV;