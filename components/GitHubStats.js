import { useState, useEffect } from 'react'

const GitHubStats = ({ username = "urosorolicki", className = "" }) => {
  const [stats, setStats] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!userResponse.ok) throw new Error('Failed to fetch user data')
        const userData = await userResponse.json()

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
        const reposData = await reposResponse.json()

        setStats({
          name: userData.name,
          avatar_url: userData.avatar_url,
          bio: userData.bio,
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          created_at: userData.created_at,
          updated_at: userData.updated_at
        })

        setRepos(reposData.filter(repo => !repo.fork).slice(0, 4))
      } catch (err) {
        setError(err.message)
        console.error('GitHub API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  if (loading) {
    return (
      <div className={`github-stats loading ${className}`}>
        <div className="loading-spinner"></div>
        <p>Loading GitHub stats...</p>
        <style jsx>{`
          .github-stats.loading {
            text-align: center;
            padding: 2rem;
            color: #ffffff;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(59, 130, 246, 0.1);
            border-top: 3px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`github-stats error ${className}`}>
        <p>⚠️ Unable to load GitHub stats</p>
        <small>{error}</small>
        <style jsx>{`
          .github-stats.error {
            text-align: center;
            padding: 2rem;
            color: #ef4444;
            background: rgba(239, 68, 68, 0.05);
            border-radius: 8px;
            border: 1px solid rgba(239, 68, 68, 0.1);
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`github-stats ${className}`}>
      <div className="stats-header">
        <div className="avatar">
          <img src={stats.avatar_url} alt={`${stats.name} avatar`} />
        </div>
        <div className="stats-info">
          <h3>{stats.name}</h3>
          <p>{stats.bio}</p>
          <div className="stats-numbers">
            <div className="stat">
              <span className="number">{stats.public_repos}</span>
              <span className="label">Repos</span>
            </div>
            <div className="stat">
              <span className="number">{stats.followers}</span>
              <span className="label">Followers</span>
            </div>
            <div className="stat">
              <span className="number">{stats.following}</span>
              <span className="label">Following</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-repos">
        <h4>Recent Projects</h4>
        <div className="repos-grid">
          {repos.map(repo => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-header">
                <span className="repo-name">{repo.name}</span>
                {repo.language && (
                  <span className="repo-language">{repo.language}</span>
                )}
              </div>
              <p className="repo-description">
                {repo.description || 'No description available'}
              </p>
              <div className="repo-stats">
                <span className="stars">⭐ {repo.stargazers_count}</span>
                <span className="forks">🍴 {repo.forks_count}</span>
                <span className="updated">
                  📅 {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .github-stats {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .stats-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(59, 130, 246, 0.3);
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .stats-info h3 {
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stats-info p {
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .stats-numbers {
          display: flex;
          gap: 1.5rem;
        }

        .stat {
          text-align: center;
        }

        .stat .number {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: #10b981;
          margin-bottom: 0.2rem;
        }

        .stat .label {
          font-size: 0.8rem;
          color: #ffffff;
          font-weight: 500;
        }

        .recent-repos h4 {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }

        .repo-card {
          display: block;
          padding: 1rem;
          background: rgba(59, 130, 246, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.1);
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }

        .repo-card:hover {
          background: rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .repo-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .repo-name {
          font-weight: 600;
          color: #ffffff;
        }

        .repo-language {
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          background: rgba(139, 92, 246, 0.2);
          color: #a78bfa;
          border-radius: 10px;
        }

        .repo-description {
          color: #ffffff;
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 0.8rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .repo-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #ffffff;
        }

        .repo-stats span {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .stats-header {
            flex-direction: column;
            text-align: center;
          }

          .stats-numbers {
            justify-content: center;
          }

          .repos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default GitHubStats