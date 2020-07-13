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
				<view class="city">
					<view></view>
					<button @click="go('/pages/index/city/city')" class="iconfont get-city" open-type="getUserInfo" @getuserinfo="getCity"
					 withCredentials="true">
						{{city||'选择'}}
					</button>
				</view>
				<view class="search vc_a">
					<icon :type="'search'" size="20" />
					<input type="text" placeholder="请输入职位" maxlength="15">
				</view>
			</view>
			<!-- tab栏 -->
			<view class="tab-bar sa">
				<view @click="tabActive(index,item.screen)" v-for="(item,index) in tabBar" :key="index" :class="index==currentTabIndex?'tab-active':''">{{item.name}}</view>
			</view>
			<!-- 列表 -->
			<view class="work-list set100">
				<view  @click="go('/pages/index/jobDetail/jobDetail?id='+item.id)" v-for="(item,index) in jobList" :key="index" v-if="item.craft_text==screen||screen=='all'" class="work-item sa set100">
					<view class="avatar">
						<img :src="url+item.recruitimages" alt="">
					</view>
					<view class="info">
						<view class="job sb">
							<view>{{item.factorys.name}}</view>
							<view>{{item.pay}}元/月</view>
						</view>
						<view class="city sb">
							<view>{{item.factorys.city[1]}}</view>
							<view>{{item.post}}</view>
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
				city: '',
				// 加密数据
				encryptedData: '',
				iv: '',
				banner: [], //轮播图
				url: '', //前置url
				screen:'all',//tab筛选条件
				tabBar: [
					{
						name:'全部职位',
						screen:'all',
					},
					{
						name:'正式工',
						screen:'正式工',
					},
					{
						name:'小时工',
						screen:'小时工',
					},
					{
						name:'学生就业',
						screen:'学生就业',
					}], //tab栏文字
				currentTabIndex: 0,
				jobList: [], //职位列表
				currentCity: '', //当前城市
			}
		},
		created() {
			console.log(this.$route)
		},
		onLoad(option) {
			this.url = getApp().globalData.url;
			this.city = option.city;
			let _this = this;
			this.getbanner();
			this.getJobList();
			this.getCity();
			this.$store.commit('increment');
			console.log(this.$store.state.count);
			// this.loadInfo();
		},
		methods: {
			// 获取轮播图片
			getbanner() {
				let _this = this;
				uni.request({
					url: 'https://santong.easy.echosite.cn/api/v1/getBanners',
					method: 'GET',
					data: {},
					success(res) {
						_this.banner = res.data;
					}
				})
				// this.$request('https://santong.easy.echosite.cn/api/v1/getBanners', 'GET', {}, (res) => {
				// 	this.banner = res.data;
				// })
			},
			// 获取职位列表
			getJobList() {
				let _this = this;
				uni.request({
					url: 'https://santong.easy.echosite.cn/api/v1/getPartrecruits',
					method: 'GET',
					data: {},
					success(res) {
						_this.jobList = res.data.rows;
					}
				})
			},
			// tab切换
			tabActive(index,screen) {
				this.currentTabIndex = index;
			    this.screen = screen;
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
			getCity() {
				let _this = this;
				//获取当前位置信息
				wx.getSetting({
					success: res => {
						//查看是否获取位置信息
						// if (!res.authSetting['scope.userLocation']) {
						// 回调获取参数用为api接口
						wx.getLocation({
							success: function(res) {
								console.log('位置信息---', res);
								var longitude = res.longitude;
								var latitude = res.latitude;
								// 请求百度api接口
								wx.request({
									url: 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=ICeBcOxOO4HUxbemDClKVuzK6ivSmmFp&output=json&coordtype=wgs84ll&location=' +
										latitude + ',' + longitude,
									data: {},
									type: 'post',
									header: {
										'Content-Type': 'application/json'
									},
									success: function(res) {
										// success  
										_this.city = res.data.result.addressComponent.city;
										console.log('城市名称---', res.data.result.addressComponent.city);
									},
									fail: function() {
										page.setData({
											currentCity: "获取定位失败"
										});
									}
								})
							},
						})
						// }
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	@b: #409EFF;

	.index {
		width: 100%;

		.banner {
			.swiper {
				height: 460rpx;

				.swiper-item {
					width: 100%;
					height: 460rpx;
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
					display: flex;
					align-items: center;
					min-width: 150rpx;
					width: auto;
					font-size: 26rpx;
					border-bottom: 1px solid #ccc;

					&>view {
						height: 40rpx;
					}

					&>view:first-child {
						background: url(../../static/icon/icon_position.png);
						width: 40rpx;
						background-size: 100% 100%;
						margin-right: 18rpx;
					}

					.get-city {
						width: auto !important;
						padding: 0 !important;
						margin: 0;
						font-size: 24rpx;
						margin-right: 6rpx;
						position: relative;
						max-width: 160rpx;
						white-space: nowrap;
						background-color: #fff;

						&::after {
							border: none;
						}
					}

					uni-button {
						// line-height: 40px;
						width: auto !important;
						padding: 0 !important;
						margin: 0;
						font-size: 24rpx;
						margin-right: 6rpx;
						position: relative;
						max-width: 160rpx;
						white-space: nowrap;

						&::after {
							border: none;
						}
					}
				}

				.search {
					width: 480rpx;
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
					background-color: #ebebeb;
					border-radius: 4px;

					&>view {
						height: 190rpx;
						margin-top: 10rpx;
					}

					.avatar {
						width: 210rpx;
						background-color: #ccc;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.info {
						width: 490rpx;
						color: #131313;
						font-size: 26rpx;

						&>view {
							line-height: 40rpx;
						}

						.job {
							font-size: 32rpx;
							font-weight: 400;
						}

						.city {
							font-size: 28rpx;
							margin-top: 50rpx;
						}

						.factory {
							margin-top: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
