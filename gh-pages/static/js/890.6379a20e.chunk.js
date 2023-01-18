"use strict";(self.webpackChunkstake_app=self.webpackChunkstake_app||[]).push([[890],{48890:function(t,r,e){e.r(r),e.d(r,{SignatureDrop:function(){return h}});var n=e(74165),a=e(15861),c=e(15671),o=e(43144),u=e(97326),i=e(60136),s=e(92572),p=e(2750),l=e(87480),f=e(20177),d=e(2257),v=e(68624),h=(e(80518),e(25025),e(70332),e(8455),e(59189),e(98528),e(84255),e(62555),e(23565),e(26219),e(68834),e(61303),e(71497),e(49242),e(94317),e(13670),e(79120),e(42328),e(97604),e(8187),e(19362),e(54730),e(36250),e(85725),e(38730),e(48507),e(38398),e(2090),e(52876),e(86841),e(49561),e(80580),e(54253),e(91559),e(40553),e(26),e(69392),e(31583),e(82037),e(20737),e(78262),e(34161),e(50266),e(98839),e(51375),e(43320),e(65815),e(18281),e(29526),e(24601),e(46878),e(20583),e(92355),e(84194),e(51121),e(32484),e(78435),function(t){(0,i.Z)(e,t);var r=(0,s.Z)(e);function e(t,n,a){var o;(0,c.Z)(this,e);var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,l=arguments.length>5?arguments[5]:void 0,d=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new f.cB(t,n,s,i);return o=r.call(this,d,a,l),(0,p._)((0,u.Z)(o),"abi",void 0),(0,p._)((0,u.Z)(o),"erc721",void 0),(0,p._)((0,u.Z)(o),"owner",void 0),(0,p._)((0,u.Z)(o),"encoder",void 0),(0,p._)((0,u.Z)(o),"estimator",void 0),(0,p._)((0,u.Z)(o),"metadata",void 0),(0,p._)((0,u.Z)(o),"sales",void 0),(0,p._)((0,u.Z)(o),"platformFees",void 0),(0,p._)((0,u.Z)(o),"events",void 0),(0,p._)((0,u.Z)(o),"roles",void 0),(0,p._)((0,u.Z)(o),"interceptor",void 0),(0,p._)((0,u.Z)(o),"royalties",void 0),(0,p._)((0,u.Z)(o),"claimConditions",void 0),(0,p._)((0,u.Z)(o),"revealer",void 0),(0,p._)((0,u.Z)(o),"signature",void 0),(0,p._)((0,u.Z)(o),"checkout",void 0),o.abi=s,o.metadata=new f.aj(o.contractWrapper,f.cM,o.storage),o.roles=new f.ak(o.contractWrapper,e.contractRoles),o.royalties=new f.al(o.contractWrapper,o.metadata),o.sales=new f.am(o.contractWrapper),o.encoder=new f.ai(o.contractWrapper),o.estimator=new f.aT(o.contractWrapper),o.events=new f.aU(o.contractWrapper),o.platformFees=new f.aW(o.contractWrapper),o.interceptor=new f.aV(o.contractWrapper),o.erc721=new f.ay(o.contractWrapper,o.storage,l),o.claimConditions=new f.ao(o.contractWrapper,o.metadata,o.storage),o.signature=new f.aB(o.contractWrapper,o.storage),o.revealer=new f.an(o.contractWrapper,o.storage,f.cN.name,(function(){return o.erc721.nextTokenIdToMint()})),o.signature=new f.aB(o.contractWrapper,o.storage),o.owner=new f.aY(o.contractWrapper),o.checkout=new f.cA(o.contractWrapper),o}return(0,o.Z)(e,[{key:"onNetworkUpdated",value:function(t){this.contractWrapper.updateSignerOrProvider(t)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"totalSupply",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){var r,e;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.totalClaimedSupply();case 2:return r=t.sent,t.next=5,this.totalUnclaimedSupply();case 5:return e=t.sent,t.abrupt("return",r.add(e));case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getAllClaimed",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){var e,a,c,o=this;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=d.O$.from((null===r||void 0===r?void 0:r.start)||0).toNumber(),a=d.O$.from((null===r||void 0===r?void 0:r.count)||l.D).toNumber(),t.t0=Math,t.next=5,this.totalClaimedSupply();case 5:return t.t1=t.sent.toNumber(),t.t2=e+a,c=t.t0.min.call(t.t0,t.t1,t.t2),t.next=10,Promise.all(Array.from(Array(c).keys()).map((function(t){return o.get(t.toString())})));case 10:return t.abrupt("return",t.sent);case 11:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"getAllUnclaimed",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){var e,a,c,o,u=this;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=d.O$.from((null===r||void 0===r?void 0:r.start)||0).toNumber(),a=d.O$.from((null===r||void 0===r?void 0:r.count)||l.D).toNumber(),t.t0=d.O$,t.t1=Math,t.next=6,this.totalClaimedSupply();case 6:return t.t2=t.sent.toNumber(),t.t3=e,t.t4=t.t1.max.call(t.t1,t.t2,t.t3),c=t.t0.from.call(t.t0,t.t4),t.t5=d.O$,t.t6=Math,t.next=14,this.contractWrapper.readContract.nextTokenIdToMint();case 14:return t.t7=t.sent.toNumber(),t.t8=c.toNumber()+a,t.t9=t.t6.min.call(t.t6,t.t7,t.t8),o=t.t5.from.call(t.t5,t.t9),t.next=20,Promise.all(Array.from(Array(o.sub(c).toNumber()).keys()).map((function(t){return u.erc721.getTokenMetadata(c.add(t).toString())})));case 20:return t.abrupt("return",t.sent);case 21:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"totalClaimedSupply",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc721.totalClaimedSupply());case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"totalUnclaimedSupply",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc721.totalUnclaimedSupply());case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"isTransferRestricted",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(){var r;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.hasRole((0,f.bx)("transfer"),v.d);case 2:return r=t.sent,t.abrupt("return",!r);case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"createBatch",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc721.lazyMint(r,e));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()},{key:"getClaimTransaction",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e,a){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc721.getClaimTransaction(r,e,a));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"claimTo",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e,a){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc721.claimTo(r,e,a));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e,n){return t.apply(this,arguments)}}()},{key:"claim",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r,e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc721.claim(r,e));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()},{key:"burn",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",this.erc721.burn(r));case 1:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"call",value:function(){var t=(0,a.Z)((0,n.Z)().mark((function t(r){var e,a,c,o,u=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(a=u.length,c=new Array(a>1?a-1:0),o=1;o<a;o++)c[o-1]=u[o];return t.abrupt("return",(e=this.contractWrapper).call.apply(e,[r].concat(c)));case 2:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()}]),e}(f.aH));(0,p._)(h,"contractRoles",["admin","minter","transfer"])}}]);
//# sourceMappingURL=890.6379a20e.chunk.js.map