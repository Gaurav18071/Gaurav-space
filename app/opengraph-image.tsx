import { ogContentType, ogSize, personName, renderOgImage } from './_og/OgImage';
import content from '../content/content.json';

export const alt = `${personName}: Full Stack Developer & Software Engineer, Delhi India`;
export const size = ogSize;
export const contentType = ogContentType;

const [first, ...rest] = personName.split(' ');

export default function OpenGraphImage() {
  return renderOgImage({
    label: content.home?.titles?.[0] || 'Full Stack Developer',
    title: first,
    accent: rest.join(' '),
    description: 'Full Stack Developer & Software Engineer in Delhi, India · Open to SDE & Full Stack roles.',
    chips: ['Java', 'Spring Boot', 'React', 'Next.js', 'PostgreSQL'],
    render: 'astronaut',
  });
}
