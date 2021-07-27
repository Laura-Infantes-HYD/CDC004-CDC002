/**
 * @param {testName: string} -  name of the test (ex. ABC001)
 * @return {cookieExists: boolean} 
 * 
 */

export default (testName)=>{
    if(testName.length === 0) return false

   const cookieExists = document.cookie.toLowerCase().includes(`${testName.toLowerCase()}=true`);
   return cookieExists
}