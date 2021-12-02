export const getNameFromLink = (link) => {
  return 'dark_theme__' + link.replace('https://', '').replace(/\//g, '__')
}