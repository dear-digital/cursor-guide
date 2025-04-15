import {defineField} from 'sanity';
import {emailBlock} from '../blocks/emailBlock';
import {phoneBlock} from '../blocks/phoneBlock';

export function contactObject(name = 'contact') {
  return defineField({
    name,
    type: 'object',
    fields: [emailBlock(), phoneBlock()],
    preview: {
      select: {
        email: 'email',
        phone: 'phone',
      },
      prepare({email, phone}) {
        return {
          title: email || 'No Email Provided',
          subtitle: phone || 'No Phone Number Provided',
        };
      },
    },
  });
}
