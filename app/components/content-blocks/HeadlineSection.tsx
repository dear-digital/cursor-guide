import type { TypeFromSelection } from 'groqd';

import {
  Facebook,
  FooterSocialLinkBlock,
  FooterSocialLinks,
  Headline,
  Telegram,
  Twitter,
  Whatsapp
} from '@vorwerk/fibre-react';

import type { SectionDefaultProps } from '~/lib/type';
import type { HEADLINE_SECTION_FRAGMENT } from '~/qroq/content-blocks/headlineSectionFragment';

import ButtonGroupRenderer from '~/lib/renderers/buttonGroupRenderer';
import TextRenderer from '~/lib/renderers/textRenderer';
import TitleRenderer from '~/lib/renderers/titleRenderer';
import { sanitizeInput } from '~/lib/utilities/sanitizeInput';

import { Section } from '../layout/Section';

export type HeadlineSectionProps = TypeFromSelection<
  typeof HEADLINE_SECTION_FRAGMENT
>;

export function HeadlineSection(
  props: {data: HeadlineSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const theme = sanitizeInput(data.colorTheme);

  const socialMediaLinks = [
    data.socialLinks?.facebook && (
      <a href={data.socialLinks.facebook} rel="noreferrer" target='_blank'>
        <Facebook />
      </a>
    ),
    data.socialLinks?.telegram && (
      <a href={data.socialLinks.telegram} rel="noreferrer" target='_blank'>
        <Telegram />
      </a>
    ),
    data.socialLinks?.whatsapp && (
      <a href={data.socialLinks.whatsapp} rel="noreferrer" target='_blank'>
        <Whatsapp />
      </a>
    ),
    data.socialLinks?.x && (
      <a href={data.socialLinks.x} rel="noopener noreferrer" target="_blank">
        <Twitter />
      </a>
    ),
  ];

  return (
    <Section className={`text-theme-${theme} text-center`} colorTheme={theme}>
      <Headline
        children={<TitleRenderer data={{title: data.headline}} />}
        eyebrowLine={data.eyebrowline as React.ReactNode}
        spaceBelow={data.spaceBelow}
        strongColor={data.strongColor}
        subline={<TextRenderer className='subline-text leading-12 lg:text-sm' data={{text: data.subline}} />}
      />
      {data.socialLinks && (
        <div className="headline-social-links">
          <FooterSocialLinks>
            <FooterSocialLinkBlock links={socialMediaLinks} />
          </FooterSocialLinks>
        </div>
      )}
      {data.linksBlock && (
        <div className="m-auto mb-8">
          <ButtonGroupRenderer buttonGroup={{buttonGroup: data.linksBlock}} />
        </div>
      )}
    </Section>
  );
}
