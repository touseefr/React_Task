
const Token =()=>{
   
   const userInfo=JSON.parse(localStorage.getItem("user-info"));
   return userInfo.token;
}

export default Token;