/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-31 17:07:21
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-01-31 17:23:29
 * @FilePath: \jmc-pad-vue3\src\utils\rsa\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 引入加密解密库
import JSEncrypt from 'jsencrypt/bin/jsencrypt.js';

// 引入RSA密钥
import { publiceKey } from './rsaKeys.js';

// RSA加密
function rsaEncode (content) {
	content = String(content);
	const encryptor = new JSEncrypt();
	encryptor.setPublicKey(publiceKey);
	return encryptor.encrypt(content);
}

// RSA解密
function rsaDecode (content) {
	// const encryptor = new JSEncrypt();
	// encryptor.setPublicKey(rsaKeys.rsaPrivateKey);
	return encryptor.decrypt(content);
}

// 输出为 函数合集
export default {
	// 加密解密
	rsaEncode,
	rsaDecode
}
