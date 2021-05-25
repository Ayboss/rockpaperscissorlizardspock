//i have different state, so I will listen to register install and fetchcpo
// console.log(self);
// caches
const staticCache = "static-chache-v1"
const cachesAsset = ["/",
                 "/index.html",   
                "/css/style.css",
                "/images/bg-pentagon.svg",
                "/images/icon-rock.svg",
                "/images/icon-paper.svg",
                "/images/icon-scissors.svg",
                "/images/icon-lizard.svg",
                "/images/icon-spock.svg",
                "/images/icon-close.svg",
                "/images/favicon-32x32.png",
                "/js/script.js",
                "/images/image-rules-bonus.svg"]

//INSTALL EVENT
self.addEventListener("install",(evt)=>{
    evt.waitUntil(
        caches.open(staticCache).then(cache=>{
            cache.addAll(cachesAsset);
        })
    )
})

//ACTIVATE EVENT
self.addEventListener("activate",(evt)=>{
    console.log(evt,"it is in the active");
    evt.waitUntil(
        caches.keys().then(key=>{ 
            Promise.all(
                key.filter(el=> el !== staticCache)
            .map(el=> caches.delete(el))
            )
        })
    )
})

//FETCH EVENT
self.addEventListener("fetch",(evt)=>{
    evt.respondWith(
        caches.match(evt.request).then(cacheRes=>{
            return cacheRes || fetch(evt.request).then(reqRes=>{
                console.log(reqRes);
                return reqRes;
            })
        }).catch(err=>{
            console.log("💥 can't fetch," + evt.request.url);
        })
    )
})
 