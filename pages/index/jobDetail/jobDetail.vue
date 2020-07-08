<template>
	<!-- 职位详情 -->
	<view class="job-detail set100">
		<!-- banner -->
		<view class="banner set100">
			<swiper>
				<swiper-item>
					<view class="swiper-item set100"><img src="" alt="" /></view>
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
						<view></view>
					</view>
					<view class="req-item flex">
						<view>学历：</view>
						<view></view>
					</view>
					<view class="req-item flex">
						<view>经验：</view>
						<view></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentId:NaN,
		};
	},
	onLoad(option) {
		// 获取页面id
		this.currentId = option.id;
		//页面数据初始化
		this.getInfo();
	},
	methods: {
		getInfo(){
			this.$request('https://santong.easy.echosite.cn/api/v1/getRecruits/'+this.currentId,'GET',{},(res)=>{
				console.log(res)
			})
		}
	}
};
</script>

<style lang="less" scoped>
.job-detail {
	.banner {
		.swiper-item {
			height: 320rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.info {
		width: 94%;
		padding: 0 3%;
		.requirement{
			.title{
				font-size: 38rpx;
			}
			.req-list{
				margin-left: 30rpx;
			}
		}
	}
}
</style>
