import {DefaultDocumentNodeResolver, StructureResolver} from 'sanity/structure';

import {SINGLETONS, singleton} from './singletons';

import {IconBlog} from '../components/icons/Blog';
import {products} from './productStructure';
import {collections} from './collectionStructure';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S) => {
  return S.document().views([S.view.form()]);
};

export const structure: StructureResolver = (S, context) => {
  return S.list()
    .title('Content')
    .items([
      singleton(S, SINGLETONS.home),
      S.documentTypeListItem('page'),
      S.documentTypeListItem('blogPost').icon(IconBlog),

      S.divider(),
      products(S, context),
      collections(S, context),

      S.divider(),
      singleton(S, SINGLETONS.header),
      singleton(S, SINGLETONS.footer),
    ]);
};
