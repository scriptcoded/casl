try{self["workbox:core:5.1.4"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.4"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class r{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let a,r=i&&i.handler;if(!r&&this.s&&(r=this.s),r){try{a=r.handle({url:s,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(n=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const a=i.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const o=()=>(c||(c=new r,c.addFetchListener(),c.addCacheListener()),c);function u(e,s,a){let r;if("string"==typeof e){const t=new URL(e,location.href);r=new n(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)r=new i(e,s,a);else if("function"==typeof e)r=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}return o().registerRoute(r),r}const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[h.prefix,e,h.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||l(h.precache),d=e=>e||l(h.runtime);function w(e){e.then(()=>{})}const p=new Set;class v{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),u=t?o.index(t):o,h=[],l=u.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(h.push(a?e:e.value),i&&h.length>=i?c(h):e.continue()):c(h)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const a=this.o.transaction(e,t);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async v(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const a=s.objectStore(t),r=a[e].apply(a,n);r.onsuccess=()=>i(r.result)})}close(){this.o&&(this.o.close(),this.o=null)}}v.prototype.OPEN_TIMEOUT=2e3;const y={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(y))for(const s of t)s in IDBObjectStore.prototype&&(v.prototype[s]=async function(t,...n){return await this.v(s,t,e,...n)});try{self["workbox:expiration:5.1.4"]&&_()}catch(e){}const g=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class b{constructor(e){this.g=e,this.o=new v("workbox-expiration",1,{onupgradeneeded:e=>this.m(e)})}m(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.g)}async setTimestamp(e,t){const s={url:e=g(e),timestamp:t,cacheName:this.g,id:this.q(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.q(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let r=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.g&&(e&&n.timestamp<e||t&&r>=t?a.push(s.value):r++),s.continue()}else n(a)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}q(e){return this.g+"|"+g(e)}}class m{constructor(e,t={}){this.R=!1,this.j=!1,this.U=t.maxEntries,this.L=t.maxAgeSeconds,this.g=e,this.N=new b(e)}async expireEntries(){if(this.R)return void(this.j=!0);this.R=!0;const e=this.L?Date.now()-1e3*this.L:0,t=await this.N.expireEntries(e,this.U),s=await self.caches.open(this.g);for(const e of t)await s.delete(e);this.R=!1,this.j&&(this.j=!1,w(this.expireEntries()))}async updateTimestamp(e){await this.N.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.L){return await this.N.getTimestamp(e)<Date.now()-1e3*this.L}return!1}async delete(){this.j=!1,await this.N.expireEntries(1/0)}}const q=(e,t)=>e.filter(e=>t in e),R=async({request:e,mode:t,plugins:s=[]})=>{const n=q(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},x=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const a=await self.caches.open(e),r=await R({plugins:i,request:t,mode:"read"});let c=await a.match(r,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;c=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},j=async({cacheName:e,request:s,response:n,event:i,plugins:r=[],matchOptions:c})=>{const o=await R({plugins:r,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:a(o.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return a||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:r,response:n,request:o});if(!u)return;const h=await self.caches.open(e),l=q(r,"cacheDidUpdate"),f=l.length>0?await x({cacheName:e,matchOptions:c,request:o}):null;try{await h.put(o,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:f,newResponse:u,request:o})},U=x,L=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=q(i,"fetchDidFail"),r=a.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:r.clone(),request:c.clone()});throw e}};try{self["workbox:strategies:5.1.4"]&&_()}catch(e){}const N={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let E;async function K(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,a=function(){if(void 0===E){const e=new Response("");if("body"in e)try{new Response(e.body),E=!0}catch(e){E=!1}E=!1}return E}()?s.body:await s.blob();return new Response(a,i)}try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}function O(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),a=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:a.href}}class M{constructor(e){this.g=f(e),this._=new Map,this.K=new Map,this.O=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=O(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this._.has(i)&&this._.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.O.has(e)&&this.O.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.O.set(e,n.integrity)}if(this._.set(i,e),this.K.set(i,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.g),a=await i.keys(),r=new Set(a.map(e=>e.url));for(const[e,t]of this._)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const i=this.O.get(s),a=this.K.get(n);return this.M({cacheKey:s,cacheMode:a,event:e,integrity:i,plugins:t,url:n})});await Promise.all(c);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.g),t=await e.keys(),s=new Set(this._.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async M({cacheKey:e,url:s,cacheMode:n,event:i,plugins:a,integrity:r}){const c=new Request(s,{integrity:r,cache:n,credentials:"same-origin"});let o,u=await L({event:i,plugins:a,request:c});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:c,response:u}):u.status<400))throw new t("bad-precaching-response",{url:s,status:u.status});u.redirected&&(u=await K(u)),await j({event:i,plugins:a,response:u,request:e===s?c:new Request(e),cacheName:this.g,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._}getCachedURLs(){return[...this._.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.g)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.g,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let T;const D=()=>(T||(T=new M),T);const S=(e,t)=>{const s=D().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let P=!1;function A(e){P||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=f();self.addEventListener("fetch",a=>{const r=S(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return;let c=self.caches.open(i).then(e=>e.match(r)).then(e=>e||fetch(r));a.respondWith(c)})})(e),P=!0)}const C=[],I={get:()=>C,add(e){C.push(...e)}},k=e=>{const t=D(),s=I.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},W=e=>{const t=D();e.waitUntil(t.activate())};var B,F;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),B={},function(e){D().addToCacheList(e),e.length>0&&(self.addEventListener("install",k),self.addEventListener("activate",W))}([{url:"/v5/assets/a.0dea9028.json",revision:"d3ee4aa856a05727328ce982655d2e94"},{url:"/v5/assets/a.1cbe572a.json",revision:"2f62e7c53f6585ee5539ccd79b5128c5"},{url:"/v5/assets/a.1ed5ffd5.json",revision:"54871a9d4f7a7594217b670810a97f96"},{url:"/v5/assets/a.22e9ed51.json",revision:"00a3163f91b1e13cfe5124a1221dff61"},{url:"/v5/assets/a.276e0930.json",revision:"790774155bb1880147c3ad0663d99ec9"},{url:"/v5/assets/a.3a1055aa.json",revision:"9c788732271006a1cfc28c58165f228d"},{url:"/v5/assets/a.46889779.json",revision:"1f2c7a5f742ea78f4dce31e994308ad5"},{url:"/v5/assets/a.4729cb61.json",revision:"22d47c4b0c65d7f30158501824b260c0"},{url:"/v5/assets/a.4b0dd59c.json",revision:"400a1b16b96e770df7c4e9fcd2fdbce5"},{url:"/v5/assets/a.50bfcc2b.json",revision:"ddb9d454aa210bb1dc81894d674fc3f8"},{url:"/v5/assets/a.595579b4.json",revision:"f656cec91726fb7963382a2079e57f08"},{url:"/v5/assets/a.5fb6def9.json",revision:"5b4215ae09d4c07dae64e17d76bc71f5"},{url:"/v5/assets/a.65926da7.json",revision:"fd76901792f96bd051644498e566a1f9"},{url:"/v5/assets/a.7ecefacf.json",revision:"b1573e4cd00bb4799079b4c52b8d083a"},{url:"/v5/assets/a.7f9e5e17.json",revision:"7335cbeccc54bcd11f6d6989645de2f9"},{url:"/v5/assets/a.86502d08.json",revision:"e615e753931cfc805e1c417047ea3add"},{url:"/v5/assets/a.8d9200e3.json",revision:"3d3cadad3a544fb0b6717fe6fb586f5c"},{url:"/v5/assets/a.8e663da7.json",revision:"14c21186b33a5c3b6ade74ff5164fa6f"},{url:"/v5/assets/a.9df4202a.json",revision:"5c3590af0774a59a5de2c84f1205f175"},{url:"/v5/assets/a.bc1f87ac.json",revision:"6ec560dfb320fe880a7cdd6743123da9"},{url:"/v5/assets/a.c4ccdc58.json",revision:"c83447e229ac7ca56f1aa2e763c08272"},{url:"/v5/assets/a.c986a962.json",revision:"8f1973cd9488ce4e9504d13fcc988e17"},{url:"/v5/assets/a.cbfeff1f.json",revision:"fdb86c274350205f58f24f3ba9a8fa78"},{url:"/v5/assets/a.d397cd54.json",revision:"9d8192b936cc8aa225313a429ff435ae"},{url:"/v5/assets/a.e53e8df2.json",revision:"0e01fd24cabe31df5ddc9675b11a08da"},{url:"/v5/assets/a.ebb65457.json",revision:"26956bb47fe08fa3fa17afe13a7f6d94"},{url:"/v5/assets/a.fb3a29b4.json",revision:"541806ba61d3c00102917734876b16b6"},{url:"/v5/assets/a.fc2477e2.json",revision:"86bf2584a1149dc9f558d86958a69637"},{url:"/v5/assets/content_pages_searchIndexes.en.0c5d9f00.json",revision:"d0b42487cf4dd676c84abd6bdcda8cff"},{url:"/v5/assets/content_pages_summaries.en.6dde1532.json",revision:"df7f60a31f223c169746e1ba64a01f17"},{url:"/v5/app-icons/android-chrome-192x192.png",revision:"0b18304dea12cc8d59c9528a00d37ee8"},{url:"/v5/app-icons/android-chrome-256x256.png",revision:"8da8a7602d1cc4d21a70445eda7e8e62"},{url:"/v5/app-icons/apple-touch-icon.png",revision:"e2be3ed5414bed313d9219504bd7224f"},{url:"/v5/app-icons/favicon-16x16.png",revision:"c72946f88111cb426093e6bdb63fa70b"},{url:"/v5/app-icons/favicon-32x32.png",revision:"e53028dac3ae19a1ebd8c2ed0a0772a8"},{url:"/v5/app-icons/favicon.ico",revision:"bc4c3c662b5614ee2e63ac9bd79cafa4"},{url:"/v5/app-icons/mstile-150x150.png",revision:"ffd33ced9004c319a6743d79a61d23c3"},{url:"/v5/app-icons/safari-pinned-tab.svg",revision:"1171db203c6305482c696d3f702c83f6"},{url:"/v5/fonts/StardosStencil-Bold.woff2",revision:"1c20088eb1050b0b81483791c320d03f"},{url:"/v5/fonts/StardosStencil-Regular.woff2",revision:"54e90de15eb7c8d1d4ddb71ebc125937"},{url:"/v5/manifest.json",revision:"9a2195c0c368b7ae215a188a95ff7f26"},{url:"/v5/index.html",revision:"11b0518c6a8b673cb7bb7402ed675734"},{url:"/v5/bootstrap.edb86af6.js",revision:"c0b1087de8408a74e375301229796796"},{url:"/v5/51b9cc103e05f66c.png",revision:"62d05a9e2e6273d588849a035ed9925e"}]),A(B),self.addEventListener("activate",e=>{const t=f();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>self.caches.delete(e))),s})(t).then(e=>{}))}),u(new class extends n{constructor(e,{allowlist:t=[/./],denylist:s=[]}={}){super(e=>this.T(e),e),this.D=t,this.S=s}T({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const s=e.pathname+e.search;for(const e of this.S)if(e.test(s))return!1;return!!this.D.some(e=>e.test(s))}}((F="/v5/index.html",D().createHandlerBoundToURL(F)))),u(/\/v5\/images\//,new class{constructor(e={}){if(this.g=d(e.cacheName),this.P=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.P=t?e.plugins:[N,...e.plugins]}else this.P=[N];this.A=e.fetchOptions,this.C=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));const n=this.I({request:s,event:e});let i,a=await U({cacheName:this.g,request:s,event:e,matchOptions:this.C,plugins:this.P});if(a){if(e)try{e.waitUntil(n)}catch(i){}}else try{a=await n}catch(e){i=e}if(!a)throw new t("no-response",{url:s.url,error:i});return a}async I({request:e,event:t}){const s=await L({request:e,event:t,fetchOptions:this.A,plugins:this.P}),n=j({cacheName:this.g,request:e,response:s.clone(),event:t,plugins:this.P});if(t)try{t.waitUntil(n)}catch(e){}return s}}({cacheName:"images",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.k(n),a=this.W(s);w(a.expireEntries());const r=a.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.W(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.B=e,this.L=e.maxAgeSeconds,this.F=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),p.add(t))}W(e){if(e===d())throw new t("expire-custom-caches-only");let s=this.F.get(e);return s||(s=new m(e,this.B),this.F.set(e,s)),s}k(e){if(!this.L)return!0;const t=this.H(e);if(null===t)return!0;return t>=Date.now()-1e3*this.L}H(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.F)await self.caches.delete(e),await t.delete();this.F=new Map}}({maxEntries:100,purgeOnQuotaError:!0})]}),"GET"),u(/\/v5\/@webcomponents\//,new class{constructor(e={}){this.g=d(e.cacheName),this.P=e.plugins||[],this.A=e.fetchOptions,this.C=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,i=await U({cacheName:this.g,request:s,event:e,matchOptions:this.C,plugins:this.P});if(!i)try{i=await this.I(s,e)}catch(e){n=e}if(!i)throw new t("no-response",{url:s.url,error:n});return i}async I(e,t){const s=await L({request:e,event:t,fetchOptions:this.A,plugins:this.P}),n=s.clone(),i=j({cacheName:this.g,request:e,response:n,event:t,plugins:this.P});if(t)try{t.waitUntil(i)}catch(e){}return s}}({cacheName:"polyfills",plugins:[]}),"GET");
//# sourceMappingURL=sw.js.map
