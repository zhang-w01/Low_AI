<template>
	<view class="body">
		<!-- <view>
			<button @click="hello">dianshi</button>
			<button @click="myConfirm">2222</button>
		</view> -->
		<scroll-view scroll-y="true" class="chat_body" :scroll-top="scrollTop" scroll-with-animation="true">
			<!-- 用来获取消息体高度 -->
			<view id="chat" class="cu-chat">
				<!-- 消息 -->
				<view v-for="(x,i) in msgList" :key="i">
					<!-- 用户消息 -->
					<view v-if="x.my" class="cu-item self">
						<view class="main">
							<view class="content bg-blue">
								<text selectable="true" user-select="true">{{x.msg}}</text>
							</view>

						</view>
						<view class="avatar-wrapper">
							<!-- <image class="cu-avatar" :src="userInfo.user_avatar" mode="aspectFill"></image> -->
							<image class="cu-avatar" src="/static/images/user.png" mode="aspectFill"></image>
						</view>
					</view>
					<!-- 机器人消息 -->
					<view v-if="!x.my" class="cu-item">
						<image class="cu-avatar" src="/static/images/lawyer.png" mode="aspectFill"></image>
						<view class="main">
							<view class="content bg-white">
								<text selectable="true" user-select="true">{{x.msg}}</text>
								<checkbox-group v-if="x.radio_display" @change="selectItem">
									<view v-for="(item,i) in radioList" :key="i" style="margin-top: 10px;">
										<checkbox :value="item.labtext" :disabled="x.radio_dis">{{item.labtext}}
										</checkbox>
									</view>
								</checkbox-group>
								<view v-if="x.radio_display" style="width: 195px;">
									<button @click="submit" :disabled="x.radio_dis" :data-idx="i"
										style="width: 70px;white-space: nowrap;text-align: center;height: 30px;display: flex;align-items: center;justify-content: center;font-size: 15px;">确定</button>
								</view>
								
								<view v-if="x.confirm_display" style="width: 195px;">
									<uni-link href="http://123.57.14.192:8501/" text="点击跳转"></uni-link>
								   <!-- <button @tap="myConfirm" style="width: 70px; white-space: nowrap; text-align: center; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 15px; margin-top: 30px;">咨询</button> -->
								</view>
								
							</view>
						</view>
					</view>
				</view>
				<!-- loading是显示 -->
				<view v-if="msgLoad" class="cu-item">
					<image class="cu-avatar" src="/static/images/robt.png" mode="aspectFill"></image>
					<view class="main">
						<view class="contentload bg-white">
							<view>
								<view class="loading"></view>
								<view class="loading"></view>
								<view class="loading"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 防止消息底部被遮 -->
			<view style="height: 200rpx;"></view>

		</scroll-view>
		<!-- 底部导航栏 -->
		<view class="search" :style="{'padding-bottom':inputBottom+'px'}">
			<!-- vue无法使用软键盘"发送" -->
			<input v-model="msg" class="search_input" maxlength="99999" type="text" @confirm="sendMsg(true)"
				confirm-type="search" placeholder-class="search_input_placehold" placeholder="请描述您的问题"
				:adjust-position="false" @focus="inputBindFocus" @blur="inputBindBlur" />
			<view v-if="msgLoad === false">
				<button @click="sendMsg(true)" :disabled="msgLoad" class="bg-cyan search_button">
					<image src="/static/images/send.png" style="width: 30rpx; height: 30rpx;"></image>
				</button>
			</view>
			<view v-if="msgLoad === true" class="bg-cyan search_button2">
				<view class="loading"></view>
				<view class="loading"></view>
				<view class="loading"></view>
			</view>
		</view>
	</view>
