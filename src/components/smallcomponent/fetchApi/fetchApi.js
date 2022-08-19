export default async function fetchApi(link, option={}){
    try{
        const response = await fetch(link, option);
        if(!response.ok) throw new Error("Something went wrong when we try to get the data!");
        const result = await response.json();
        return result
    }
    
    catch(err){
        console.error(err);
    }
}