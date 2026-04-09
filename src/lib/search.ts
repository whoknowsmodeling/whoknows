import { getAllModels } from './edge-data';
import { analyzeSearchIntent } from './gemini';

export interface SearchResult {
  id: string;
  type: 'model' | 'page' | 'job';
  title: string;
  subtitle?: string;
  url: string;
  imageUrl?: string;
}

export async function performSearch(query: string): Promise<SearchResult[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  // Parallel fetch of models and AI intent analysis if query is long/descriptive
  const [models, aiIntent] = await Promise.all([
    getAllModels(),
    q.split(' ').length > 2 ? analyzeSearchIntent(q) : Promise.resolve(null)
  ]);

  const jobs = [
    { id: 'jobs-1', title: 'Booking Assistant', type: 'Full-time' },
    { id: 'jobs-2', title: 'Social Media Manager', type: 'Freelance' }
  ];

  const results: SearchResult[] = [];

  // 1. Search Models
  const modelResults = (models || [])
    .filter(m => {
      // Traditional match
      const textMatch = m.name.toLowerCase().includes(q) || 
                       m.gender.toLowerCase().includes(q) ||
                       m.bio?.toLowerCase().includes(q);
      
      // AI Semantic match (optional boost)
      if (aiIntent) {
        let aiMatch = true;
        if (aiIntent.gender && m.gender !== aiIntent.gender) aiMatch = false;
        if (aiIntent.specialty && !m.bio?.toLowerCase().includes(aiIntent.specialty.toLowerCase())) aiMatch = false;
        if (aiIntent.look && !m.bio?.toLowerCase().includes(aiIntent.look.toLowerCase())) aiMatch = false;
        
        return aiMatch || textMatch;
      }
      
      return textMatch;
    })
    .slice(0, 10)
    .map(m => ({
      id: m.id,
      type: 'model' as const,
      title: m.name,
      subtitle: `${m.gender.charAt(0).toUpperCase() + m.gender.slice(1)} Model`,
      url: `/model/${m.slug}`,
      imageUrl: m.images?.[0]?.imageUrl
    }));
  results.push(...modelResults);

  // 2. Search Jobs
  const jobResults = jobs
    .filter(j => j.title.toLowerCase().includes(q))
    .map(j => ({
      id: j.id,
      type: 'job' as const,
      title: j.title,
      subtitle: 'Career Opportunity',
      url: '/jobs'
    }));
  results.push(...jobResults);

  // 3. Search Static Pages
  const pages = [
    { title: 'About WhoKnows Models', url: '/about', keywords: 'company info about us who we are' },
    { title: 'Become a Model', url: '/apply', keywords: 'apply submission become a model join' },
    { title: 'Contact Us', url: '/contact', keywords: 'email phone location contact help' },
    { title: 'Frequently Asked Questions', url: '/under-18', keywords: 'faq help age support' }
  ];

  const pageResults = pages
    .filter(p => p.title.toLowerCase().includes(q) || p.keywords.toLowerCase().includes(q))
    .map(p => ({
      id: `page-${p.url}`,
      type: 'page' as const,
      title: p.title,
      url: p.url
    }));
  results.push(...pageResults);

  return results.sort((a, b) => a.title.localeCompare(b.title)).slice(0, 15);
}
