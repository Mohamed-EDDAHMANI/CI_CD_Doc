import React, { useState } from "react";
import DetailView from "./components/DetailView";

interface KeywordData {
  title: string;
  description: string;
  icon: string;
  details: string[];
  color: string;
  gradient: string;
  category: 'core' | 'tools' | 'platform' | 'practices' | 'devops';
  fullContent?: {
    introduction: string;
    keyPoints: string[];
    useCases: string[];
    bestPractices: string[];
  };
}

const App: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'detail'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const keywords: Record<string, KeywordData> = {
    cicd: {
      title: "CI/CD - Intégration et Déploiement Continus",
      description: "Pratiques d'automatisation du cycle de développement logiciel",
      icon: "🔄",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      category: 'core',
      details: [
        "CI (Intégration Continue) : Fusion automatique et régulière des modifications de code",
        "CD (Déploiement Continu) : Automatisation des tests et déploiement en production",
        "Réduction des bugs et amélioration de la qualité du code",
        "Accélération du cycle de développement et de livraison",
        "Feedback rapide aux développeurs sur les erreurs"
      ],
      fullContent: {
        introduction: "Le CI/CD est une méthodologie DevOps qui combine l'intégration continue (CI) et le déploiement continu (CD) pour automatiser et améliorer le processus de livraison de logiciels. Cette approche permet aux équipes de développement de publier des modifications de code plus fréquemment et de manière plus fiable.",
        keyPoints: [
          "Intégration Continue (CI) : Merge automatique du code plusieurs fois par jour",
          "Tests automatisés à chaque commit pour détecter les erreurs rapidement",
          "Build automatique pour vérifier la compilation du code",
          "Déploiement Continu (CD) : Mise en production automatique après validation",
          "Réduction du temps entre l'écriture du code et sa mise en production",
          "Amélioration de la qualité grâce aux tests continus"
        ],
        useCases: [
          "Applications web modernes avec mises à jour fréquentes",
          "Microservices nécessitant des déploiements indépendants",
          "Projets agiles avec des sprints courts",
          "Applications mobiles avec releases régulières",
          "SaaS nécessitant une disponibilité maximale"
        ],
        bestPractices: [
          "Maintenir des tests automatisés complets et rapides",
          "Utiliser le versioning sémantique pour les releases",
          "Implémenter des stratégies de rollback rapide",
          "Monitorer les métriques de performance du pipeline",
          "Sécuriser les secrets et credentials",
          "Documenter le processus de CI/CD pour l'équipe"
        ]
      }
    },
    pipeline: {
      title: "Pipeline CI/CD",
      description: "Série d'étapes automatisées pour livrer le code",
      icon: "⚙️",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      category: 'core',
      details: [
        "Étapes typiques : Build → Test → Deploy",
        "Automatisation complète du workflow",
        "Exécution parallèle des tâches pour gagner du temps",
        "Visualisation du processus de déploiement",
        "Gestion des erreurs et rollback automatique"
      ]
    },
    git: {
      title: "Git & Git Flow",
      description: "Système de contrôle de version distribué",
      icon: "🌿",
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
      category: 'tools',
      details: [
        "Contrôle de version décentralisé du code source",
        "Git Flow : Stratégie de branches (main, develop, feature, release, hotfix)",
        "Collaboration entre développeurs facilitée",
        "Historique complet des modifications",
        "Fusion (merge) et résolution de conflits"
      ]
    },
    docker: {
      title: "Docker",
      description: "Plateforme de conteneurisation des applications",
      icon: "🐳",
      color: "bg-cyan-500",
      gradient: "from-cyan-500 to-blue-500",
      category: 'platform',
      details: [
        "Conteneurisation légère des applications",
        "Isolation des environnements d'exécution",
        "Portabilité : 'Build once, run anywhere'",
        "Dockerfile pour définir l'environnement",
        "Docker Compose pour orchestrer plusieurs conteneurs"
      ],
      fullContent: {
        introduction: "Docker est une plateforme de conteneurisation qui permet d'empaqueter une application et toutes ses dépendances dans un conteneur virtuel léger. Cette technologie garantit que l'application fonctionnera de manière identique sur n'importe quel système, du développement à la production.",
        keyPoints: [
          "Conteneurs légers et rapides à démarrer",
          "Isolation complète des applications",
          "Images Docker versionnées et partageables",
          "Dockerfile pour définir l'environnement de manière reproductible",
          "Docker Hub : registry public pour partager des images",
          "Compatible avec tous les systèmes d'exploitation"
        ],
        useCases: [
          "Développement local avec environnements identiques pour toute l'équipe",
          "Microservices conteneurisés pour faciliter le déploiement",
          "Tests d'intégration avec des dépendances isolées",
          "Déploiement cloud avec orchestrateurs comme Kubernetes",
          "CI/CD avec des environnements de build reproductibles"
        ],
        bestPractices: [
          "Utiliser des images de base officielles et légères",
          "Créer des images multi-stage pour réduire la taille",
          "Ne jamais stocker de secrets dans les images",
          "Utiliser .dockerignore pour exclure les fichiers inutiles",
          "Scanner les images pour détecter les vulnérabilités",
          "Taguer les images avec des versions spécifiques"
        ]
      }
    },
    kubernetes: {
      title: "Kubernetes (K8s)",
      description: "Orchestration de conteneurs à grande échelle",
      icon: "☸️",
      color: "bg-blue-600",
      gradient: "from-blue-600 to-indigo-600",
      category: 'platform',
      details: [
        "Orchestration automatique des conteneurs",
        "Auto-scaling et auto-healing des applications",
        "Gestion du déploiement rolling update",
        "Load balancing et service discovery",
        "Gestion des secrets et configurations"
      ]
    },
    jenkins: {
      title: "Jenkins",
      description: "Serveur d'automatisation CI/CD open-source",
      icon: "🔧",
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
      category: 'tools',
      details: [
        "Serveur CI/CD le plus populaire",
        "Extensible via des milliers de plugins",
        "Pipeline as Code avec Jenkinsfile",
        "Intégration avec Git, Docker, Kubernetes",
        "Support des builds distribués"
      ]
    },
    github: {
      title: "GitHub Actions",
      description: "Automatisation CI/CD intégrée à GitHub",
      icon: "🐙",
      color: "bg-gray-800",
      gradient: "from-gray-700 to-gray-900",
      category: 'platform',
      details: [
        "CI/CD natif dans GitHub",
        "Workflows définis en YAML",
        "Marketplace avec des actions réutilisables",
        "Runners hébergés ou auto-hébergés",
        "Intégration parfaite avec les repositories GitHub"
      ]
    },
    gitlab: {
      title: "GitLab CI/CD",
      description: "Plateforme DevOps complète avec CI/CD intégré",
      icon: "🦊",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-red-500",
      category: 'platform',
      details: [
        "CI/CD intégré dans GitLab",
        "Fichier .gitlab-ci.yml pour la configuration",
        "Auto DevOps pour configuration automatique",
        "Container Registry intégré",
        "Pages GitLab pour hébergement statique"
      ]
    },
    terraform: {
      title: "Terraform",
      description: "Infrastructure as Code (IaC)",
      icon: "🏗️",
      color: "bg-purple-600",
      gradient: "from-purple-600 to-pink-600",
      category: 'devops',
      details: [
        "Provisionnement d'infrastructure déclaratif",
        "Support multi-cloud (AWS, Azure, GCP)",
        "État de l'infrastructure versionné",
        "Plan et apply pour prévisualiser les changements",
        "Modules réutilisables"
      ]
    },
    ansible: {
      title: "Ansible",
      description: "Automatisation de la configuration et du déploiement",
      icon: "📜",
      color: "bg-red-600",
      gradient: "from-red-600 to-orange-600",
      category: 'devops',
      details: [
        "Automatisation sans agent",
        "Playbooks YAML lisibles",
        "Gestion de configuration",
        "Déploiement d'applications",
        "Orchestration de tâches complexes"
      ]
    },
    monitoring: {
      title: "Monitoring & Observabilité",
      description: "Surveillance des applications en production",
      icon: "📊",
      color: "bg-yellow-500",
      gradient: "from-yellow-500 to-orange-500",
      category: 'devops',
      details: [
        "Prometheus : collecte de métriques",
        "Grafana : visualisation des données",
        "ELK Stack : logs centralisés (Elasticsearch, Logstash, Kibana)",
        "Alerting en temps réel",
        "Traces distribuées pour le debugging"
      ]
    },
    testing: {
      title: "Tests Automatisés",
      description: "Validation automatique de la qualité du code",
      icon: "✅",
      color: "bg-green-600",
      gradient: "from-green-600 to-emerald-600",
      category: 'practices',
      details: [
        "Tests unitaires : vérification des fonctions isolées",
        "Tests d'intégration : interaction entre composants",
        "Tests end-to-end (E2E) : simulation utilisateur",
        "Tests de performance et de charge",
        "Code coverage pour mesurer la couverture"
      ]
    },
    security: {
      title: "DevSecOps",
      description: "Sécurité intégrée dans le pipeline",
      icon: "🔒",
      color: "bg-indigo-600",
      gradient: "from-indigo-600 to-purple-600",
      category: 'practices',
      details: [
        "Scan de vulnérabilités du code (SAST)",
        "Analyse des dépendances (SCA)",
        "Scan des images Docker",
        "Tests de sécurité dynamiques (DAST)",
        "Gestion des secrets sécurisée"
      ]
    },
    artifacts: {
      title: "Artifacts & Registry",
      description: "Stockage des livrables de build",
      icon: "📦",
      color: "bg-pink-500",
      gradient: "from-pink-500 to-rose-500",
      category: 'tools',
      details: [
        "Stockage des builds compilés",
        "Container Registry pour images Docker",
        "Package Registry (npm, Maven, PyPI)",
        "Versioning sémantique",
        "Distribution et partage des artifacts"
      ]
    },
    deployment: {
      title: "Stratégies de Déploiement",
      description: "Méthodes de mise en production",
      icon: "🚀",
      color: "bg-teal-500",
      gradient: "from-teal-500 to-cyan-500",
      category: 'practices',
      details: [
        "Blue-Green : deux environnements parallèles",
        "Canary : déploiement progressif sur un sous-ensemble",
        "Rolling Update : mise à jour graduelle",
        "Feature Flags : activation conditionnelle des fonctionnalités",
        "Rollback rapide en cas d'erreur"
      ]
    }
  };

  // Categories configuration
  const categories = {
    all: { label: 'Tous les Concepts', icon: '📚', color: 'from-blue-500 to-purple-500' },
    core: { label: 'Fondamentaux CI/CD', icon: '🔄', color: 'from-blue-500 to-blue-600' },
    platform: { label: 'Plateformes', icon: '🐳', color: 'from-cyan-500 to-blue-500' },
    tools: { label: 'Outils', icon: '🔧', color: 'from-green-500 to-emerald-500' },
    practices: { label: 'Bonnes Pratiques', icon: '✨', color: 'from-teal-500 to-cyan-500' },
    devops: { label: 'DevOps & IaC', icon: '🏗️', color: 'from-purple-600 to-pink-600' }
  };

  // Filter keywords by selected category
  const filteredKeywords = selectedCategory === 'all' 
    ? Object.entries(keywords)
    : Object.entries(keywords).filter(([_, data]) => data.category === selectedCategory);

  const KeywordCard: React.FC<{ id: string; data: KeywordData }> = ({ id, data }) => (
    <div
      onClick={() => {
        if (data.fullContent) {
          setSelectedKeyword(id);
          setViewMode('detail');
        }
      }}
      className={`group cursor-pointer bg-white rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg ${!data.fullContent ? 'opacity-60' : ''}`}
    >
      <div className="p-6">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data.gradient} flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            {data.icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-center text-lg font-bold text-gray-800 mb-2 min-h-[56px] flex items-center justify-center">
          {data.title}
        </h3>
        
        {/* Description */}
        <p className="text-center text-sm text-gray-600 mb-4 min-h-[40px]">
          {data.description}
        </p>
        
        {/* Category Badge */}
        <div className="flex justify-center mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${data.gradient} text-white`}>
            {categories[data.category].icon}
            <span>{categories[data.category].label}</span>
          </span>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-100 mb-4"></div>
        
        {/* Status */}
        {data.fullContent ? (
          <div className="text-center">
            <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 inline-flex items-center gap-2">
              <span>Voir les détails</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-sm text-gray-400 italic">
              Bientôt disponible
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // Render different views based on viewMode
  if (viewMode === 'detail' && selectedKeyword && keywords[selectedKeyword]?.fullContent) {
    return (
      <DetailView
        data={keywords[selectedKeyword]}
        onBack={() => setViewMode('dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon with Animation */}
            <div className="inline-block mb-6 transform hover:scale-110 transition-transform duration-300">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-6xl md:text-7xl">📚</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Documentation CI/CD
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold mt-3 text-blue-100">
                Complète & Professionnelle
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-50 mb-8 max-w-2xl mx-auto leading-relaxed">
              Guide complet des concepts, outils et pratiques DevOps pour maîtriser 
              l'intégration et le déploiement continus
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-5 py-2.5 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-sm font-semibold hover:bg-opacity-30 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <span className="text-xl">🔄</span>
                <span>CI/CD</span>
              </span>
              <span className="px-5 py-2.5 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-sm font-semibold hover:bg-opacity-30 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <span className="text-xl">🐳</span>
                <span>Docker</span>
              </span>
              <span className="px-5 py-2.5 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-sm font-semibold hover:bg-opacity-30 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <span className="text-xl">☸️</span>
                <span>Kubernetes</span>
              </span>
              <span className="px-5 py-2.5 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-sm font-semibold hover:bg-opacity-30 transition-all duration-300 flex items-center gap-2 shadow-lg">
                <span className="text-xl">🌿</span>
                <span>Git Flow</span>
              </span>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-20" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L0,120Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </header>

      {/* Introduction */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-5xl md:text-6xl">🎯</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Qu'est-ce que le <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CI/CD</span> ?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Le <strong className="text-blue-600">CI/CD</strong> (Continuous Integration / Continuous Deployment) est une méthodologie moderne qui vise à 
              <strong className="text-purple-600"> automatiser et optimiser le cycle de développement logiciel</strong>.
            </p>
          </div>
          
          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Avantages Card */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full filter blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">✨</span>
                </div>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Avantages</h3>
                
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                    <span className="group-hover/item:text-blue-900 transition-colors">Détection précoce des bugs</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                    <span className="group-hover/item:text-blue-900 transition-colors">Déploiements plus fréquents</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                    <span className="group-hover/item:text-blue-900 transition-colors">Réduction du time-to-market</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                    <span className="group-hover/item:text-blue-900 transition-colors">Meilleure collaboration</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                    <span className="group-hover/item:text-blue-900 transition-colors">Feedback rapide et continu</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Principes Card */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">⚡</span>
                </div>
                
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Principes Clés</h3>
                
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">→</span>
                    <span className="group-hover/item:text-purple-900 transition-colors">Automatisation maximale</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">→</span>
                    <span className="group-hover/item:text-purple-900 transition-colors">Tests continus</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">→</span>
                    <span className="group-hover/item:text-purple-900 transition-colors">Intégration fréquente</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">→</span>
                    <span className="group-hover/item:text-purple-900 transition-colors">Déploiement rapide et sûr</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">→</span>
                    <span className="group-hover/item:text-purple-900 transition-colors">Monitoring et observabilité</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Workflow Card */}
            <div className="group relative bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 border-2 border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200 rounded-full filter blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-3xl">🔄</span>
                </div>
                
                <h3 className="text-2xl font-bold text-teal-900 mb-4">Workflow</h3>
                
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <span className="group-hover/item:text-teal-900 transition-colors">Commit du code source</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <span className="group-hover/item:text-teal-900 transition-colors">Build automatique</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <span className="group-hover/item:text-teal-900 transition-colors">Tests automatisés</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                    <span className="group-hover/item:text-teal-900 transition-colors">Scan de sécurité</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">5</span>
                    <span className="group-hover/item:text-teal-900 transition-colors">Déploiement en production</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keywords Grid */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🔑 Concepts et Outils Essentiels
            </h2>
            <p className="text-gray-600 text-lg">
              Explorez par catégorie et cliquez pour découvrir les détails
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.label}</span>
                {selectedCategory === key && (
                  <span className="bg-white bg-opacity-30 rounded-full px-2 py-0.5 text-xs font-bold">
                    {filteredKeywords.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-4 mb-10 text-sm text-gray-600">
            <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <strong className="text-blue-600">{filteredKeywords.length}</strong> Concepts
            </span>
            <span className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              100% Français
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredKeywords.map(([id, data]) => (
              <KeywordCard key={id} id={id} data={data} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-3">Documentation CI/CD - 2025</h3>
            <p className="text-gray-400 mb-6">
              Guide complet pour maîtriser l'intégration et le déploiement continus
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-4 py-2 bg-white bg-opacity-10 rounded-full text-sm">🔄 CI/CD</span>
              <span className="px-4 py-2 bg-white bg-opacity-10 rounded-full text-sm">🐳 Docker</span>
              <span className="px-4 py-2 bg-white bg-opacity-10 rounded-full text-sm">☸️ Kubernetes</span>
              <span className="px-4 py-2 bg-white bg-opacity-10 rounded-full text-sm">🔒 DevSecOps</span>
            </div>
            <div className="pt-6 border-t border-gray-700">
              <p className="text-gray-500 text-sm">
                Créé avec ❤️ en utilisant React, TypeScript et Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
