<template>
	<view class="city">
		<view class="title">手动选择</view>
		<view v-for="(item,index) in city" :key="index" v-if="index>0" class="item">
			<view class="initials">{{item.letter}}</view>
			<view class="contain-list">
				<view @click="go('/pages/index/index?city='+i_item.cityName)" v-for="(i_item,i_index) in item.data" :key="i_index" class="contain-item">{{i_item.cityName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import city from '../../../api/city.js'
	export default {
		data() {
			return {
				city:city.list
			}
		},
		methods: {
			go(url,param){
				uni.reLaunch({
					url: url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
  .city{
	  width: 100%;
	  padding: 40rpx;
	  .title{
		  font-size: 30rpx;
		  font-weight: bold;
		  color: #666;
	  }
	  .item{
		  .initials{
			  font-size: 32rpx;
			  font-weight: bold;
			  margin: 20rpx 0;
		  }
		  .contain-list{
			  display: flex;
			  flex-wrap: wrap;
			  .contain-item{
				  font-size: 28rpx;
				  background-color: #ebebeb;
				  width: 200rpx;
				  text-align: center;
				  height: 70rpx;
				  line-height: 70rpx;
				  margin: 20rpx 20rpx 20rpx 0;
			  }
		  }
	  }
  }
</style>
