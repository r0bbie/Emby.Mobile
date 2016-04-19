define(["jQuery","paper-progress","paper-fab","paper-item-body","paper-icon-item","paper-icon-button"],function(e){function t(t,a,i){var o="";o+="<div>",o+=Globalize.translate("ValueDateCreated",parseISO8601Date(a.DateCreated,{toLocal:!0}).toLocaleString()),o+="</div>",o+="<br/>",o+='<div class="formFields"></div>',o+="<br/>",o+="<br/>",o+='<button type="submit" data-role="none" class="clearButton">',o+='<paper-button raised class="submit block"><iron-icon icon="check"></iron-icon><span>'+Globalize.translate("ButtonSave")+"</span></paper-button>",o+="</button>",e(".syncJobForm",t).html(o),require(["syncDialog"],function(o){o.renderForm({elem:e(".formFields",t),dialogOptions:i,dialogOptionsFn:n(i),showName:!0,readOnlySyncTarget:!0}).then(function(){d(t,a,i)})})}function n(t){return function(){var n=e.Deferred();return n.resolveWith(null,[t]),n.promise()}}function a(e){var t="";t+='<paper-icon-item data-itemid="'+e.Id+'" data-status="'+e.Status+'" data-remove="'+e.IsMarkedForRemoval+'">';var n,a=-1!=["Queued","Cancelled","Failed","ReadyToTransfer","Transferring","Converting","Synced"].indexOf(e.Status);return e.PrimaryImageItemId&&(n=ApiClient.getImageUrl(e.PrimaryImageItemId,{type:"Primary",width:80,tag:e.PrimaryImageTag,minScale:1.5})),t+=n?'<paper-fab mini class="blue" style="background-image:url(\''+n+"');background-repeat:no-repeat;background-position:center center;background-size: cover;\" item-icon></paper-fab>":'<paper-fab mini class="blue" icon="sync" item-icon></paper-fab>',t+="<paper-item-body three-line>",t+="<div>",t+=e.ItemName,t+="</div>",t+="Failed"==e.Status?'<div secondary style="color:red;">':"<div secondary>",t+=Globalize.translate("SyncJobItemStatus"+e.Status),"Synced"==e.Status&&e.IsMarkedForRemoval&&(t+="<br/>",t+=Globalize.translate("SyncJobItemStatusSyncedMarkForRemoval")),t+="</div>",t+='<div secondary style="padding-top:5px;">',t+='<paper-progress class="mini" style="width:100%;" value="'+(e.Progress||0)+'"></paper-progress>',t+="</div>",t+="</paper-item-body>",t+=a?'<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnJobItemMenu"></paper-icon-button>':'<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnJobItemMenu" disabled></paper-icon-button>',t+="</paper-icon-item>"}function i(t,n){var i="";i+="<h1>"+Globalize.translate("HeaderItems")+"</h1>",i+='<div class="paperList">';var r=0;i+=n.map(function(e){return a(e,r++)}).join(""),i+="</div>";var s=e(".jobItems",t).html(i).lazyChildren();e(".btnJobItemMenu",s).on("click",function(){o(this)})}function o(t){var n=e(t).parents(".page"),a=e(t).parents("paper-icon-item"),i=a.attr("data-itemid"),o=a.attr("data-status"),d="true"==a.attr("data-remove").toLowerCase(),u=[];"Failed"==o?u.push({name:Globalize.translate("ButtonQueueForRetry"),id:"retry",ironIcon:"check"}):"Cancelled"==o?u.push({name:Globalize.translate("ButtonReenable"),id:"retry",ironIcon:"check"}):"Queued"==o||"Transferring"==o||"Converting"==o||"ReadyToTransfer"==o?u.push({name:Globalize.translate("ButtonCancelItem"),id:"cancel",ironIcon:"delete"}):"Synced"==o&&d?u.push({name:Globalize.translate("ButtonUnmarkForRemoval"),id:"unmarkforremoval",ironIcon:"check"}):"Synced"==o&&u.push({name:Globalize.translate("ButtonMarkForRemoval"),id:"markforremoval",ironIcon:"delete"}),require(["actionsheet"],function(e){e.show({items:u,positionTo:t,callback:function(e){switch(e){case"cancel":r(n,i);break;case"retry":l(n,i);break;case"markforremoval":s(n,i);break;case"unmarkforremoval":c(n,i)}}})})}function r(e,t){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Sync/JobItems/"+t)}).then(function(){u(e)})}function s(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/MarkForRemoval")}).then(function(){u(e)})}function c(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/UnmarkForRemoval")}).then(function(){u(e)})}function l(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/Enable")}).then(function(){u(e)})}function d(t,n,a){var i=t.querySelector("#txtSyncJobName");i&&(i.value=n.Name),e("#selectProfile",t).val(n.Profile||"").trigger("change"),e("#selectQuality",t).val(n.Quality||"").trigger("change"),e("#chkUnwatchedOnly",t).checked(n.UnwatchedOnly),e("#chkSyncNewContent",t).checked(n.SyncNewContent),e("#txtItemLimit",t).val(n.ItemLimit),e("#txtBitrate",t).val(n.Bitrate?n.Bitrate/1e6:"");var o=a.Targets.filter(function(e){return e.Id==n.TargetId})[0],r=o?o.Name:"";e("#selectSyncTarget",t).val(r)}function u(e){Dashboard.showLoadingMsg();var n=getParameterByName("id");ApiClient.getJSON(ApiClient.getUrl("Sync/Jobs/"+n)).then(function(n){ApiClient.getJSON(ApiClient.getUrl("Sync/Options",{UserId:n.UserId,ItemIds:n.RequestedItemIds&&n.RequestedItemIds.length?n.RequestedItemIds.join(""):null,ParentId:n.ParentId,Category:n.Category,TargetId:n.TargetId})).then(function(a){h=a,t(e,n,a),Dashboard.hideLoadingMsg()})}),ApiClient.getJSON(ApiClient.getUrl("Sync/JobItems",{JobId:n,AddMetadata:!0})).then(function(t){i(e,t.Items),Dashboard.hideLoadingMsg()})}function p(e,t,n){i(e,n),Dashboard.hideLoadingMsg()}function m(e){Dashboard.showLoadingMsg();var t=getParameterByName("id");ApiClient.getJSON(ApiClient.getUrl("Sync/Jobs/"+t)).then(function(n){require(["syncDialog"],function(a){a.setJobValues(n,e),ApiClient.ajax({url:ApiClient.getUrl("Sync/Jobs/"+t),type:"POST",data:JSON.stringify(n),contentType:"application/json"}).then(function(){Dashboard.hideLoadingMsg(),require(["toast"],function(e){e(Globalize.translate("SettingsSaved"))})})})})}function b(t,n){var a=e.mobile.activePage;"SyncJob"==n.MessageType&&p(a,n.Data.Job,n.Data.JobItems)}function g(){var e="0,1500";e+=","+getParameterByName("id"),ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobStart",e)}function y(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobStop","")}function f(){var t=this,n=e(t).parents(".page");return m(n),!1}e.fn.lazyChildren=function(){for(var e=0,t=this.length;t>e;e++)ImageLoader.lazyChildren(this[e]);return this};var h;e(document).on("pageinit",".syncJobPage",function(){e(".syncJobForm").off("submit",f).on("submit",f)}).on("pageshow",".syncJobPage",function(){var e=this;u(e),g(e),Events.on(ApiClient,"websocketmessage",b)}).on("pagebeforehide",".syncJobPage",function(){y(),Events.off(ApiClient,"websocketmessage",b)})});