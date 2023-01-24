let age: number;

age = 12;

let userName: string;

userName = "Jerry";

let isInstructor: boolean;

isInstructor = true;

let hobbies: string[];

hobbies = ["Basketball", "rugby"];

type Person = {
  name: string;
  age: number;
};

let person: Person;

person = {
  name: "Duke",
  age: 20,
};

let people: Person[];

let cource: string | number = "react complete guide";

cource = 1234;

function insertAtBeginning<T> (arr: T[], value: T){
    let updatedArr = [value, ...arr];
    return updatedArr;
}

let numberArr = insertAtBeginning([1,2,3], 4);

let stringArr = insertAtBeginning(['a','b'],'c');