"use strict";(self.webpackChunkstake_app=self.webpackChunkstake_app||[]).push([[310],{47310:function(t,r,e){e.r(r),e.d(r,{Vote:function(){return v}});var n=e(70885),a=e(74165),s=e(15861),o=e(15671),c=e(43144),i=e(2750),u=e(20177),p=e(49242),h=e(2257),d=e(51583),l=e(19601),f=e(34029),v=(e(80518),e(25025),e(70332),e(8455),e(59189),e(98528),e(84255),e(62555),e(23565),e(26219),e(68834),e(61303),e(71497),e(94317),e(13670),e(79120),e(42328),e(97604),e(8187),e(19362),e(54730),e(36250),e(85725),e(38730),e(48507),e(38398),e(2090),e(52876),e(86841),e(49561),e(80580),e(54253),e(91559),e(40553),e(26),e(69392),e(31583),e(82037),e(20737),e(78262),e(34161),e(50266),e(98839),e(51375),e(43320),e(65815),e(18281),e(29526),e(24601),e(46878),e(20583),e(92355),e(84194),e(51121),e(32484),e(78435),function(){function t(r,e,n){(0,o.Z)(this,t);var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,p=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new u.cB(r,e,s,a);(0,i._)(this,"contractWrapper",void 0),(0,i._)(this,"storage",void 0),(0,i._)(this,"abi",void 0),(0,i._)(this,"metadata",void 0),(0,i._)(this,"encoder",void 0),(0,i._)(this,"estimator",void 0),(0,i._)(this,"events",void 0),(0,i._)(this,"interceptor",void 0),(0,i._)(this,"_chainId",void 0),this._chainId=c,this.abi=s,this.contractWrapper=p,this.storage=n,this.metadata=new u.aj(this.contractWrapper,u.cV,this.storage),this.encoder=new u.ai(this.contractWrapper),this.estimator=new u.aT(this.contractWrapper),this.events=new u.aU(this.contractWrapper),this.interceptor=new u.aV(this.contractWrapper)}return(0,c.Z)(t,[{key:"chainId",get:function(){return this._chainId}},{key:"onNetworkUpdated",value:function(t){this.contractWrapper.updateSignerOrProvider(t)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"get",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,n;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getAll();case 2:if(e=t.sent,0!==(n=e.filter((function(t){return t.proposalId.eq(h.O$.from(r))}))).length){t.next=6;break}throw new Error("proposal not found");case 6:return t.abrupt("return",n[0]);case 7:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"getAll",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){var r=this;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=Promise,t.next=3,this.contractWrapper.readContract.getAllProposals();case 3:return t.t1=t.sent.map(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=e.proposalId,t.t1=e.proposer,t.t2=e.description,t.t3=e.startBlock,t.t4=e.endBlock,t.next=7,r.contractWrapper.readContract.state(e.proposalId);case 7:return t.t5=t.sent,t.next=10,r.getProposalVotes(e.proposalId);case 10:return t.t6=t.sent,t.t7=e[3].map((function(t,r){return{toAddress:e.targets[r],nativeTokenValue:t,transactionData:e.calldatas[r]}})),t.abrupt("return",{proposalId:t.t0,proposer:t.t1,description:t.t2,startBlock:t.t3,endBlock:t.t4,state:t.t5,votes:t.t6,executions:t.t7});case 13:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}()),t.abrupt("return",t.t0.all.call(t.t0,t.t1));case 5:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"getProposalVotes",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.proposalVotes(r);case 2:return e=t.sent,t.abrupt("return",[{type:u.b2.Against,label:"Against",count:e.againstVotes},{type:u.b2.For,label:"For",count:e.forVotes},{type:u.b2.Abstain,label:"Abstain",count:e.abstainVotes}]);case 4:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"hasVoted",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=4;break}return t.next=3,this.contractWrapper.getSignerAddress();case 3:e=t.sent;case 4:return t.abrupt("return",this.contractWrapper.readContract.hasVoted(r,e));case 5:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()},{key:"canExecute",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,n,s,o,c;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.ensureExists(r);case 2:return t.next=4,this.get(r);case 4:return e=t.sent,n=e.executions.map((function(t){return t.toAddress})),s=e.executions.map((function(t){return t.nativeTokenValue})),o=e.executions.map((function(t){return t.transactionData})),c=d.id(e.description),t.prev=9,t.next=12,this.contractWrapper.callStatic().execute(n,s,o,c);case 12:return t.abrupt("return",!0);case 15:return t.prev=15,t.t0=t.catch(9),t.abrupt("return",!1);case 18:case"end":return t.stop()}}),t,this,[[9,15]])})));return function(r){return t.apply(this,arguments)}}()},{key:"balance",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){var r;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.contractWrapper.readContract.provider.getBalance(this.contractWrapper.readContract.address);case 2:return r=t.sent,t.abrupt("return",{name:"",symbol:"",decimals:18,value:r,displayValue:l.formatUnits(r,18)});case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"balanceOfToken",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new f.CH(r,p,this.contractWrapper.getProvider()),t.t0=u.b4,t.t1=this.contractWrapper.getProvider(),t.t2=r,t.next=6,e.balanceOf(this.contractWrapper.readContract.address);case 6:return t.t3=t.sent,t.next=9,(0,t.t0)(t.t1,t.t2,t.t3);case 9:return t.abrupt("return",t.sent);case 10:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"ensureExists",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.contractWrapper.readContract.state(r);case 3:t.next=8;break;case 5:throw t.prev=5,t.t0=t.catch(0),Error("Proposal ".concat(r," not found"));case 8:case"end":return t.stop()}}),t,this,[[0,5]])})));return function(r){return t.apply(this,arguments)}}()},{key:"settings",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){var r,e,s,o,c,i,p,h;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([this.contractWrapper.readContract.votingDelay(),this.contractWrapper.readContract.votingPeriod(),this.contractWrapper.readContract.token(),this.contractWrapper.readContract["quorumNumerator()"](),this.contractWrapper.readContract.proposalThreshold()]);case 2:return r=t.sent,e=(0,n.Z)(r,5),s=e[0],o=e[1],c=e[2],i=e[3],p=e[4],t.next=11,(0,u.b5)(this.contractWrapper.getProvider(),c);case 11:return h=t.sent,t.abrupt("return",{votingDelay:s.toString(),votingPeriod:o.toString(),votingTokenAddress:c,votingTokenMetadata:h,votingQuorumFraction:i.toString(),proposalTokenThreshold:p.toString()});case 13:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"propose",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){var n,s,o,c,i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e||(e=[{toAddress:this.contractWrapper.readContract.address,nativeTokenValue:0,transactionData:"0x"}]),n=e.map((function(t){return t.toAddress})),s=e.map((function(t){return t.nativeTokenValue})),o=e.map((function(t){return t.transactionData})),t.next=6,this.contractWrapper.sendTransaction("propose",[n,s,o,r]);case 6:return c=t.sent,i=this.contractWrapper.parseLogs("ProposalCreated",null===c||void 0===c?void 0:c.logs),t.abrupt("return",{id:i[0].args.proposalId,receipt:c});case 9:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()},{key:"vote",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){var n,s=arguments;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=s.length>2&&void 0!==s[2]?s[2]:"",t.next=3,this.ensureExists(r);case 3:return t.next=5,this.contractWrapper.sendTransaction("castVoteWithReason",[r,e,n]);case 5:return t.t0=t.sent,t.abrupt("return",{receipt:t.t0});case 7:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()},{key:"execute",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,n,s,o,c;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.ensureExists(r);case 2:return t.next=4,this.get(r);case 4:return e=t.sent,n=e.executions.map((function(t){return t.toAddress})),s=e.executions.map((function(t){return t.nativeTokenValue})),o=e.executions.map((function(t){return t.transactionData})),c=d.id(e.description),t.next=11,this.contractWrapper.sendTransaction("execute",[n,s,o,c]);case 11:return t.t0=t.sent,t.abrupt("return",{receipt:t.t0});case 13:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"call",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,n,s,o,c=arguments;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=c.length,s=new Array(n>1?n-1:0),o=1;o<n;o++)s[o-1]=c[o];return t.abrupt("return",(e=this.contractWrapper).call.apply(e,[r].concat(s)));case 2:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()}]),t}())}}]);
//# sourceMappingURL=310.ee42fd7a.chunk.js.map