export default async function fetchApi(link, option={}){
    const response = await fetch("http://192.168.1.22:3001"+link, option);
    const result = await response.json();
    if(!response.ok) throw (result?.errors?.length > 0 ? result.errors : "Something went wrong when we try to get the data!");
    return result;
}