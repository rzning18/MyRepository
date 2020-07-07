<template>
	<view class="index">
		<button @click="go('/pages/index/jobDetail/jobDetail')">详情</button>
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" withCredentials="true">获取手机号</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				encryptedData:'',
				iv:''
			}
		},
		onLoad() {
			console.log('程序启动')
			let _this = this
		},
		methods:{
			go(url){
				console.log(123)
				uni.navigateTo({
					url:url
				})
			},
			getPhoneNumber(e) {
				this.encryptedData = e.detail.encryptedData;
				this.iv = e.detail.iv;
				this.getToken();
				this.$request('https://santong.easy.echosite.cn/api/v1/tokenTest','POST',{},(res)=>{
					console.log(res)
				})
			},
			getToken(){
				let _this = this;
				wx.login({
					success(res) {
						if (res.code) {
							// 获取用户信息
							wx.getUserInfo({
								success(data) {
									// 发起请求
									uni.request({
										url: 'https://santong.easy.echosite.cn/api/v1/getToken',
										method: 'POST',
										data: {
											recommenderid: 1,
											code: res.code,
											iv: _this.iv,
											name: data.userInfo.nickName,
											encryptedData: _this.encryptedData,
											phoneNumber:0
										},
										success(token) {
			                                if(token){
												uni.setStorageSync('token', token.data);
											}
											console.log(uni.getStorageSync('token'))
										}
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
