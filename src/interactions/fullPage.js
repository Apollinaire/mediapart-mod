export const isArticleLink = href => {
  let url;
  try {
    url = new URL(href);
  } catch (error) {
    return false;
  }

  return url.host === 'www.mediapart.fr' && articlePathnameRegex.test(url.pathname);
};

const articlePathnameRegex = /^\/journal\/([a-z]|-)+\/[0-9]{6}\/[^\/]+$/;

export const isBlogLink = href => {
  let url;
  try {
    url = new URL(href);
  } catch (error) {
    return false;
  }

  return (
    url.host === 'blogs.mediapart.fr' &&
    (blogPathnameRegex.test(url.pathname) || blogEditionPathnameRegex.test(url.pathname))
  );
};

const blogPathnameRegex = /^\/([a-z]|[0-9]|-)+\/blog\/[0-9]{6}\/[^\/]+$/;
const blogEditionPathnameRegex = /^\/edition\/([a-z]|[0-9]|-)+\/article\/[0-9]{6}\/[^\/]+$/;
