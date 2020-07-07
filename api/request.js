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
		uni.request({
			url: url,
			method: method||'GET',
			data:data,
			success:callback
		})
	}
}
