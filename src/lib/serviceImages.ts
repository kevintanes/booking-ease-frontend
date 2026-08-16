export const SERVICE_IMAGES: Record<string, string> = {
  Sports:
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  Beauty:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
  Wellness:
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
  Fitness:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
};

export const DEFAULT_SERVICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c";

export const getServiceImage = (categoryName?: string) => {
  const imgUrl =
    (categoryName && SERVICE_IMAGES[categoryName]) || DEFAULT_SERVICE_IMAGE;

  return imgUrl;
};
