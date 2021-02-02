const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url: like '/static/'
// dir: like __dirname + '/static'
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        // 判断是否是以指定的 url 开头
        if(rpath.startsWith(url)) {
            // 获取完整路径
            let fp = path.join(dir, rpath.substring(url.length));
            // 检查文件是否存在
            if(await fs.exists(fp)) {
                // 查找文件的mime
                ctx.response.type = mime.lookup(rpath);
                // 读取文件内容并赋值给response.body
                ctx.response.body = await fs.readFile(fp);

            } else {
                ctx.response.status = 404;
            }
        } else {
            // 不是指定的前缀，继续处理下一个
            await next();
        }
    }
}

module.exports = staticFiles;