import { ogContentType, ogSize, renderOgImage } from '@/app/_og/OgImage';

export const alt = 'Contact Gaurav Mishra, full stack developer & SDE intern';
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderOgImage({
    index: '05',
    label: 'Contact',
    title: 'Let’s',
    accent: 'connect',
    description:
      'Open to Full Stack and SDE opportunities: Delhi NCR on-site & remote.',
    render: 'rocket',
  });
}
