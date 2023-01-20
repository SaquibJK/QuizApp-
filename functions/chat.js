require("dotenv").config()

async function Ans(prompt) {

  let sdk = require('api')('@writesonic/v2.2#43xnsflcadmm1b');
    try {
      sdk.auth(`${process.env.API_KEY}`);
      let response = sdk.ansMyQues_V2BusinessContentAnsMyQues_post({ question: `${prompt}` }, { engine: 'good', num_copies: '1' })
        // .then(({ data }) => {
        //   return data
        // });
      return response;
    } catch (error) {
        (error => console.error(error));
    }
  

}

module.exports = Ans