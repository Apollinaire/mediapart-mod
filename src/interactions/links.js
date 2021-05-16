export const isArticleLink = href => {
  let url;
  try {
    url = new URL(href);
  } catch (error) {
    return false;
  }

  return url.host === 'www.mediapart.fr' && articlePathnameRegex.test(url.pathname);
};

const articlePathnameRegex = /^\/journal\/([a-z]|-)+\/[0-9]{6}\/[^/]+$/;

export const getFullPageLink = (href) => {
  const url = new URL(href)
  if (url.searchParams.get('onglet') === 'full' || url.searchParams.has('page_article')) {
    return href
  }
  url.searchParams.append('onglet', 'full')
  return url.toString()
}