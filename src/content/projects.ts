import type { Project } from '@/types/project';

export const featuredProjects: Project[] = [
  {
    id: 1,
    name: 'Project One',
    description: 'A beautifully designed web application',
    url: 'https://example.com/project-one',
    github: 'https://github.com/yourusername/project-one',
    image: '/og/project-one.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 2,
    name: 'Project Two',
    description: 'Another amazing project',
    url: 'https://example.com/project-two',
    github: 'https://github.com/yourusername/project-two',
    image: '/og/project-two.png',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
];

export const fallbackProjects: Project[] = [
  ...featuredProjects,
  {
    id: 3,
    name: 'Project Three',
    description: 'One more great project',
    url: 'https://example.com/project-three',
    github: 'https://github.com/yourusername/project-three',
    image: '/og/project-three.png',
    tags: ['React', 'TypeScript'],
  },
];
