(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(){var h=[].slice;String.prototype.autoLink=function(){var b,f,d,a,e,g;a=1<=arguments.length?h.call(arguments,0):[];e=/(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;if(!(0<a.length))return this.replace(e,"$1<a href='$2'>$2</a>");d=a[0];f=function(){var c;c=[];for(b in d)g=d[b],"callback"!==b&&c.push(" "+b+"='"+g+"'");return c}().join("");return this.replace(e,function(c,b,a){c=("function"===typeof d.callback?d.callback(a):void 0)||"<a href='"+a+"'"+f+">"+a+"</a>";return""+b+c})}}).call(this)},{}],2:[function(require,module,exports){var PortfolioGalleryCollection=Backbone.Collection.extend({initialize:function(){}});module.exports=PortfolioGalleryCollection},{}],3:[function(require,module,exports){var PortfolioInstagramCollection=Backbone.Collection.extend({initialize:function(){}});module.exports=PortfolioInstagramCollection},{}],4:[function(require,module,exports){var LoaderView=Backbone.View.extend({interval:null,timeline:null,maxPixels:300,loadingEl:null,documentImagesLoaded:0,documentImageCount:null,documentImages:null,fakeTimeOutComplete:false,imagesLoadedComplete:false,initialize:function(options){var that=this;this.loadingEl=options.loadingEl;this.documentImages=$("img");this.documentImageCount=this.documentImages.length;for(i=0;i<this.maxPixels;i++){var dot=$("<div class='dot'/>");dot.appendTo($(this.el));dot.attr("id","dot"+i)}this.timeline=new TimelineMax({repeat:-1});this.timeline.add(TweenMax.to($(this.loadingEl),.25,{scale:[1.2,1.2],ease:Power1.easeIn})).add(TweenMax.to($(this.loadingEl),1,{scale:[1,1],ease:Elastic.easeOut.config(1,.3)})).call(this.render,null,this,0);setTimeout(function(){that.fakeTimeOutComplete=true;that.timeline.pause();$(that.el).fadeOut(1e3)},1500)},render:function(){var windowWidth=$(window).width();var windowHeight=$(window).height();var pixelSize=windowWidth/this.maxPixels;var counter=0;var increase=(Math.PI*Math.random()*10+8)/this.maxPixels;var pos=Math.random()*4;var waveHeight=Math.random()*3+3;$.each($(".dot"),function(i,dot){TweenLite.set(dot,{x:i*pixelSize,y:Math.sin(counter+pos)/waveHeight*windowHeight,width:pixelSize,height:pixelSize,opacity:1});TweenLite.to(dot,1.2+Math.random()*.5,{opacity:0,y:"+="+Math.random()*400+400,ease:RoughEase.ease.config({template:Power0.easeNone,strength:1.5,points:20,taper:"none",randomize:true,clamp:false})});counter+=increase})}});module.exports=LoaderView},{}],5:[function(require,module,exports){var autoLink=require("../../library/autolink");var PortfolioGalleryView=Backbone.View.extend({sectionSelectors:null,sections:null,thumbnails:null,overlayId:null,galleryCollection:null,galleryModelTemplateId:null,instagramCollection:null,instagramModelTemplateId:null,initialize:function(options){var that=this;this.overlayId=options.overlayId;this.galleryCollection=options.galleryCollection;this.galleryModelTemplateId=options.galleryModelTemplateId;this.instagramCollection=options.instagramCollection;this.instagramModelTemplateId=options.instagramModelTemplateId;this.sectionSelectors=$(this.el).find(".section-selector");this.sections=$(this.el).find(".section");this.thumbnails=$(this.el).find(".thumbnail");$.each(this.sectionSelectors,function(i,e){e=$(e);e.on("click",function(){$(that.sectionSelectors).removeClass("active");$(".section").hide();e.addClass("active");$('.section[data-section="'+e.data("section")+'"]').show()})});$.each(this.thumbnails,function(i,e){e=$(e);e.on("click",function(){that.overlay(e)})});$(document).keydown(function(e){if(e.keyCode==27){$(that.overlayId).hide()}});$(that.overlayId+" .contents").on("click",function(e){e.stopPropagation()});$(that.overlayId).on("click",function(e){$(that.overlayId).hide()})},overlay:function(thumbnail){var that=this;var type=thumbnail.data("type");var model=null;var id=thumbnail.data("id");var templateId=null;if(type=="portfolio"){model=that.galleryCollection.get(id);templateId=that.galleryModelTemplateId}else if(type=="instagram"){model=that.instagramCollection.get(id);templateId=that.instagramModelTemplateId;var date=new Date(model.get("created_time")*1e3);date=$.timeago(date.toISOString());model.set("date",date)}var template=_.template($(templateId).html());var html=template(model.attributes,{escape:false});html=html.autoLink();html=html.replace(/#([a-zA-Z0-9]+)/g,"<a>#$1</a>");$(that.overlayId+" .contents").html(html);$(that.overlayId).css("height",$("body").height());$(that.overlayId+" .contents").css("margin-top",$(window).scrollTop());$(that.overlayId).show()}});module.exports=PortfolioGalleryView},{"../../library/autolink":1}],6:[function(require,module,exports){var PortfolioGalleryView=require("../library/views/PortfolioGalleryView");var PortfolioGalleryCollection=require("../library/collections/PortfolioGalleryCollection");var PortfolioInstagramCollection=require("../library/collections/PortfolioInstagramCollection");var LoaderView=require("../library/views/LoaderView");var loaderView=new LoaderView({el:"#loader",loadingEl:"#loader_logo"});var portfolioGalleryCollection=new PortfolioGalleryCollection(portfolioData.gallery);var portfolioInstagramCollection=new PortfolioInstagramCollection(instagramData);var portfolioGalleryView=new PortfolioGalleryView({el:"#portfolio-gallery",overlayId:"#overlay",galleryCollection:portfolioGalleryCollection,galleryModelTemplateId:"#portfolio-gallery-template",instagramCollection:portfolioInstagramCollection,instagramModelTemplateId:"#instagram-gallery-template"});$(document).ready(function(){$($("#portfolio-gallery .section-selector")[0]).trigger("click")})},{"../library/collections/PortfolioGalleryCollection":2,"../library/collections/PortfolioInstagramCollection":3,"../library/views/LoaderView":4,"../library/views/PortfolioGalleryView":5}]},{},[6]);