import type {TypeFromSelection} from 'groqd';

import {useEffect} from 'react';

import type {SectionDefaultProps} from '~/lib/type';
import type {SECTION_NAVIGATOR_SECTION_FRAGMENT} from '~/qroq/content-blocks/sectionNavigatorSectionFragment';

import {Section} from '../layout/Section';

export type SectionNavigatorSectionProps = TypeFromSelection<
  typeof SECTION_NAVIGATOR_SECTION_FRAGMENT
>;

export function SectionNavigatorSection(
  props: {data: SectionNavigatorSectionProps} & SectionDefaultProps,
) {
  const {data} = props;

  // Handle smooth scrolling
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);

        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({behavior: 'smooth'});
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <Section>
      <div className="container">
        <ul className="grid grid-cols-2 gap-4 md:flex md:justify-between md:gap-8">
          {data.navigationItems.map((item) => (
            <li key={item.id}>
              <a
                className="flex items-center whitespace-nowrap px-2 py-1 text-sm font-medium text-[#009A3D] hover:underline"
                href={`#${item.id}`}
              >
                {item.label as string}
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
