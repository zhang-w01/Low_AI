// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function () { // 通用预处理器

	},
	async generateToken(apikey, expSeconds){
		const jwt = require('jsonwebtoken')
		   if (!apikey||!expSeconds) {
		   	return {
		   		errCode: 'PARAM_IS_NULL',
		   		errMsg: '参数不能为空'
		   	}
		   }
		   const [id, secret] = apikey.split(".");
	     
	     // 计算过期时间（exp）和时间戳（timestamp）
	     const currentTimestampMs = new Date().getTime();
	     const expTimestampMs = currentTimestampMs + expSeconds * 1000;
	
	     // 构建JWT payload
	     const payload = {
	         api_key: id,
	         exp: expTimestampMs,
	         timestamp: currentTimestampMs
	     };
	
	     // 使用JWT库生成token
	     const token = jwt.sign(
	         payload,
	         secret,
	         {
	             algorithm: 'HS256',
	             header: {
	                 alg: 'HS256',
	                 sign_type: 'SIGN'
	             }
	         }
	     );
	
	     return token;
	},
	async getMessage(token,message){
		const apiURL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
		const res = await uniCloud.httpclient.request(apiURL,{
			method: 'POST',
			data: {
				model: 'glm-3-turbo',
				messages: message
			},
			contentType: 'json', 
			headers: {
			    'Authorization': token
			  },
			dataType: 'json',
			timeout:100000
		})
		console.log(res);
		return res;
	}
}
