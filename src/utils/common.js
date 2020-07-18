export const getStyleStars = (rating) => {
  const starsStyle = `${Math.round(rating) * 20}%`;
  return starsStyle;
};
