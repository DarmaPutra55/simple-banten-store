export default async function fetchApi(link, option={}){
    const response = await fetch("http://192.168.1.24:3001"+link, option);
    const result = await response.json();
    const errors = result?.errors;
    if(!response.ok) throw (errors || "Something went wrong when we try to get the data!");
    return result;
}