// xss漏洞防御
let DefenseXss = (content) => {
    content = content.replace(/\<script\>|\<\/script\>|\<\/SCRIPT\>|\<SCRIPT\>/g, '')
    let regRexJson = {
      '&' : '&amp;',
      '<' : '&lt;',
      '>' : '&gt;'
    }
    for (let key in regRexJson) {
      let reg = new RegExp(key, 'g')
      content = content.replace(reg, regRexJson[key])
    }
    return content
  }
  module.exports= DefenseXss
  