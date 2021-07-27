const fs = require('fs');
let data = {
};
const dir = `./Products/`;
fs.readdir(dir, (err, files) => {
    return new Promise((resolve, reject) => {
        if (err) reject(err);
        files.forEach(file => {
           console.log(file);
           let content = require(`${dir}${file}`);
           console.log('content: ', content);
           //data['passed'] += content;
          // data['fixtures'] = data['fixtures'].concat(content['fixtures']);
          data = {...content, ...data}
          console.log('data: ', data);
        });
        resolve(data);
    }).then(data => {
        fs.writeFileSync('./final.json',JSON.stringify(data));
    });
})