import { q } from "groqd";

export function eyecatcherQuery(name = 'eyecatcher') {
  return q.object({
    [name]: q.object({
      backgroundColor: q.string(),
      firstLine: q.string(),
      rotation: q.string(),
      secondLine: q.string(),
      size: q.string(),
    }),
  });
}