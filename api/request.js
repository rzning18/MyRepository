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
		uni.showModal({
		    title: '提示',
		    content: '未登录，请重新登录',
		    success: function (res) {
		        if (res.confirm) {
		            console.log('用户点击确定');
		        } else if (res.cancel) {
		            console.log('用户点击取消');
		        }
		    }
		});
	}
}
