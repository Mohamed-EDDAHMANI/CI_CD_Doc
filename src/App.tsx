import { useState } from 'react';
import './App.css';
import docData from '../doc.json';

interface Section {
  heading: string;
  content: string;
  Explication: string;
  image?: string;
  ExplicationDetaillee?: {
    name?: string;
    on?: string;
    jobs?: {
      test?: {
        'runs-on'?: string;
        steps?: string[];
      };
      build?: {
        needs?: string;
        steps?: string[];
      };
      'deploy-staging'?: {
        environment?: string;
        steps?: string[];
      };
      'deploy-production'?: {
        condition?: string;
        steps?: string[];
      };
    };
    Résumé?: string;
  };
}

interface TechSection {
  title: string;
  sections: Section[];
}

interface PipelineExample {
  name: string;
  content: string;
  Explication: string;
}

interface PipelineExamplesSection {
  title: string;
  examples: PipelineExample[];
}

interface FullDocData {
  title: string;
  sections: Section[];
  docker: TechSection;
  kubernetes: TechSection;
  pipelinesExamples: PipelineExamplesSection;
}

const typedDocData = docData as FullDocData;

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'docs' | 'docker' | 'kubernetes' | 'pipelines'>('home');

  // Function to render sections
  const renderSections = (sections: Section[]) => {
    return sections.map((section, index) => {
      // Parse content to handle code blocks properly
      const lines = section.content.split('\n');
      const contentElements = [];
      let i = 0;
      let keyCounter = 0;

      while (i < lines.length) {
        const line = lines[i];
        
        if (line.trim().startsWith('```')) {
          // Start of code block
          const codeLines = [];
          i++; // Skip the opening ```
          while (i < lines.length && !lines[i].trim().startsWith('```')) {
            codeLines.push(lines[i]);
            i++;
          }
          if (codeLines.length > 0) {
            contentElements.push(
              <pre key={`code-${index}-${keyCounter++}`} className="code-block">
                <code>{codeLines.join('\n')}</code>
              </pre>
            );
          }
          i++; // Skip the closing ```
        } else if (line.trim().startsWith('•') || line.trim().startsWith('**')) {
          contentElements.push(
            <div key={`list-${index}-${keyCounter++}`} className="list-item">
              {line}
            </div>
          );
          i++;
        } else if (line.trim().match(/^\d+️⃣/)) {
          contentElements.push(
            <div key={`step-${index}-${keyCounter++}`} className="list-item">
              {line}
            </div>
          );
          i++;
        } else if (line.trim()) {
          contentElements.push(
            <p key={`p-${index}-${keyCounter++}`} className="paragraph">
              {line}
            </p>
          );
          i++;
        } else {
          i++;
        }
      }

      return (
        <section key={index} className="doc-section">
          <h2 className="section-heading">{section.heading}</h2>
          {section.image && (
            <div className="section-image-container">
              <img 
                src={section.image} 
                alt={section.heading}
                className="section-image"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  console.error('Failed to load image:', section.image);
                }}
              />
            </div>
          )}
          <div className="section-content">
            {contentElements}
          </div>
          {section.Explication && (
            <div className="explanation-box">
              <div className="explanation-header">
                <span className="explanation-icon">💡</span>
                <span className="explanation-title">Explication Simple</span>
              </div>
              <p className="explanation-text">{section.Explication}</p>
            </div>
          )}
          {section.ExplicationDetaillee && (
            <div className="detailed-explanation-box">
              <div className="detailed-header">
                <span className="detailed-icon">🔍</span>
                <span className="detailed-title">Explication Détaillée</span>
              </div>
              
              {section.ExplicationDetaillee.name && (
                <div className="detail-item">
                  <strong className="detail-label">📌 name:</strong>
                  <p className="detail-text">{section.ExplicationDetaillee.name}</p>
                </div>
              )}
              
              {section.ExplicationDetaillee.on && (
                <div className="detail-item">
                  <strong className="detail-label">⚡ on:</strong>
                  <p className="detail-text">{section.ExplicationDetaillee.on}</p>
                </div>
              )}
              
              {section.ExplicationDetaillee.jobs && (
                <div className="jobs-section">
                  <h3 className="jobs-title">🔧 Jobs:</h3>
                  
                  {section.ExplicationDetaillee.jobs.test && (
                    <div className="job-card">
                      <h4 className="job-name">🧪 Test Job</h4>
                      {section.ExplicationDetaillee.jobs.test['runs-on'] && (
                        <div className="job-detail">
                          <strong>runs-on:</strong> {section.ExplicationDetaillee.jobs.test['runs-on']}
                        </div>
                      )}
                      {section.ExplicationDetaillee.jobs.test.steps && (
                        <div className="job-steps">
                          <strong>Steps:</strong>
                          <ul>
                            {section.ExplicationDetaillee.jobs.test.steps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {section.ExplicationDetaillee.jobs.build && (
                    <div className="job-card">
                      <h4 className="job-name">🏗️ Build Job</h4>
                      {section.ExplicationDetaillee.jobs.build.needs && (
                        <div className="job-detail">
                          <strong>needs:</strong> {section.ExplicationDetaillee.jobs.build.needs}
                        </div>
                      )}
                      {section.ExplicationDetaillee.jobs.build.steps && (
                        <div className="job-steps">
                          <strong>Steps:</strong>
                          <ul>
                            {section.ExplicationDetaillee.jobs.build.steps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {section.ExplicationDetaillee.jobs['deploy-staging'] && (
                    <div className="job-card">
                      <h4 className="job-name">🚀 Deploy Staging Job</h4>
                      {section.ExplicationDetaillee.jobs['deploy-staging'].environment && (
                        <div className="job-detail">
                          <strong>environment:</strong> {section.ExplicationDetaillee.jobs['deploy-staging'].environment}
                        </div>
                      )}
                      {section.ExplicationDetaillee.jobs['deploy-staging'].steps && (
                        <div className="job-steps">
                          <strong>Steps:</strong>
                          <ul>
                            {section.ExplicationDetaillee.jobs['deploy-staging'].steps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {section.ExplicationDetaillee.jobs['deploy-production'] && (
                    <div className="job-card">
                      <h4 className="job-name">✅ Deploy Production Job</h4>
                      {section.ExplicationDetaillee.jobs['deploy-production'].condition && (
                        <div className="job-detail">
                          <strong>condition:</strong> {section.ExplicationDetaillee.jobs['deploy-production'].condition}
                        </div>
                      )}
                      {section.ExplicationDetaillee.jobs['deploy-production'].steps && (
                        <div className="job-steps">
                          <strong>Steps:</strong>
                          <ul>
                            {section.ExplicationDetaillee.jobs['deploy-production'].steps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {section.ExplicationDetaillee.Résumé && (
                <div className="summary-box">
                  <strong className="summary-label">📋 Résumé:</strong>
                  <p className="summary-text">{section.ExplicationDetaillee.Résumé}</p>
                </div>
              )}
            </div>
          )}
        </section>
      );
    });
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>CI/CD Pipeline</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            <span className="icon">🏠</span>
            Home
          </button>
          <button
            className={`nav-item ${currentView === 'docs' ? 'active' : ''}`}
            onClick={() => setCurrentView('docs')}
          >
            <span className="icon">📚</span>
            CI/CD Documentation
          </button>
          <button
            className={`nav-item ${currentView === 'docker' ? 'active' : ''}`}
            onClick={() => setCurrentView('docker')}
          >
            <span className="icon">🐳</span>
            Docker
          </button>
          <button
            className={`nav-item ${currentView === 'kubernetes' ? 'active' : ''}`}
            onClick={() => setCurrentView('kubernetes')}
          >
            <span className="icon">☸️</span>
            Kubernetes
          </button>
          <button
            className={`nav-item ${currentView === 'pipelines' ? 'active' : ''}`}
            onClick={() => setCurrentView('pipelines')}
          >
            <span className="icon">⚙️</span>
            Pipeline Examples
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {currentView === 'home' ? (
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Welcome to CI/CD Pipeline</h1>
              <p className="hero-description">
                Discover everything you need to know about Continuous Integration and Continuous Deployment.
                Navigate through our comprehensive documentation to master modern DevOps practices.
              </p>
              <div className="hero-stats">
                <div className="stat-card">
                  <div className="stat-number">{typedDocData.sections.length}</div>
                  <div className="stat-label">Sections</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Topics Covered</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Free</div>
                </div>
              </div>
              <button
                className="cta-button"
                onClick={() => setCurrentView('docs')}
              >
                Start Learning →
              </button>
            </div>
          </div>
        ) : currentView === 'docs' ? (
          <div className="documentation">
            <h1 className="doc-title">{typedDocData.title}</h1>
            <div className="doc-sections">
              {renderSections(typedDocData.sections)}
            </div>
          </div>
        ) : currentView === 'docker' ? (
          <div className="documentation">
            <h1 className="doc-title">{typedDocData.docker.title}</h1>
            <div className="doc-sections">
              {renderSections(typedDocData.docker.sections)}
            </div>
          </div>
        ) : currentView === 'kubernetes' ? (
          <div className="documentation">
            <h1 className="doc-title">{typedDocData.kubernetes.title}</h1>
            <div className="doc-sections">
              {renderSections(typedDocData.kubernetes.sections)}
            </div>
          </div>
        ) : currentView === 'pipelines' ? (
          <div className="documentation">
            <h1 className="doc-title">{typedDocData.pipelinesExamples.title}</h1>
            <div className="doc-sections">
              {typedDocData.pipelinesExamples.examples.map((example, index) => {
                // Parse content to handle code blocks
                const lines = example.content.split('\n');
                const contentElements = [];
                let i = 0;
                let keyCounter = 0;

                while (i < lines.length) {
                  const line = lines[i];
                  
                  if (line.trim().startsWith('```')) {
                    // Start of code block
                    const codeLines = [];
                    i++; // Skip the opening ```
                    while (i < lines.length && !lines[i].trim().startsWith('```')) {
                      codeLines.push(lines[i]);
                      i++;
                    }
                    if (codeLines.length > 0) {
                      contentElements.push(
                        <pre key={`code-${index}-${keyCounter++}`} className="code-block">
                          <code>{codeLines.join('\n')}</code>
                        </pre>
                      );
                    }
                    i++; // Skip the closing ```
                  } else if (line.trim()) {
                    contentElements.push(
                      <p key={`p-${index}-${keyCounter++}`} className="paragraph">
                        {line}
                      </p>
                    );
                    i++;
                  } else {
                    i++;
                  }
                }

                return (
                  <section key={index} className="doc-section pipeline-example">
                    <h2 className="section-heading pipeline-name">
                      <span className="pipeline-icon">🚀</span>
                      {example.name}
                    </h2>
                    <div className="section-content">
                      {contentElements}
                    </div>
                    {example.Explication && (
                      <div className="explanation-box">
                        <div className="explanation-header">
                          <span className="explanation-icon">💡</span>
                          <span className="explanation-title">Explication Simple</span>
                        </div>
                        <p className="explanation-text">{example.Explication}</p>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
