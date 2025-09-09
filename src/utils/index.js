export function removeSlashUrl(url = ""){
  let newUrl = url;
  if(url[url.length - 1] === '/'){
    newUrl = url.substring(0, url.length - 1);
  }
  return newUrl;
}
