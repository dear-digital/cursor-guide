import imageUrlBuilder from '@sanity/image-url';

export function getImageUrl(ref: string, env: any, width = 1920) {
  const config = {
    dataset: env.SANITY_STUDIO_DATASET,
    projectId: env.SANITY_STUDIO_PROJECT_ID,
  };

  const urlBuilder = imageUrlBuilder({
    dataset: config.dataset,
    projectId: config.projectId,
  });

  return urlBuilder.image(ref).width(width).url();
}