</template>
<script>
	const API = uniCloud.importObject('zhipuAPI');
	const db=uniCloud.importObject("mgdb");
	export default {
		data() {
			return {
				fact:"",
				request:"",
				evidence:"",
				// select0: null,//单选框的选项
				select1: [], //多选框的选项
				title: 'Hello',
				scrollTop: 0,
				j: 0,
				suqing:"",
				shishi:"",
				msgLoad: false,
				msgTimeoutLoad: false,
				msg_prompt1: [{
					msg: "假设你是一名精通中国民事诉讼的律师，而我是你的当事人。"
				}, {
					msg: "请你判断我的案件的民事诉讼类型，而不是其他。不要写解释。"
				}, {
					msg: "根据你对此类案件的了解，你觉得我对案件的描述中还需要补充哪些情节"
				}, {
					msg: "我对我的陈述进行如下补充："
				}, {
					msg: "那么请你为原告用律师的专业用语向自己陈述一下案情的事实和理由，你应该只回答事实和理由，而不是其他，不要写诉讼请求，不要写解释。"
				}, {
					msg: "请为我想几个该类型案件原告需要提供哪些关键证据，你应该只回复你建议的证据，而不是其他。"
				}, {
					msg: "我可以提供以下证据："
				},{
					msg:"那么根据我们之前的谈话，请你为我想几个你可能会写进诉状的诉讼请求，你应该只回复你建议的诉讼请求，而不是其他。不要写解释。"
				}],
				radioList: [],
				// userId: Math.round(new Date().getTime() / 1000).toString(),//获取头像
				msgList: [{
					my: false,
					msg: "您好,请输入案件经过",
					radio_display: false,//是否显示“确定按钮”(多选框)
					radio_dis: false,//选项禁用
					confirm_display:false,
					toWeb:false
				}, ],
				msgToAiList: [], //生成诉状的聊天记录
				msgContent: "",
				msg: "",
				inputBottom: 0,
				caselist: [],
			}
		},
		onLoad() {
			// var a=dbAPI();
			// console.log(a)
			// let that = this;
			// uni.getStorage({
			// 	key: 'msg',
			// 	success: function(res) {
			// 		that.msg = res.data;
			// 		uni.removeStorage({
			// 			key: 'msg',
			// 			success: function(res) {
			// 				that.sendMsg(false);
			// 			}
			// 		});
			// 	}
			// });
		},
		methods: {
			sendMsg(scrollbottom) {


				let that = this
				this.inputBottom = 0
				if (this.msg == "" || this.msgLoad) {
					return 0;
				}
				if (this.msg.length < 2) {
					uni.showToast({
						icon: 'none',
						title: '请至少输入2个字'
					});
					this.msg = '';
					return 0;
				}
				this.tomsgList(this.msg, true); //将输入框输入的内容添加到msgList

				switch (this.j) {
					case 0:
						++this.j;
						var temp = this.msg_prompt1[0].msg + this.msg + this.msg_prompt1[1].msg;//假如你是一名律师，我是当事人，我的事件经过为：，帮我判断诉讼类型。
						this.tomsgToAiList(temp, "user");
						// this.tomsgToAiList2(temp,"user");
						this.chatApi(temp).then((res) => {
							this.tomsgToAiList(res, "assistant"); //写到msgToAiList里(must)
							var temp1 = this.msg_prompt1[2].msg;//根据你对此类案件的了解，需要补充哪些情节。
							this.tomsgToAiList(temp1, "user");
							// this.tomsgToAiList2(temp,"user");
							this.chatApi(temp1).then((res) => {
								this.tomsgToAiList(res, "assistant"); //写到msgToAiList里(must)
							
								this.tomsgList(res,false);//将要补充的内容展示给用户
								
							});
						});
						this.goback();
						break;
					case 1://请求事实和理由。
						++this.j;
						var temp = this.msg_prompt1[3].msg+this.msg+this.msg_prompt1[4].msg;
						this.tomsgToAiList(temp, "user");
						// this.tomsgToAiList2(temp,"user");
						this.chatApi(temp).then((res) => {
							this.tomsgToAiList(res, "assistant"); //事实和理由
							// this.shishi=res;
							this.fact=res;
							var temp1=this.msg_prompt1[5].msg;
							this.tomsgToAiList(temp1, "user");
							// this.tomsgToAiList2(temp,"user");
							this.chatApi(temp1).then((res) => {
								this.tomsgToAiList(res, "assistant"); //建议的证据
								
								this.msg_to_caselist(res);//列出证据选项
							});
						});
						// this.goback();
						break;
					// case 2://选择证据
					// 	++this.j;
					// 	var temp=this.msg_prompt1[5].msg;
					// 	this.tomsgToAiList(temp, "user");
					// 	// this.tomsgToAiList2(temp,"user");
					// 	this.chatApi(temp).then((res) => {
					// 		this.tomsgToAiList(res, "assistant"); //写到msgToAiList里(must)
					// 		this.msg_to_caselist(res);//列出证据选项
					// 	});
						
					// 	break;
				}
				// console.log("123");
				// var a=db.insert();
				this.goback();
				this.msg = '';
				
			

			},
			goback(){
				setTimeout(() => {
					this.scrollTop = this.scrollTop + 1000;
				}, 100)
			},
			//写到msgList函数
			tomsgList(msg, temp) {
				this.msgList.push({
					"msg": msg,
					"my": temp,
				})
			},
			//写到msgToAilist函数
			tomsgToAiList(msg, temp) {
				this.msgToAiList.push({
					"role": temp,
					"content": msg
				})
			},
			

			async chatApi(message) {
				const temp = await API.generateToken("95aa952885cf25552cce26ef79e9187a.MfVOueun5q6Ke6Ye", "100000");
				// this.tomsgToAiList(message,"user");
				var response = await API.getMessage(temp, this.msgToAiList);
				var t = response.data.choices[0].message.content;
				return t;
			},
			inputBindFocus(e) {
				if (e.detail.height) {
					this.inputBottom = e.detail.height
				}
			},
			inputBindBlur() {
				this.inputBottom = 0
			},
			selectItem(e) {
				var selet = e.detail.value;
				this.select1 = selet;
			},
			// toSuZhuang(){
					
			// },
			submit(e) {
				this.msgList[e.currentTarget.dataset.idx]["radio_dis"] = true;
				var temp = "";
				for (var i = 0; i < this.select1.length; i++) {
					temp += this.select1[i];
				}
				this.evidence=temp;
				var t=this.msg_prompt1[6].msg+temp+this.msg_prompt1[7].msg;//我可以提供以下证据，生成诉讼请求。
				this.tomsgToAiList(t,"user");
				this.chatApi(t).then((res) => {
					this.request=res; 
					this.tomsgToAiList(res, "assistant");//诉讼请求
					var tmp="那么根据上述情况帮我生成诉状，格式为：标题为：诉讼状。下面是原告和被告的个人信息，个人信息用xxx表示，格式为原告：XXX。转到下一行，显示被告：XXX。再下一行，标题为：诉讼请求：将你回答的诉讼请求写在里面。再下一行，标题为：事实和理由：将你回答的事实和理由写在里面。在最下面写上落款：格式为此致，具状人和年月日，将具体内容空出来。"
					this.tomsgToAiList(tmp,"user");
					this.chatApi(tmp).then((res)=>{
						
						db.insert(this.fact,this.request,this.evidence).then((res)=>{
							console.log("ok",res.insertedId);
							this.tomsgList("您的订单编号为："+res.insertedId,false)
						})
						
						this.tomsgList(res,false);
						this.msgList.push({
							my: false,
							msg: "您好,是否需要更多帮助",
							radio_display: false,//是否显示“确定按钮”(多选框)
							radio_dis: false,//选项禁用
							confirm_display:true
						})
					})
				});
				// this.goback();
			},
			myConfirm(e){
				uni.navigateTo({
					url: '/pages/test/test'
				});
			
			},
			// hello(e){
			// 	uni.navigateTo({
			// 		url: '/pages/login/login'
			// 	});
			// },
			msg_to_caselist(text) {
				if (this.select1 != []) {
					this.select1 = [];
					this.caselist = [];
					this.radioList = [];
				}
				var temp = text.split(/\d+\./);
				temp.splice(0, 1);
				//把分词得到的内容放到caselist里面
				this.caselist.push(temp);
				// console.log(this.caselist);
				//将caselist的选项展示在radiolist里面，提交到渲染层，供选择
				for (var i = 0; i < this.caselist[0].length; i++) {
					this.radioList.push({
						labtext: this.caselist[0][i]
					});

				}
				this.msgList.push({
					my: false,
					msg: "请选择您现有的证据",
					new: false,
					radio_display: true,
					radio_dis: false
				})

				// console.log(temp);

			},

		}
	}
