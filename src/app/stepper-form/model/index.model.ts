export interface BasicData {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly department: string;
    readonly position: string;
}

export interface AddressData {
    readonly address: string,
    readonly streetAddress: string,
    readonly pinCode: string,
    readonly country: string,
    readonly state: string,
    readonly city: string
}

export interface SkillsData {
    readonly framework: Framework;
    readonly programmingLanguges: ProgrammingLanguage,
    readonly leaderShipSkill: number,
    readonly selectedFramework: string[];
    readonly selectedLanguage: string[];
}
export interface SelectOption {
    readonly name: string
    readonly id: number
}

export interface ProjectData {
    readonly projectName: string;
    readonly role: string;
    readonly startDate: string;
    readonly endDate: string;
    readonly system: string;
    readonly mouse: string;
    readonly keyboard: string;
}
export interface ProjectTerms {
    readonly communicateTerm: boolean;
    readonly documentTerm: boolean;
    readonly securityTerm: boolean;
    readonly collaborativeTerm: boolean;
}
interface Framework {
    readonly [key: string]: number
}
interface ProgrammingLanguage {
    readonly [key: string]: number
}

export class StepperFormData {
    public basicDetails: BasicData;
    public addressDetails: AddressData;
    public skillDetails: SkillsData;
    public projectDetails: ProjectData;
    public policyForm: ProjectTerms;

    constructor(
        basicDetails: BasicData,
        addressDetails: AddressData,
        skillDetails: SkillsData,
        projectDetails: ProjectData,
        policyForm: ProjectTerms
    ) {
        this.basicDetails = basicDetails;
        this.addressDetails = addressDetails;
        this.skillDetails = skillDetails;
        this.projectDetails = projectDetails;
        this.policyForm = policyForm
    }
}

export enum SkillLevel {
    None = 'None',
    Basic = 'Basic',
    Demonstrating = 'Demonstrating',
    Proficient = 'Proficient',
    Expert = 'Expert'
}

export interface StyleCSS {
    readonly [key: string]: string
}
