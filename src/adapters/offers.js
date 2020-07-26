export const createOffers = (data) =>
  data.map((offer) => {
    return {
      bedrooms: offer.bedrooms,
      city: offer.city,
      description: offer.description,
      features: offer.goods,

      hostName: offer.host.name,
      hostAvatar: offer.host.avatar_url,
      isHostPro: offer.host.is_pro,
      hostId: offer.host.id,

      id: offer.id,
      images: offer.images,
      isBookmark: offer.is_favorite,
      isPremium: offer.is_premium,

      location: offer.location,

      maxAdults: offer.max_adults,
      previewImg: offer.preview_image,
      price: offer.price,
      rating: offer.rating,
      name: offer.title,
      type: offer.type,
    };
  });
