<script>
	export default {
		globalData:{
			url:'https://santong.easy.echosite.cn'
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.flex{
		display: flex;
	}
	.sb{
		display: flex;
		justify-content: space-between;
	}
	.sa{
		display: flex;
		justify-content: space-around;
	}
	.vc_b{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.vc_a{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.set100{
		width: 100%;
	}
	.c{
		display: flex;
		justify-content: center;
	}
</style>
