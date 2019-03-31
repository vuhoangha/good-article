if (self.CavalryLogger) { CavalryLogger.start_js(["lhmBI"]); }

__d("LiveChatPluginAlerts",["fbt","Arbiter","LiveChatPluginConstants","LiveChatPluginLocalStorageUtil","MercuryIDs","MercuryThreadActions","MercuryThreadInformer","MessengerState.bs","Sound","UnverifiedXD","UserActivity"],(function(a,b,c,d,e,f,g){"use strict";__p&&__p();var h=b("MercuryThreadActions").get();a={init:function(a,c,d,e,f,g){this._isMuted=f,this._pageID=b("MercuryIDs").getParticipantIDFromUserID(c),this._pageName=d,this._soundURLs=e,this._viewerFBID=a,this._threadID=b("MercuryIDs").getThreadIDFromUserID(c),this._threadInformer=b("MercuryThreadInformer").getForFBID(a),this._unreadCount=g,this._viewerID=b("MercuryIDs").getParticipantIDFromUserID(a),this._setupSubscriptions()},_setupSubscriptions:function(){__p&&__p();var a=this;this._threadInformer.subscribe("messages-received",function(c,d){__p&&__p();for(var e in d){c=e===a._threadID?d[e][0]:null;if(c===null)continue;if(c.author!==a._pageID)break;a._messageReceived(c);b("UserActivity").isActive(1e3)&&b("UserActivity").isOnTab()&&h.markRead(a._threadID);break}});this._threadInformer.listen(this._threadID,function(c){b("MessengerState.bs").getThreadMeta(a._viewerFBID,c,function(b){a._isMuted=b.mute_until!=null,c=b.unread_count,c!==a._unreadCount&&(b.snippet_sender===a._viewerID?a._unreadCount=0:(a._unreadCount=c,a._informUnreadCount(),a._updatePageTitle(a._pageName)))},null)});b("Arbiter").subscribe(b("LiveChatPluginConstants").RESET_BADGING,function(c){b("LiveChatPluginLocalStorageUtil").getChatStarted()&&a._unreadCount>0&&(a._unreadCount=0,h.markRead(a._threadID),a._informUnreadCount())})},_playSound:function(a){b("Sound").play([this._soundURLs.get("sound.notif_ogg_url"),this._soundURLs.get("sound.notif_mp3_url")],a,!1)},_messageReceived:function(a){this._shouldAlert()&&!this._isMuted&&this._playSound(a.timestamp)},_shouldAlert:function(){return(b("LiveChatPluginLocalStorageUtil").getIsDialogHidden()||!b("UserActivity").isOnTab())&&b("LiveChatPluginLocalStorageUtil").getChatStarted()},_updatePageTitle:function(a){var c=this;!b("UserActivity").isOnTab()&&this._unreadCount>0&&b("LiveChatPluginLocalStorageUtil").getChatStarted()?(b("UnverifiedXD").send({type:"liveChatPluginUpdatePageTitle",titleText:g._("{pageName} \u0111\u00e3 nh\u1eafn tin cho b\u1ea1n",[g._param("pageName",a)]).toString()}),b("UserActivity").subscribeOnce(function(){c._stopBlinking()})):this._unreadCount===0&&this._stopBlinking()},_stopBlinking:function(){b("UnverifiedXD").send({type:"liveChatPluginUpdatePageTitle"})},_informUnreadCount:function(){b("Arbiter").inform(b("LiveChatPluginConstants").UNREAD_COUNT_UPDATE,this._unreadCount),b("UnverifiedXD").send({type:"liveChatPluginUpdateShadow",resetShadow:this._unreadCount===0})}};e.exports=a}),null);