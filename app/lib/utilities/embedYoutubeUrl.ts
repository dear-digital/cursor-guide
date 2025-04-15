export function convertToEmbedUrl(url: string) {
  // Regular expression to check if it's already an embed link
  const embedCheckRegex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/;

  if (embedCheckRegex.test(url)) {
      return url; // Return the original URL if it's already an embed link
  }

  // Regular expression to extract video ID from standard YouTube links
  const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(videoIdRegex);

  if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`; // Convert to embed URL
  } else {
      throw new Error("Invalid YouTube URL");
  }
}