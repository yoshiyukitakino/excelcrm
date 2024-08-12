export type ClientColoumns = {
    name: string;
    title: string;
    col: number;
    inputType: string;      // text,number, date, tel, email, selectbox, radio, checkbox
    inputOrder?: number;    // 入力画面の項目表示順 not number :非表示 
    listOrder?: number;     // 検索画面の項目表示順 not number :非表示
    required?: boolean;
    readonly?: boolean;
}

export const clientColumnsMap: { [key: string]: ClientColoumns } = {
    id: { name: "id", title: "id", col: 1, inputType: "text", readonly: true },
    no: { name: "no", title: "番号", col: 2, inputType: "text", readonly: true },
    lastName: { name: "lastName", title: "姓", col: 3, inputType: "text", required: true },
    firstName: { name: "firstName", title: "名", col: 4, inputType: "text", required: true },
    email1: { name: "email1", title: "Eメール1", col: 5, inputType: "email", required: true },
    email2: { name: "email2", title: "Eメール2", col: 6, inputType: "email", required: false },
    mobPhone: { name: "mobPhone", title: "携帯電話", col: 7, inputType: "tel", required: false },
    fixedPhone: { name: "fixedPhone", title: "固定電話", col: 8, inputType: "tel", required: false },
    pref: { name: "pref", title: "都道府県", col: 9, inputType: "text", required: false },
    city: { name: "city", title: "市区町村", col: 10, inputType: "text", required: false },
    address1: { name: "address1", title: "住所", col: 11, inputType: "text", required: false },
    address2: { name: "address2", title: "ビル・マンション", col: 12, inputType: "text", required: false },
    birthday: { name: "birthday", title: "生年月日", col: 13, inputType: "date", required: false },
    sex: { name: "sex", title: "性別", col: 14, inputType: "text", required: false },
    job: { name: "job", title: "職業", col: 15, inputType: "text", required: false },
    income: { name: "income", title: "年収", col: 16, inputType: "text", required: false },
    marrige: { name: "marrige", title: "結婚", col: 17, inputType: "text", required: false },

};
