define([],function(){function e(e){var t=r(),n=a[t];return n||(n=a[t]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Series",Recursive:!0,Fields:"DateCreated,ItemCounts",StartIndex:0}},n.query.ParentId=e.topParentId,LibraryBrowser.loadSavedQueryValues(t,n.query)),n.query}function r(){return LibraryBrowser.getSavedQueryKey("studios")}function t(t,a){var n=e(a);Dashboard.showLoadingMsg(),ApiClient.getStudios(Dashboard.getCurrentUserId(),n).then(function(e){var a="";a+=LibraryBrowser.getPosterViewHtml({items:e.Items,shape:"backdrop",showTitle:!1,context:"tv",preferThumb:!0,showItemCounts:!0,centerText:!0,lazy:!0});var o=t.querySelector("#items");o.innerHTML=a,ImageLoader.lazyChildren(o),LibraryBrowser.saveQueryValues(r(),n),Dashboard.hideLoadingMsg()})}var a={};return function(e,r,a){var n=this;n.renderTab=function(){t(a,r)}}});