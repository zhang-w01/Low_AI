'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
		const apiURL = 'https://developer.toutiao.com/api/apps/v2/jscode2session';
		const res = await uniCloud.httpclient.request(apiURL,{
			method: 'POST',
			data: {
				appid:"tt355443e9aa64681901",
				secret:"0020380bf4141cd3f0386d48dfa64e9028ed498f",
				code:event.code
			},
			contentType:"json",
			dataType:"json"
		})
		return res;
	
	
	
	//返回数据给客户端
};
