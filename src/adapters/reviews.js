export const createReviews = (data) =>
  data.map((review) => {
    return {
      comment: review.comment,
      date: review.date,
      id: review.id,
      rating: review.rating,
      userAvatar: review.user.avatar_url,
      userId: review.user.id,
      isUserPro: review.user.is_pro,
      userName: review.user.name,
    };
  });
