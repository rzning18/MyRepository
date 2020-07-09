export default function request(url, method,data,callback) {
	if(uni.getStorageSync('token')){
		uni.request({
			url: url,
			header: {
				token: uni.getStorageSync('token')
			},
			method: method||'GET',
			data:data,
			success:callback
		})
	}else{
		wx.showToast({
			title:'未登录',
		})
		uni.navigateTo({
			url:'/pages/personal/personal'
		})
	}
}
