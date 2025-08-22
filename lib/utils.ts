export const getYouTubeVideoId = (url: string) => {
  // Handle both normal and embed URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const getYouTubeThumbnail = (url: string) => {
  const videoId = getYouTubeVideoId(url);
  // Return highest quality thumbnail
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
};
