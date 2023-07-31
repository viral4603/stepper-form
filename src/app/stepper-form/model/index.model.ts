export interface BasicDetails {
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    department:string;  
    position:string;
}

export interface AddressDetails {
    address:string,
    streetAddress:string,
    pinCode:string,
    country:string,
    state:string,
    city:string
}

export interface Skills {
    framework: Framework;
    programmingLanguage: ProgrammingLanguage,
    leadershipSkill:number
}
interface Framework {
    [key: string]: number
}
interface ProgrammingLanguage {
    [key:string]: number
}