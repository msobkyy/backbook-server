"use strict";(self.webpackChunkbackbook=self.webpackChunkbackbook||[]).push([[462],{6039:function(e,n,t){t.d(n,{Z:function(){return v}});t(2791);var s=t(6709),i="CreatePost_create_post__vSpT6",a="CreatePost_header__bg+gP",r="CreatePost_open_post__+hbVZ",o="CreatePost_splitter__P+WMS",l="CreatePost_post_body__4fIya",c="CreatePost_createPost_icon__Fe4Ib",d=t(5736),u=t(9434),h=t(184);var v=function(e){var n=e.user,t=e.profile,v=(0,u.I0)(),m=(0,u.v9)((function(e){return e.createPost}));return(0,h.jsxs)("div",{className:i,children:[(0,h.jsxs)("div",{className:a,children:[(0,h.jsx)("img",{src:null===n||void 0===n?void 0:n.photo,alt:""}),(0,h.jsx)("div",{className:"".concat(r," hover2"),onClick:function(){v(d.bA())},children:m.postText?m.postText:" What's on your mind, ".concat(null===n||void 0===n?void 0:n.first_name)})]}),(0,h.jsx)("div",{className:o}),(0,h.jsxs)("div",{className:l,children:[(0,h.jsxs)("div",{className:"".concat(c," hover1"),children:[(0,h.jsx)(s.kL,{color:"#f3425f"}),"Live Video"]}),(0,h.jsxs)("div",{className:"".concat(c," hover1"),onClick:function(){v(d.bA("photo"))},children:[(0,h.jsx)(s.Pz,{color:"#4bbf67"}),"Photo/Video"]}),t?(0,h.jsxs)("div",{className:"createPost_icon hover1",children:[(0,h.jsx)("i",{className:"lifeEvent_icon"}),"Life Event"]}):(0,h.jsxs)("div",{className:"".concat(c," hover1"),children:[(0,h.jsx)(s.OH,{color:"#f7b928"}),"Feeling/Activity"]})]})]})}},3624:function(e,n,t){t.d(n,{i:function(){return d}});var s=t(1413),i=t(4165),a=t(5861),r=t(3418),o=t(2388),l=t(6260),c=function(){var e=(0,a.Z)((0,i.Z)().mark((function e(n){var t,s,a,r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.id,s=n.type,e.next=3,o.Z.put("".concat("","/api/v1/friends/").concat(s,"/").concat(t),{},{withCredentials:!0});case 3:return a=e.sent,r=a.data,e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),d=function(e){return(0,r.D)({mutationKey:"useRelationship",mutationFn:c,onSuccess:function(n){l.E.setQueryData(["getProfile",e],(function(e){if(!e)return e;var t=e;return t.data.friendship=n.data.friendship,e?(0,s.Z)((0,s.Z)({},e),{},{newData:t}):e}))}})}},6118:function(e,n,t){t.r(n),t.d(n,{default:function(){return bn}});var s=t(4165),i=t(5861),a=t(885),r=t(1413),o=t(2791),l="style_profile__YJVIr",c="style_wrapper__bWA1z",d="style_top__tKQ+3",u="style_header__CJGgX",h="style_content__JK8uj",v="style_info__-7OuX",m="style_photo_wrap__J9p-n",f="style_photo__IERyc",p="style_add_photo__QnkUA",x="style_name__xMjr9",_="style_friends__kC3gG",j="style_btns__GYceJ",g="style_no_posts__7SwdJ",N="style_profile_menu_wrap__F4dYb",b="style_profile_menu__rTcZ0",w="style_more__eIyUN",y="style_active__CN70C",C="style_bottom__9nGj4",Z="style_posts__CsM3O",k="style_details__YiaUr",S="style_details_con__gbYTX",D="style_card_header__QA7Ok",P="style_link__2gTWD",E="style_photos__dAjFH",F="style_photo_grid__GHkqW",R="style_friends_grid__tVNjJ",A="style_photo_card__7Ld29",I="style_friend_card__Va9-m",L="style_friend_name__Ux0dD",U="style_open_cover_menu__yXvRy",O="style_item__gMo6g",q="style_sk1__vY4Rm",z="style_loading__t5GR+",M=t(7689),W=t(5439),T=t(7858),H=t(2388),V=t(9434),J=t(1087),G=t(6709),X=t(184);function Y(){return(0,X.jsxs)("div",{className:N,children:[(0,X.jsxs)("div",{className:b,children:[(0,X.jsx)(J.rU,{to:"#",className:y,children:"Posts"}),(0,X.jsx)(J.rU,{to:"#",className:"hover1",children:"About"}),(0,X.jsx)(J.rU,{to:"#",className:"hover1",children:"Friends"}),(0,X.jsx)(J.rU,{to:"#",className:"hover1",children:"Photos"})]}),(0,X.jsx)("div",{className:w,children:(0,X.jsx)(G.bb,{})})]})}var K=t(6900),Q=t(3466),B=t(5039),$=t.n(B),ee=t(2579);var ne=function(e){var n=e.photosData,t=e.photosSkelton;return(0,X.jsxs)(Q.Z,{className:E,children:[(0,X.jsxs)("div",{className:D,children:["Photos",(0,X.jsx)(J.rU,{className:P,to:"#",children:"See all photos"})]}),(0,X.jsxs)("div",{className:h,children:[(0,X.jsx)("div",{className:v,children:t?(0,X.jsx)(ee.Z,{width:80,height:10}):"".concat(n.total_count," photos")}),t?(0,X.jsx)("div",{className:z,children:(0,X.jsx)($(),{color:"#1876f2",loading:t,size:40})}):(0,X.jsx)("div",{className:F,children:n.resources&&n.resources.slice(0,9).map((function(e){return(0,X.jsx)("div",{className:A,style:{backgroundImage:"url(".concat(e.url,")")}},e.id)}))})]})]})};var te=function(e){var n=e.userData,t=e.userFriends,s=e.photosSkelton;return(0,X.jsxs)(Q.Z,{children:[(0,X.jsxs)("div",{className:D,children:["Friends",(0,X.jsx)(J.rU,{className:P,to:"/friends/all",children:"See all Friends"})]}),(0,X.jsxs)("div",{className:h,children:[(0,X.jsx)("div",{className:v,children:s?(0,X.jsx)(ee.Z,{width:80,height:10}):"".concat(null===n||void 0===n?void 0:n.friendsCount," Friends")}),s?(0,X.jsx)("div",{className:z,children:(0,X.jsx)($(),{color:"#1876f2",loading:s,size:40})}):(0,X.jsx)("div",{className:R,children:t&&t.slice(0,9).map((function(e,n){return(0,X.jsxs)(J.rU,{to:"/profile/".concat(e.username),children:[(0,X.jsx)("div",{className:I,style:{backgroundImage:"url(".concat(e.photo,")")}}),(0,X.jsxs)("span",{className:L,children:[e.first_name," ",e.last_name," ",(null===e||void 0===e?void 0:e.confirmed)&&(0,X.jsx)("i",{style:{marginLeft:"5px"},className:"confirmed_comment_icon"})]})]},n)}))})]})]})},se=t(4050),ie=t(2483),ae="ProfilePhoto_wrap__eJGem",re="ProfilePhoto_card__MNiV0",oe="ProfilePhoto_header__QND9p",le="ProfilePhoto_content__W8Row",ce="ProfilePhoto_textarea_blue__SNsKf",de="ProfilePhoto_crooper__waPrx",ue="ProfilePhoto_slider__vGg4f",he="ProfilePhoto_btns__F45kj",ve="ProfilePhoto_old_photos__tpMXu",me=t(7005),fe=function(e){return new Promise((function(n,t){var s=new Image;s.addEventListener("load",(function(){return n(s)})),s.addEventListener("error",(function(e){return t(e)})),s.setAttribute("crossOrigin","anonymous"),s.src=e}))};function pe(e){return e*Math.PI/180}function xe(e,n,t){var s=pe(t);return{width:Math.abs(Math.cos(s)*e)+Math.abs(Math.sin(s)*n),height:Math.abs(Math.sin(s)*e)+Math.abs(Math.cos(s)*n)}}function _e(e,n){return je.apply(this,arguments)}function je(){return je=(0,i.Z)((0,s.Z)().mark((function e(n,t){var i,a,r,o,l,c,d,u,h,v,m=arguments;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=m.length>2&&void 0!==m[2]?m[2]:0,a=m.length>3&&void 0!==m[3]?m[3]:{horizontal:!1,vertical:!1},e.next=4,fe(n);case 4:if(r=e.sent,o=document.createElement("canvas"),l=o.getContext("2d")){e.next=9;break}return e.abrupt("return",null);case 9:return c=pe(i),d=xe(r.width,r.height,i),u=d.width,h=d.height,o.width=u,o.height=h,l.translate(u/2,h/2),l.rotate(c),l.scale(a.horizontal?-1:1,a.vertical?-1:1),l.translate(-r.width/2,-r.height/2),l.drawImage(r,0,0),v=l.getImageData(t.x,t.y,t.width,t.height),o.width=t.width,o.height=t.height,l.putImageData(v,0,0),e.abrupt("return",new Promise((function(e,n){o.toBlob((function(n){e(URL.createObjectURL(n))}),"image/jpeg")})));case 23:case"end":return e.stop()}}),e)}))),je.apply(this,arguments)}var ge=t(3418),Ne=t(9571),be=t(1656),we=t(4150);var ye=function(e){var n=e.showProfilePhoto,t=e.setShowProfilePhoto,r=e.pRef,l=e.photosData,c=(0,V.I0)(),d=(0,o.useState)(null),u=(0,a.Z)(d,2),h=u[0],v=u[1],m=(0,o.useState)(""),f=(0,a.Z)(m,2),p=f[0],x=f[1],_=(0,o.useState)({x:0,y:0}),j=(0,a.Z)(_,2),g=j[0],N=j[1],b=(0,o.useState)(1),w=(0,a.Z)(b,2),y=w[0],C=w[1],Z=(0,o.useState)(null),k=(0,a.Z)(Z,2),S=k[0],D=k[1],P=(0,o.useRef)(null),E=(0,o.useRef)(null),F=(0,o.useRef)(null);(0,Ne.Z)(F,n,(function(){t(!1)}));var R=(0,o.useCallback)(function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_e(h,S);case 3:if(t=e.sent,!n){e.next=10;break}C(1),N({x:0,y:0}),v(t),e.next=11;break;case 10:return e.abrupt("return",t);case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(n){return e.apply(this,arguments)}}(),[S]),A=(0,o.useCallback)((function(e,n){D(n)}),[]),I=(0,ge.D)({mutationFn:function(e){return H.Z.post("".concat("","/api/v1/users/update/profile/photo"),e,{withCredentials:!0})}}),L=I.data,U=I.isLoading,O=I.isSuccess,q=(I.error,I.mutate),z=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var n,t,i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R(!1);case 3:return n=e.sent,e.next=6,fetch(n).then((function(e){return e.blob()}));case 6:t=e.sent,(i=new FormData).append("photo",t),i.append("text",p),q(i),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){var e;O&&"success"===(null===L||void 0===L||null===(e=L.data)||void 0===e?void 0:e.status)&&(r.current.src=L.data.data.url,c((0,we.Hh)(L.data.data.url)),setTimeout((function(){t(!1)}),200))}),[L,O]),(0,X.jsx)(ie.Z,{children:(0,X.jsx)("div",{className:"".concat(ae," blur"),children:(0,X.jsxs)(Q.Z,{className:re,innerRef:F,children:[(0,X.jsx)("input",{type:"file",ref:E,hidden:!0,onChange:function(e){var n=e.target.files[0];if(("image/jpeg"===n.type||"image/png"===n.type||"image/webp"===n.type||"image/gif"===n.type)&&!(n.size>5242880)){var t=new FileReader;t.readAsDataURL(n),t.onload=function(e){v(e.target.result)}}},accept:"image/jpeg,image/png,image/webp,image/gif"}),(0,X.jsxs)("div",{className:oe,children:["Update profile picture",(0,X.jsx)("div",{className:"small_circle",onClick:function(){return t(!1)},children:(0,X.jsx)("i",{className:"exit_icon"})})]}),(0,X.jsx)("div",{className:le,children:h?(0,X.jsxs)(be.Z,{loading:U,children:[(0,X.jsx)("textarea",{style:{fontSize:"".concat(p&&p.length>75?"15px":""),direction:"".concat((0,se.Z)(p)?"rtl":"ltr")},placeholder:"Description",value:p,onChange:function(e){return x(e.target.value)},className:ce}),(0,X.jsx)("div",{className:de,children:(0,X.jsx)(me.ZP,{image:h,crop:g,zoom:y,cropShape:"round",aspect:1,onCropChange:N,onCropComplete:A,onZoomChange:C})}),(0,X.jsxs)("div",{className:ue,children:[(0,X.jsx)("div",{className:"small_circle hover1",onClick:function(){return P.current.stepDown(),void C(P.current.value)},children:(0,X.jsx)("i",{className:"minus_icon"})}),(0,X.jsx)("input",{ref:P,type:"range",value:y,min:1,max:3,step:.1,"aria-labelledby":"Zoom",onChange:function(e){C(e.target.value)},className:"zoom-range"}),(0,X.jsx)("div",{className:"small_circle hover1",onClick:function(){return P.current.stepUp(),void C(P.current.value)},children:(0,X.jsx)("i",{className:"plus_icon"})})]}),(0,X.jsxs)("div",{className:he,children:[(0,X.jsx)("button",{className:"gray_btn",onClick:function(){return t(!1)},children:"Cancel"}),(0,X.jsx)("button",{className:"btn_blue",onClick:function(){return z()},children:"Save"})]})]}):(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)("button",{className:"light_blue_btn",onClick:function(){return E.current.click()},children:[(0,X.jsx)("i",{className:"plus_icon filter_blue"}),"Upload photo"]}),(null===l||void 0===l?void 0:l.profilePhotos.length)>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)("div",{children:"Choose from old profile picture"}),(0,X.jsx)("div",{className:ve,children:null===l||void 0===l?void 0:l.profilePhotos.map((function(e){return(0,X.jsx)("img",{src:e.url,alt:e.id,onClick:function(){return v(e.url)}},e.id)}))})]}),(null===l||void 0===l?void 0:l.resources.length)>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)("div",{children:"Choose from your profile photos"}),(0,X.jsx)("div",{className:ve,children:null===l||void 0===l?void 0:l.resources.map((function(e){return(0,X.jsx)("img",{src:e.url,alt:e.id,onClick:function(){return v(e.url)}},e.id)}))})]})]})})]})})})},Ce="Cover_cover__F-yc4",Ze="Cover_edit_cover_wrapper__gxhlW",ke="Cover_edit_cover__Hl5bl",Se="Cover_cover_upload_menu__a3dOG",De="Cover_open_cover_menu_item__GabWJ",Pe="Cover_cover_cropper__oNvzM",Ee="Cover_mediaClassName__c8Wcb",Fe="Cover_save_cover__tHk+o",Re="Cover_btns__LNxk+",Ae="Cover_left__s9LSP",Ie="OldCovers_wrap__y9XEz",Le="OldCovers_card__Ae3Hw",Ue="OldCovers_header__UR7H3",Oe="OldCovers_content__n2Qkv",qe="OldCovers_old_photos__GuKeX";var ze=function(e){var n=e.setShowOldCover,t=e.setImage,s=e.photosData,i=e.showOldCover,a=(0,o.useRef)(null);return(0,Ne.Z)(a,i,(function(){n(!1)})),(0,X.jsx)("div",{className:"".concat(Ie," blur"),children:(0,X.jsxs)(Q.Z,{className:Le,innerRef:a,children:[(0,X.jsxs)("div",{className:Ue,children:["Update Cover Photo",(0,X.jsx)("div",{className:"small_circle",onClick:function(){return n(!1)},children:(0,X.jsx)("i",{className:"exit_icon"})})]}),(0,X.jsxs)("div",{className:Oe,children:[(null===s||void 0===s?void 0:s.profileCovers.length)>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)("div",{children:"Choose from old cover picture"}),(0,X.jsx)("div",{className:qe,children:null===s||void 0===s?void 0:s.profileCovers.map((function(e){return(0,X.jsx)("img",{src:e.url,alt:e.id,onClick:function(){t(e.url),n(!1)}},e.id)}))})]}),(null===s||void 0===s?void 0:s.resources.length)>0&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)("div",{children:"Choose from your profile photos"}),(0,X.jsx)("div",{className:qe,children:null===s||void 0===s?void 0:s.resources.map((function(e){return(0,X.jsx)("img",{src:e.url,alt:e.id,onClick:function(){t(e.url),n(!1)}},e.id)}))})]})]})]})})};var Me=function(e){var n=e.isVisitor,t=e.user,r=e.photosData,l=(0,V.I0)(),c=(0,o.useState)(!1),d=(0,a.Z)(c,2),u=d[0],h=d[1],v=(0,o.useState)(!1),m=(0,a.Z)(v,2),f=m[0],p=m[1],x=(0,o.useRef)(),_=(0,o.useState)(null),j=(0,a.Z)(_,2),g=j[0],N=j[1],b=(0,o.useRef)(null),w=(0,o.useRef)(null),y=(0,o.useState)({x:0,y:0}),C=(0,a.Z)(y,2),Z=C[0],k=C[1],S=(0,o.useState)(1),D=(0,a.Z)(S,2),P=D[0],E=D[1],F=(0,o.useState)(null),R=(0,a.Z)(F,2),A=R[0],I=R[1],L=(0,o.useState)(),U=(0,a.Z)(L,2),O=U[0],q=U[1],z=(0,o.useState)(),M=(0,a.Z)(z,2),W=M[0],T=M[1];(0,o.useEffect)((function(){q(w.current.clientWidth),T(w.current.clientHeight)}),[window.innerWidth]),(0,o.useEffect)((function(){document.documentElement.style.overflow=f?"hidden":"auto"}),[f]);var J=(0,o.useCallback)(function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,_e(g,A);case 3:if(t=e.sent,!n){e.next=10;break}E(1),k({x:0,y:0}),N(t),e.next=11;break;case 10:return e.abrupt("return",t);case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(n){return e.apply(this,arguments)}}(),[A]),G=(0,o.useCallback)((function(e,n){I(n)}),[]),Y=(0,ge.D)({mutationFn:function(e){return H.Z.post("".concat("","/api/v1/users/update/profile/cover"),e,{withCredentials:!0})}}),K=Y.data,B=Y.isLoading,$=Y.isSuccess,ee=Y.mutate,ne=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var n,t,i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,J(!1);case 3:return n=e.sent,e.next=6,fetch(n).then((function(e){return e.blob()}));case 6:t=e.sent,(i=new FormData).append("photo",t),ee(i),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){var e;$&&"success"===(null===K||void 0===K||null===(e=K.data)||void 0===e?void 0:e.status)&&(w.current.style.backgroundImage="url(".concat(K.data.data.url,")"),l((0,we.n$)(K.data.data.url)),setTimeout((function(){N(null)}),200))}),[K,$]),(0,Ne.Z)(x,u,(function(){h(!1)})),(0,X.jsxs)("div",{className:Ce,ref:w,style:{backgroundImage:"".concat(B?"":"url(".concat(t.cover,")"))},children:[g&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)("div",{className:Fe,children:[(0,X.jsxs)("div",{className:Ae,children:[(0,X.jsx)("i",{className:"public_icon"}),"Your cover is public"]}),(0,X.jsxs)("div",{className:Re,children:[(0,X.jsx)("button",{className:"gray_btn opacity_btn",onClick:function(){return N(null)},children:"Cancel"}),(0,X.jsx)("button",{className:"btn_blue ",onClick:function(){return ne()},children:"Save"})]})]}),(0,X.jsx)(be.Z,{loading:B,children:(0,X.jsx)("div",{className:Pe,children:(0,X.jsx)(me.ZP,{classes:{mediaClassName:Ee},image:g,crop:Z,zoom:P,aspect:O/W,onCropChange:k,onCropComplete:G,onZoomChange:E,showGrid:!0,objectFit:"horizontal-cover"})})})]}),!n&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)("div",{className:Ze,children:[(0,X.jsx)("input",{type:"file",ref:b,hidden:!0,onChange:function(e){var n=e.target.files[0];if(("image/jpeg"===n.type||"image/png"===n.type||"image/webp"===n.type||"image/gif"===n.type)&&!(n.size>5242880)){var t=new FileReader;t.readAsDataURL(n),t.onload=function(e){N(e.target.result)}}},accept:"image/jpeg,image/png,image/webp,image/gif"}),(0,X.jsxs)("div",{className:ke,onClick:function(){return h((function(e){return!e}))},children:[(0,X.jsx)("i",{className:"camera_filled_icon"}),(0,X.jsx)("span",{children:"Add Cover Photo"})]}),u&&(0,X.jsxs)(Q.Z,{className:Se,innerRef:x,children:[(0,X.jsxs)("div",{className:"".concat(De," hover1"),onClick:function(){return p(!0)},children:[(0,X.jsx)("i",{className:"photo_icon"}),"Select Photo"]}),(0,X.jsxs)("div",{className:"".concat(De," hover1"),onClick:function(){return b.current.click()},children:[(0,X.jsx)("i",{className:"upload_icon"}),"Upload Photo"]})]})]}),f&&(0,X.jsx)(ze,{showOldCover:f,setShowOldCover:p,setImage:N,photosData:r})]})]})},We=t(4942),Te="intro_card_header__xDi0p",He="intro_content__JnH7b",Ve="intro_info_profile__N4q3L",Je="intro_bio__726Eq",Ge="intro_edit_btn__EHuXJ",Xe="intro_bio_wrap__eWXcX",Ye="intro_textarea_blue__dI2wS",Ke="intro_remaining__2va6z",Qe="intro_save_btns__LTvJn",Be="intro_select_rel__dfJNz";var $e=function(e){var n=e.innerRef,t=e.infos,s=e.handleChange,i=e.setShow,a=e.max,r=e.remain,l=e.updateDetails,c=e.details,d=e.name,u=e.placeholder,h=e.rel,v=!h&&(null===c||void 0===c?void 0:c[d])===(null===t||void 0===t?void 0:t[d]),m=(0,o.useRef)(null);return(0,o.useEffect)((function(){m.current.focus()}),[]),(0,X.jsxs)("div",{className:Xe,ref:n,children:[h?(0,X.jsxs)("select",{ref:m,className:Be,name:d,value:t.relationship,onChange:s,children:[(0,X.jsx)("option",{value:"",disabled:!0,defaultValue:!0,children:"Select status"}),(0,X.jsx)("option",{value:"Single",children:"Single"}),(0,X.jsx)("option",{value:"In a realationship",children:"In a relationship"}),(0,X.jsx)("option",{value:"Married",children:"Married"}),(0,X.jsx)("option",{value:"Divorced",children:"Divorced"}),(0,X.jsx)("option",{value:"",children:"Remove relationship"})]}):(0,X.jsx)("textarea",{ref:m,style:{fontSize:"".concat(null!==t&&void 0!==t&&t[d]&&(null===t||void 0===t?void 0:t[d].length)>75?"15px":""),direction:"".concat((0,se.Z)(null===t||void 0===t?void 0:t[d])?"rtl":"ltr")},placeholder:u,value:null===t||void 0===t?void 0:t[d],onChange:s,className:Ye,maxLength:a,name:d}),"bio"===d&&(0,X.jsxs)("div",{className:Ke,children:[r," characters remaining"]}),(0,X.jsxs)("div",{className:Qe,children:[(0,X.jsx)("button",{className:"gray_btn",onClick:function(){return i(!1)},children:"Cancel"}),(0,X.jsx)("button",{disabled:v,className:v?"gray_btn":"btn_blue",onClick:function(){l(),i(!1)},style:{color:"".concat(v?"#bcc0c4":"#fff"),cursor:"".concat(v?"not-allowed":"pointer")},children:"Save"})]})]})},en="EditDetails_wrap__cLwmi",nn="EditDetails_card__PtXoi",tn="EditDetails_header__ur9Qe",sn="EditDetails_content__8El4t",an="EditDetails_h_col__+8-e+",rn="EditDetails_t1__xS4yC",on="EditDetails_t2__9VYc1",ln="EditDetails_details_header__PV56U",cn="EditDetails_add_details_flex__gIDqh",dn="EditDetails_info_profile__IYuIK",un="EditDetails_underline__ivT8S";var hn=function(e){var n=e.img,t=e.value,s=e.placeholder,i=e.name,r=e.handleChange,l=e.updateDetails,c=e.infos,d=e.text,u=e.max,h=e.details,v=e.rel,m=(0,o.useState)(!1),f=(0,a.Z)(m,2),p=f[0],x=f[1],_=(0,o.useRef)(null);return(0,Ne.Z)(_,p,(function(){x(!1)})),(0,X.jsxs)("div",{children:[(0,X.jsx)("div",{className:cn,onClick:function(){return x(!0)},ref:_,children:t?(0,X.jsxs)("div",{className:dn,children:[(0,X.jsx)("img",{src:"../../../icons/".concat(n,".png"),alt:""}),t,(0,X.jsx)("i",{className:"edit_icon",style:{marginLeft:"auto"}})]}):(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)("i",{className:"rounded_plus_icon"}),(0,X.jsxs)("span",{className:un,children:["Add ",d]})]})}),p&&(0,X.jsx)($e,{innerRef:_,placeholder:s,name:i,handleChange:r,updateDetails:l,infos:c,details:h,setShow:x,max:u,rel:v})]})};var vn=function(e){var n=e.showEdit,t=e.setShowEdit,s=e.infos,i=e.handleChange,a=e.updateDetails,r=e.details,l=(0,o.useRef)(null);return(0,Ne.Z)(l,n,(function(){t(!1)})),(0,X.jsx)(ie.Z,{children:(0,X.jsx)("div",{className:"".concat(en," blur"),children:(0,X.jsxs)(Q.Z,{className:nn,innerRef:l,children:[(0,X.jsxs)("div",{className:tn,children:["Edit Details",(0,X.jsx)("div",{className:"small_circle",onClick:function(){return t(!1)},children:(0,X.jsx)("i",{className:"exit_icon"})})]}),(0,X.jsx)("div",{className:sn,children:(0,X.jsxs)("div",{className:an,children:[(0,X.jsx)("span",{className:rn,children:"Customize your intro"}),(0,X.jsx)("span",{className:on,children:"Details you select will be public."}),(0,X.jsx)("div",{className:ln,children:"Other Name"}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.otherName,img:"studies",placeholder:"Add other name",name:"otherName",text:"Other Name",handleChange:i,updateDetails:a,infos:s,details:r,max:20}),(0,X.jsx)("div",{className:ln,children:"Work"}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.job,img:"job",placeholder:"Add a job",name:"job",text:"A job",handleChange:i,updateDetails:a,infos:s,details:r,max:20}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.workplace,img:"job",placeholder:"Add a workplace",name:"workplace",text:"A workplace",handleChange:i,updateDetails:a,infos:s,details:r,max:20}),(0,X.jsx)("div",{className:ln,children:"Education"}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.highSchool,img:"studies",placeholder:"Add a high School",name:"highSchool",text:"A highSchool",handleChange:i,updateDetails:a,infos:s,details:r,max:20}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.college,img:"studies",placeholder:"Add a college",name:"college",text:"A college",handleChange:i,updateDetails:a,infos:s,details:r,max:20}),(0,X.jsx)("div",{className:ln,children:"Current City"}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.currentCity,img:"home",placeholder:"Add a current city",name:"currentCity",text:"A current city",handleChange:i,updateDetails:a,infos:s,details:r,max:20}),(0,X.jsx)("div",{className:ln,children:"Hometown"}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.homeTown,img:"from",placeholder:"Add a hometown",name:"homeTown",text:"A hometown",handleChange:i,updateDetails:a,infos:s,details:r,max:20}),(0,X.jsx)("div",{className:ln,children:"Relationship"}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.relationship,img:"relationship",placeholder:"Add a relationship",name:"relationship",text:"A relationship",handleChange:i,updateDetails:a,infos:s,details:r,max:20,rel:!0}),(0,X.jsx)("div",{className:ln,children:"Instagram"}),(0,X.jsx)(hn,{value:null===r||void 0===r?void 0:r.instagram,img:"instagram",placeholder:"Add a instagram",name:"instagram",text:"A instagram",handleChange:i,updateDetails:a,infos:s,details:r,max:20})]})})]})})})},mn=t(6260);var fn=function(e){var n=e.userData,t=e.isVisitor,s=e.showEdit,i=e.setShowEdit,l=e.profileSkelton,c=null===n||void 0===n?void 0:n.details,d=(0,o.useState)(c),u=(0,a.Z)(d,2),h=u[0],v=u[1],m=(0,o.useState)(c),f=(0,a.Z)(m,2),p=f[0],x=f[1],_=(0,o.useState)(!1),j=(0,a.Z)(_,2),g=j[0],N=j[1],b=(0,o.useState)(null!==p&&void 0!==p&&p.bio?100-(null===p||void 0===p?void 0:p.bio.length):100),w=(0,a.Z)(b,2),y=w[0],C=w[1],Z=(0,ge.D)({mutationKey:"updateDetails",mutationFn:function(){return H.Z.put("".concat("","/api/v1/users/update/profile/details"),{infos:p},{withCredentials:!0})},onSuccess:function(e){mn.E.setQueryData(["getProfile",n.username],(function(n){var t=n;return t.data.user.details=e.data.data.details,n?(0,r.Z)((0,r.Z)({},n),{},{newData:t}):n}))}}),k=Z.data,S=Z.isSuccess,D=Z.mutate,P=function(){D()};return(0,o.useEffect)((function(){v(c),x(c),C(null!==c&&void 0!==c&&c.bio?100-(null===c||void 0===c?void 0:c.bio.length):100)}),[c]),(0,o.useEffect)((function(){var e;S&&"success"===(null===k||void 0===k||null===(e=k.data)||void 0===e?void 0:e.status)&&(v(k.data.data.details),x(k.data.data.details),setTimeout((function(){N(!1)}),500))}),[k,S]),(0,o.useEffect)((function(){document.documentElement.style.overflow=s?"hidden":"auto"}),[s]),(0,X.jsxs)(Q.Z,{children:[(0,X.jsx)("div",{className:Te,children:"Intro"}),l?(0,X.jsx)(ee.Z,{count:3,height:20,width:"100%"}):(0,X.jsxs)("div",{className:He,children:[(null===h||void 0===h?void 0:h.bio)&&!g&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)("div",{className:Je,style:{direction:"".concat((0,se.Z)(null===h||void 0===h?void 0:h.bio)?"rtl":"ltr")},children:null===h||void 0===h?void 0:h.bio}),t&&(0,X.jsx)("div",{className:"line-spliter"})]}),g&&(0,X.jsx)($e,{remain:y,infos:p,details:h,handleChange:function(e){var n=e.target,t=n.name,s=n.value;x((0,r.Z)((0,r.Z)({},p),{},(0,We.Z)({},t,s.replace(/(^[ \t]*\n)/gm,"")))),C(100-e.target.value.length)},setShow:N,updateDetails:P,name:"bio",placeholder:"Describe who you are",max:100}),!t&&!g&&(0,X.jsxs)("button",{className:"gray_btn ".concat(Ge),onClick:function(){return N((function(e){return!e}))},children:[null!==h&&void 0!==h&&h.bio?"Edit":"Add"," Bio"]}),((null===h||void 0===h?void 0:h.job)||(null===h||void 0===h?void 0:h.workplace))&&(0,X.jsxs)("div",{className:Ve,children:[(0,X.jsx)("img",{src:"../../../icons/job.png",alt:""}),(0,X.jsxs)("span",{children:["works",(null===h||void 0===h?void 0:h.job)&&(0,X.jsxs)("span",{children:[" as ",null===h||void 0===h?void 0:h.job]}),(null===h||void 0===h?void 0:h.workplace)&&(0,X.jsxs)("span",{children:[" ","at ",(0,X.jsx)("b",{children:null===h||void 0===h?void 0:h.workplace})]})]})]}),(null===h||void 0===h?void 0:h.relationship)&&(0,X.jsxs)("div",{className:Ve,children:[(0,X.jsx)("img",{src:"../../../icons/relationship.png",alt:""}),null===h||void 0===h?void 0:h.relationship]}),(null===h||void 0===h?void 0:h.college)&&(0,X.jsxs)("div",{className:Ve,children:[(0,X.jsx)("img",{src:"../../../icons/studies.png",alt:""}),"studied at ",null===h||void 0===h?void 0:h.college]}),(null===h||void 0===h?void 0:h.highSchool)&&(0,X.jsxs)("div",{className:Ve,children:[(0,X.jsx)("img",{src:"../../../icons/studies.png",alt:""}),"studied at ",null===h||void 0===h?void 0:h.highSchool]}),(null===h||void 0===h?void 0:h.currentCity)&&(0,X.jsxs)("div",{className:Ve,children:[(0,X.jsx)("img",{src:"../../../icons/home.png",alt:""}),"Lives in ",null===h||void 0===h?void 0:h.currentCity]}),(null===h||void 0===h?void 0:h.homeTown)&&(0,X.jsxs)("div",{className:Ve,children:[(0,X.jsx)("img",{src:"../../../icons/from.png",alt:""}),"From ",null===h||void 0===h?void 0:h.homeTown]}),(null===h||void 0===h?void 0:h.instagram)&&(0,X.jsxs)("div",{className:Ve,children:[(0,X.jsx)("img",{src:"../../../icons/instagram.png",alt:""}),(0,X.jsx)("a",{href:"https://www.instagram.com/".concat(null===h||void 0===h?void 0:h.instagram),target:"_blank",rel:"noreferrer",children:null===h||void 0===h?void 0:h.instagram})]}),(null===n||void 0===n?void 0:n.createdAt)&&(0,X.jsxs)("div",{className:Ve,children:[(0,X.jsx)("img",{width:20,src:"../../../icons/join.png",alt:"joindAT"}),"Joined"," ",new Date(null===n||void 0===n?void 0:n.createdAt).toLocaleString("default",{month:"long",year:"numeric",day:"numeric"})]}),!t&&(0,X.jsx)("button",{className:"gray_btn ".concat(Ge),onClick:function(){return i((function(e){return!e}))},children:"Edit Details"}),s&&(0,X.jsx)(vn,{showEdit:s,setShowEdit:i,infos:p,handleChange:function(e){var n=e.target,t=n.name,s=n.value;x((0,r.Z)((0,r.Z)({},p),{},(0,We.Z)({},t,s)))},updateDetails:P,details:h})]})]})};function pn(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}var xn=t(3624);var _n=function(e){var n=e.friendship,t=e.userID,s=e.usernameID,i=(0,o.useState)(n),r=(0,a.Z)(i,2),l=r[0],c=r[1],d=(0,o.useState)(!1),u=(0,a.Z)(d,2),h=u[0],v=u[1],m=(0,o.useState)(!1),f=(0,a.Z)(m,2),p=f[0],x=f[1],_=(0,o.useRef)(null),g=(0,o.useRef)(null);(0,Ne.Z)(_,h,(function(){v(!1)})),(0,Ne.Z)(g,p,(function(){x(!1)}));var N=(0,xn.i)(s),b=N.mutate,w=N.data,y=N.isSuccess,C=function(){b({id:t,type:"unfollow"})},Z=function(){b({id:t,type:"follow"})},k=function(){b({id:l.requestID,type:"cancel"})};return(0,o.useEffect)((function(){y&&c(w.data.friendship)}),[w]),(0,o.useEffect)((function(){c(n)}),[n]),(0,X.jsxs)("div",{className:j,children:[null!==l&&void 0!==l&&l.friends?(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)("button",{className:"gray_btn",onClick:function(){return v((function(e){return!e}))},children:[(0,X.jsx)("img",{src:"../../../icons/friends.png",alt:""}),(0,X.jsx)("span",{children:"Friends"})]}),h&&(0,X.jsxs)(Q.Z,{className:U,innerRef:_,children:[null!==l&&void 0!==l&&l.following?(0,X.jsxs)("div",{className:"".concat(O," hover1"),onClick:function(){return C()},children:[(0,X.jsx)("img",{src:"../../../icons/unfollowOutlined.png",alt:""}),"Unfollow"]}):(0,X.jsxs)("div",{className:"".concat(O," hover1"),onClick:function(){return Z()},children:[(0,X.jsx)("img",{src:"../../../icons/unfollowOutlined.png",alt:""}),"Follow"]}),(0,X.jsxs)("div",{className:"".concat(O," hover1"),onClick:function(){b({id:l.requestID,type:"remove"})},children:[(0,X.jsx)("i",{className:"unfriend_outlined_icon"}),"Unfriend"]})]})]}):!(null!==l&&void 0!==l&&l.requestSent)&&!(null!==l&&void 0!==l&&l.requestReceived)&&(0,X.jsxs)("button",{className:"btn_blue",onClick:function(){b({id:t,type:"add"})},children:[(0,X.jsx)("img",{src:"../../../icons/addFriend.png",alt:"",className:"invert"}),(0,X.jsx)("span",{children:"Add Friend"})]}),null!==l&&void 0!==l&&l.requestSent?(0,X.jsxs)("button",{className:"btn_blue",onClick:function(){return k()},children:[(0,X.jsx)("img",{src:"../../../icons/cancelRequest.png",className:"invert",alt:""}),(0,X.jsx)("span",{children:"Cancel Request"})]}):(null===l||void 0===l?void 0:l.requestReceived)&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsxs)("button",{className:"gray_btn",onClick:function(){return x((function(e){return!e}))},children:[(0,X.jsx)("img",{src:"../../../icons/friends.png",alt:""}),(0,X.jsx)("span",{children:"Respond"})]}),p&&(null===l||void 0===l?void 0:l.requestReceived)&&(0,X.jsxs)(Q.Z,{className:U,innerRef:g,children:[(0,X.jsx)("div",{className:"".concat(O," hover1"),onClick:function(){b({id:l.requestID,type:"acceptRequest"})},children:"Confirm"}),(0,X.jsx)("div",{className:"".concat(O," hover1"),onClick:function(){return k()},children:"Delete"})]})]}),null!==l&&void 0!==l&&l.following?(0,X.jsxs)("button",{className:"gray_btn",onClick:function(){return C()},children:[(0,X.jsx)("img",{src:"../../../icons/follow.png",alt:""}),(0,X.jsx)("span",{children:"Following"})]}):(0,X.jsxs)("button",{className:"btn_blue",onClick:function(){return Z()},children:[(0,X.jsx)("img",{src:"../../../icons/follow.png",className:"invert",alt:""}),(0,X.jsx)("span",{children:"Follow"})]})]})},jn=t(9348),gn=t(6039),Nn=t(7237);var bn=function(){var e,n,t,N,b,w,y=(0,V.v9)((function(e){return(0,r.Z)({},e.user.userinfo)})),D=(0,M.s0)(),P=(0,o.useState)(!1),E=(0,a.Z)(P,2),F=E[0],R=E[1],A=(0,o.useState)(),I=(0,a.Z)(A,2),L=I[0],U=I[1],O=(0,o.useState)(!1),z=(0,a.Z)(O,2),J=z[0],G=z[1],B=(0,M.UO)().username,$=(0,o.useRef)(null),se=(0,o.useRef)(null),ie=B||y.username,ae=!(ie===y.username),re=function(){var e=(0,o.useState)(pn()),n=(0,a.Z)(e,2),t=n[0],s=n[1];return(0,o.useEffect)((function(){function e(){s(pn())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),t}().height,oe=(0,jn.YD)(),le=oe.ref,ce=oe.inView,de=(0,W.a)({queryKey:["getProfile",ie],queryFn:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var n,t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.Z.get("".concat("","/api/v1/users/getProfile/").concat(ie,"?sort=-createdAt&limit=10"),{withCredentials:!0});case 2:return n=e.sent,t=n.data,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),refetchOnWindowFocus:!1}),ue=de.isLoading,he=de.isError,ve=de.data,me=de.isFetching,fe=de.refetch,pe=(0,W.a)({queryKey:["getPhotos",ie],queryFn:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var n,t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.Z.get("".concat("","/api/v1/users/getProfile/").concat(ie,"/photos"),{withCredentials:!0});case 2:return n=e.sent,t=n.data,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),refetchOnWindowFocus:!1}),xe=pe.isLoading,_e=pe.isError,je=pe.data,ge=pe.isFetching,Ne=pe.refetch,be=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(n){var t,i,a,r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.pageParam,i=void 0===t?1:t,e.next=3,H.Z.get("".concat("","/api/v1/users/getProfile/").concat(ie,"/posts?sort=-createdAt&limit=10&page=").concat(i),{withCredentials:!0});case 3:return a=e.sent,r=a.data,e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),we=(0,T.N)({queryKey:["getProfilePosts",ie],queryFn:be,getNextPageParam:function(e,n){return e.length<10?void 0:n.length+1},refetchOnWindowFocus:!1}),Ze=we.isLoading,ke=we.isSuccess,Se=we.data,De=we.isError,Pe=we.fetchNextPage,Ee=we.hasNextPage,Fe=we.isFetchingNextPage,Re=we.isFetching,Ae=null===ve||void 0===ve||null===(e=ve.data)||void 0===e?void 0:e.user,Ie=null===ve||void 0===ve||null===(n=ve.data)||void 0===n?void 0:n.friends,Le=null===ve||void 0===ve||null===(t=ve.data)||void 0===t?void 0:t.friendship,Ue=ue||me,Oe=xe||ge,qe=Ze||Re;return(0,o.useEffect)((function(){fe(),Ne()}),[ie]),(0,o.useEffect)((function(){document.documentElement.style.overflow=F?"hidden":"auto"}),[F]),(0,o.useEffect)((function(){ce&&Pe()}),[ce]),(0,o.useEffect)((function(){var e;U(null===(e=se.current)||void 0===e?void 0:e.clientHeight)}),[null===(N=se.current)||void 0===N?void 0:N.clientHeight,ve,je]),(0,o.useEffect)((function(){(he||_e||De)&&D("/404")}),[he,_e,De]),(0,X.jsxs)("div",{className:l,children:[(0,X.jsx)("div",{className:d,children:(0,X.jsxs)("div",{className:c,children:[(0,X.jsxs)("div",{className:u,children:[Ue?(0,X.jsx)(ee.Z,{className:Ce,style:{transform:"translateY(-15px)"}}):(0,X.jsx)(Me,{profileSkelton:Ue,isVisitor:ae,user:Ae,photosData:null===je||void 0===je?void 0:je.data}),(0,X.jsxs)("div",{className:h,children:[(0,X.jsx)("div",{className:m,children:(0,X.jsxs)("div",{className:f,children:[Ue?(0,X.jsx)(ee.Z,{width:"168px",height:"168px",circle:!0,containerClassName:"avatar-skeleton"}):(0,X.jsx)("img",{src:null===Ae||void 0===Ae?void 0:Ae.photo,alt:null===Ae||void 0===Ae?void 0:Ae.first_name,ref:$}),!ae&&!Ue&&(0,X.jsxs)(X.Fragment,{children:[(0,X.jsx)("div",{className:"".concat(p," small_circle hover1"),onClick:function(){return R((function(e){return!e}))},children:(0,X.jsx)("i",{className:"camera_filled_icon"})}),F&&(0,X.jsx)(ye,{setShowProfilePhoto:R,showProfilePhoto:F,pRef:$,photosData:null===je||void 0===je?void 0:je.data})]})]})}),(0,X.jsxs)("div",{className:v,children:[Ue?(0,X.jsxs)("div",{className:q,children:[(0,X.jsx)(ee.Z,{width:220,height:25}),(0,X.jsx)(ee.Z,{width:80,height:15})]}):(0,X.jsxs)("h1",{className:x,children:["".concat(null===Ae||void 0===Ae?void 0:Ae.first_name," ").concat(null===Ae||void 0===Ae?void 0:Ae.last_name),(null===Ae||void 0===Ae?void 0:Ae.confirmed)&&(0,X.jsx)("i",{style:{marginLeft:"10px"},className:"confirmed_icon"}),(null===Ae||void 0===Ae||null===(b=Ae.details)||void 0===b?void 0:b.otherName)&&(0,X.jsx)("span",{children:"(".concat(null===Ae||void 0===Ae||null===(w=Ae.details)||void 0===w?void 0:w.otherName,")")})]}),Ue?(0,X.jsx)(ee.Z,{width:80,height:15}):(0,X.jsxs)("span",{className:_,children:[null===Ae||void 0===Ae?void 0:Ae.friendsCount," friends"]})]}),!ae&&(Ue?(0,X.jsxs)("div",{className:j,children:[(0,X.jsx)(ee.Z,{width:"140px",className:"gray_btn"}),(0,X.jsx)(ee.Z,{width:"140px",className:"gray_btn"})]}):(0,X.jsxs)("div",{className:j,children:[(0,X.jsxs)("button",{className:"btn_blue",children:[(0,X.jsx)("img",{src:"../../../icons/plus.png",alt:"",className:"invert"}),(0,X.jsx)("span",{children:"Add to story"})]}),(0,X.jsxs)("button",{className:"gray_btn",onClick:function(){return G(!0)},children:[(0,X.jsx)("i",{className:"edit_icon"}),(0,X.jsx)("span",{children:"Edit profile"})]})]})),ae&&(Ue?(0,X.jsxs)("div",{className:j,children:[(0,X.jsx)(ee.Z,{width:"140px",className:"gray_btn"}),(0,X.jsx)(ee.Z,{width:"140px",className:"gray_btn"})]}):(0,X.jsx)(_n,{friendship:Le,userID:null===Ae||void 0===Ae?void 0:Ae._id,usernameID:ie}))]})]}),(0,X.jsx)("div",{className:"line"}),(0,X.jsx)(Y,{})]})}),(0,X.jsx)("div",{className:C,children:(0,X.jsxs)("div",{className:c,children:[(0,X.jsx)("div",{className:k,children:(0,X.jsxs)("div",{ref:se,className:S,style:{top:"".concat(L<re?"65px":"calc(100vh - ".concat(L,"px - 10px)"))},children:[(0,X.jsx)(fn,{profileSkelton:Ue,isVisitor:ae,userData:Ae,showEdit:J,setShowEdit:G}),je&&(0,X.jsx)(ne,{photosSkelton:Oe,photosData:null===je||void 0===je?void 0:je.data}),Ie&&(0,X.jsx)(te,{photosSkelton:Oe,userData:Ae,userFriends:Ie})]})}),(0,X.jsxs)("div",{className:Z,children:[!ae&&(0,X.jsx)(gn.Z,{user:y}),qe&&(0,X.jsx)(Nn.Z,{}),ke&&!Ze&&(null===Se||void 0===Se?void 0:Se.pages.map)&&(null===Se||void 0===Se?void 0:Se.pages.map((function(e,n){return(0,X.jsx)(o.Fragment,{children:e.data.length>0?e.data.map((function(e){return(0,X.jsx)(K.Z,{post:e},e._id)})):(0,X.jsx)(Q.Z,{className:g,children:"No posts available"})},n)}))),(0,X.jsx)("div",{ref:le,children:Fe?(0,X.jsx)(Nn.Z,{}):Ee?"Load Newer":"Nothing more to load"})]})]})})]})}}}]);
//# sourceMappingURL=462.1da03595.chunk.js.map