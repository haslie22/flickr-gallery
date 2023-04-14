!function(){"use strict";var t=JSON.parse('{"apiKey":"59e8f46d5f789208fe62b33fe0f0d247","method":"flickr.photos.search","methodFavourite":"flickr.photos.getInfo","nojsoncallback":1,"tags":"spring, nature","tagMode":"all","orientation":"landscape","contentType":1,"perPage":12}');class e{constructor(t,e,a){this.pictureUrl=a,this.authorID=e,this.id=t}async create(){let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const e=document.createElement("div");e.classList.add("card"),e.dataset.id=this.id,e.style.backgroundImage=`url('${this.pictureUrl}')`;const a=document.createElement("div");a.classList.add("card__info");const s=document.createElement("span");s.classList.add("card__name"),s.textContent=await this.getPictureName();const i=document.createElement("span");i.classList.add("card__author"),i.textContent=await this.getAuthorName();const o=document.createElement("button");return o.classList.add("card__button","button"),t&&o.classList.add("clicked"),o.textContent="Favourite",a.append(s,i,o),e.append(a),e}async getAuthorName(){const e=await(async(t,e)=>{const a=`https://www.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${t.apiKey}&user_id=${e}&format=json&nojsoncallback=${t.nojsoncallback}`,s=await fetch(a);return await s.json()})(t,this.authorID);let a="";try{a=e.person.realname._content}catch{try{a=e.person.username._content}catch{a="Unknown author"}}return a}async getPictureName(){const e=await(async(t,e)=>{const a=`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${t.apiKey}&photo_id=${e}&format=json&nojsoncallback=${t.nojsoncallback}`,s=await fetch(a);return await s.json()})(t,this.id);let a="";try{a=e.photo.title._content}catch{a="Unknown"}return a}}const a=document.querySelector(".app-container");new class{constructor(t){this.container=t,this.savedPics=null,this.gallery=null,this.loader=null,this.currentPage=1,this.totalPages=null,this.imageSize="",this.scrollTop=null,this.scrollHeight=null,this.clientHeight=null,this.isLoading=!0,this.LAYOUT_BREAKPOINT=1066,this.addListeners(),this.create()}addListeners(){window.addEventListener("beforeunload",(()=>{return"favourites",t=this.savedPics,void localStorage.setItem("favourites",JSON.stringify(Array.from(t)));var t})),window.addEventListener("scroll",(()=>this.checkScroll())),this.container.addEventListener("click",(t=>this.manageFavourites(t)))}async create(){this.container.innerHTML="";const t=document.createElement("div");t.classList.add("gallery"),this.gallery=t;const e=document.createElement("div");e.classList.add("loader");for(let t=1;t<=3;t++){const a=document.createElement("div");a.classList.add("loader__circle",`loader__circle${t}`),e.append(a)}this.loader=e,this.container.append(t,e),this.checkViewport(),await this.displayFavourites(),await this.fill()}async fill(){if(!this.isLoading)return;const a=await async function(t,e){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;const s=`https://www.flickr.com/services/rest/?method=${t.method}&api_key=${t.apiKey}&tags=${t.tags}&tag_mode=${t.tagMode}&orientation=${t.orientation}&content_type=${t.contentType}&per_page=${t.perPage}&page=${a}&extras=${e}&format=json&nojsoncallback=${t.nojsoncallback}`,i=await fetch(s);return await i.json()}(t,this.imageSize,this.currentPage);this.totalPages=a.photos.pages;for(const t of a.photos.photo){if(this.savedPics.has(t.id))continue;const a=new e(t.id,t.owner,t[this.imageSize]);this.gallery.append(await a.create())}this.isLoading=!1}handleLoader(){this.isLoading?this.loader.classList.add("visible"):this.loader.classList.remove("visible")}checkPage(){this.currentPage===this.totalPages&&(this.currentPage=1)}async checkScroll(){this.scrollTop=document.documentElement.scrollTop,this.scrollHeight=document.documentElement.scrollHeight,this.clientHeight=document.documentElement.clientHeight,this.scrollTop+this.clientHeight>=this.scrollHeight&&(this.currentPage++,this.checkPage(),this.isLoading=!0,this.handleLoader(),setTimeout((()=>{this.fill(),this.handleLoader()}),1500))}manageFavourites(t){t.target!==t.currentTarget&&t.target.classList.contains("card__button")&&(t.target.classList.contains("clicked")?(this.savedPics.delete(t.target.closest(".card").dataset.id),t.target.classList.remove("clicked")):(this.savedPics.add(t.target.closest(".card").dataset.id),t.target.classList.add("clicked"))),t.preventDefault()}async displayFavourites(){this.savedPics=new Set(("favourites",JSON.parse(localStorage.getItem("favourites"))||[]));for(let a of this.savedPics){const s=`https://api.flickr.com/services/rest/?method=${t.methodFavourite}&api_key=${t.apiKey}&photo_id=${a}&format=json&nojsoncallback=${t.nojsoncallback}`,i=await fetch(s),o=(await i.json()).photo,n=`https://live.staticflickr.com/${o.server}/${o.id}_${o.secret}.jpg`,c=new e(o.id,o.owner.nsid,n);this.gallery.append(await c.create(!0))}}checkViewport(){window.getComputedStyle(this.gallery).getPropertyValue("width")<=this.LAYOUT_BREAKPOINT?this.imageSize="url_l":this.imageSize="url_m"}}(a)}();