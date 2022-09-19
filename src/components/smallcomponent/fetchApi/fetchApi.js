export default async function fetchApi(link, option={}){
    const response = await fetch("http://192.168.1.22:3001"+link, option);
    if(!response.ok) throw new Error("Something went wrong when we try to get the data!");
    const result = await response.json();
    return result;
}