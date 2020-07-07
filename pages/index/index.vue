<template>
	<!-- 主页 -->
	<view class="index">
		<!-- banner -->
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" autoplay="autoplay">
				<!-- 轮播项 -->
				<swiper-item v-for="(item,index) in banner" :key="index">
					<view class="swiper-item">
						<img :src="url+item.bannerimage" :alt="item.name">
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 主体内容 -->
		<div class="content-warp">
			<!-- 搜索栏 -->
			<view class="search-bar set100 sa">
				<view class="city"></view>
				<view class="search vc_a">
					 <icon :type="'search'" size="20"/>
					<input type="text" placeholder="请输入职位" maxlength="15">
				</view>
			</view>
			<!-- tab栏 -->
			<view class="tab-bar sa">
				<view @click="tabActive(index)" v-for="(item,index) in tabBar" :key="index" :class="index==currentTabIndex?'tab-active':''">{{item}}</view>
			</view>
			<!-- 列表 -->
			<view class="work-list set100">
				<view @click="go('/pages/index/jobDetail/jobDetail')" v-for="(item,index) in jobList" :key="index" class="work-item sa set100">
					<view class="avatar">
						<img :src="url+item.recruitimages" alt="">
					</view>
					<view class="info">
						<view class="job sb">
							<view>{{item.factorys.name}}{{item.post}}</view>
							<view>{{item.pay}}元/月</view>
						</view>
						<view class="city sb">
							<view>{{item.factorys.city[1]}}</view>
							<view></view>
						</view>
						<view class="factory sb">
							<view>{{item.factorys.name}}</view>
							<view>{{item.recruitdate}}</view>
						</view>
					</view>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 加密数据
				encryptedData: '',
				iv: '',
				banner: [], //轮播图
				url: '', //前置url
				tabBar: ['全部职位', '正式工', '小时工', '学生就业'], //tab栏文字
				currentTabIndex: 0,
				jobList: [], //职位列表
			}
		},
		onLoad() {
			this.url = getApp().globalData.url;
			console.log('程序启动');
			let _this = this;
			this.getbanner();
			this.getJobList();
			this.getCity();
		},
		methods: {
			// 获取轮播图片
			getbanner() {
				this.$request('https://santong.easy.echosite.cn/api/v1/getBanners', 'GET', {}, (res) => {
					this.banner = res.data;
				})
			},
			// 获取职位列表
			getJobList() {
				this.$request('https://santong.easy.echosite.cn/api/v1/getPartrecruits', 'GET', {}, (res) => {
					this.jobList = res.data.rows;
				})
			},
			// tab切换
			tabActive(index) {
				this.currentTabIndex = index;
			},
			go(url) {
				uni.navigateTo({
					url: url
				})
			},
			getPhoneNumber(e) {
				this.encryptedData = e.detail.encryptedData;
				this.iv = e.detail.iv;
				this.getToken();
				this.$request('https://santong.easy.echosite.cn/api/v1/tokenTest', 'POST', {}, (res) => {
					console.log(res)
				})
			},
			getCity(){
				let _this = this;
				wx.login({
					success(res){
						if(res.code){
							wx.getUserInfo({
							success(data){
								console.log(data.userInfo.city)
							}
						   })
						}
						
					}
				})
			},
			getToken() {
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
											phoneNumber: 0
										},
										success(token) {
											if (token) {
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

<style lang="less" scoped>
	@b: #409EFF;

	.index {
		width: 100%;

		.banner {
			.swiper {
				.swiper-item {
					width: 100%;
					height: 240px;
					overflow: hidden;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.content-warp {
			padding: 0 10rpx;

			.search-bar {
				margin-top: 20rpx;
				height: 80rpx;

				.city {
					width: 150rpx;
					background-color: #ccc;
				}

				.search {
					width: 500rpx;
					border-radius: 40rpx;
					background-color: #ebebeb;
				}
			}

			.tab-bar {
				margin-top: 20rpx;
				height: 90rpx;
				border-bottom: 1px solid #ebebeb;

				&>view {
					line-height: 90rpx;
					font-size: 28rpx;
					padding: 0 20rpx;
				}

				.tab-active {
					border-bottom: 2px solid @b;
				}
			}

			.work-list {
				margin-top: 20rpx;
				.work-item {
                    height: 220rpx;
					margin-bottom: 20rpx;
					border: 1px solid #ebebeb;
					border-radius: 4px;
					&>view{
						height: 190rpx;
						margin-top: 10rpx;
					}
					.avatar{
						width: 210rpx;
						background-color: #ccc;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.info{
						width: 490rpx;
						background-color: #ccc;
						font-size: 26rpx;
						&>view{
							line-height: 40rpx;
						}
						.job{
							font-size: 32rpx;
							font-weight: 400;
						}
						.city{
							font-size: 28rpx;
							margin-top: 50rpx;
						}
						.factory{
							margin-top: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
