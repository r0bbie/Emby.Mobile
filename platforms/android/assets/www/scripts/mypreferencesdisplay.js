define(["userSettings","appStorage","jQuery"],function(e,a,s){function n(n,o){n.querySelector(".chkDisplayMissingEpisodes").checked=o.Configuration.DisplayMissingEpisodes||!1,n.querySelector(".chkDisplayUnairedEpisodes").checked=o.Configuration.DisplayUnairedEpisodes||!1,n.querySelector(".chkGroupMoviesIntoCollections").checked=o.Configuration.GroupMoviesIntoBoxSets||!1,s("#selectThemeSong",n).val(a.getItem("enableThemeSongs-"+o.Id)||""),s("#selectBackdrop",n).val(a.getItem("enableBackdrops-"+o.Id)||""),s("#selectLanguage",n).val(e.language()||""),Dashboard.hideLoadingMsg()}function o(n,o){return o.Configuration.DisplayMissingEpisodes=n.querySelector(".chkDisplayMissingEpisodes").checked,o.Configuration.DisplayUnairedEpisodes=n.querySelector(".chkDisplayUnairedEpisodes").checked,o.Configuration.GroupMoviesIntoBoxSets=n.querySelector(".chkGroupMoviesIntoCollections").checked,e.language(n.querySelector("#selectLanguage").value),a.setItem("enableThemeSongs-"+o.Id,s("#selectThemeSong",n).val()),a.setItem("enableBackdrops-"+o.Id,s("#selectBackdrop",n).val()),ApiClient.updateUserConfiguration(o.Id,o.Configuration)}function i(e){var a=getParameterByName("userId")||Dashboard.getCurrentUserId();AppInfo.enableAutoSave||Dashboard.showLoadingMsg(),ApiClient.getUser(a).then(function(a){o(e,a).then(function(){Dashboard.hideLoadingMsg(),AppInfo.enableAutoSave||require(["toast"],function(e){e(Globalize.translate("SettingsSaved"))})},function(){Dashboard.hideLoadingMsg()})})}function r(){var e=s(this).parents(".page")[0];return i(e),!1}pageIdOn("pageinit","displayPreferencesPage",function(){var e=this;s(".displayPreferencesForm").off("submit",r).on("submit",r),AppInfo.enableAutoSave?e.querySelector(".btnSave").classList.add("hide"):e.querySelector(".btnSave").classList.remove("hide")}),pageIdOn("pageshow","displayPreferencesPage",function(){var e=this;Dashboard.showLoadingMsg();var a=getParameterByName("userId")||Dashboard.getCurrentUserId();ApiClient.getUser(a).then(function(a){n(e,a),a.Policy.EnableUserPreferenceAccess?s(".requiresUserPreferences",e).show():s(".requiresUserPreferences",e).hide()}),s(".fldEnableBackdrops",e).show(),AppInfo.supportsUserDisplayLanguageSetting?e.querySelector(".languageSection").classList.remove("hide"):e.querySelector(".languageSection").classList.add("hide")}),pageIdOn("pagebeforehide","displayPreferencesPage",function(){var e=this;AppInfo.enableAutoSave&&i(e)})});