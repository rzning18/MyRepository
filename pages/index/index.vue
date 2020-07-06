<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
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
			getPhoneNumber(e) {
				console.log(e.detail.encryptedData + '2222' + e.detail.iv);
			
				this.encryptedData = e.detail.encryptedData;
				this.iv = e.detail.iv;
				this.getToken();
				this.$request('https://santong.easy.echosite.cn/api/v1/tokenTest','POST',{id:[]},(res)=>{
					console.log(res)
				})
			},
			getToken(){
				let _this = this;
				wx.login({
					success(res) {
						if (res.code) {
							// 获取用户信息
							// console.log('code是:' + res.code)
							wx.getUserInfo({
								success(data) {
									// console.log('用户昵称:' + data.userInfo.nickName)
									// console.log('用户iv:' + data.iv)
									// console.log('用户encryptedData:' + data.encryptedData)
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
