import type {IconProps} from './Icon';

import {Icon} from './Icon';

export function IconMenu(props: IconProps) {
  return (
    <Icon {...props} stroke={props.stroke || 'currentColor'}>
      <title>Menu</title>
      <line strokeWidth="2" x1="3" x2="17" y1="7.375" y2="7.375" />
      <line strokeWidth="2" x1="3" x2="17" y1="12.375" y2="12.375" />
    </Icon>
  );
}
