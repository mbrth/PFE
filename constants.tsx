
import { Course, CloudProvider, ServerRegion } from './types';

export const MOCKED_COURSES: Course[] = [
  {
    id: '1',
    title: 'Architecture Cloud Souveraine',
    provider: 'Simplon x OVHcloud',
    duration: '35h',
    level: 'Avancé',
    category: 'Cloud Computing',
    description: 'Concevoir des infrastructures résilientes et conformes aux régulations européennes sans dépendance aux hyperscalers US.',
    skills: ['Terraform', 'Kubernetes', 'SecNumCloud'],
    rating: 4.9,
    ecoScore: {
      carbonFootprint: 0.8,
      pue: 1.1,
      renewableEnergyRatio: 98,
      ecoDesignScore: 92
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français / UE',
      sovereigntyScore: 100
    }
  },
  {
    id: '2',
    title: 'Data Science & IA Générative',
    provider: 'Tech Academy Global',
    duration: '50h',
    level: 'Intermédiaire',
    category: 'IA & Data',
    description: 'Maîtrisez les LLM et le Machine Learning. Note : les modèles sont entraînés sur des clusters haute performance.',
    skills: ['Python', 'PyTorch', 'Transformers'],
    rating: 4.6,
    ecoScore: {
      carbonFootprint: 12.4,
      pue: 1.5,
      renewableEnergyRatio: 35,
      ecoDesignScore: 45
    },
    sovereignty: {
      hostingLocation: ServerRegion.US,
      provider: CloudProvider.AWS,
      gdprCompliance: true,
      legalJurisdiction: 'US Cloud Act',
      sovereigntyScore: 35
    }
  },
  {
    id: '3',
    title: 'Éco-conception Logicielle',
    provider: 'Institut du Numérique Responsable',
    duration: '21h',
    level: 'Débutant',
    category: 'Développement',
    description: 'Réduire l\'empreinte environnementale des services numériques dès la phase de conception.',
    skills: ['Green Code', 'Analyse de Cycle de Vie', 'Accessibilité'],
    rating: 4.8,
    ecoScore: {
      carbonFootprint: 0.3,
      pue: 1.05,
      renewableEnergyRatio: 100,
      ecoDesignScore: 98
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.SCALeway,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 95
    }
  },
  {
    id: '4',
    title: 'Cyber-Défense & SOC Européen',
    provider: 'CyberCampus France',
    duration: '120h',
    level: 'Avancé',
    category: 'Cybersécurité',
    description: 'Apprenez à monitorer et défendre les infrastructures critiques contre les menaces persistantes avancées.',
    skills: ['SIEM', 'EASM', 'Réponse aux incidents'],
    rating: 4.9,
    ecoScore: {
      carbonFootprint: 1.2,
      pue: 1.2,
      renewableEnergyRatio: 90,
      ecoDesignScore: 80
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.LOCAL,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '5',
    title: 'DevOps & CI/CD Responsable',
    provider: 'Engineering School Paris',
    duration: '45h',
    level: 'Intermédiaire',
    category: 'DevOps',
    description: 'Automatisation des déploiements avec une optimisation de la consommation CPU des pipelines.',
    skills: ['Docker', 'GitLab CI', 'Ansible'],
    rating: 4.7,
    ecoScore: {
      carbonFootprint: 2.1,
      pue: 1.3,
      renewableEnergyRatio: 60,
      ecoDesignScore: 75
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.SCALeway,
      gdprCompliance: true,
      legalJurisdiction: 'Droit UE',
      sovereigntyScore: 90
    }
  },
  {
    id: '6',
    title: 'Blockchain & Smart Contracts Ethiques',
    provider: 'Decentralized Academy',
    duration: '30h',
    level: 'Intermédiaire',
    category: 'Web3',
    description: 'Développer des contrats intelligents sur des protocoles à faible consommation énergétique (Proof of Stake).',
    skills: ['Solidity', 'Rust', 'Ethers.js'],
    rating: 4.5,
    ecoScore: {
      carbonFootprint: 0.5,
      pue: 1.1,
      renewableEnergyRatio: 100,
      ecoDesignScore: 88
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.LOCAL,
      gdprCompliance: true,
      legalJurisdiction: 'Multi-juridiction EU',
      sovereigntyScore: 85
    }
  },
  {
    id: '7',
    title: 'UX/UI Design Responsable',
    provider: 'Creative Hub',
    duration: '40h',
    level: 'Débutant',
    category: 'Design',
    description: 'Concevoir des interfaces sobres, accessibles et économes en ressources énergétiques pour les utilisateurs.',
    skills: ['Figma', 'Accessibilité', 'Mobile First'],
    rating: 4.9,
    ecoScore: {
      carbonFootprint: 0.1,
      pue: 1.0,
      renewableEnergyRatio: 100,
      ecoDesignScore: 100
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 95
    }
  },
  {
    id: '8',
    title: 'Big Data & Green Analytics',
    provider: 'DataLab Europe',
    duration: '60h',
    level: 'Avancé',
    category: 'IA & Data',
    description: 'Analyser des pétaoctets de données tout en optimisant le stockage et les requêtes pour limiter l\'impact serveur.',
    skills: ['Spark', 'Hadoop', 'SQL Optimization'],
    rating: 4.4,
    ecoScore: {
      carbonFootprint: 5.8,
      pue: 1.4,
      renewableEnergyRatio: 50,
      ecoDesignScore: 60
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.AZURE,
      gdprCompliance: true,
      legalJurisdiction: 'Droit UE / US',
      sovereigntyScore: 55
    }
  },
  {
    id: '9',
    title: 'Product Management Durable',
    provider: 'Leadership Institute',
    duration: '25h',
    level: 'Débutant',
    category: 'Management',
    description: 'Piloter des produits numériques avec des KPI intégrant la responsabilité sociale et environnementale.',
    skills: ['Agile', 'LCA', 'Stakeholder Management'],
    rating: 4.8,
    ecoScore: {
      carbonFootprint: 0.2,
      pue: 1.1,
      renewableEnergyRatio: 100,
      ecoDesignScore: 95
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.LOCAL,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '10',
    title: 'IoT & Edge Computing Basse Consommation',
    provider: 'Hardware Academy',
    duration: '55h',
    level: 'Avancé',
    category: 'Hardware',
    description: 'Déploiement d\'objets connectés intelligents capables de traiter l\'information localement pour réduire les transferts cloud.',
    skills: ['C++', 'MQTT', 'Edge AI'],
    rating: 4.7,
    ecoScore: {
      carbonFootprint: 1.5,
      pue: 1.2,
      renewableEnergyRatio: 85,
      ecoDesignScore: 82
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 98
    }
  },
  {
    id: '11',
    title: 'Fullstack Next.js & Edge Functions',
    provider: 'Web Mastery',
    duration: '40h',
    level: 'Intermédiaire',
    category: 'Développement',
    description: 'Construire des applications web ultra-rapides et légères en utilisant les technologies de rendu serveur modernes.',
    skills: ['React', 'Next.js', 'Typescript'],
    rating: 4.8,
    ecoScore: {
      carbonFootprint: 2.5,
      pue: 1.35,
      renewableEnergyRatio: 40,
      ecoDesignScore: 70
    },
    sovereignty: {
      hostingLocation: ServerRegion.US,
      provider: CloudProvider.GCP,
      gdprCompliance: true,
      legalJurisdiction: 'US Law',
      sovereigntyScore: 30
    }
  },
  {
    id: '12',
    title: 'Expertise RGPD & Protection des Données',
    provider: 'DPO Conseil',
    duration: '20h',
    level: 'Intermédiaire',
    category: 'Juridique',
    description: 'Devenir le garant de la conformité des données personnelles au sein d\'une organisation complexe.',
    skills: ['GDPR', 'Audit', 'Privacy by Design'],
    rating: 5.0,
    ecoScore: {
      carbonFootprint: 0.1,
      pue: 1.0,
      renewableEnergyRatio: 100,
      ecoDesignScore: 100
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.LOCAL,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '13',
    title: 'Fondamentaux du Numérique Responsable',
    provider: 'Green IT France',
    duration: '14h',
    level: 'Débutant',
    category: 'Développement Durable',
    description: 'Sensibilisation globale aux impacts environnementaux et sociaux du numérique et découverte des bonnes pratiques.',
    skills: ['Sensibilisation', 'Empreinte environnementale', 'Inclusion'],
    rating: 4.8,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.1,
      pue: 1.0,
      renewableEnergyRatio: 100,
      ecoDesignScore: 98
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.LOCAL,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '14',
    title: 'GreenOps & Optimisation Cloud',
    provider: 'FinOps Academy',
    duration: '35h',
    level: 'Avancé',
    category: 'Cloud Computing',
    description: 'Piloter et réduire la consommation énergétique et les coûts environnementaux de vos infrastructures Cloud (AWS, Azure, GCP).',
    skills: ['GreenOps', 'FinOps', 'Monitoring', 'AWS Carbon Footprint'],
    rating: 4.6,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 3.2,
      pue: 1.3,
      renewableEnergyRatio: 45,
      ecoDesignScore: 85
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.AWS,
      gdprCompliance: true,
      legalJurisdiction: 'US Cloud Act / EU',
      sovereigntyScore: 40
    }
  },
  {
    id: '15',
    title: 'TinyML : IA Frugale et Embarquée',
    provider: 'IA Edge Institute',
    duration: '45h',
    level: 'Avancé',
    category: 'IA & Data',
    description: 'Déploiement de modèles de Machine Learning légers sur des microcontrôleurs pour une IA qui consomme des milliwatts au lieu de kilowatts.',
    skills: ['TensorFlow Lite', 'C++', 'Microcontrôleurs', 'Optimisation de modèles'],
    rating: 4.9,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.5,
      pue: 1.1,
      renewableEnergyRatio: 80,
      ecoDesignScore: 95
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 95
    }
  },
  {
    id: '16',
    title: 'Accessibilité Numérique (a11y)',
    provider: 'Inclusive Web',
    duration: '21h',
    level: 'Intermédiaire',
    category: 'Design',
    description: 'Créer des sites et applications web utilisables par tous, y compris les personnes en situation de handicap (normes WCAG, RGAA).',
    skills: ['WCAG', 'HTML Sémantique', 'Lecteurs d\'écran', 'RGAA'],
    rating: 4.9,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.2,
      pue: 1.05,
      renewableEnergyRatio: 100,
      ecoDesignScore: 90
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.SCALeway,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '17',
    title: 'Audit Environnemental des SI',
    provider: 'Bureau Veritas IT',
    duration: '40h',
    level: 'Avancé',
    category: 'Management',
    description: 'Méthodes et outils pour mesurer, auditer et reporter l\'empreinte carbone complète d\'un système d\'information d\'entreprise.',
    skills: ['ACV (Analyse de Cycle de Vie)', 'Audit', 'Reporting RSE'],
    rating: 4.5,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.8,
      pue: 1.2,
      renewableEnergyRatio: 90,
      ecoDesignScore: 85
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit UE',
      sovereigntyScore: 90
    }
  },
  {
    id: '18',
    title: 'Architecture Low-Tech & Résiliente',
    provider: 'Low-Tech Lab',
    duration: '30h',
    level: 'Intermédiaire',
    category: 'Développement',
    description: 'Apprendre à construire des applications web qui tiennent sur un serveur fonctionnant à l\'énergie solaire et résistent aux coupures réseau.',
    skills: ['Vanilla JS', 'Service Workers', 'Optimisation d\'assets', 'P2P'],
    rating: 5.0,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.05,
      pue: 1.0,
      renewableEnergyRatio: 100,
      ecoDesignScore: 100
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.LOCAL,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '19',
    title: 'Recyclage et Reconditionnement IT',
    provider: 'Back Market Academy',
    duration: '25h',
    level: 'Débutant',
    category: 'Hardware',
    description: 'Les bases de la réparation de matériel informatique. Allongez la durée de vie de vos flottes pour réduire drastiquement l\'impact de la fabrication.',
    skills: ['Matériel', 'Diagnostic', 'Réparation', 'Économie Circulaire'],
    rating: 4.7,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.1,
      pue: 1.0,
      renewableEnergyRatio: 100,
      ecoDesignScore: 100
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 90
    }
  },
  {
    id: '20',
    title: 'Développement Back-End Rust & Sobriété',
    provider: 'Mozilla Developer Network',
    duration: '60h',
    level: 'Avancé',
    category: 'Développement',
    description: 'Apprenez à développer avec Rust, réputé pour être l\'un des langages les plus économes en énergie et en ressources mémoire du marché.',
    skills: ['Rust', 'Cargo', 'Gestion mémoire', 'Performance'],
    rating: 4.8,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 1.2,
      pue: 1.2,
      renewableEnergyRatio: 70,
      ecoDesignScore: 90
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.AWS,
      gdprCompliance: true,
      legalJurisdiction: 'Droit UE / US Cloud Act',
      sovereigntyScore: 50
    }
  },
  {
    id: '21',
    title: 'Design Inclusif et Circulaire',
    provider: 'UX Republic',
    duration: '30h',
    level: 'Intermédiaire',
    category: 'Design',
    description: 'Une approche du design qui favorise la réutilisation des composants, la diminution de la charge cognitive et une durée de vie infinie des interfaces.',
    skills: ['Design System', 'Dark Mode', 'Accessibilité', 'Ergonomie cognitive'],
    rating: 4.6,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.3,
      pue: 1.1,
      renewableEnergyRatio: 100,
      ecoDesignScore: 95
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.SCALeway,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '22',
    title: 'Stratégie Numérique Responsable (C-Level)',
    provider: 'HEC IT strategy',
    duration: '18h',
    level: 'Avancé',
    category: 'Management',
    description: 'Formation dédiée aux dirigeants pour intégrer la sobriété numérique dans la stratégie globale, les achats IT et la culture d\'entreprise.',
    skills: ['Stratégie', 'Gouvernance IT', 'Achats responsables', 'Conduite du changement'],
    rating: 4.4,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.5,
      pue: 1.15,
      renewableEnergyRatio: 90,
      ecoDesignScore: 88
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.GCP,
      gdprCompliance: true,
      legalJurisdiction: 'Droit UE',
      sovereigntyScore: 60
    }
  },
  {
    id: '23',
    title: 'Développement Frontend Avancé (React & Performance)',
    provider: 'Web Mastery',
    duration: '50h',
    level: 'Avancé',
    category: 'Programmation',
    description: 'Maîtriser les concepts avancés de React, la gestion d\'état globale (Redux, Zustand) et l\'optimisation drastique des temps de rendu et de la consommation CPU côté client.',
    skills: ['React', 'Performance Web', 'Zustand', 'Web Vitals'],
    rating: 4.8,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 1.5,
      pue: 1.2,
      renewableEnergyRatio: 80,
      ecoDesignScore: 85
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '24',
    title: 'Clean Architecture & TDD en TypeScript',
    provider: 'Software Craftsman School',
    duration: '40h',
    level: 'Intermédiaire',
    category: 'Programmation',
    description: 'Séparer la logique métier des détails d\'implémentation pour coder des applications durables, facilement maintenables et prêtes pour évoluer des années sans réécriture.',
    skills: ['TypeScript', 'TDD', 'Clean Architecture', 'Jest'],
    rating: 4.9,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.8,
      pue: 1.1,
      renewableEnergyRatio: 100,
      ecoDesignScore: 90
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.LOCAL,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français / UE',
      sovereigntyScore: 95
    }
  },
  {
    id: '25',
    title: 'Création d\'APIs Performantes avec Go',
    provider: 'Golang Academy',
    duration: '35h',
    level: 'Intermédiaire',
    category: 'Programmation',
    description: 'Apprendre Go (Golang) pour créer des microservices hautement concurrents nécessitant qu\'une fraction de RAM et de CPU par rapport aux solutions classiques.',
    skills: ['Go', 'Microservices', 'Concurrency', 'gRPC'],
    rating: 4.7,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.5,
      pue: 1.05,
      renewableEnergyRatio: 95,
      ecoDesignScore: 95
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.SCALeway,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 98
    }
  },
  {
    id: '26',
    title: 'Développement Mobile Natif Android & Eco-Design',
    provider: 'Mobile Tech Lead',
    duration: '45h',
    level: 'Avancé',
    category: 'Programmation',
    description: 'Concevoir des applications Android natives avec Kotlin en minimisant l\'impact sur la batterie, la data réseau et le stockage du téléphone de l\'utilisateur.',
    skills: ['Kotlin', 'Android Studio', 'Jetpack Compose', 'Optimisation Batterie'],
    rating: 4.6,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 2.1,
      pue: 1.25,
      renewableEnergyRatio: 60,
      ecoDesignScore: 78
    },
    sovereignty: {
      hostingLocation: ServerRegion.US,
      provider: CloudProvider.GCP,
      gdprCompliance: true,
      legalJurisdiction: 'Droit US',
      sovereigntyScore: 20
    }
  },
  {
    id: '27',
    title: 'Programmation Python : Data & Automatisation',
    provider: 'Code For Humanity',
    duration: '30h',
    level: 'Débutant',
    category: 'Programmation',
    description: 'Fondamentaux du langage Python pour manipuler des données, créer des scripts d\'automatisation et interagir avec des APIs, avec des modules d\'efficacité algorithmique.',
    skills: ['Python', 'Pandas', 'Requests', 'Algorithmique'],
    rating: 4.8,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 1.1,
      pue: 1.15,
      renewableEnergyRatio: 100,
      ecoDesignScore: 85
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 90
    }
  },
  {
    id: '28',
    title: 'Bases de Données SQL & NoSQL : Architecture et Indexation',
    provider: 'Data Engineering DB',
    duration: '35h',
    level: 'Intermédiaire',
    category: 'Programmation',
    description: 'Comprendre et modéliser des bases de données relationnelles et non relationnelles. Optimiser les requêtes lourdes pour limiter l\'empreinte machine de l\'entreprise.',
    skills: ['PostgreSQL', 'MongoDB', 'Modélisation', 'Optimisation Requêtes'],
    rating: 4.9,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 1.8,
      pue: 1.2,
      renewableEnergyRatio: 75,
      ecoDesignScore: 82
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.AWS,
      gdprCompliance: true,
      legalJurisdiction: 'US Cloud Act',
      sovereigntyScore: 50
    }
  },
  {
    id: '29',
    title: 'Développement Web Fullstack Minimaliste (MERN)',
    provider: 'Fullstack Bootcamp',
    duration: '80h',
    level: 'Débutant',
    category: 'Programmation',
    description: 'Devenir développeur web Fullstack en apprenant la pile MERN (MongoDB, Express, React, Node.js). Intègre un module complet sur la réduction du poids de l\'application.',
    skills: ['MongoDB', 'Express', 'React', 'Node.js', 'Bundling'],
    rating: 4.5,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 2.8,
      pue: 1.3,
      renewableEnergyRatio: 85,
      ecoDesignScore: 80
    },
    sovereignty: {
      hostingLocation: ServerRegion.EU,
      provider: CloudProvider.AZURE,
      gdprCompliance: true,
      legalJurisdiction: 'UE / US',
      sovereigntyScore: 55
    }
  },
  {
    id: '30',
    title: 'Génie Logiciel en C/C++ : Systèmes et Embarqué',
    provider: 'Hardware & OS Academy',
    duration: '50h',
    level: 'Avancé',
    category: 'Programmation',
    description: 'Plonger au plus près du matériel avec les langages C et C++. Crucial pour développer des OS, des moteurs 3D ou des systèmes critiques à haute efficacité énergétique.',
    skills: ['C++', 'C', 'Gestion de la mémoire', 'Multithreading'],
    rating: 5.0,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 1.0,
      pue: 1.1,
      renewableEnergyRatio: 90,
      ecoDesignScore: 98
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.LOCAL,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '31',
    title: 'Initiation à l\'Algorithmique et aux Structures de Données',
    provider: 'Algolang',
    duration: '25h',
    level: 'Débutant',
    category: 'Programmation',
    description: 'Un bon code ne se résume pas à son langage. Apprenez les algorithmes fondamentaux, la complexité spatio-temporelle (Big O) pour écrire des logiciels optimisés à la source.',
    skills: ['Algorithmes', 'Complexité Big O', 'Structures de Données', 'Logique'],
    rating: 4.7,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 0.1,
      pue: 1.0,
      renewableEnergyRatio: 100,
      ecoDesignScore: 100
    },
    sovereignty: {
      hostingLocation: ServerRegion.FRANCE,
      provider: CloudProvider.OVH,
      gdprCompliance: true,
      legalJurisdiction: 'Droit Français',
      sovereigntyScore: 100
    }
  },
  {
    id: '32',
    title: 'Création d\'Applications Multiplateformes avec Flutter',
    provider: 'Cross-Platform School',
    duration: '45h',
    level: 'Intermédiaire',
    category: 'Programmation',
    description: 'Utiliser Dart et Flutter pour développer une seule fois et déployer sur iOS, Android, web et bureau, tout en conservant une expérience utilisateur fluide.',
    skills: ['Flutter', 'Dart', 'Widgets', 'State Management'],
    rating: 4.6,
    isValidated: true,
    ecoScore: {
      carbonFootprint: 1.5,
      pue: 1.2,
      renewableEnergyRatio: 80,
      ecoDesignScore: 88
    },
    sovereignty: {
      hostingLocation: ServerRegion.US,
      provider: CloudProvider.AWS,
      gdprCompliance: true,
      legalJurisdiction: 'Droit US',
      sovereigntyScore: 30
    }
  }
];
