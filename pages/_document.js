import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta Tags */}
        <meta name="author" content="Uroš Orolicki" />
        <meta name="keywords" content="DevOps Engineer, AWS, Kubernetes, Terraform, ArgoCD, Cloud Infrastructure, Belgrade, Serbia, Docker, CI/CD, Infrastructure as Code" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://urosorolicki.vercel.app" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://urosorolicki.vercel.app" />
        <meta property="og:title" content="Uroš Orolicki - DevOps Engineer & Cloud Infrastructure Specialist" />
        <meta property="og:description" content="Experienced DevOps Engineer with 4+ years in AWS, Kubernetes, Terraform, and GitOps. Specializing in banking and data analytics infrastructure." />
        <meta property="og:image" content="https://urosorolicki.vercel.app/og-image.jpg" />
        <meta property="og:site_name" content="Uroš Orolicki Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://urosorolicki.vercel.app" />
        <meta property="twitter:title" content="Uroš Orolicki - DevOps Engineer" />
        <meta property="twitter:description" content="DevOps Engineer specializing in AWS, Kubernetes, Terraform. Experience with banking & data analytics platforms." />
        <meta property="twitter:image" content="https://urosorolicki.vercel.app/og-image.jpg" />
        <meta property="twitter:creator" content="@urosorolicki" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Font imports */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Uroš Orolicki",
              "jobTitle": "DevOps Engineer & Cloud Infrastructure Specialist",
              "url": "https://urosorolicki.vercel.app",
              "sameAs": [
                "https://github.com/urosorolicki",
                "https://linkedin.com/in/urosorolicki"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "BlueGrid.io"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Belgrade",
                "addressCountry": "Serbia"
              },
              "email": "orolickiiuros@gmail.com",
              "telephone": "+381603105060",
              "knowsAbout": [
                "DevOps",
                "AWS",
                "Kubernetes", 
                "Terraform",
                "Docker",
                "CI/CD",
                "Infrastructure as Code",
                "GitOps",
                "ArgoCD"
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}