export async function getProducts() { 
    const res = await fetch("/api/user");
    return res.json();
}