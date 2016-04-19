define(["appSettings","userSettings","appStorage"],function(e,t,r){function n(){function n(e){var t=!0,r=window.VlcAudio;t&&(e.DirectPlayProfiles.push({Container:"m4v,3gp,ts,mpegts,mov,xvid,vob,mkv,wmv,asf,ogm,ogv,m2v,avi,mpg,mpeg,mp4,webm",Type:"Video"}),e.CodecProfiles=e.CodecProfiles.filter(function(e){return"Audio"==e.Type}),e.SubtitleProfiles=[],e.SubtitleProfiles.push({Format:"srt",Method:"External"}),e.SubtitleProfiles.push({Format:"srt",Method:"Embed"}),e.SubtitleProfiles.push({Format:"subrip",Method:"Embed"}),e.SubtitleProfiles.push({Format:"ass",Method:"Embed"}),e.SubtitleProfiles.push({Format:"ssa",Method:"Embed"}),e.SubtitleProfiles.push({Format:"pgs",Method:"Embed"}),e.SubtitleProfiles.push({Format:"pgssub",Method:"Embed"}),e.SubtitleProfiles.push({Format:"dvdsub",Method:"Embed"}),e.SubtitleProfiles.push({Format:"vtt",Method:"Embed"}),e.SubtitleProfiles.push({Format:"sub",Method:"Embed"}),e.SubtitleProfiles.push({Format:"idx",Method:"Embed"}),e.SubtitleProfiles.push({Format:"smi",Method:"Embed"}),e.CodecProfiles.push({Type:"VideoAudio",Codec:"dca",Conditions:[{Condition:"LessThanEqual",Property:"AudioChannels",Value:6}]}),e.CodecProfiles.push({Type:"VideoAudio",Codec:"aac,mp3",Conditions:[{Condition:"LessThanEqual",Property:"AudioChannels",Value:"6"}]}),e.CodecProfiles.push({Type:"Video",Codec:"h264",Conditions:[{Condition:"EqualsAny",Property:"VideoProfile",Value:"high|main|baseline|constrained baseline"},{Condition:"LessThanEqual",Property:"VideoLevel",Value:"41"}]}),e.TranscodingProfiles.filter(function(e){return"Video"==e.Type&&"h264"==e.VideoCodec}).forEach(function(e){e.AudioCodec+=",ac3"})),r&&(e.DirectPlayProfiles.push({Container:"aac,mp3,mpa,wav,wma,mp2,ogg,oga,webma,ape,opus",Type:"Audio"}),e.CodecProfiles=e.CodecProfiles.filter(function(e){return"Audio"!=e.Type}),e.CodecProfiles.push({Type:"Audio",Conditions:[{Condition:"LessThanEqual",Property:"AudioChannels",Value:"2"}]}))}function a(e){e.DirectPlayProfiles.push({Container:"aac,mp3,mpa,wav,wma,mp2,ogg,oga,webma,ape,opus,flac",Type:"Audio"})}function i(){var e=b.currentMediaRenderer,t=(b.getCurrentSrc(e)||"").toLowerCase();if(-1==t.indexOf(".m3u8")){var r=e.duration();return r&&!isNaN(r)&&r!=Number.POSITIVE_INFINITY&&r!=Number.NEGATIVE_INFINITY}return-1==t.indexOf("forcelivestream=true")?!0:void 0}function o(e,t,r){function n(){Events.off(e,"play",n),Events.on(e,"ended",b.onPlaybackStopped),Events.on(e,"ended",b.playNextAfterEnded),b.startProgressInterval(),f()}g(),Events.off(e,"ended",b.onPlaybackStopped),Events.off(e,"ended",b.playNextAfterEnded),Events.on(e,"play",n),"Video"==b.currentItem.MediaType?ApiClient.stopActiveEncodings(t).then(function(){b.setSrcIntoRenderer(e,r,b.currentItem,b.currentMediaSource)}):b.setSrcIntoRenderer(e,r,b.currentItem,b.currentMediaSource)}function s(e,t){var r,n=e[0];return"Playlist"==n.Type?r=b.getItemsForPlayback({ParentId:n.Id}):"MusicArtist"==n.Type?r=b.getItemsForPlayback({ArtistIds:n.Id,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio"}):"MusicGenre"==n.Type?r=b.getItemsForPlayback({Genres:n.Name,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio"}):n.IsFolder?r=b.getItemsForPlayback({ParentId:n.Id,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio,Video"}):t&&"Episode"==n.Type&&1==e.length&&(r=ApiClient.getCurrentUser().then(function(e){return e.Configuration.EnableNextEpisodeAutoPlay?ApiClient.getEpisodes(n.SeriesId,{IsVirtualUnaired:!1,IsMissing:!1,UserId:ApiClient.getCurrentUserId(),Fields:k}).then(function(e){var t=!1;return e.Items=e.Items.filter(function(e){return t?!0:e.Id==n.Id?(t=!0,!0):!1}),e.TotalRecordCount=e.Items.length,e}):null})),r?r.then(function(t){return t?t.Items:e}):Promise.resolve(e)}function u(e,t){var r=t.map(function(e){return MediaController.supportsDirectPlay(e)});return Promise.all(r).then(function(e){for(var r=0,n=t.length;n>r;r++)t[r].enableDirectPlay=e[r]||!1;var a=t.filter(function(e){return e.enableDirectPlay})[0];return a||(a=t.filter(function(e){return e.SupportsDirectStream})[0]),a=a||t.filter(function(e){return e.SupportsTranscoding})[0]})}function l(e,t,r,n){b.tryStartPlayback(e,t,r,function(e){d(t,e,r,n)})}function d(e,t,r,n){Dashboard.hideLoadingMsg(),b.currentMediaSource=t,b.currentItem=e,"Video"===e.MediaType?requirejs(["videorenderer","scripts/mediaplayer-video"],function(){b.playVideo(e,b.currentMediaSource,r,n)}):"Audio"===e.MediaType&&y(e,b.currentMediaSource,r,n)}function c(e){return e.ErrorCode?(MediaController.showPlaybackInfoErrorMessage(e.ErrorCode),!1):!0}function m(e){Events.off(e,"volumechange",v),Events.off(e,"pause",S),Events.off(e,"playing",h),Events.off(e,"timeupdate",I)}function p(){b.currentItem&&b.currentMediaRenderer&&(T?b.onPlaybackStopped.call(b.currentMediaRenderer):ApiClient.stopActiveEncodings())}function f(){var e=b.currentMediaRenderer;if(e.enableProgressReporting!==!1){var t=b.getPlayerStateInternal(e,b.currentItem,b.currentMediaSource),r={QueueableMediaTypes:t.NowPlayingItem.MediaType,ItemId:t.NowPlayingItem.Id,NowPlayingItem:t.NowPlayingItem};r=Object.assign(r,t.PlayState),ApiClient.reportPlaybackProgress(r)}}function g(){T&&(clearTimeout(T),T=null)}function I(){var e=b.getCurrentTicks(this);b.setCurrentTime(e)}function y(e,t,r,n){requirejs(["audiorenderer"],function(){P(e,t,r),n&&n()})}function P(e,t,r){b.createStreamInfo("Audio",e,t,r).then(function(r){function n(){Events.off(i,"playing",n),Events.on(i,"ended",b.onPlaybackStopped),Events.on(i,"ended",b.playNextAfterEnded),b.onPlaybackStart(i,e,t)}b.startTimeTicksOffset=r.startTimeTicksOffset;var a=b.getSavedVolume(),i=new AudioRenderer({poster:b.getPosterUrl(e)});Events.on(i,"volumechange",v),Events.on(i,"playing",n),Events.on(i,"pause",S),Events.on(i,"playing",h),Events.on(i,"timeupdate",I),b.currentMediaRenderer=i,b.currentDurationTicks=b.currentMediaSource.RunTimeTicks,i.init().then(function(){i.volume(a),b.onBeforePlaybackStart(i,e,t),i.setCurrentSrc(r,e,t),b.streamInfo=r})})}function v(){b.onPlaystateChange(this),b.setCurrentTime(b.getCurrentTicks())}function S(){b.onPlaystateChange(this),b.setCurrentTime(b.getCurrentTicks())}function h(){b.onPlaystateChange(this),b.setCurrentTime(b.getCurrentTicks())}var T,b=this,M=-1;b.currentMediaRenderer=null,b.currentItem=null,b.currentMediaSource=null,b.currentDurationTicks=null,b.startTimeTicksOffset=null,b.playlist=[],b.isLocalPlayer=!0,b.isDefaultPlayer=!0,b.streamInfo={},b.name="Html5 Player",b.getTargets=function(){return new Promise(function(e){e(b.getTargetsInternal())})},b.getTargetsInternal=function(){var e=[{name:Globalize.translate("MyDevice"),id:ConnectionManager.deviceId(),playerName:b.name,playableMediaTypes:["Audio","Video"],isLocalPlayer:!0,supportedCommands:Dashboard.getSupportedRemoteCommands()}];return e},b.getDeviceProfile=function(t){return new Promise(function(r){require(["browserdeviceprofile","qualityoptions"],function(i,o){var s=!1;browserInfo.mobile?AppInfo.isNativeApp&&browserInfo.safari?-1==navigator.userAgent.toLowerCase().indexOf("ipad")&&(s=!0):AppInfo.isNativeApp&&(s=!0):s=!0;var u=i({supportsCustomSeeking:s});AppInfo.isNativeApp&&browserInfo.android||(u.SubtitleProfiles.push({Format:"ass",Method:"External"}),u.SubtitleProfiles.push({Format:"ssa",Method:"External"}));var l=e.maxStreamingBitrate();t||(t=o.getVideoQualityOptions(l).filter(function(e){return e.selected})[0].maxHeight),AppInfo.isNativeApp&&browserInfo.android?n(u):AppInfo.isNativeApp&&browserInfo.safari&&a(u),u.MaxStreamingBitrate=l,r(u)})})};var C;b.supportsTextTracks=function(){return null==C&&(C=null!=document.createElement("video").textTracks),C},b.getCurrentSrc=function(e){return e.currentSrc()},b.getCurrentTicks=function(e){var t=Math.floor(1e4*(e||b.currentMediaRenderer).currentTime());return t+=b.startTimeTicksOffset},b.playNextAfterEnded=function(){Events.off(this,"ended",b.playNextAfterEnded),b.nextTrack()},b.startProgressInterval=function(){g();var e=ApiClient.isWebSocketOpen()?1200:5e3;browserInfo.safari&&(e=Math.max(e,5e3)),b.lastProgressReport=0,T=setInterval(function(){b.currentMediaRenderer&&(new Date).getTime()-b.lastProgressReport>e&&(b.lastProgressReport=(new Date).getTime(),f())},250)},b.getCurrentMediaExtension=function(e){return e=e.split("?")[0],e.substring(e.lastIndexOf("."))},b.canPlayNativeHls=function(){if(AppInfo.isNativeApp)return!0;var e=document.createElement("video");return e.canPlayType("application/x-mpegURL").replace(/no/,"")||e.canPlayType("application/vnd.apple.mpegURL").replace(/no/,"")?!0:!1},b.canPlayHls=function(){return b.canPlayNativeHls()?!0:window.MediaSource&&!browserInfo.firefox},b.changeStream=function(e,t){var r=b.currentMediaRenderer;if(i()&&null==t)return void r.currentTime(e/1e4);t=t||{};var n=r.currentSrc(),a=getParameterByName("PlaySessionId",n),s=getParameterByName("LiveStreamId",n);b.getDeviceProfile().then(function(i){var u=null==t.AudioStreamIndex?getParameterByName("AudioStreamIndex",n)||null:t.AudioStreamIndex;"string"==typeof u&&(u=parseInt(u));var l=null==t.SubtitleStreamIndex?getParameterByName("SubtitleStreamIndex",n)||null:t.SubtitleStreamIndex;"string"==typeof l&&(l=parseInt(l)),MediaController.getPlaybackInfo(b.currentItem.Id,i,e,b.currentMediaSource,u,l,s).then(function(t){c(t)&&(b.currentMediaSource=t.MediaSources[0],b.createStreamInfo(b.currentItem.MediaType,b.currentItem,b.currentMediaSource,e).then(function(e){return e.url?(b.currentSubtitleStreamIndex=l,void o(r,a,e)):(MediaController.showPlaybackInfoErrorMessage("NoCompatibleStream"),void b.stop())}))})})},b.setSrcIntoRenderer=function(e,t,r,n){for(var a=n.MediaStreams.filter(function(e){return"Subtitle"==e.Type}),i=a.filter(function(e){return"External"==e.DeliveryMethod}),o=[],s=0,u=i.length;u>s;s++){var l=i[s],d=l.IsExternalUrl?l.DeliveryUrl:ApiClient.getUrl(l.DeliveryUrl);o.push({url:d,language:l.Language||"und",isDefault:l.Index==n.DefaultSubtitleStreamIndex,index:l.Index,format:l.Codec})}b.startTimeTicksOffset=t.startTimeTicksOffset||0,e.setCurrentSrc(t,r,n,o),b.streamInfo=t},b.setCurrentTime=function(e,t,r){e=Math.floor(e);var n=Dashboard.getDisplayTime(e),a=b.currentMediaRenderer;if(b.currentDurationTicks&&(n+=" / "+Dashboard.getDisplayTime(b.currentDurationTicks),t)){var o=e/b.currentDurationTicks;o*=100,t.value=o}t&&(t.disabled=!((b.currentDurationTicks||0)>0||i())),r&&r.html(n);var s=b.getPlayerStateInternal(a,b.currentItem,b.currentMediaSource);Events.trigger(b,"positionchange",[s])},b.canQueueMediaType=function(e){return b.currentItem&&b.currentItem.MediaType==e},b.play=function(e){Dashboard.showLoadingMsg(),Dashboard.getCurrentUser().then(function(t){e.items?s(e.items,!0).then(function(r){b.playWithIntros(r,e,t)}):b.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(r){s(r.Items,!0).then(function(r){b.playWithIntros(r,e,t)})})})},b.playWithIntros=function(e,r,n){var a=e[0];return"Video"===a.MediaType&&Dashboard.showLoadingMsg(),r.startPositionTicks||"Video"!==a.MediaType||!t.enableCinemaMode()?void b.playInternal(a,r.startPositionTicks,function(){b.setPlaylistState(0,e)}):void ApiClient.getJSON(ApiClient.getUrl("Users/"+n.Id+"/Items/"+a.Id+"/Intros")).then(function(t){e=t.Items.concat(e),b.playInternal(e[0],r.startPositionTicks,function(){b.setPlaylistState(0,e)})})},b.createStreamInfo=function(e,t,r,n){return new Promise(function(a){var i,o,s=0,u=n?n/1e7:0,l=u?"#t="+u:"",d="Transcode";if("Video"==e)if(o="video/"+r.Container,r.enableDirectPlay)i=r.Path,d="DirectPlay";else if(r.SupportsDirectStream){var c={Static:!0,mediaSourceId:r.Id,deviceId:ApiClient.deviceId(),api_key:ApiClient.accessToken()};r.LiveStreamId&&(c.LiveStreamId=r.LiveStreamId),i=ApiClient.getUrl("Videos/"+t.Id+"/stream."+r.Container,c),i+=l,d="DirectStream"}else r.SupportsTranscoding&&(i=ApiClient.getUrl(r.TranscodingUrl),"hls"==r.TranscodingSubProtocol?(-1!=i.toLowerCase().indexOf("forcelivestream=true")&&(u=0,s=n||0),o="application/x-mpegURL"):(-1==i.indexOf(".mkv")&&(i+="&EnableAutoStreamCopy=false"),-1==i.toLowerCase().indexOf("copytimestamps=true")&&(s=n||0),o="video/"+r.TranscodingContainer));else if(o="audio/"+r.Container,r.enableDirectPlay)i=r.Path,d="DirectPlay";else{var m=r.SupportsDirectStream;if(m){var p=(r.Container||"").toLowerCase(),c={Static:!0,mediaSourceId:r.Id,deviceId:ApiClient.deviceId(),api_key:ApiClient.accessToken()};r.LiveStreamId&&(c.LiveStreamId=r.LiveStreamId),i=ApiClient.getUrl("Audio/"+t.Id+"/stream."+p,c),i+=l,d="DirectStream"}else r.SupportsTranscoding&&(i=ApiClient.getUrl(r.TranscodingUrl),"hls"==r.TranscodingSubProtocol?(i+=l,o="application/x-mpegURL"):(s=n||0,o="audio/"+r.TranscodingContainer))}var f={url:i,mimeType:o,startTimeTicksOffset:s,startPositionInSeekParam:u,playMethod:d};"DirectPlay"==d&&"File"==r.Protocol?require(["localassetmanager"],function(){LocalAssetManager.translateFilePath(f.url).then(function(e){f.url=e,a(f)})}):a(f)})},b.lastBitrateDetections={},b.playInternal=function(t,r,n){if(null==t)throw new Error("item cannot be null");if(b.isPlaying()&&b.stop(!1),"Audio"!==t.MediaType&&"Video"!==t.MediaType)throw new Error("Unrecognized media type");if(t.IsPlaceHolder)return Dashboard.hideLoadingMsg(),void MediaController.showPlaybackInfoErrorMessage("PlaceHolder");var a=function(){b.getDeviceProfile().then(function(e){l(e,t,r,n)})},i=ApiClient.serverAddress();"Video"==t.MediaType&&e.enableAutomaticBitrateDetection()&&(new Date).getTime()-(b.lastBitrateDetections[i]||0)>3e5?(Dashboard.showLoadingMsg(),ApiClient.detectBitrate().then(function(t){b.lastBitrateDetections[i]=(new Date).getTime(),e.maxStreamingBitrate(t),a()},a)):a()},b.tryStartPlayback=function(e,t,r,n){"Video"===t.MediaType&&Dashboard.showLoadingMsg(),MediaController.getPlaybackInfo(t.Id,e,r).then(function(a){c(a)&&u(t.MediaType,a.MediaSources).then(function(i){i?i.RequiresOpening?MediaController.getLiveStream(t.Id,a.PlaySessionId,e,r,i,null,null).then(function(e){MediaController.supportsDirectPlay(e.MediaSource).then(function(t){e.MediaSource.enableDirectPlay=t,n(e.MediaSource)})}):n(i):(Dashboard.hideLoadingMsg(),MediaController.showPlaybackInfoErrorMessage("NoCompatibleStream"))})})},b.getPosterUrl=function(e){var t=Math.max(screen.height,screen.width);return e.BackdropImageTags&&e.BackdropImageTags.length?ApiClient.getScaledImageUrl(e.Id,{type:"Backdrop",index:0,maxWidth:t,tag:e.BackdropImageTags[0]}):e.ParentBackdropItemId&&e.ParentBackdropImageTags&&e.ParentBackdropImageTags.length?ApiClient.getScaledImageUrl(e.ParentBackdropItemId,{type:"Backdrop",index:0,maxWidth:t,tag:e.ParentBackdropImageTags[0]}):null},b.displayContent=function(e){Dashboard.onBrowseCommand(e)},b.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(r){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){r({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.Fields=k,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))},b.removeFromPlaylist=function(e){b.playlist.remove(e)},b.currentPlaylistIndex=function(e){if(null==e)return M;var t=b.playlist[e];b.playInternal(t,0,function(){b.setPlaylistState(e)})},b.setPlaylistState=function(e,t){isNaN(e)||(M=e),t&&(b.playlist=t),b.updatePlaylistUi&&b.updatePlaylistUi()},b.nextTrack=function(){var e;switch(b.getRepeatMode()){case"RepeatOne":e=M;break;case"RepeatAll":e=M+1,e>=b.playlist.length&&(e=0);break;default:e=M+1}var t=b.playlist[e];t&&b.playInternal(t,0,function(){b.setPlaylistState(e)})},b.previousTrack=function(){var e=M-1;if(e>=0){var t=b.playlist[e];t&&b.playInternal(t,0,function(){b.setPlaylistState(e)})}},b.queueItemsNext=function(e){for(var t=1,r=0,n=e.length;n>r;r++)b.playlist.splice(t,0,e[r]),t++},b.queueItems=function(e){for(var t=0,r=e.length;r>t;t++)b.playlist.push(e[t])},b.queue=function(e){return b.playlist.length?void Dashboard.getCurrentUser().then(function(){e.items?s(e.items).then(function(e){b.queueItems(e)}):b.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(e){s(e.Items).then(function(e){b.queueItems(e)})})}):void b.play(e)},b.queueNext=function(e){return b.playlist.length?void Dashboard.getCurrentUser().then(function(){e.items?b.queueItemsNext(e.items):b.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,b.queueItemsNext(e.items)})}):void b.play(e)},b.pause=function(){b.currentMediaRenderer.pause()},b.unpause=function(){b.currentMediaRenderer.unpause()},b.seek=function(e){b.changeStream(e)},b.mute=function(){b.setVolume(0)},b.unMute=function(){b.setVolume(100*b.getSavedVolume())},b.volume=function(){return 100*b.currentMediaRenderer.volume()},b.toggleMute=function(){b.currentMediaRenderer&&(b.volume()?b.mute():b.unMute())},b.volumeDown=function(){b.currentMediaRenderer&&b.setVolume(Math.max(b.volume()-2,0))},b.volumeUp=function(){b.currentMediaRenderer&&b.setVolume(Math.min(b.volume()+2,100))},b.setVolume=function(e){b.currentMediaRenderer&&(b.currentMediaRenderer.volume(e/100),b.onVolumeChanged(b.currentMediaRenderer))},b.saveVolume=function(e){e&&r.setItem("volume",e)},b.getSavedVolume=function(){return r.getItem("volume")||.5},b.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(r){var n={UserId:t,Fields:k,Limit:100,Filters:"IsNotFolder",Recursive:!0,SortBy:"Random"};if("MusicArtist"==r.Type)n.MediaTypes="Audio",n.ArtistIds=r.Id;else if("MusicGenre"==r.Type)n.MediaTypes="Audio",n.Genres=r.Name;else{if(!r.IsFolder)return;n.ParentId=e}b.getItemsForPlayback(n).then(function(e){b.play({items:e.Items})})})},b.instantMix=function(e){var t=100;ApiClient.getInstantMixFromItem(e,{UserId:Dashboard.getCurrentUserId(),Fields:k,Limit:t}).then(function(e){b.play({items:e.Items})})},b.stop=function(e){var t=b.currentMediaRenderer;if(t){Events.off(t,"ended",b.playNextAfterEnded);var r=!1;T||(r=!0),t.stop(),Events.trigger(t,"ended"),m(t),t.cleanup(e),b.currentMediaRenderer=null,b.currentItem=null,b.currentSubtitleStreamIndex=null,b.streamInfo={},b.currentMediaSource=null,r&&ApiClient.stopActiveEncodings()}else b.currentMediaRenderer=null,b.currentItem=null,b.currentMediaSource=null,b.currentSubtitleStreamIndex=null,b.streamInfo={};b.resetEnhancements&&b.resetEnhancements()},b.isPlaying=function(){return b.playlist.length>0},b.getPlayerState=function(){return new Promise(function(e){var t=b.getPlayerStateInternal(b.currentMediaRenderer,b.currentItem,b.currentMediaSource);e(t)})},b.getPlayerStateInternal=function(e,t,r){var n={PlayState:{}};if(e){n.PlayState.VolumeLevel=100*e.volume(),n.PlayState.IsMuted=0==e.volume(),n.PlayState.IsPaused=e.paused(),n.PlayState.PositionTicks=b.getCurrentTicks(e),n.PlayState.RepeatMode=b.getRepeatMode();var a=e.currentSrc();if(a){var o=getParameterByName("AudioStreamIndex",a);o&&(n.PlayState.AudioStreamIndex=parseInt(o)),n.PlayState.SubtitleStreamIndex=b.currentSubtitleStreamIndex,n.PlayState.PlayMethod=b.streamInfo.playMethod,n.PlayState.PlaySessionId=getParameterByName("PlaySessionId",a)}}return r&&(n.PlayState.MediaSourceId=r.Id,n.PlayState.LiveStreamId=r.LiveStreamId,n.NowPlayingItem={RunTimeTicks:r.RunTimeTicks},n.PlayState.CanSeek=(r.RunTimeTicks||0)>0||i()),t&&(n.NowPlayingItem=b.getNowPlayingItemForReporting(t,r)),n},b.getNowPlayingItemForReporting=function(e,t){var r={};r.RunTimeTicks=t.RunTimeTicks,r.Id=e.Id,r.MediaType=e.MediaType,r.Type=e.Type,r.Name=e.Name,r.IndexNumber=e.IndexNumber,r.IndexNumberEnd=e.IndexNumberEnd,r.ParentIndexNumber=e.ParentIndexNumber,r.ProductionYear=e.ProductionYear,r.PremiereDate=e.PremiereDate,r.SeriesName=e.SeriesName,r.Album=e.Album,r.Artists=e.Artists;var n=e.ImageTags||{};return e.SeriesPrimaryImageTag?(r.PrimaryImageItemId=e.SeriesId,r.PrimaryImageTag=e.SeriesPrimaryImageTag):n.Primary?(r.PrimaryImageItemId=e.Id,r.PrimaryImageTag=n.Primary):e.AlbumPrimaryImageTag?(r.PrimaryImageItemId=e.AlbumId,r.PrimaryImageTag=e.AlbumPrimaryImageTag):e.SeriesPrimaryImageTag&&(r.PrimaryImageItemId=e.SeriesId,r.PrimaryImageTag=e.SeriesPrimaryImageTag),e.BackdropImageTags&&e.BackdropImageTags.length?(r.BackdropItemId=e.Id,r.BackdropImageTag=e.BackdropImageTags[0]):e.ParentBackdropImageTags&&e.ParentBackdropImageTags.length&&(r.BackdropItemId=e.ParentBackdropItemId,r.BackdropImageTag=e.ParentBackdropImageTags[0]),n.Thumb&&(r.ThumbItemId=e.Id,r.ThumbImageTag=n.Thumb),n.Logo?(r.LogoItemId=e.Id,r.LogoImageTag=n.Logo):e.ParentLogoImageTag&&(r.LogoItemId=e.ParentLogoItemId,r.LogoImageTag=e.ParentLogoImageTag),r},b.beginPlayerUpdates=function(){},b.endPlayerUpdates=function(){},b.onBeforePlaybackStart=function(e,t,r){var n=b.getPlayerStateInternal(e,t,r);Events.trigger(b,"beforeplaybackstart",[n])},b.onPlaybackStart=function(e,t,r){var n=b.getPlayerStateInternal(e,t,r);Events.trigger(b,"playbackstart",[n]),b.startProgressInterval()},b.onVolumeChanged=function(e){b.saveVolume(e.volume());var t=b.getPlayerStateInternal(e,b.currentItem,b.currentMediaSource);Events.trigger(b,"volumechange",[t])},b.cleanup=function(){},b.onPlaybackStopped=function(){document.body.classList.remove("bodyWithPopupOpen");var e=this;m(e),Events.off(e,"ended",b.onPlaybackStopped);var t=b.currentItem,r=b.currentMediaSource,n=b.getPlayerStateInternal(e,t,r);b.cleanup(e),g(),"Video"==t.MediaType&&b.resetEnhancements(),Events.trigger(b,"playbackstop",[n])},b.onPlaystateChange=function(e){var t=b.getPlayerStateInternal(e,b.currentItem,b.currentMediaSource);Events.trigger(b,"playstatechange",[t])},window.addEventListener("beforeunload",p),b.canAutoPlayAudio=function(){return AppInfo.isNativeApp?!0:browserInfo.mobile?!1:!0};var A="RepeatNone";b.getRepeatMode=function(){return A},b.setRepeatMode=function(e){A=e};var k="MediaSources,Chapters";b.tryPair=function(){return new Promise(function(e){e()})}}window.MediaPlayer=new n,window.MediaPlayer.init=function(){window.MediaController.registerPlayer(window.MediaPlayer),window.MediaController.setActivePlayer(window.MediaPlayer,window.MediaPlayer.getTargetsInternal()[0])}});