</script>
<style>
	page {
		background-color: #F9F8FD;
	}

	.body {
		width: 100%;
		height: 100vh;
	}

	.chat_body {
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.search {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 99;
		bottom: 30rpx;
		width: 100%;
	}

	.search_input {
		width: 60%;
		height: 100rpx;
		background-color: #FFF;
		border-radius: 50rpx;
		padding: 0rpx 50rpx;
		font-size: 30rpx;
		margin-right: 20rpx;
		border: none;
	}

	.search_input_placehold {
		color: #BBB;
	}

	.search_button {
		width: 100rpx;
		height: 100rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #122d59;
		border: none;
	}

	.search_button::after {
		border: none;
	}

	.search_button2 {
		width: 100rpx;
		height: 100rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #F0F0F0;
		outline: none;
		border: none;
	}

	.flex-row-start {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}

	.hui-box {
		width: 750rpx;
		height: 100%;

	}

	.box-normal {
		width: 750rpx;
		height: 180px;
		background-color: #FFFFFF;
	}

	.tb-text view {
		font-size: 65rpx;
	}

	.tb-text text {
		font-size: 25rpx;
		color: #737373;
	}

	.padding-chat {
		padding: 17rpx 20rpx;
	}

	.tb-nv {
		width: 50rpx;
		height: 50rpx;
	}

	.status_bar {
		height: var(--status-bar-height);
		background-color: #f1f1f1;
		width: 100%;

	}

	.status_bar-nobg {
		height: var(--status-bar-height);
		width: 100%;

	}

	/* 转圈动画 */
	.one-show {
		animation: oneshow 0.8s ease 1;
	}

	@keyframes oneshow {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.status_bar-fixed {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #f1f1f1;
		z-index: 20;
	}

	.head-dh-my {
		display: flex;
		position: fixed;
		justify-content: space-around;
		align-items: flex-end;
		padding-bottom: 10rpx;
		z-index: 15;
		background-color: #e3e3e3;
		width: 750rpx;
	}

	.border-bom {
		border-bottom: 0.5rpx solid #DDDDDD;
	}

	.border-red {
		border-bottom: 1rpx solid #d33e18;
	}

	.border-bom-big {
		border-bottom: 8rpx solid #DDDDDD;
	}

	.border-bom-white {
		border-bottom: 2rpx solid #FFFFFF;
	}

	.border-bom-green {
		border-bottom: 4rpx solid #f8f9bd;
	}

	.border-bom-index {
		border-bottom: 4rpx solid #27d9b3;
	}

	.padding-left {
		padding-left: 20rpx;
	}

	.padding-left-top {
		padding-left: 20rpx;
		padding-top: 20rpx;
	}

	.padding-right {
		padding-right: 20rpx;
	}

	.input-my {
		padding-left: 20rpx;
		border-radius: 40rpx;
		height: 50rpx;
		margin: 10rpx;
	}

	.tb-tag-absolute {
		position: absolute;
		z-index: 5;
		border-radius: 25rpx;
		font-size: 16rpx;
		margin-left: 25rpx;
		margin-top: -35rpx;
	}

	.lk-tag {
		height: 50rpx;
		padding: 0 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2rpx solid #24bd9f;
		border-radius: 6rpx;
		color: #1c947a;
		font-weight: 500;


	}

	.tb-tag-my {
		border-radius: 15rpx;
		font-size: 16rpx;
		margin-left: 5rpx;
	}

	.my-green {
		color: #29c7a5;
	}

	.my-hui {
		color: #585858;
		font-size: 22rpx;
	}

	.flex {
		display: flex;
	}

	.justify-start {
		justify-content: flex-start;
	}

	.justify-end {
		justify-content: flex-end;
	}

	.flex-column-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flex-row-around {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.my-title {
		font-size: 35rpx;
		font-weight: bold;
	}

	.my-neirong {
		font-size: 26rpx;
		color: #6d6d6d;
	}

	.my-neirong-sm {
		font-size: 23rpx;
		color: #616161;
	}

	.my-tag-text {
		font-size: 22rpx;
		padding-top: 20rpx;
		color: #bababa;
	}

	.padding-top {
		padding-top: 35rpx;
	}

	.padding-top-sm {
		padding-top: 20rpx;
	}

	.bottom-dh {
		background-color: #f1f1f1;
		position: fixed;
		z-index: 10;
		bottom: 0;
		width: 750rpx;
		height: 110rpx;
	}

	.tb-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bottom-text {
		width: 750rpx;
		position: fixed;
		text-align: center;
		font-size: 26rpx;
		color: #9d9d9d;
		bottom: 70rpx;
	}

	.white-box {
		padding: 0 20rpx;
		margin-bottom: 15rpx;
		margin-top: 5rpx;
		width: 715rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
	}

	.green-box {
		padding: 0 20rpx;
		margin-bottom: 15rpx;
		margin-top: 5rpx;
		width: 715rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		background-image: linear-gradient(#1faf97, #29c7a5);
	}

	.yuan-sm {
		width: 13rpx;
		height: 13rpx;
		border-radius: 50%;
		background-color: #1fc189;
		margin-left: 10rpx;
	}

	.yuan-normal {
		width: 14rpx;
		height: 14rpx;
		border-radius: 50%;
		background-color: #159f3c;
		margin-left: 10rpx;

	}

	.yuan-normal-red {
		width: 14rpx;
		height: 14rpx;
		border-radius: 50%;
		background-color: #bc3c11;
		margin-left: 10rpx;

	}

	.yuan-sm-red {
		width: 13rpx;
		height: 13rpx;
		border-radius: 50%;
		background-color: #de410d;
		margin-left: 10rpx;
	}

	.uni-list-cell {
		justify-content: flex-start
	}

	.white-box-all {
		margin-top: 5rpx;
		width: 750rpx;
		background-color: #FFFFFF;
		border-radius: 13px;
	}

	.moneycolor {
		color: #ea5002;
	}

	.text-bold-sm {
		font-weight: 425;
	}

	.sm-moneycolor {
		color: #e3793b;
	}

	.margin-top {
		margin-top: 20rpx;
	}

	.margin-top-sm {
		margin-top: 12rpx;
	}

	.margin {
		margin: 20rpx;
	}

	.margin-left {
		margin-left: 20rpx;
	}

	.margin-left-top {
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.margin-right {
		margin-right: 20rpx;
	}

	.my-absolute {
		position: absolute;
	}

	.my-fixed {
		position: fixed;
	}

	.my-seach {
		width: 450rpx;
		height: 55rpx;
		background-color: #f8f8f8;
		border-radius: 30rpx;
		padding-left: 20rpx;
	}

	.move-view {
		width: 48rpx;
		height: 10rpx;
		background-color: #28ba91;
		border-radius: 4rpx;
		margin-left: 100rpx;
	}

	.move-view-p {
		width: 45rpx;
		height: 10rpx;
		background-color: #28ba91;
		border-radius: 4rpx;
	}

	.header-dh {
		position: fixed;
		padding-top: 20rpx;
		padding-bottom: 15rpx;
		height: 70rpx;
		width: 750rpx;
		background-color: #f1f1f1;
		z-index: 20;
	}

	.tp-normal {
		width: 60rpx;
		height: 60rpx;
	}

	.tp-sm {
		width: 45rpx;
		height: 45rpx;
	}

	.tp-big {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	/* ==================
         聊天
 ==================== */

	.cu-chat {
		display: flex;
		flex-direction: column;
	}

	.cu-chat .cu-item {
		display: flex;
		padding: 30rpx 30rpx 10rpx;
		position: relative;
	}

	.cu-chat .cu-item .avatar-wrapper {
		margin: 0;
		padding: 0;
		width: 80rpx;
		height: 80rpx;
	}

	.cu-chat .cu-item .avatar-wrapper::after {
		border: none;
	}

	.cu-chat .cu-item .cu-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.cu-chat .cu-item>.main {
		max-width: calc(100% - 260rpx);
		margin: 0 40rpx;
		display: flex;
		align-items: center;
	}

	.cu-chat .cu-item>.main .content {
		padding: 20rpx;
		border-radius: 6rpx;
		display: flex;
		flex-direction: column;
		max-width: 100%;
		align-items: left;
		font-size: 30rpx;
		position: relative;
		min-height: 40rpx;
		line-height: 40rpx;
		text-align: left;
		word-break: break-all;
	}

	.cu-chat .cu-item>.main .contentload {
		padding: 20rpx;
		border-radius: 6rpx;
		display: inline-flex;
		max-width: 100%;
		align-items: center;
		font-size: 30rpx;
		position: relative;
		min-height: 40rpx;
		line-height: 40rpx;
		text-align: left;
		word-break: break-all;
	}

	.cu-chat .cu-item>.main .content:not([class*="bg-"]) {
		background-color: #FFF;
		color: #000;
	}

	.cu-chat .cu-item>.main .contentload:not([class*="bg-"]) {
		background-color: #FFF;
		color: #000;
	}

	.cu-chat .cu-item .action {
		padding: 0 30rpx;
		display: flex;
		align-items: center;
	}

	.cu-chat .cu-item>.main .content::after {
		content: "";
		top: 27rpx;
		transform: rotate(45deg);
		position: absolute;
		z-index: 1;
		display: inline-block;
		overflow: hidden;
		width: 24rpx;
		height: 24rpx;
		left: -12rpx;
		right: initial;
		background-color: inherit;
	}

	.cu-chat .cu-item.self>.main .content::after {
		left: auto;
		right: -12rpx;
	}

	.cu-chat .cu-item>.main .content::before {
		content: "";
		top: 30rpx;
		transform: rotate(45deg);
		position: absolute;
		z-index: -1;
		display: inline-block;
		overflow: hidden;
		width: 24rpx;
		height: 24rpx;
		left: -12rpx;
		right: initial;
		background-color: inherit;
		filter: blur(5rpx);
		opacity: 0.3;
	}

	.cu-chat .cu-item>.main .content:not([class*="bg-"])::before {
		background-color: #000;
		opacity: 0.1;
	}

	.cu-chat .cu-item.self>.main .content::before {
		left: auto;
		right: -12rpx;
	}

	.cu-chat .cu-item.self {
		justify-content: flex-end;
		text-align: right;
	}

	.cu-chat .cu-info {
		display: inline-block;
		margin: 20rpx auto;
		font-size: 24rpx;
		padding: 8rpx 12rpx;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 6rpx;
		color: #FFF;
		max-width: 400rpx;
		line-height: 1.4;
	}

	.bg-blue {
		background-color: #122d59;
		color: #FFF;
	}

	.bg-gray {
		background-color: #F0F0F0;
	}

	.bg-white {
		background-color: #FFF;
		color: #000;
	}

	.loading {
		width: 4px;
		height: 4px;
		border-radius: 2px;
		background: #666;
		float: left;
		margin: 0 3px;
		animation: loading linear 1s infinite;
		-webkit-animation: loading linear 1s infinite;
	}

	.loading:nth-child(1) {
		animation-delay: 0s;
	}

	.loading:nth-child(2) {
		animation-delay: 0.15s;
	}

	.loading:nth-child(3) {
		animation-delay: 0.3s;
	}

	@keyframes loading {

		0%,
		60%,
		100% {
			transform: scale(1);
		}

		30% {
			transform: scale(2.5);
		}
	}

	@-webkit-keyframes loading {

		0%,
		60%,
		100% {
			transform: scale(1);
		}

		30% {
			transform: scale(2.5);
		}
	}

	.line {
		float: right;
		width: 100%;
		height: 1px;
		margin-top: 30rpx;
		background: #f3f3f3;
		position: relative;
		text-align: center;
	}

	.content_button_view {
		width: 100%;
		display: flex;
		flex-direction: row;
		text-align: center;
	}

	.content_button {
		font-size: 28rpx;
		color: #989c9c;
		background-color: #FFF;
	}

	.content_button::after {
		border: none;
	}

	.timeout_tip {
		text-align: center;
		font-size: 22rpx;
		line-height: 45rpx;
		color: #A5A5A5;
		background-color: #F0F0F0;
		width: 430rpx;
		margin: 10rpx auto 0rpx auto;
		border-radius: 20rpx;
		position: relative;
	}
</style>