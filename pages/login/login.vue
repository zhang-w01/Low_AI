<template>
	<view>
		<button v-on:click="sign">注册</button>
	</view>
</template>

<script>
	const app=getApp();
	const db=uniCloud.database();
	export default {
		data() {
			return {
				
			}
		},
		async onLoad() {
			this.openid=await app.GetOpenID();
		},
		methods: {
			async sign(){
				let res = await db.collection('user').where({_openid:this.openid}).get()
				if(res.result.data.length == 0){
					db.collection('user').add({
							_openid:this.openid
					});
					uni.showModal({
						title:"提示",
						content:'注册成功'
					})
				}else{
					uni.showModal({
						title:"提示",
						content:'登陆成功'
					})
				}

				
			}
		}
	}
</script>

<style>

</style>
