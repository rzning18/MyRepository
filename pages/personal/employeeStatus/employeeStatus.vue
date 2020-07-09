<template>
	<!-- 我的推荐员工入职信息 -->
	<view class="employee-status">
		<!-- tab栏 -->
		<!-- <view class="tab-bar sb">
			<view v-for="(item,index) in tab" :key="index" class="tab-item">{{item}}</view>
		</view> -->
		<!-- 列表容器 -->
		<view class="list-wrap">
			<view class="item">
			<!-- <view v-for="(item,index) in list" :key="index" class="item"> -->
				<view class="name sb">
					<view>企业名字</view>
					<view>2019-01-02</view>
				</view>
				<view class="status sb">
					<view>工种：</view>
					<view>在职：</view>
				</view>
				<view class="relative flex">
					<view>被推荐人：</view>
					<view>推荐人：</view>
				</view>
				<view class="reward flex">
					<view>推荐返现：</view>
					<view>返现周期：</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				currentTabIndex:0,
				// tab:['通过','未参加','失败','未入职'],
				list:[]
			}
		},
		onLoad(){
			this.init();
		},
		methods:{
			init(){
				this.$request('https://santong.easy.echosite.cn/api/v1/myEntryData','POST',{},(res)=>{
					console.log(res.data)
					this.list = res.data;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.employee-status{
		width: 100%;
		// .tab-bar{
		// 	width: 90%;
		// 	padding: 0 5%;
		// 	font-size: 26rpx;
		// 	height: 120rpx;
		// 	box-shadow: 0 0 2px 2px #ccc;
		// 	.tab-item{
		// 		line-height: 120rpx;
		// 		padding: 0 30rpx;
		// 	}
		// 	.tab-active{
		// 		color:#409EFF;
		// 		border-bottom: 1px solid #409EFF;
		// 	}
		// }
		.list-wrap{
			width: 92%;
			padding: 0 4%;
			margin-top: 20rpx;
			.item{
				width: 92%;
				padding: 4%;
				height: 330rpx;
				border-radius: 4px;
				background-color: #ebebeb;
				margin-bottom: 20rpx;
				.name{
					line-height: 56rpx;
					&>view:first-child{
						font-size: 40rpx;
					}
					&>view:last-child{
						font-size: 28rpx;
					}
				}
				.status{
					margin-top: 30rpx;
					line-height: 56rpx;
					font-size: 36rpx;
					&>view:last-child{
						color:#39CC3F;
						font-weight: 600;
					}
				}
				.relative{
					margin-top: 30rpx;
					font-size: 28rpx;
					display: flex;
					&>view{
						width: 50%;
					}
				}
				.reward{
					margin-top: 40rpx;
					font-size: 28rpx;
					&>view{
						width: 50%;
					}
				}
			}
		}
	}
</style>
