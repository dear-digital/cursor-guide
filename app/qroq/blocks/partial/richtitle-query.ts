import {q} from 'groqd';

export function richtitleQuery(name = 'richtitle') {
  return q
    .array(
      q.object({
        _key: q.string().optional(),
        _type: q.string(),
        children: q.array(
          q.object({
            _key: q.string(),
            _type: q.string(),
            marks: q.array(q.string()),
            text: q.string(),
          }),
        ),
        style: q.string().optional(),
      }),
    )
    .nullable();
}
