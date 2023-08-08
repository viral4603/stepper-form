export interface BasicData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    department: string;
    position: string;
}

export interface AddressData {
    address: string,
    streetAddress: string,
    pinCode: string,
    country: string,
    state: string,
    city: string
}

export interface SkillsData {
    framework: Framework;
    programmingLanguage: ProgrammingLanguage,
    leadershipSkill: number,
    selectedFramework: string[];
    selectedLanguage: string[];
}
export interface SelectOption {
    name: string
    id: number
}

export interface ProjectData {
    projectName: string;
    role: string;
    startDate: string;
    endDate: string;
    system: string;
    mouse: string;
    keyboard: string;
}
export interface ProjectTerms {
    communicateTerm: boolean;
    documentTerm: boolean;
    securityTerm: boolean;
    collaborativeTerm: boolean;
}
interface Framework {
    [key: string]: number
}
interface ProgrammingLanguage {
    [key: string]: number
}

