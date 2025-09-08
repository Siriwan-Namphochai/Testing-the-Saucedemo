function removeSlashUrl(url = ""){
    let newUrl = url;

    if(url[url.lenght - 1] === '/'){
        newUrl = url.substring(0, url.lenght - 1);
    }
    
    return newUrl;
}
module.exports ={
    removeSlashUrl,
}