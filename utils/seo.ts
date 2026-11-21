import content from '../content/content.json';

import type { Metadata } from 'next';

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
const isLocalhost = !envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1');

export const siteUrl =
  process.env.NODE_ENV === 'production'
    ? isLocalhost
      ? 'https://gaurav-space.vercel.app'
      : envUrl
    : envUrl || 'http://localhost:3000';

export const personName = content.home?.name || 'Gaurav Mishra';

export const siteDescription =
  'Full Stack Developer & Software Development Engineer based in Delhi, India. Building end-to-end applications with React, Next.js, Java, Spring Boot, and PostgreSQL. Open to SDE and full-stack roles.';

// Bump in content.json (global.contentUpdated) whenever site content meaningfully changes;
// feeds sitemap lastModified and ProfilePage dateModified.
export const contentUpdated = content.global?.contentUpdated || '2026-08-28';

/** Each route renders its own card via an opengraph-image.tsx next to its page */
const ogImageFor = (path: string, alt: string) => ({
  url: `${path === '/' ? '' : path}/opengraph-image`,
  width: 1200,
  height: 630,
  alt,
  type: 'image/png',
});

/**
 * Complete per-page metadata. Next.js replaces (not merges) nested openGraph/twitter
 * objects from the root layout, so every field must be restated here — a page that
 * sets only openGraph.title would silently drop og:type, og:image, siteName, etc.
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const fullTitle = `${title} | ${personName}`;
  const ogImage = ogImageFor(path, fullTitle);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: `${personName} - Full Stack Developer & SDE`,
      title: fullTitle,
      description,
      locale: 'en_IN',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@gauravmishra_dev',
      images: [ogImage.url],
    },
  };
}
