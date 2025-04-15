import type {TypeFromSelection} from 'groqd';

import {Button, ButtonGroup} from '@vorwerk/fibre-react';

import {linksBlockQuery} from '~/qroq/blocks/linksblock-query';

import IconRenderer from './iconRenderer';

export const buttonGroupProps = {
  buttonGroup: linksBlockQuery(),
};

export type ButtonGroupRendererProps = TypeFromSelection<
  typeof buttonGroupProps
>;

export default function ButtonGroupRenderer(props: {
  buttonGroup: ButtonGroupRendererProps;
}) {
  const {buttonGroup} = props;

  if (!buttonGroup.buttonGroup?.buttons) {
    return null;
  }

  return (
    <ButtonGroup
      alignment={buttonGroup.buttonGroup.alignment}
      layout={buttonGroup.buttonGroup.layout}
      sizing={buttonGroup.buttonGroup.sizing}
    >
      {buttonGroup.buttonGroup?.buttons?.map((button, key) => {
        const label = button.label ?? 'Default Label';
        const url =
          button.url?.externalLink || button.url?.internalLink?.slug?.current;

        return (
          <Button
            buttonStyle={button.style}
            componentNode={'a'}
            icon={
              button.icon ? (
                <IconRenderer data={{name: button.icon}} />
              ) : undefined
            }
            iconPosition={button.iconPosition}
            invertColors={button.invertColors}
            key={key}
            size={button.size}
            url={url}
            // size={button.size} // breaks the button layout
          >
            {button.url?.externalLink ? (
              <a href={url} rel="noreferrer" target="_blank">
                {label as string}
              </a>
            ) : (
              (label as string)
            )}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
