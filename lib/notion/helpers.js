export function filterPublishedPosts({ posts }) {
  if (!posts || !posts.length) return [];
  return posts.filter((post) => post.title && post.slug && post?.status?.[0] === 'Published' && post.date <= new Date());
}

export function filterPublishedPages({ pages }) {
  if (!pages || !pages.length) return [];
  return pages.filter((page) => page.title && page.slug && page?.status?.[0] === 'Published' && page.date <= new Date());
}

export const isBlogAllowed = (blogPricing, userPricing) => {
  if (blogPricing?.includes('premium')) {
    return userPricing === 'premium';
  }

  // All blog with free pricing are allowed.

  return true;
};
