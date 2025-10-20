import { useState } from 'react';
import './App.css';
import docData from '../doc.json';

interface Section {
  heading: string;
  content: string;
  Explication: string;
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

interface DocData {
  title: string;
  sections: Section[];
}

const typedDocData = docData as DocData;

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'docs'>('home');

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
        ) : (
          <div className="documentation">
            <h1 className="doc-title">{typedDocData.title}</h1>
            <div className="doc-sections">
              {typedDocData.sections.map((section, index) => {
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
                  } else if (line.trim().startsWith('•')) {
                    contentElements.push(
                      <div key={`list-${index}-${keyCounter++}`} className="list-item">
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
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
