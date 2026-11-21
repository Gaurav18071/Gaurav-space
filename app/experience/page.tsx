import { Experience } from 'components/Experience/Experience';
import { PageJsonLd } from 'components/Seo/PageJsonLd';

import { getPageContent } from 'utils/serverUtils';
import { pageMetadata } from 'utils/seo';

import { ResumeData } from '@/types';

import type { Metadata } from 'next';

const title = 'Experience: Full Stack & SDE Internships';
const description =
  'Work experience across Data & AI, frontend development, and web engineering internships at Ministry of Panchayati Raj, Atldo Tech, and Brainwave Matrix.';

export const metadata: Metadata = pageMetadata({ path: '/experience', title, description });

export default async function ExperiencePage() {
  const pageData: ResumeData = await getPageContent();
  const { experience } = pageData;

  return (
    <>
      <PageJsonLd path="/experience" name="Experience" description={description} />
      <Experience experience={experience} />
    </>
  );
}
