<template>
	<!-- 个人信息修改 -->
	<view class="edit-info">
		<view class="info-list set100">
			<view class="info-item">
				<view>姓名:</view>
				<view><input type="text" v-model="name" maxlength="20" /></view>
			</view>
			<view class="info-item">
				<view>民族:</view>
				<view><input type="text" v-model="nation" maxlength="10" /></view>
			</view>
			<view class="info-item">
				<view>性别:</view>
				<view>
					<radio-group @change="radioChange">
						<label class="radio">
							<radio value="男" />
							男
						</label>
						<label style="margin-right: 10rpx;" class="radio">
							<radio value="女" />
							女
						</label>
					</radio-group>
				</view>
			</view>
			<view class="info-item">
				<view>年龄：</view>
				<view><input type="number" v-model.number="age" maxlength="3" /></view>
			</view>
			<view class="info-item">
				<view>手机号：</view>
				<view><input type="number" v-model.tel="phone" maxlength="13" /></view>
			</view>
			<view class="info-item">
				<view>身份证号：</view>
				<view><input type="number" v-model.number="cid" maxlength="19" /></view>
			</view>
			<view class="info-item" v-model="bankName">
				<view>银行名：</view>
				<view><input type="text" /></view>
			</view>
			<view class="info-item">
				<view>银行卡号：</view>
				<view><input type="number" v-model="bankIDC" maxlength="13" /></view>
			</view>
			<view class="info-item">
				<view>所在工厂：</view>
				<view><input type="text" maxlength="30" /></view>
			</view>
		</view>
		<button @click="submit()" class="submit" type="primary">确认修改</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			name: '',
			nation: '',
			sex: '',
			age: '',
			phone: '',
			cid: '',
			bankName: '',
			bankIDC: ''
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init() {
			this.$request('https://santong.easy.echosite.cn/api/v1/getInfomation','POST',{},(res)=>{
				console.log(123,res.data[0])
				let data = res.data[0];
				this.name = data.name;
				this.nation = data.nation;
				this.sex = data.sex;
				this.age = data.age;
				this.phone = data.phone;
				this.cid = data.CID;
				this.bankName = data.bankName;
				this.bankIDC = data.bankIDC;
			})
		},
		submit(){
			this.$request('https://santong.easy.echosite.cn/api/v1/changeInfomation','POST',{
				name:this.name,
				age:this.age,
				phone:this.phone,
				CID:this.cid,
				bankName:this.bankName,
				bankIDC:this.bankIDC,
				nation:this.nation,
				sex:this.sex
			},(res)=>{
				if(res.data.code==200){
					console.log(res);
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
		},
		radioChange(e) {
			this.sex = e.detail.value
		}
	}
};
</script>

<style lang="less" scoped>
.edit-info {
	width: 92%;
	margin: 20rpx auto;
	.info-list {
		.info-item {
			margin-top: 20rpx;
			& > view:first-child {
				font-size: 30rpx;
			}
			& > view:last-child {
				display: flex;
				align-items: center;
				height: 80rpx;
				border-bottom: 1px solid #ccc;
			}
		}
	}
	.submit {
		margin-top: 20px;
	}
}
</style>
