<template>
	<view class="sign-up">
		<view class="item">
			<view>姓名：</view>
			<view>
				<input v-model="name" type="text">
			</view>
		</view>
		<view class="item">
			<view>性别：</view>
			<view>
				<input v-model="sex" type="text">
			</view>
		</view>
		<view class="item">
			<view>年龄：</view>
			<view>
				<input v-model.number="age" type="text">
			</view>
		</view>
		<view class="item">
			<view>民族：</view>
			<view>
				<input v-model="nation" type="text">
			</view>
		</view>
		<view class="item">
			<view>电话：</view>
			<view>
				<input v-model.number="phone" type="text">
			</view>
		</view>
		<button @click="submit()" class="submit" type="primary">立即报名</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				factory_id:'',
				name:'',
				age:'',
				sex:'',
				nation:'',
				phone:''
			}
		},
		onLoad(option) {
			this.factory_id = option.id;
		},
		methods: {
			submit(){
				this.$request('https://santong.easy.echosite.cn/api/v1/sigUpRegister', 'POST', {
					factory_id:this.factory_id,
					name:this.name,
					age:this.age,
					sex:this.sex,
					nation:this.nation,
					phone:this.phone
				}, (res) => {
					console.log(res)
					if(res.data.code == 200){
						wx.showToast({
							icon:'success',
							title:'提交成功'
						})
					}else{
						wx.showToast({
							icon:'none',
							title:'提交失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.sign-up{
	width: 100%;
	.item{
		width: 80%;
		margin: 30rpx auto;
		border-bottom: 1px solid #ccc;
		&>view:first-child{
			font-size: 28rpx;
		}
		&>view:last-child{
			margin-top: 20rpx;
			font-size: 28rpx;
		}
	}
	.submit{
		width: 80%;
		margin: 30px auto;
	}
}
</style>
