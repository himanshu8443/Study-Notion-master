let cachedData  = "appV1"
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cachedData ).then((cache) => {
       const urls = [
        "/static/js/main.*.js",
        "/static/css/main.*.css",
        "/index.html",
        "/index.css",
        "/static/media/banner.8e687823b1422880cc3f.mp4",
        "/",]
        for(let i=0;i<urls.length;i++){
            try{
            cache.add(urls[i])
            console.log("cached",urls[i])
            }
            catch(err){
                console.log(err)
            }
        }
        }
        )
    )
});

self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);

    if (requestUrl.origin === 'https://api.dicebear.com' && requestUrl.pathname === '/5.x/initials/svg') {
        event.respondWith(
            caches.open('user-image-cache').then(function(cache) {
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }
    
    if(!navigator.onLine){
    event.respondWith(
        caches.match(event.request).then((resp) => {
            if(resp){
                return resp
            }
            let requestUrl = event.request.clone();
             return fetch(requestUrl)
        })
    )
    }
})


