import type {TypeFromSelection} from 'groqd';

import {useLoaderData} from '@remix-run/react';
import {Download} from '@vorwerk/fibre-react';

import type {SectionDefaultProps} from '~/lib/type';
import type {DOWNLOADS_SECTION_FRAGMENT} from '~/qroq/content-blocks/downloadsSectionFragment';
import type {loader} from '~/routes/($locale).products.$productHandle';

import TitleRenderer from '~/lib/renderers/titleRenderer';

import Container from '../Container';
import {Section} from '../layout/Section';

export type DownloadsSectionProps = TypeFromSelection<
  typeof DOWNLOADS_SECTION_FRAGMENT
>;

export function DownloadSection(
  props: {data: DownloadsSectionProps} & SectionDefaultProps,
) {
  const {data} = props;
  const {product} = useLoaderData<typeof loader>();

  const productDownloads = product.metafields.find(
    (metafield) => metafield?.key === 'product_downloads',
  );

  if (!productDownloads) return null;

  const productDownloadsReferences = productDownloads.references?.edges || [];

  const downloads = productDownloadsReferences
    .map((reference) => {
      if (reference.node.__typename !== 'Metaobject') return null;

      const fields = reference.node.fields;
      const fileName = fields.find((field) => field.key === 'file_name');
      const fileDownloadUrl = fields.find((field) => field.key === 'file');
      const type = reference.node.type;

      return {
        fileDownloadUrl:
          (fileDownloadUrl?.reference as unknown as {url: string})?.url || '',
        title: fileName?.value || 'No title',
        type,
      };
    })
    .filter((download) => download !== null);

  return (
    <div id={data.id}>
      <Section>
        <Container>
          {/* Render Title */}
          {data.title && data.title.title && (
            <div className="pb-8 text-center lg:pb-16">
              <TitleRenderer data={{title: data.title}} />
            </div>
          )}

          {/* Render PDF Files */}
          <div className="flex flex-col items-center justify-center gap-4 text-base">
            {downloads?.map((pdfFileDetails, index) => (
              <div
                className="flex w-full items-center justify-between rounded-lg border border-[#b2b4b5] p-3 lg:p-6"
                key={index}
              >
                <span className="font-semibold text-contentPrimary">
                  {pdfFileDetails?.title || `Download PDF ${index + 1}`}
                </span>

                <a
                  className="flex h-6 w-6 items-center space-x-2"
                  href={`${pdfFileDetails?.fileDownloadUrl}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Download className="text-primary" />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
