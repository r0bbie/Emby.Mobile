define(["appStorage","browser"],function(e,n){function r(){return null}function t(){var e={PlayableMediaTypes:["Audio","Video"],SupportsPersistentIdentifier:!1,DeviceProfile:r()};return e}function o(){return new Promise(function(e){require(["fingerprintjs2"],function(n){(new n).get(function(n){e(n)})})})}function i(){var n="_deviceId2",r=e.getItem(n);return r?Promise.resolve(r):o().then(function(r){return e.setItem(n,r),r})}function u(){var e;return e=n.chrome?"Chrome":n.edge?"Edge":n.firefox?"Firefox":n.msie?"Internet Explorer":"Web Browser",n.version&&(e+=" "+n.version),n.ipad?e+=" Ipad":n.iphone?e+=" Iphone":n.android&&(e+=" Android"),e}var d,a=window.dashboardVersion||"3.0";return{getWindowState:function(){return document.windowState||"Normal"},setWindowState:function(){alert("setWindowState is not supported and should not be called")},exit:function(){alert("exit is not supported and should not be called")},supports:function(e){var n=["filedownload"];return-1!=n.indexOf(e.toLowerCase())},appInfo:function(){return d?Promise.resolve(d):i().then(function(e){return d={deviceId:e,deviceName:u(),appName:"Emby Mobile",appVersion:a}})},appName:function(){return"Emby Mobile"},appVersion:function(){return a},deviceName:function(){return u()},deviceId:function(){return i()},capabilities:t}});