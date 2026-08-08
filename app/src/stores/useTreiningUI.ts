const users = [
    {name: "John Doe", email: "john.doe@example.com"},
    {name: "Jane Smith", email: "jane.smith@example.com"},
    {name: "Alice Johnson", email: "alice.johnson@example.com"},
]; 

users.filter(user => user.email.endsWith("@example.com")).forEach(user => {
    console.log(`Name: ${user.name}, Email: ${user.email}`);
});

const cart = [ 
    {id: 1, name: "Laptop", price: 999.99, quantity: 1},
    {id: 2, name: "Headphones", price: 199.99, quantity: 2},
    {id: 3, name: "Mouse", price: 49.99, quantity: 1},
]; 

const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

const auth = [
    {username: "admin", password: "admin123"},
    {username: "user", password: "user123"},    
    {username: "user2 ", password: "user103"},    
]; 

auth.find(user => user.username === "admin" && user.password === "admin123")    
? console.log("Admin authenticated")
: console.log("Authentication failed");