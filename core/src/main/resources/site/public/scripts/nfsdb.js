/*******************************************************************************
 *  _  _ ___ ___     _ _
 * | \| | __/ __| __| | |__
 * | .` | _|\__ \/ _` | '_ \
 * |_|\_|_| |___/\__,_|_.__/
 *
 * Copyright (c) 2014-2016. The NFSdb project and its contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

"use strict";function s4(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function guid(){return s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4()}function numberWithCommas(e){var a=e.toString().split(".");return a[0]=a[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),a.join(".")}function localStorageSupport(){return"localStorage"in window&&null!==window.localStorage}function fixHeight(){var e=$("body > #wrapper").height()-61;$(".sidebard-panel").css("min-height",e+"px");var a=$("nav.navbar-default").height(),s=$("#page-wrapper"),i=s.height();a>i&&s.css("min-height",a+"px"),i>a&&s.css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&(a>i?s.css("min-height",a-60+"px"):s.css("min-height",$(window).height()-60+"px"))}!function(e){function a(a){function s(){g.append('<div class="ud-header-row"><div class="ud-header ud-h0">File name</div><div class="ud-header ud-h1">Size</div><div class="ud-header ud-h2">Status</div></div>'),g.append('<div class="ud-canvas"></div>'),c=g.find("> .ud-canvas")}function i(e){c.append('<div id="'+e.id+'" class="ud-row" style="top: '+f+'px;"><div class="ud-cell ud-c0">'+e.name+'</div><div class="ud-cell ud-c1">'+e.size+'</div><div class="ud-cell ud-c2"><span class="label">pending</span></div></div>'),f+=35}function o(a,s){a.uploaded=s;var i=e("#"+a.id),o=s<a.size?numberWithCommas(s):a.sizeFmt;i.find(" > .ud-c1").html(o+"<strong>/</strong>"+a.sizeFmt),i.find(" > .ud-progress").css("width",100*s/a.size+"%")}function n(a,s,i){var o=e("#"+a.id);if(o.find(" > .ud-c2").html(s),o.find(" > .ud-progress").remove(),i){var n=p.shift();n?d(n):h=!1}}function t(e){n(e,'<span class="label label-success">success</span>',!0)}function l(e){n(e,'<span class="label label-danger">failed</span>',!0)}function d(a){h=!0,n(a,'<span class="label label-info">uploading</span>',!1);var s=e("#"+a.id);s.append('<div class="ud-progress"></div>');var i=new FormData;i.append("data",a.file),e.ajax({xhr:function(){var s=e.ajaxSettings.xhr();return s.upload&&s.upload.addEventListener("progress",function(e){e.lengthComputable&&o(a,e.loaded||e.position)},!1),s},url:"/imp",type:"POST",contentType:!1,processData:!1,cache:!1,data:i,success:function(e){a.response=e,t(a)},error:function(e){a.response=e.responseText,l(a)}})}function r(e){for(var a=0;a<e.length;a++){var s=e[a],o={id:guid(),name:s.name,size:s.size,uploaded:0,file:s,sizeFmt:numberWithCommas(s.size)};u.push(o),i(o),h?p.push(o):d(o)}}var c,u=[],g=a,f=0,p=[],h=!1;return s(),{add:r}}e.extend(!0,window,{nfsdb:{UploadController:a}})}(jQuery),$(document).ready(function(){function e(e){e.stopPropagation(),e.preventDefault&&e.preventDefault()}function a(e){i=$(),s.removeClass("drag-drop"),s.addClass("drag-idle"),e.preventDefault(),o.add(e.originalEvent.dataTransfer.files)}var s=$("#dragTarget"),i=$(),o=new nfsdb.UploadController($("#upload-detail"));s.on("drop",a),$.fn.dndhover=function(){return this.each(function(){var e=$(this);e.on("dragenter",function(a){0===i.size()&&e.trigger("dndHoverStart"),i=i.add(a.target)}),e.on("dragleave",function(a){setTimeout(function(){i=i.not(a.target),0===i.size()&&e.trigger("dndHoverEnd")},1)})})},s.dndhover().on({dndHoverStart:function(a){return s.addClass("drag-drop"),s.removeClass("drag-idle"),e(a),!1},dndHoverEnd:function(a){return s.removeClass("drag-drop"),s.addClass("drag-idle"),e(a),!1}}),$(document).on("dragenter",e),$(document).on("dragover",e),$(document).on("drop",e)}),function(e){function a(){function a(){}function s(){null!==r&&(r.abort(),r=null)}function i(){null!==c&&(clearTimeout(c),c=null)}function o(){console.log("success")}function n(e,a){console.log("not so lucky: "+a)}function t(){s(),u.query=d,u.limit="0,100",u.withCount=!0,r=e.get("/js",u,o,n)}function l(e){d=e,i(),setTimeout(t,50)}var d,r=null,c=null,u={query:"",limit:"",withCount:!1};return a(),{sendQuery:l}}e.extend(!0,window,{nfsdb:{GridController:a}})}(jQuery),$(document).ready(function(){function e(){var e=$("body");!e.hasClass("mini-navbar")||e.hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},200)):e.hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(400)},100)):$("#side-menu").removeAttr("style")}$(this).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small"),$("#side-menu").metisMenu(),$(".collapse-link").click(function(){var e=$(this).closest("div.ibox"),a=$(this).find("i"),s=e.find("div.ibox-content");s.slideToggle(200),a.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),e.toggleClass("").toggleClass("border-bottom"),setTimeout(function(){e.resize(),e.find("[id^=map-]").resize()},50)}),$(".close-link").click(function(){var e=$(this).closest("div.ibox");e.remove()}),$(".fullscreen-link").click(function(){var e=$(this).closest("div.ibox"),a=$(this).find("i");$("body").toggleClass("fullscreen-ibox-mode"),a.toggleClass("fa-expand").toggleClass("fa-compress"),e.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}),$(".close-canvas-menu").click(function(){$("body").toggleClass("mini-navbar"),e()}),$("body.canvas-menu .sidebar-collapse").slimScroll({height:"100%",railOpacity:.9}),$(".right-sidebar-toggle").click(function(){$("#right-sidebar").toggleClass("sidebar-open")}),$(".sidebar-container").slimScroll({height:"100%",railOpacity:.4,wheelStep:10}),$(".open-small-chat").click(function(){$(this).children().toggleClass("fa-comments").toggleClass("fa-remove"),$(".small-chat-box").toggleClass("active")}),$(".small-chat-box .content").slimScroll({height:"234px",railOpacity:.4}),$(".check-link").click(function(){var e=$(this).find("i"),a=$(this).next("span");return e.toggleClass("fa-check-square").toggleClass("fa-square-o"),a.toggleClass("todo-completed"),!1}),$(".navbar-minimalize").click(function(){$("body").toggleClass("mini-navbar"),e()}),$(".tooltip-demo").tooltip({selector:"[data-toggle=tooltip]",container:"body"}),$(".modal").appendTo("body"),fixHeight(),$(window).bind("load",function(){$("body").hasClass("fixed-sidebar")&&$(".sidebar-collapse").slimScroll({height:"100%",railOpacity:.9})}),$(window).scroll(function(){$(window).scrollTop()>0&&!$("body").hasClass("fixed-nav")?$("#right-sidebar").addClass("sidebar-top"):$("#right-sidebar").removeClass("sidebar-top")}),$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||fixHeight()}),$("[data-toggle=popover]").popover(),$("[data-toggle=tooltip]").tooltip(),$(".full-height-scroll").slimscroll({height:"100%"})}),$(window).bind("resize",function(){$(this).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")}),$(document).ready(function(){if(localStorageSupport){var e=localStorage.getItem("collapse_menu"),a=localStorage.getItem("fixedsidebar"),s=localStorage.getItem("fixednavbar"),i=localStorage.getItem("boxedlayout"),o=localStorage.getItem("fixedfooter"),n=$("body");"on"===a&&(n.addClass("fixed-sidebar"),$(".sidebar-collapse").slimScroll({height:"100%",railOpacity:.9})),"on"===e&&(n.hasClass("fixed-sidebar")?n.hasClass("body-small")||n.addClass("mini-navbar"):n.hasClass("body-small")||n.addClass("mini-navbar")),"on"===s&&($(".navbar-static-top").removeClass("navbar-static-top").addClass("navbar-fixed-top"),n.addClass("fixed-nav")),"on"===i&&n.addClass("boxed-layout"),"on"===o&&$(".footer").addClass("fixed")}}),$(document).ready(function(){var e=$(".sql-editor"),a=$(".file-upload");$("a#sql-editor").click(function(){e.css("display","block"),a.css("display","none"),$("#sqlEditor").css("height","240px")}),$("a#file-upload").click(function(){e.css("display","none"),a.css("display","block")});var s=ace.edit("sqlEditor");s.getSession().setMode("ace/mode/sql"),s.setTheme("ace/theme/merbivore_soft"),s.setShowPrintMargin(!1),s.setDisplayIndentGuides(!1),s.setHighlightActiveLine(!1),"undefined"!=typeof Storage&&localStorage.getItem("lastQuery")&&s.setValue(localStorage.getItem("lastQuery")),s.focus();var i=$("#grid");i.css("height","430px");var o=new Slick.Grid(i,[],[],{enableCellNavigation:!0,enableColumnReorder:!1,enableTextSelectionOnCells:!0});o.resizeCanvas()});