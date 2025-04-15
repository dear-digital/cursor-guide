import {
  Button,
  Facebook,
  FooterLinks,
  FooterLinksBlock,
  FooterSection,
  FooterShopLogo,
  FooterShopLogos,
  FooterShopLogosBlock,
  FooterSmallLinks,
  FooterSocialLinkBlock,
  FooterSocialLinks,
  Headline,
  Instagram,
  NewsletterSubscription,
  Pinterest,
  ProductStripe,
  Typography,
  Youtube,
} from '@vorwerk/fibre-react';
import {useState} from 'react';

import LinkRenderer from '~/lib/renderers/linkRenderer';
import {getImageUrl} from '~/lib/utilities/getImageUrl';
import {useRootLoaderData} from '~/root';

import {CountrySelector} from './CountrySelector';

export function Footer() {
  const {env, locale, sanityRoot, seo} = useRootLoaderData();
  const data = sanityRoot?.data;
  const footer = data?.footer;
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<null | string>(null);
  const slug = seo?.url?.split('/')?.slice(3)?.join('/') || '';

  const isLandingPage = [
    `${locale.pathPrefix}/tm7-landing`,
  ].some((path) => `/${slug}` === path);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentLocale = window.location.pathname.split('/')[1] || '';

    try {
      const response = await fetch(`/${currentLocale}/api/email-subscribe`, {
        body: JSON.stringify({
          email_address: email,
          listId: footer?.newsletter.mailchimpId as string,
          status: 'subscribed',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (response.ok) {
        setStatusMessage(footer?.newsletter.successMessage as string);
        setEmail('');
      }
    } catch (error) {
      throw new Error(`External API error: ${error}`);
    }
  };

  const productStripeImages = footer?.productStripe?.images?.map((image, index) => (
    <img 
      alt={(footer?.productStripe?.title as string) || 'Product'}
      key={`product-stripe-${index}-${image.asset._ref}`}
      src={getImageUrl((image.asset as any).asset._ref, env)}
    />
  ));

  const linkGroups = isLandingPage
    ? footer?.landingPageLinkGroups
    : footer?.linkGroups;

  return (
    <footer>
      {!isLandingPage && (
        <>
          <FooterSection variant="spacingVertical">
            {(footer?.newsletter.buttonText as string) && (
              <NewsletterSubscription
              button={
                <div>
                  <form
                    className="flex items-center gap-4"
                    onSubmit={handleSubmit}
                  >
                    <input
                      className="w-full rounded-[8px] p-3 text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none lg:w-1/3"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        footer?.newsletter.inputPlaceholder as string
                      }
                      required
                      type="email"
                      value={email}
                    />
                    <Button buttonStyle="primary" size="large">
                      {footer?.newsletter.buttonText as string}
                    </Button>
                  </form>
                  {statusMessage && (
                    <p className="text-green-600 mt-2">{statusMessage}</p>
                  )}
                </div>
              }
              headline={
                <Headline>
                  <Typography component="h2">
                    {footer?.newsletter.title as string}
                  </Typography>
                </Headline>
              }
            />
          )}
          </FooterSection>
        </>
      )}
      <FooterSection
        variant={isLandingPage ? 'spacingVertical' : 'spacingBottom'}
      >
        {linkGroups && (
          <FooterLinks>
            {linkGroups.map((group, index) => (
              <FooterLinksBlock
                header={
                  <Typography fontWeight="bold" variant="paragraph18">
                    {group.title as string}
                  </Typography>
                }
                key={index}
                links={group.links.map((link, index) => (
                  <div key={index}>
                    {typeof link?.label === 'string' && (
                      <Typography variant="paragraph16">
                        <LinkRenderer data={{link: link as any}} />
                      </Typography>
                    )}
                  </div>
                ))}
              />
            ))}
          </FooterLinks>
        )}
      </FooterSection>
      {!isLandingPage && (
        <FooterSection variant="spacingBottom">
          <FooterShopLogos>
            {footer?.shopLogos?.map((section, index) => (
              <FooterShopLogosBlock
                bigLogos={section.bigLogos}
                header={
                  <Typography fontWeight="bold" variant="paragraph18">
                    {section.title as string}
                  </Typography>
                }
                key={index}
                logos={section.logos.map((logo, index) => (
                  <FooterShopLogo
                    caption={logo.caption || undefined}
                    hasBackground={true}
                    key={index}
                  >
                    {(logo.image?.asset as any).asset._ref && (
                      <img
                        alt={`payment method ${logo?.caption || ''}`}
                        src={getImageUrl(
                          (logo?.image?.asset as any).asset._ref,
                          env,
                        )}
                      />
                    )}
                  </FooterShopLogo>
                ))}
              />
            ))}
          </FooterShopLogos>
        </FooterSection>
      )}
      {!isLandingPage && (
        <FooterSection variant="spacingBottom">
          <FooterSocialLinks>
            {footer?.socialLinks?.map((link, index) => {
              const socialMediaLinks = [
                link.facebook && (
                  <a
                    href={link.facebook as string}
                    key="facebook"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Facebook />
                  </a>
                ),
                link.instagram && (
                  <a
                    href={link.instagram as string}
                    key="instagram"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Instagram />
                  </a>
                ),
                link.pinterest && (
                  <a
                    href={link.pinterest as string}
                    key="pinterest"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Pinterest />
                  </a>
                ),
                link.youtube && (
                  <a
                    href={link.youtube as string}
                    key="youtube"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Youtube />
                  </a>
                ),
              ].filter(Boolean);

              return socialMediaLinks.length > 0 ? (
                <FooterSocialLinkBlock
                  header={
                    <Typography fontWeight="bold" variant="paragraph18">
                      {link.title}
                    </Typography>
                  }
                  key={index}
                  links={socialMediaLinks}
                />
              ) : null;
            })}
          </FooterSocialLinks>
        </FooterSection>
      )}
      <FooterSection borderBottom={true} variant="spacingBottom">
        <FooterSocialLinks>
          <CountrySelector
            buttonLabel={footer?.languageSelector?.buttonLabel as string}
            modalTitle={footer?.languageSelector?.modalTitle as string}
            suggestedLabel={footer?.languageSelector?.suggestedLabel as string}
          />
        </FooterSocialLinks>
      </FooterSection>
      <FooterSection>
        <FooterSmallLinks>
          <ul>
            {footer?.smallLinks?.map((link, index) => (
              <li key={index}>
                {typeof link?.label === 'string' && (
                  <Typography variant="paragraph12">
                    <LinkRenderer data={{link: link as any}} />
                  </Typography>
                )}
              </li>
            ))}
          </ul>
        </FooterSmallLinks>
      </FooterSection>
    </footer>
  );
}
