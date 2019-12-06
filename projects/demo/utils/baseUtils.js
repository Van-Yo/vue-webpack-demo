/**
 * 工具类，不依赖任何框架
 */
const baseUtils = {
    /**
     * base64 url安全编码 / 替换成 _
     */
    base64() {
        const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=';
        // private method for UTF-8 encoding  
        const utf8Encode = function (string) {
            string = typeof (string) == string ? string : string + '';
            string = string.replace(/\r\n/g, '\n');
            var utftext = '';
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        // private method for UTF-8 decoding  
        const utf8Decode = function (utftext) {
            var string = '';
            var i = 0;
            var c = 0;
            var c1 = 0;
            var c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c1 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
                    i += 2;
                } else {
                    c1 = utftext.charCodeAt(i + 1);
                    c2 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
                    i += 3;
                }
            }
            return string;
        };
        //编码
        const encode = function (input) {
            var output = '';
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = utf8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        };
        const decode = function (input) {
            var output = '';
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = typeof (input) == 'string' ? input : '' + input;
            input = input.replace(/[^A-Za-z0-9-_=]/g, '');
            while (i < input.length) {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = utf8Decode(output);
            return output;
        };
        return {
            encode: encode,
            decode: decode
        };
    },
    /**
     * 传入出生日期，计算年纪
     * @param {出生日期} birth
     */
    getAge(birth) {
        let birthDate = new Date(birth);
        if (isNaN(birthDate)) {
            console.error('非法日期');
            return '';
        }
        let nowDate = new Date();
        let bYear = birthDate.getFullYear();
        let bMonth = birthDate.getMonth();
        let bDay = birthDate.getDate();
        let nYear = nowDate.getFullYear();
        let nMonth = nowDate.getMonth();
        let nDay = nowDate.getDate();
        let age = nYear - bYear;
        if (nMonth <= bMonth && nDay < bDay) {
            age -= 1;
        }
        return age < 0 ? 0 : age;
    },
    /**
     * isAndroid 判断是否是安卓
     * @returns {boolean}
     * @private
     */
    isAndroid() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        return isAndroid === true;
    },
    /**
     * 判断是否是ios
     */
    isIos() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS === true;
    },
    /**
     * 根据url参数名获取url参数值
     * @param {参数名} name 
     */
    getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.href);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    /**
     * this.transDateStr("2018/01/01") => 2018-01-01
     * this.transDateStr("20180101","-") => 2018-01-01
     * this.transDateStr("2018/01/01","-") => 2018-01-01
     * this.transDateStr("2018/01/01","") => 20180101
     * this.transDateStr("20180101","/") => 2018/01/01
     * this.transDateStr("2018-01-01","/") => 2018/01/01
     * @param {需要修改字符串} str 
     * @param {需要替换字符串} format 
     */
    transDateStr(str, format) {
        let formatStr = format == '' ? format : (format ? format : '-');
        if (/\d{8}/.test(str)) {
            return `${str.substring(0, 4)}${formatStr}${str.substring(4, 6)}${formatStr}${str.substring(6, 8)}`;
        } else {
            return str && str.replace(/[\/|-]/g, formatStr);
        }
    }
};
export default baseUtils;