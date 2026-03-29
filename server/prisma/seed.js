import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

const FULL_COURSES = [
  {
    id: '1',
    title: 'Architecture Cloud Souveraine',
    provider: 'Simplon x OVHcloud',
    duration: '35h',
    level: 'Avancé',
    category: 'Cloud Computing',
    description: 'Apprenez à concevoir des infrastructures cloud résilientes en utilisant des fournisseurs européens pour garantir la souveraineté de vos données.',
    skills: ['Terraform', 'Kubernetes', 'SecNumCloud', 'Data Privacy'],
    rating: 4.9,
    ecoScore: { carbonFootprint: 0.8, pue: 1.1, renewableEnergyRatio: 98, ecoDesignScore: 92 },
    sovereignty: { hostingLocation: 'France', provider: 'OVHcloud', gdprCompliance: true, legalJurisdiction: 'FR', sovereigntyScore: 100 },
    modules: [
      {
        title: 'Fondamentaux de la Souveraineté',
        lessons: [
          { 
            title: 'Le paysage géopolitique du Cloud', 
            content: '# La Souveraineté Numérique\n\nDans cette leçon, nous analysons pourquoi la dépendance aux acteurs extra-européens pose un risque stratégique.\n\n### Points clés :\n- **Lois extraterritoriales** : Comprendre le Cloud Act américain.\n- **Indépendance technologique** : Pourquoi posséder ses propres datacenters.\n- **Le rôle de l\'UE** : Les initiatives comme Gaia-X.\n\n> "La donnée est le pétrole du 21ème siècle, mais la souveraineté est le pipeline qui la protège."' 
          },
          { 
            title: 'RGPD et Protection des Données', 
            content: '# Le RGPD comme Bouclier\n\nLe Règlement Général sur la Protection des Données n\'est pas qu\'une contrainte, c\'est un standard mondial.\n\n```json\n{\n  "compliance": "required",\n  "region": "EU",\n  "audit": "annual"\n}\n```\n\nNous verrons comment configurer vos buckets S3 sur des régions spécifiques pour garantir que les données ne quittent jamais le sol européen.' 
          }
        ]
      },
      {
        title: 'Infrastructures Techniques',
        lessons: [
          { 
            title: 'Provisionnement avec Terraform', 
            content: '# Infrastructure as Code Souveraine\n\nUtilisons Terraform pour déployer une instance sur un fournisseur local.\n\n```hcl\nresource "openstack_compute_instance_v2" "web_server" {\n  name            = "srv-souverain-01"\n  image_name      = "Ubuntu 22.04"\n  flavor_name     = "s1-2"\n  key_pair        = "admin_key"\n  security_groups = ["default"]\n}\n```\n\nL\'avantage ici est la **réversibilité** : ne soyez jamais enfermé chez un seul prestataire.' 
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Éco-conception Logicielle',
    provider: 'INR (Institut du Numérique Responsable)',
    duration: '21h',
    level: 'Débutant',
    category: 'Développement',
    description: 'Réduisez l\'impact environnemental de vos services numériques dès la première ligne de code.',
    skills: ['Green IT', 'LCA', 'Performance Optimization', 'Web Sobriety'],
    rating: 4.8,
    ecoScore: { carbonFootprint: 0.3, pue: 1.05, renewableEnergyRatio: 100, ecoDesignScore: 98 },
    sovereignty: { hostingLocation: 'France', provider: 'Scaleway', gdprCompliance: true, legalJurisdiction: 'FR', sovereigntyScore: 95 },
    modules: [
      {
        title: 'Impact Environnemental du Numérique',
        lessons: [
          { 
            title: 'Les 3 tiers du numérique', 
            content: '# D\'où vient la pollution numérique ?\n\nIl est crucial de comprendre que l\'impact se divise en trois zones :\n\n1. **Les Terminaux** (70% de l\'impact) : Fabrication et fin de vie.\n2. **Le Réseau** : Transfert des données.\n3. **Les Centres de données** : Stockage et calcul.\n\n### La règle d\'or : La Sobriété\nLe code le plus écologique est celui que l\'on n\'écrit pas.' 
          }
        ]
      },
      {
        title: 'Optimisation du Code',
        lessons: [
          { 
            title: 'Mesurer avant d\'agir', 
            content: '# Outils de Mesure\n\nAvant d\'optimiser, il faut mesurer la consommation CPU et mémoire.\n\n- **Lighthouse** : Pour le web.\n- **Scaphandre** : Pour la consommation serveur.\n- **EcoIndex** : Pour le score global de page.\n\nExemple de bonne pratique :\n- Utiliser le format d\'image **WebP** au lieu de PNG.\n- Limiter les requêtes API inutiles.\n- Implémenter un cache agressif.' 
          }
        ]
      }
    ]
  }
];

async function main() {
  console.log('Refreshing database with high-quality Markdown content...');
  for (const course of FULL_COURSES) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: {
        modules: course.modules,
        description: course.description,
        skills: course.skills
      },
      create: { ...course, isValidated: true },
    });
    console.log(`- Updated: ${course.title}`);
  }
  console.log('Migration to Markdown successful.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
