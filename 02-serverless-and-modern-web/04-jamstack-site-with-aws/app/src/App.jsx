import { useEffect, useState } from 'react'
import { getTravelStories } from './services/contentful'
import './App.css'

const fallbackImages = {
  'Kyoto, Japan':
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  'Yosemite, USA':
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'Santorini, Greece':
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
}

const fallbackReadTimes = {
  'Kyoto, Japan': '6 min read',
  'Yosemite, USA': '8 min read',
  'Santorini, Greece': '5 min read',
}

const defaultImage =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'

function App() {
  const [destinations, setDestinations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadStories() {
      try {
        setIsLoading(true)
        setError('')

        const entries = await getTravelStories()

        const formattedStories = entries.map((entry) => {
          const fields = entry.fields

          return {
            id: entry.sys.id,
            title: fields.title || 'Untitled story',
            location: fields.location || 'Location unavailable',
            category: fields.category || 'Travel',
            summary: fields.summary || 'Story summary coming soon.',
            image:
              fields.imageUrl ||
              fallbackImages[fields.location] ||
              defaultImage,
            readTime: fallbackReadTimes[fields.location] || '5 min read',
          }
        })

        setDestinations(formattedStories)
      } catch (loadError) {
        console.error('Unable to load Contentful stories:', loadError)

        setError(
          'The travel stories could not be loaded. Please check the Contentful configuration.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadStories()
  }, [])

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/">
          <span className="brand-mark">CT</span>

          <span>
            <strong>Cloud Travel Journal</strong>
            <small>Stories delivered from the cloud</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#stories">Stories</a>
          <a href="#architecture">Architecture</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">JAMSTACK ON AWS</p>

          <h1>Travel stories managed as content, delivered as code.</h1>

          <p className="hero-copy">
            A modern travel journal built with React, Contentful, Amazon S3,
            and AWS Amplify Hosting.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#stories">
              Explore stories
            </a>

            <a className="secondary-button" href="#architecture">
              View architecture
            </a>
          </div>

          <ul className="technology-list" aria-label="Project technologies">
            <li>React + Vite</li>
            <li>Contentful CMS</li>
            <li>Amazon S3</li>
            <li>AWS Amplify</li>
          </ul>
        </div>

        <aside className="hero-panel">
          <p>Content delivery flow</p>

          <ol>
            <li>
              <span>01</span>
              Editors publish stories in Contentful
            </li>

            <li>
              <span>02</span>
              React retrieves content through the API
            </li>

            <li>
              <span>03</span>
              Images are delivered from Amazon S3
            </li>

            <li>
              <span>04</span>
              Amplify publishes the site over HTTPS
            </li>
          </ol>
        </aside>
      </section>

      <section className="stories-section" id="stories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FEATURED JOURNEYS</p>
            <h2>Stories from around the world</h2>
          </div>

          <p>
            Story content is retrieved dynamically from Contentful, while
            travel images are delivered from Amazon S3.
          </p>
        </div>

        {isLoading && (
          <p className="loading-message">
            Loading travel stories from Contentful...
          </p>
        )}

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && destinations.length === 0 && (
          <p className="empty-message">
            No published travel stories were found.
          </p>
        )}

        {!isLoading && !error && destinations.length > 0 && (
          <div className="story-grid">
            {destinations.map((destination) => (
              <article className="story-card" key={destination.id}>
                <img
                  src={destination.image}
                  alt={`${destination.location} travel landscape`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src =
                      fallbackImages[destination.location] || defaultImage
                  }}
                />

                <div className="story-content">
                  <div className="story-meta">
                    <span>{destination.category}</span>
                    <span>{destination.readTime}</span>
                  </div>

                  <p className="location">{destination.location}</p>
                  <h3>{destination.title}</h3>
                  <p>{destination.summary}</p>

                  <button type="button">Read story →</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="architecture-section" id="architecture">
        <div>
          <p className="eyebrow">PROJECT ARCHITECTURE</p>
          <h2>Content and presentation are managed separately.</h2>

          <p>
            Editors can update articles in Contentful without changing React
            code. The frontend retrieves structured content through an API and
            displays it using reusable components.
          </p>
        </div>

        <div className="architecture-flow">
          <div>
            <strong>Contentful</strong>
            <span>Article content and S3 URLs</span>
          </div>

          <span>→</span>

          <div>
            <strong>React</strong>
            <span>User interface</span>
          </div>

          <span>+</span>

          <div>
            <strong>Amazon S3</strong>
            <span>Travel images</span>
          </div>

          <span>→</span>

          <div>
            <strong>Amplify</strong>
            <span>Build and hosting</span>
          </div>
        </div>
      </section>

      <footer id="about">
        <div>
          <strong>Cloud Travel Journal</strong>
          <p>A hands-on JAMstack project built for an AWS cloud portfolio.</p>
        </div>

        <span>React · Contentful · S3 · Amplify</span>
      </footer>
    </main>
  )
}

export default App