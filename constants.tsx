
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
  }
];
