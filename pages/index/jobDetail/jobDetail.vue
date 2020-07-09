<template>
	<!-- 职位详情 -->
	<view class="job-detail set100">
		<!-- banner -->
		<view class="banner set100">
			<swiper class="swiper" autoplay>
				<swiper-item class="item" v-for="(item,index) in info.recruitimages" :key="index">
					<view class="swiper-item set100"><img :src="url+item" alt="" /></view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 岗位信息 -->
		<view class="info">
			<view class="requirement set100">
				<view class="title set100">岗位要求：</view>
				<view class="req-list">
					<view class="req-item flex">
						<view>年龄：</view>
						<view>{{info.age}}</view>
					</view>
					<view class="req-item flex">
						<view>学历：</view>
						<view>{{info.education}}</view>
					</view>
					<view class="req-item flex">
						<view>经验：</view>
						<view>{{info.experience}}</view>
					</view>
					<view class="req-item flex">
						<view>岗位详情：</view>
						<view>{{info.detailcontent}}</view>
					</view>
				</view>
				<view class="title set100">公司信息：</view>
				<view class="req-list">
					<view class="req-item flex">
						<view>公司名字：</view>
						<view>{{info.factorys.name}}</view>
					</view>
					<view class="req-item flex">
						<view>公司简介：</view>
						<view>{{info.factorycontent}}</view>
					</view>
					<view class="req-item flex">
						<view>公司地址：</view>
						<view>{{info.factorys.city[0]}}{{info.factorys.city[1]}}{{info.factorys.city[2]}}</view>
					</view>
				</view>
			</view>
		</view>
		<view @click="go('/pages/index/jobDetail/signUp/signUp?id='+currentId)" class="sign-in">我要报名</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentId: NaN,
				url: '',
				info: {}
			};
		},
		onLoad(option) {
			// 获取页面id
			this.currentId = option.id;
			//页面数据初始化
			this.getInfo();
			this.url = getApp().globalData.url;
		},
		methods: {
			getInfo() {
				this.$request('https://santong.easy.echosite.cn/api/v1/getRecruits/' + this.currentId, 'GET', {}, (res) => {
					console.log(res)
					this.info = res.data[0]
				})
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
	.job-detail {
		.banner {
			.swiper {
				height: 500rpx;
				.swiper-item {
					height: 500rpx;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}

		}

		.info {
			width: 94%;
			padding: 0 3%;

			.requirement {
				.title {
					font-size: 30rpx;
					line-height: 70rpx;
					font-weight: 600;
					border-bottom: 1px solid #ebebeb;
				}
				.req-list {
					margin-left: 26rpx;
					font-weight: 300;
					font-size: 26rpx;
					.req-item {
						line-height: 50rpx;
					}
				}
			}
		}
		.sign-in{
			width: 100%;
			line-height: 70rpx;
			text-align: center;
			position: fixed;
			left: 0;
			bottom: 0;
			border-top: 1px solid #ccc;
		}
	}
</style>
