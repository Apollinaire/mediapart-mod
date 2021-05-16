export const articleLinksToFullPage = () => {
  const links = document.getElementsByTagName('a');
  for (const a of links) {
    if (a.href && isArticleLink(a.href)) {
      a.href = getFullPageLink(a.href);
    }
  }
}