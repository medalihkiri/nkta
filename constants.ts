import { NavItem, Project } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'studio', label: 'STUDIO', href: '#studio' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'HYPER_KINETIC',
    category: 'WEBGL / EXPERIENTIAL',
    year: '2024',
    description: 'Real-time financial data visualization platform for high-frequency trading firms. Utilizing WebGPU for million-particle simulations.',
    imageUrl: 'https://picsum.photos/800/600?grayscale',
  },
  {
    id: '02',
    title: 'VOID_WALKER',
    category: 'DIGITAL FASHION',
    year: '2023',
    description: 'Augmented reality commerce experience for underground streetwear collective. Zero-latency cloth simulation on mobile devices.',
    imageUrl: 'https://picsum.photos/800/601?grayscale',
  },
  {
    id: '03',
    title: 'AERO_SYSTEMS',
    category: 'BRAND IDENTITY',
    year: '2023',
    description: 'Complete digital overhaul for aerospace logistics provider. Monochromatic, data-dense interfaces inspired by cockpit avionics.',
    imageUrl: 'https://picsum.photos/800/599?grayscale',
  }
];

export const CONTACT_EMAIL = 'hello@nokta.studio';
export const STUDIO_COORDS = '40.7128° N, 74.0060° W';