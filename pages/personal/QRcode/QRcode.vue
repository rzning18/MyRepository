<template>
	<view class="qr-code">
		<view class="wrap">
			<img :src="url+qrurl" alt="">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrurl:'',
				url:''
			}
		},
		onLoad(){
			this.url = getApp().globalData.url;
			this.init();
			this.$request('https://santong.easy.echosite.cn/api/v1/getBuffer','POST',{},(res)=>{
				console.log(res.data);
				this.qrurl = res.data;
			})
		},
		methods: {
			init(){
				this.$request('https://santong.easy.echosite.cn/api/v1/getBuffer','POST',{},(res)=>{
					console.log(res.data);
					this.qrurl = res.data;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.qr-code{
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	.wrap{
		margin-top: -200rpx;
		width: 680rpx;
		height: 680rpx;
		img{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
