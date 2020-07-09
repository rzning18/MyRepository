<template>
	<!-- 我的返费 -->
	<view class="reward">
		<!-- tab栏 -->
		<!-- <view class="tab-bar sb">
			<view v-for="(item,index) in tab" :key="index" class="tab-item">{{item}}</view>
		</view> -->
		<!-- 列表容器 -->
		<view class="list-wrap">
			<view class="item">
			<!-- <view v-for="(item,index) in list" :key="index" class="item"> -->
				<view class="name flex">
					<view>被推荐人姓名：</view>
					<view>手机号：</view>
				</view>
				<view class="name flex">
					<view>推荐人姓名：</view>
					<view>手机号：</view>
				</view>
				<view class="money flex">
					<view>返现金额：</view>
					<view>返现时间：</view>
				</view>
				<view class="reward flex">
					<view>返现状态：</view>
					<view>是否达成：</view>
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
				this.$request('https://santong.easy.echosite.cn/api/v1/myBeRepayData','POST',{},(res)=>{
					console.log(res.data)
					this.list = res.data;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.reward{
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
				height: 230rpx;
				border-radius: 4px;
				background-color: #ebebeb;
				margin-bottom: 20rpx;
				.name{
					line-height: 56rpx;
					font-size: 28rpx;
					&>view{
						width: 50%;
					}
				}
				.status{
					margin-top: 30rpx;
					line-height: 56rpx;
					font-size: 30rpx;
					&>view{
						width: 50%;
					}
				}
				.relative{
					margin-top: 30rpx;
					font-size: 30rpx;
					display: flex;
					&>view{
						width: 50%;
					}
				}
				.money{
					margin-top: 14rpx;
					font-size: 30rpx;
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


