define(["playbackManager","inputManager","connectionManager","embyRouter","globalize","loading"],function(e,t,n,i,r,a){function o(t,n){for(var i=t.parentNode.querySelectorAll(".itemAction[data-id]"),r=[],a=!1,o=0,s=i.length;s>o;o++)i[o]==t&&(a=!0),a&&r.push(i[o].getAttribute("data-id"));e.play({ids:r,serverId:n})}function s(e,t){var i=n.getApiClient(t),r=i.getCurrentUserId();return i.getItem(r,e).then(function(t){return i.getItems(r,{MediaTypes:"Photo",Filters:"IsNotFolder",ParentId:t.ParentId}).then(function(t){var n=t.Items,i=n.map(function(e){return e.Id}).indexOf(e);-1==i&&(i=0),require(["slideshow"],function(e){var t=new e({showTitle:!1,cover:!1,items:n,startIndex:i,interval:8e3,interactive:!0});t.show()})})})}function d(e){return"Photo"==e.Type?void s(e.Id,e.ServerId):void i.showItem(e)}function c(t,n){var i=t.getAttribute("data-id"),r=t.getAttribute("data-serverid"),a=t.getAttribute("data-type"),s="true"==t.getAttribute("data-isfolder");if("link"==n)d({Id:i,Type:a,IsFolder:s,ServerId:r});else if("instantmix"==n)e.instantMix(i,r);else if("play"==n){var c=parseInt(t.getAttribute("data-startpositionticks")||"0");e.play({ids:[i],startPositionTicks:c,serverId:r})}else"playallfromhere"==n?o(t,r):"setplaylistindex"==n||"record"==n&&u(r,i,a,t.getAttribute("data-timerid"),t.getAttribute("data-seriestimerid"))}function u(e,t,i,r,a){var o=n.getApiClient(e);a&&r?f(o,r,!0):r?l(o,r,t):"Program"==i&&v(o,t)}function l(e,t,n){a.show(),e.getItem(e.getCurrentUserId(),n).then(function(i){i.IsSeries?f(e,t,!1).then(function(){e.getNewLiveTvTimerDefaults({programId:n}).then(function(t){e.createLiveTvSeriesTimer(t).then(function(){a.hide(),g(r.translate("sharedcomponents#SeriesRecordingScheduled"))})})}):f(e,t,!0)})}function f(e,t,n){return a.show(),e.cancelLiveTvTimer(t).then(function(){n&&(a.hide(),g(r.translate("sharedcomponents#RecordingCancelled")))})}function v(e,t){a.show(),e.getNewLiveTvTimerDefaults({programId:t}).then(function(t){e.createLiveTvTimer(t).then(function(){a.hide(),g(r.translate("sharedcomponents#RecordingScheduled"))})})}function g(e){require(["toast"],function(t){t(e)})}function h(e){var t=m(e.target,"itemAction");if(t){var n=t.getAttribute("data-action");n&&c(t,n)}}function m(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function p(e){var t=e.detail.command;if("play"==t||"record"==t){var n=m(e.target,"itemAction");n&&c(n,t)}}function I(e){e.addEventListener("click",h),t.on(e,p)}function A(e){e.removeEventListener("click",h),t.off(e,p)}return{on:I,off:A}});