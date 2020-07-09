<template>
	<!-- 个人中心 -->
	<view class="personal">
		<!-- 用户信息 -->
		<view class="user-info flex">
			<view class="avatar"><img :src="avatarUrl" alt="" /></view>
			<view class="info">
				<view class="user-name">{{ nickName || '昵称' }}</view>
				<button style="margin-top: 10rpx;" v-if="!isLogin" open-type="getUserInfo" @getuserinfo="getNumber" withCredentials="true">登录</button>
				<view v-if="isLogin" @click="go('/pages/personal/editInfo/editInfo')" class="edit iconfont icon-bianji">点击修改用户信息</view>
			</view>
		</view>
		<!-- 服务 -->
		<view class="support">
			<view @click="go(item.url)" v-for="(item, index) in supportList" :key="index" class="sup-item sb">
				<view>{{ item.name }}</view>
				<view></view>
			</view>
			<view @click="go('/pages/personal/QRcode/QRcode')" class="sup-item sb">
				<view>我的推荐码</view>
				<view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLogin: false,
			nickName: '',
			encryptedData: '',
			iv: '',
			avatarUrl:'',
			supportList: [
				{
					name: '我的推荐员工登记',
					url: '/pages/personal/employeeInfo/employeeInfo'
				},
				{
					name: '我的推荐员工入职',
					url: '/pages/personal/employeeStatus/employeeStatus'
				},
				{
					name: '我的推荐员工返费',
					url: '/pages/personal/recommenderReward/recommenderReward'
				},
				{
					name: '我的入职',
					url: '/pages/personal/work/work'
				},
				{
					name: '我的返费',
					url: '/pages/personal/reward/reward'
				},
				{
					name: '我的面试登记',
					url: '/pages/personal/interview/interview'
				}
			]
		};
	},
	onLoad() {
		// 判断是否登录
		this.isLogin = uni.getStorageSync('token') ? true : false;
		this.getName();
	},
	methods: {
		// 获取用户信息
		getName() {
			let _this = this;
			wx.getSetting({
				success(res) {
					if (res.authSetting['scope.userInfo']) {
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称
						wx.getUserInfo({
							success: function(res) {
								_this.nickName = res.userInfo.nickName;
								_this.avatarUrl = res.userInfo.avatarUrl;
								console.log(res.userInfo);
							}
						});
					} else {
						_this.isLogin = false;
					}
				}
			});
		},
		// userinfo和phoneNumber对应的电话encrypteData不一样，所以需要单独用 getPhoneNumber来获取手机号的加密
		getNumber(e) {
			this.encryptedData = e.detail.encryptedData;
			this.iv = e.detail.iv;
			this.getToken();
			// this.$request('https://santong.easy.echosite.cn/api/v1/tokenTest', 'POST', {}, res => {
			// 	console.log(res);
			// });
		},
		getToken() {
			console.log('开始执行获取token');
			let _this = this;
			//调用登录api获取code码，这是必须的
			wx.login({
				success(res) {
					if (res.code) {
						console.log('获取到用户code：'+res.code);
						// 获取用户信息
						wx.getUserInfo({
							success(data) {
								console.log('开始请求token');
								_this.nickName = data.userInfo.nickName;
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
										phoneNumber: 0
									},
									success(token) {
										if (token) {
											uni.setStorageSync('token', token.data);
											_this.isLogin = true;
											wx.showToast({
												title:'登录成功',
												type:'success'
											})
										}
										console.log('获取成功：'+uni.getStorageSync('token'));
									}
								});
							}
						});
					}
				}
			});
		},
		go(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="less" scoped>
.personal {
	.user-info {
		width: 88%;
		margin: 0 auto;
		padding: 2%;
		// box-shadow: 0 0 2px 2px #ccc;
		background-color: #ebebeb;
		border-radius: 8rpx;
		height: 200rpx;
		margin: 0 auto;

		.avatar {
			width: 200rpx;
			margin-right: 30rpx;
			background-color: #ccc;
			border-radius: 8rpx;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			.user-name {
				margin-top: 20px;
				letter-spacing: 4rpx;
				font-size: 28rpx;
				font-weight: 600;
			}

			.edit {
				margin-top: 20rpx;
				color: #ccc;
				font-size: 28rpx;
			}
		}
	}

	.support {
		width: 92%;
		margin: 40rpx auto;

		// padding-top: 20rpx;
		.sup-item {
			line-height: 60rpx;
			font-size: 26rpx;
			border-bottom: 1px solid #ccc;
			margin-bottom: 40rpx;
			color: #131313;

			& > view:last-child {
				width: 50rpx;
				background: url(../../static/icon/icon_arrow_right.png) no-repeat;
				background-size: contain;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
