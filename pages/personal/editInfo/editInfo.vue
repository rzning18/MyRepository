<template>
	<!-- 个人信息修改 -->
	<view class="edit-info">
		<view class="info-list set100">
			<view class="info-item">
				<view>姓名:</view>
				<view>
					<input type="text">
				</view>
			</view>
			<view class="info-item">
				<view>民族:</view>
				<view>
					<input type="text">
				</view>
			</view>
			<view class="info-item">
				<view>性别:</view>
				<view>
					<input type="text">
				</view>
			</view>
		</view>
		<button class="submit" type="primary">提交</button>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.edit-info{
		width: 92%;
		margin: 20rpx auto;
		.info-list{
			.info-item{
				margin-top: 20rpx;
				&>view:first-child{
					font-size: 30rpx;
				}
				&>view:last-child{
					display: flex;
					align-items: center;
					height: 80rpx;
					border-bottom: 1px solid #ccc;
				}
			}
		}
		.submit{
			margin-top: 20px;
		}
	}
</style>
