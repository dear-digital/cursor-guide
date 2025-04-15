export interface RichTextNode {
  bold?: boolean;
  children?: RichTextNode[];
  italic?: boolean;
  level?: number;
  listType?: 'ordered' | 'unordered';
  type: string;
  url?: string;
  value?: string;
}

export interface RichTextRoot {
  children: RichTextNode[];
  type: 'root';
}

export function ShopifyRichTextToHtml(jsonString: string): string {
  let parsedData: RichTextRoot;

  try {
    parsedData = JSON.parse(jsonString) as RichTextRoot;
  } catch (error) {
    // console.error('Error parsing JSON string:', error);
    return 'Invalid rich text data';
  }

  const convertNodeToHtml = (node: RichTextNode | RichTextRoot): string => {
    switch (node.type) {
      case 'heading': {
        const level = node.level || 1;
        return `<h${level}>${node.children?.map(convertNodeToHtml).join('')}</h${level}>`;
      }
      case 'link': {
        const url = node.url || '#';
        const linkText = node.children?.map(convertNodeToHtml).join('') || '';
        return `<a href="${url}">${linkText}</a>`;
      }
      case 'list': {
        const tag = node.listType === 'ordered' ? 'ol' : 'ul';
        const className =
          node.listType === 'ordered' ? 'list-decimal' : 'list-disc';
        const itemsHtml =
          node.children?.map((item) => convertNodeToHtml(item)).join('') || '';
        return `<${tag} class="${className} p-5">${itemsHtml}</${tag}>`;
      }
      case 'list-item': {
        return `<li>${node.children?.map(convertNodeToHtml).join('')}</li>`;
      }
      case 'paragraph': {
        // Check if the paragraph is specifically a placeholder for a space or break
        if (
          node.children?.length === 1 &&
          (node.children[0].value === '--' || node.children[0].value === '')
        ) {
          return '<br>'; // Replace the paragraph with a <br> tag
        }
        return `<p>${node.children?.map(convertNodeToHtml).join('')}</p>`;
      }
      case 'root':
        return node.children?.map(convertNodeToHtml).join('') || '';
      case 'text': {
        let text = node.value || '';
        if (node.bold) {
          text = `<strong>${text}</strong>`;
        }
        if (node.italic) {
          text = `<em>${text}</em>`;
        }
        return text;
      }
      default:
        return '';
    }
  };

  return convertNodeToHtml(parsedData);
}
