// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129

const {
	MongoClient
} = require('mongodb');

// const mongoose = require('mongoose');



// MongoDB连接字符串，替换成你自己的连接字符串
const uri = "mongodb://root:123456@123.57.14.192:27017";

// 数据库名称
const dbName = 'LAWGPT';

// 集合名称
const collectionName = 'LawData';

// 创建一个MongoDB客户端
const client = new MongoClient(uri);

module.exports = {
	_before: function() { // 通用预处理器

	},

	async insert(fact,request,evidence) {
		try {
			// 使用MongoDB客户端连接到数据库
			await client.connect();

			// 获取数据库和集合
			const database = client.db(dbName); // 替换为您的数据库名称
			const usersCollection = database.collection(collectionName);

			// 查询集合中文档的数量
			const doc={
				事实:fact,
				诉讼请求:request,
				证据:evidence
			};
			const result = await usersCollection.insertOne(doc);
			
			// console.log(result);
			return result;
			// return result.insertedId ;
			// 如果需要，您可以执行其他操作，例如创建/查询集合等
			// return {
			// 	success: true,
			// 	message: 'Connected to MongoDB'
			// };
		} catch (error) {
			console.error('Error connecting to MongoDB:', error);
			return {
				success: false,
				message: 'Connected to MongoDB false'
			};
		}
		// MongoClient.connect(url);
		// console.log(client);
		//      try {
		//          await client.connect();
		//          const database = client.db(dbName);
		//          const collection = database.collection(collectionName);
		// console.log("collection is",collection);
		//          // 构造要插入的文档
		//          const doc = {
		//              事实: "fact",
		//              诉讼请求: "request",
		//              证据: "proof",
		//          };

		//     // 插入文档
		//     const result = await collection.insertOne(doc);

		//     // 返回插入文档的ID
		//     return { id: result.insertedId };
		// } catch (e) {
		//     console.error(e);
		//     return { error: e.message };
		// } finally {
		//     await client.close();
		// }
	}
};