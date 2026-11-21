import { Contact } from 'components/Contact/Contact';
import { PageJsonLd } from 'components/Seo/PageJsonLd';

import { getPageContent } from 'utils/serverUtils';
import { pageMetadata } from 'utils/seo';

import { ResumeData } from '@/types';

import type { Metadata } from 'next';

const title = 'Contact: Full Stack Developer & SDE';
const description =
  'Get in touch with Gaurav Mishra. Open to Full Stack Developer and SDE opportunities in Delhi NCR and remote.';

export const metadata: Metadata = pageMetadata({ path: '/contact', title, description });

export default async function ContactPage() {
  const pageData: ResumeData = await getPageContent();
  const { contact } = pageData;

  return (
    <>
      <PageJsonLd path="/contact" name="Contact" description={description} type="ContactPage" />
      <Contact contact={contact} />
    </>
  );
}
