<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async GetOpenID() {
				var temp = uni.getStorageSync('_openid')
				if(temp.length >= 20){
					return temp;
				}
				else{
					var code = await this.GetCode();
					var openid = await this.Getserver(code);
					return openid;
				}
			},
			async GetCode() {
				return new Promise(function(reslove, reject) {
					uni.login({
						provider: 'toutiao',
						success(res) {
							reslove(res.code)
						}
					})
				})
			},
			async Getserver(code) {
				return new Promise(function(resolve,reject){
					uniCloud.callFunction({
						name: 'login',
						data: {
							code: code
						},
						success(res) {
							console.log('网络获取')
							uni.setStorage({
								key: '_openid',
								data: res.result.data.data.openid,
							})
							resolve(res.result.data.data.openid)
							//console.log(res.result.data.openid)					
						}
					})
				})
			}
		}



	}
</script>

<style>
	/*每个页面公共css */
</style>