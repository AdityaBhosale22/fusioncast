/**
 * Formats numeric view counts into human-readable strings (e.g., 1.2K, 3.5M)
 */
export const formatViews = (views) => {
  if (views === null || views === undefined || isNaN(views)) return '0';
  const num = Number(views);
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export default formatViews;
