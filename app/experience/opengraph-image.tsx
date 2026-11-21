import { ogContentType, ogSize, renderOgImage } from '@/app/_og/OgImage';

export const alt = 'Gaurav Mishra work experience at Ministry of Panchayati Raj, Atldo Tech and Brainwave Matrix';
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    index: '02',
    label: 'Experience',
    title: 'Work',
    accent: 'experience',
    description:
      'Work experience across Data & AI, frontend development, and web engineering internships at Ministry of Panchayati Raj, Atldo Tech, and Brainwave Matrix.',
    render: 'satellite',
  });
}
