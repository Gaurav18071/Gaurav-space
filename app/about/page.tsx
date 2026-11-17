import { About } from 'components/About/About';
import { PageJsonLd } from 'components/Seo/PageJsonLd';

import { getPageContent } from 'utils/serverUtils';
import { pageMetadata } from 'utils/seo';

import { ResumeData } from '@/types';

import type { Metadata } from 'next';

const title = 'About: Full Stack Developer & SDE';
const description =
  'Full Stack Developer & SDE based in Delhi, India. Building modern web applications with Java, Spring Boot, Next.js, and React.';

export const metadata: Metadata = pageMetadata({ path: '/about', title, description });

export default async function AboutPage() {
  const pageData: ResumeData = await getPageContent();
  const { global, about, footer } = pageData;

  return (
    <>
      <PageJsonLd path="/about" name="About" description={description} type="AboutPage" />
      <About
        about={about}
        openToWork={global.openToWork}
        name={footer.name}
        location={global.location}
      />
    </>
  );
}
