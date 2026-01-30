const emp = {
    id :1,
    name: "John Doe",
    age: 30,
    salary: 50000,
    address :"delhi ",
    department: "IT"
}

const emcopy = {...emp};
console.log(emcopy);
const {id,name,...rest} = emp;
console.log(id);
console.log(name);
console.log(rest);