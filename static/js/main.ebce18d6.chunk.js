(this.webpackJsonpmyfooddataclone=this.webpackJsonpmyfooddataclone||[]).push([[0],{113:function(e,a,t){e.exports=t.p+"static/media/logo.8357fd40.svg"},119:function(e,a,t){e.exports=t(169)},124:function(e,a,t){},126:function(e,a,t){},129:function(e,a,t){},156:function(e,a,t){},157:function(e,a,t){},158:function(e,a,t){},159:function(e,a,t){},160:function(e,a,t){},164:function(e,a,t){},165:function(e,a,t){},169:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(26),c=t.n(l),o=(t(124),t(178)),s=t(20),m=t(32),i=t(175),u=t(180),d=t(177),f=t(174),E=t(56);function p(){return Object(n.useContext)(m.a).foodItemDataStore}var g=t(35),h=t(65),v=t(59),b=t(37),N=t(176),y=t(22),w=t.n(y),D=(t(126),h.a.Option),F=1,I=1e4;var S=Object(m.c)((function(e){var a=e.foodItemData,t=w.a.entries(a.servings);return r.a.createElement(v.a,{className:"serving-size-selection-row__body",align:"middle"},r.a.createElement(b.a,{span:4},r.a.createElement(N.a,{min:F,max:I,value:a.selectedQuantity,placeholder:1,onChange:function(e){F<=e&&e<I&&a.setSelectedQuantity(e)},className:"serving-size-selection-row__serving-input"})),r.a.createElement(b.a,{span:2},r.a.createElement(E.a,null)),r.a.createElement(b.a,{span:18},r.a.createElement(h.a,{value:a.selectedWeight,className:"serving-size-selection-row__select",style:{width:"100%"},dropdownMatchSelectWidth:!1,onChange:a.setSelectedWeight},t.map((function(e){var a=Object(g.a)(e,2),t=a[0],n=a[1].description;return r.a.createElement(D,{value:t,key:t},n)})))))}));t(129);var C=function(e){var a=e.foodItemData,t=p().removeFoodItemData,n=r.a.createElement(u.a,{title:"close"},r.a.createElement(d.a,{type:"link",icon:r.a.createElement(E.a,null),onClick:function(){return t(a)},className:"sidebar-food-card__close-button"}));return r.a.createElement(f.a,{title:a.name,size:"small",extra:n,className:"sidebar-food-card"},r.a.createElement(S,{foodItemData:a}))};var O=Object(m.c)((function(){var e=p().foodItemDatas;return 0===e.length?null:r.a.createElement(i.b,{dataSource:e,renderItem:function(e){return r.a.createElement(i.b.Item,{key:e.name},r.a.createElement(C,{foodItemData:e}))}})})),_=t(82),A=t.n(_),j=(t(156),h.a.Option);var T=function(e){var a=e.placeholder,t=void 0===a?"\ud83d\udd0d Find Another Food":a,l=Object(n.useState)(),c=Object(g.a)(l,2),o=c[0],s=c[1],m=Object(n.useState)([]),i=Object(g.a)(m,2),u=i[0],d=i[1],f=p(),E=w.a.debounce((function(e){d([]),w.a.isEmpty(e)?s(null):A.a.get("https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-search-proxy/?query=autocomplete/".concat(e)).then((function(a){var t=a.data.trim().split(",");s(e),d(t.map(w.a.trim))}))}),300);return r.a.createElement("div",{className:"select-container"},r.a.createElement(h.a,{allowClear:!0,showSearch:!0,showArrow:!1,value:o,placeholder:t,notFoundContent:!1,filterOption:!1,onSearch:E,onChange:function(e){console.log("selected: ",e),s(null),e&&f.setFoodItemDataFromName(e)},className:"searchbar"},u.map((function(e){return r.a.createElement(j,{key:e},function(e,a){var t=new RegExp(a,"ig");return w.a.replace(e,t,(function(e){return"<=>".concat(e,"<=>")})).split("<=>").map((function(e,a){return a%2===1?r.a.createElement("span",{key:a,className:"highlighted"},e):e}))}(e,o))}))))};t(157);var k=function(e){var a=e.className;return r.a.createElement("div",{className:a},r.a.createElement(o.a,{className:"sidebar"},r.a.createElement("div",{className:"sidebar__container"},r.a.createElement(T,null),r.a.createElement(O,null))))};t(158);var W=Object(m.c)((function(e){var a=e.foodItemData.nutritionFacts;if(!a)return null;var t=a.calories,n=a.totalFat,l=a.saturatedFat,c=a.transFat,o=a.cholesterol,s=a.sodium,m=a.totalCarbohydrates,i=a.fiber,u=a.sugar,d=a.addedSugar,f=a.protein,E=a.vitaminC,p=a.vitaminD,g=a.iron,h=a.calcium,b=a.potassium,N=a.phosphorus,y=a.servingDescription;return r.a.createElement("div",{className:"nutrition-facts-table"},r.a.createElement("div",{className:"facts-table-header"},r.a.createElement("b",null,"Nutrition Facts")),r.a.createElement("div",{className:"facts-table-serving large-border-bottom"},r.a.createElement("div",null,r.a.createElement("b",null,"Serving Size")),r.a.createElement("div",null,y)),r.a.createElement(v.a,{justify:"space-between",className:"calories medium-border-bottom"},r.a.createElement("span",{className:"label"},"Calories"),r.a.createElement("span",{className:"value"},t.value)),r.a.createElement(v.a,{justify:"end"},r.a.createElement("b",null,"% Daily Value *")),r.a.createElement("div",{className:"chart"},r.a.createElement(v.a,null,r.a.createElement("span",null,r.a.createElement("b",null,"Total Fat")," ",n.value,"g"),r.a.createElement("b",null,n.percentage,"%")),r.a.createElement(v.a,{className:"left-padding-1"},r.a.createElement("span",null,"Saturated Fat ",l.value,"g"),r.a.createElement("b",null,l.percentage,"%")),r.a.createElement(v.a,{className:"left-padding-1 thick-border-bottom"},r.a.createElement("span",null,r.a.createElement("em",null,"Trans")," Fat ",c.value,"g")),r.a.createElement(v.a,{className:"thick-border-bottom"},r.a.createElement("span",null,r.a.createElement("b",null,"Cholesterol")," ",o.value,"mg"),r.a.createElement("b",null,o.percentage,"%")),r.a.createElement(v.a,null,r.a.createElement("span",null,r.a.createElement("b",null,"Sodium")," ",s.value,"mg"),r.a.createElement("b",null,s.percentage,"%")),r.a.createElement(v.a,null,r.a.createElement("span",null,r.a.createElement("b",null,"Total Carbohydrate")," ",m.value,"g"),r.a.createElement("b",null,m.percentage,"%")),r.a.createElement(v.a,{className:"left-padding-1 thick-border-bottom"},r.a.createElement("span",null,"Dietary Fiber ",i.value,"g"),r.a.createElement("b",null,i.percentage,"%")),r.a.createElement(v.a,{className:"left-padding-1"},r.a.createElement("span",null,"Total Sugars ",u.value,"g"),r.a.createElement("b",null,u.percentage,"%")),r.a.createElement((function(){return"~"===d.value?r.a.createElement(v.a,{className:"no-sugar-added"},r.a.createElement("span",null,"~ No added sugar data collected"),r.a.createElement("b",null,"~")):r.a.createElement(v.a,{className:"no-sugar-added"},r.a.createElement("span",null,"Includes ",d.value,"g Added Sugars"),r.a.createElement("b",null,d.percentage))}),null),r.a.createElement(v.a,{className:"large-border-bottom"},r.a.createElement("span",null,r.a.createElement("b",null,"Protein")," ",f.value,"g"),r.a.createElement("b",null,f.percentage,"%")),r.a.createElement(v.a,null,r.a.createElement("span",null,"Vitamin C ",E.value,"mg"),E.percentage,"%"),r.a.createElement(v.a,null,r.a.createElement("span",null,"Vitamin D ",p.value,"mcg"),p.percentage,"%"),r.a.createElement(v.a,null,r.a.createElement("span",null,"Iron ",g.value,"mg"),g.percentage,"%"),r.a.createElement(v.a,null,r.a.createElement("span",null,"Calcium ",h.value,"mg"),h.percentage,"%"),r.a.createElement(v.a,null,r.a.createElement("span",null,"Potassium ",b.value,"mg"),b.percentage,"%"),r.a.createElement(v.a,{className:"medium-border-bottom"},r.a.createElement("span",null,"Phosphorus ",N.value,"mg"),N.percentage,"%"),r.a.createElement(v.a,{className:"facts-table-footer"},"*The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.")))})),R=t(179);t(159);function x(e){var a=e.foodItemData;if(!a)return null;var t=a.WATER,n=a.FAT,l=a.CHOCDF,c=a.PROCNT,o=a.ALC,s="~"!==t&&"~"!==n&&"~"!==l&&"~"!==c,m=Number(t),i=Number(n),u=Number(l),d=Number(c),f=Number(o),E=f>0,p=m+i+u+d+f,g=w.a.toInteger(m/p*100),h=w.a.toInteger(i/p*100),N=w.a.toInteger(u/p*100),y=w.a.toInteger(d/p*100),D=w.a.toInteger(f/p*100);return s&&r.a.createElement("div",{className:"histograms"},r.a.createElement("div",{className:"data-title"},"What is this food made of?"),r.a.createElement("div",{className:"data-tile"},r.a.createElement(v.a,{className:"square",align:"bottom"},r.a.createElement(b.a,{className:"water",style:{height:"".concat(g,"%")}}),r.a.createElement(b.a,{className:"fat",style:{height:"".concat(h,"%")}}),r.a.createElement(b.a,{className:"carbs",style:{height:"".concat(N,"%")}}),r.a.createElement(b.a,{className:"protein",style:{height:"".concat(y,"%")}}),E&&r.a.createElement(b.a,{className:"alcohol",style:{height:"".concat(D,"%")}})),r.a.createElement(v.a,{className:"legend"},r.a.createElement(b.a,null,r.a.createElement("div",null,g,"%"),r.a.createElement("div",null,"Water")),r.a.createElement(b.a,null,r.a.createElement("div",null,h,"%"),r.a.createElement("div",null,"Fat")),r.a.createElement(b.a,null,r.a.createElement("div",null,N,"%"),r.a.createElement("div",null,"Carbs")),r.a.createElement(b.a,null,r.a.createElement("div",null,y,"%"),r.a.createElement("div",null,"Protein")),E&&r.a.createElement(b.a,null,r.a.createElement("div",null,D,"%"),r.a.createElement("div",null,"Alcohol")))))}var P=768;function q(){var e=Object(n.useState)((function(){return window.innerWidth<P})),a=Object(g.a)(e,2),t=a[0],r=a[1];return Object(n.useEffect)((function(){function e(){var e=window.innerWidth<P;e!==t&&r(e)}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[t,r]),t}t(160);var z=Object(m.c)((function(e){var a=e.className,t=Object(s.g)().params,l=t.foodName,c=t.weight,o=t.quantity,m=p(),i=m.foodItemData,u=Object(n.useState)(!1),f=Object(g.a)(u,2),E=f[0],h=f[1],b=q();return Object(n.useEffect)((function(){m.setFoodItemDataFromName(l,o,c),h(!1)}),[l]),i?r.a.createElement("div",{className:"".concat(a," facts-panel")},r.a.createElement((function(){return b&&r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{className:"facts-panel__button",size:"large",onClick:function(){return h(!0)}},"\ud83d\udd0d Find Another Food"),r.a.createElement(R.a,{title:"Find Food!",placement:"left",closable:!0,onClose:function(){return h(!1)},visible:E,style:{width:"100%"}},r.a.createElement(k,null)))}),null),r.a.createElement("h1",{className:"facts-panel-header"},i.name),r.a.createElement("div",{className:"facts-panel-subheader"},i.food_description),r.a.createElement("div",null,r.a.createElement("strong",null,"Database: "),i.data_db_name),r.a.createElement("div",null,r.a.createElement((function(){return b&&r.a.createElement("div",{className:"facts-panel-body"},r.a.createElement(v.a,{className:"serving-selector",style:{borderBottom:"1px solid #ddd"}},"Serving Size:"),r.a.createElement(S,{foodItemData:i}))}),null),r.a.createElement(v.a,{align:"middle",className:"facts-panel-body"},r.a.createElement(W,{foodItemData:i}),r.a.createElement(x,{foodItemData:i})))):null}));t(164);function V(e){var a=e.className;return r.a.createElement("div",{className:"".concat(a," home-page")},r.a.createElement("h1",{className:"home-header"},"Nutrition Facts Search Tool"),r.a.createElement("div",{className:"home-info-how-to-search-line"},"Use the search box to find a food and see the nutrient details."),r.a.createElement("div",{className:"searchbar-container"},r.a.createElement(T,{placeholder:"\ud83d\udd0d Search For A Food (Apples)"})))}var Q=t(113),H=t.n(Q),L=(t(165),o.a.Header),B=o.a.Content,G=o.a.Footer;var K=function(){var e=q(),a=!e;return r.a.createElement(o.a,{className:e&&"mobile",style:{minHeight:"100vh"}},r.a.createElement(L,{className:"header"},r.a.createElement("a",{href:"https://www.myfooddata.com"},r.a.createElement("img",{className:"header-logo",src:H.a,alt:"my food data",height:"100%"}))),r.a.createElement(B,null,r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/nutrition-facts/:foodName/:weight?/:quantity?"},a&&r.a.createElement(k,{className:"ant-layout-content__sidebar"}),r.a.createElement(z,{className:"ant-layout-content__nutrition-facts-panel"})),r.a.createElement(s.a,null,r.a.createElement(V,{className:"ant-layout-content__home-page"})))),r.a.createElement(G,{className:"app-footer"},r.a.createElement((function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"app-footer-links"},r.a.createElement("a",{href:"https://www.myfooddata.com/"},"Home |"),r.a.createElement("a",{href:"https://www.myfooddata.com/contact.php"}," Contact |"),r.a.createElement("a",{href:"https://www.myfooddata.com/about.php"}," About |"),r.a.createElement("a",{href:"https://www.myfooddata.com/terms.php"}," Terms of Use |"),r.a.createElement("a",{href:"https://www.myfooddata.com/privacy.php"}," Privacy |"),r.a.createElement("a",{href:"https://www.myfooddata.com/faq.php"}," FAQ |"),r.a.createElement("a",{href:"https://www.myfooddata.com/sitemap.php"}," Sitemap")),r.a.createElement("div",{className:"app-footer-copyright"},"\xa9 2020 MyFoodData.com"))}),null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=t(89),U=t(18),J=t(69),$=t.n(J),X=1,Y=1e4;var Z={value:"~",percentage:"~"},ee=function(e){return function(a){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(!e[a])return Z;var n=w.a.toNumber(e[a])*e.servingRatio*e.selectedQuantity;return{value:Math.round(10*n/10),percentage:Math.round(n/(1*t)*100)}}};function ae(e){return e>=X&&e<=Y?e:X}function te(e,a){return e.servings[a]?a:w.a.first(w.a.keys(e.servings))}var ne=U.c.maybeNull(U.c.number),re=U.c.model("FoodItemData",{NDB_No:U.c.identifier,name3:U.c.string,servingsizes:U.c.string,food_description:U.c.maybeNull(U.c.string),data_db_name:U.c.maybeNull(U.c.string),WATER:ne,ALC:ne,ENERC_KCAL:ne,FAT:ne,FASAT:ne,FATRN:ne,CHOLE:ne,NA:ne,CHOCDF:ne,FIBTG:ne,SUGAR:ne,ADD_SG:ne,PROCNT:ne,VITC:ne,VITD:ne,FE:ne,CA:ne,K:ne,P:ne,selectedQuantity:U.c.optional(U.c.number,1),_selectedWeight:U.c.optional(U.c.string,"wt1")}).actions((function(e){return{setSelectedQuantity:function(a){e.selectedQuantity=ae(Number(a)),e.updateStore()},setSelectedWeight:function(a){e._selectedWeight=te(e,a),e.updateStore()},updateStore:function(){var a=Object(U.b)(e).updatePathname;a&&a()}}})).views((function(e){return{get nutritionFacts(){return function(e){var a=ee(e),t=e.servings[e.selectedWeight].description;return{calories:a("ENERC_KCAL",2e3),totalFat:a("FAT",65),saturatedFat:a("FASAT",20),transFat:a("FATRN"),cholesterol:a("CHOLE",300),sodium:a("NA",2400),totalCarbohydrates:a("CHOCDF",300),fiber:a("FIBTG",25),sugar:a("SUGAR",50),addedSugar:a("ADD_SG",50),protein:a("PROCNT",50),vitaminC:a("VITC",90),vitaminD:a("VITD",20),iron:a("FE",18),calcium:a("CA",1300),potassium:a("K",4700),phosphorus:a("P",1250),servingDescription:t}}(e)},get servings(){var a=JSON.parse(e.servingsizes);return w.a.mapValues(a,(function(e){var a=Object(g.a)(e,2),t=a[0],n=a[1];return{weight:t,description:"".concat(n," (").concat(t,"g)")}}))},get name(){return e.name3},get id(){return e.NDB_No},get selectedWeight(){return te(e,e._selectedWeight)},get queryString(){var a=e.selectedQuantity,t=e.selectedWeight,n="/nutrition-facts/".concat(e.name);return a&&t&&(n+="/".concat(t,"/").concat(a)),console.log("new query string: ",n),n},get servingRatio(){var a=e.selectedWeight,t=e.servings;return w.a.toNumber(t[a].weight)/100}}})),le=U.c.model("FoodItemDataStore",{foodItemDatas:U.c.array(re)}).actions((function(e){return{fetchFoodItemData:Object(U.a)($.a.mark((function e(a){var t,n;return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("searching name: ",a),a){e.next=3;break}return e.abrupt("return",null);case 3:return e.next=5,A.a.get("https://us-central1-fasttripfinder-199123.cloudfunctions.net/my-food-data-search-proxy/?query=food/".concat(a));case 5:return t=e.sent,n=t.data,e.abrupt("return",re.create(n[0]));case 8:case"end":return e.stop()}}),e)}))),setFoodItemDataFromName:Object(U.a)($.a.mark((function a(t,n,r){var l;return $.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.fetchFoodItemData(t);case 2:if(l=a.sent){a.next=6;break}return e.foodItemDatas=[],a.abrupt("return");case 6:e.foodItemData||(l.setSelectedQuantity(n),l.setSelectedWeight(r)),e.foodItemDatas=[l],Object(U.b)(e).updatePathname();case 9:case"end":return a.stop()}}),a)}))),removeFoodItemData:function(a){e.foodItemDatas.remove(a),Object(U.b)(e).updatePathname()}}})).views((function(e){return{get foodItemData(){return e.foodItemDatas.length>0?e.foodItemDatas[0]:null},get queryString(){return e.foodItemData?e.foodItemData.queryString:null}}})),ce=U.c.model("RootStore",{foodItemDataStore:U.c.optional(le,{}),pathname:U.c.maybeNull(U.c.string)}).volatile((function(e){return{router:null}})).actions((function(e){return{setRouter:function(a){e.router=a},updatePathname:function(){var a=e.pathname,t=e.foodItemDataStore.queryString;t=t||"/","/"===a||"/"===t?e.router.push({pathname:t}):e.router.replace({pathname:t}),e.pathname=t}}})).create({});c.a.render(r.a.createElement(M.a,{basename:"myFoodDataClone"},r.a.createElement((function(){var e=Object(s.f)();return Object(n.useEffect)((function(){ce.setRouter(e)}),[]),r.a.createElement(m.b,ce,r.a.createElement(K,null))}),null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[119,1,2]]]);
//# sourceMappingURL=main.ebce18d6.chunk.js.map