export type ClientColoumns = {
    name: string;
    col: number;
}

export const clientColumnsMap: { [key: string]: ClientColoumns } = {
    id: { name: "id", col: 1 },
    no: { name: "no", col: 2 },
    lastName: { name: "lastName", col: 3 },
    firstName: { name: "firstName", col: 4 },
    email1: { name: "email1", col: 5 },
    email2: { name: "email2", col: 6 },
    mobPhone: { name: "mobPhone", col: 7 },
    fixedPhone: { name: "fixedPhone", col: 8 },
    pref: { name: "pref", col: 9 },
    city: { name: "city", col: 10 },
    address1: { name: "address1", col: 11 },
    address2: { name: "address2", col: 12 },
    birthday: { name: "birthday", col: 13 },
};
