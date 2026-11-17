import { ogContentType, ogSize, personName, renderOgImage } from './_og/OgImage';
import content from '../content/content.json';

export const alt = `${personName}: Full Stack Developer & SDE, Delhi India`;
export const size = ogSize;
export const contentType = ogContentType;

const [first, ...rest] = personName.split(' ');

export default function OpenGraphImage() {
  return renderOgImage({
    label: content.home?.titles?.[0] || 'Software Development Engineer',
    title: first,
    accent: rest.join(' '),
    description: 'Full Stack Developer & SDE in Delhi, India · Remote & Global.',
    chips: ['React', 'Next.js', 'Java', 'Spring Boot', 'TypeScript'],
    render: 'astronaut',
  });
}
