import { FormGroup } from "@angular/forms";

export interface StepperForm {
    /**
     * business logic form form submitting
     */
    submitForm(): void;
    /**
     * return your FormGroup, parent component will access this for validationSS
     */
    getFormData(): FormGroup;
}

export interface CountWidgetStyles {
    colors: {
        [key:string]:string;
        default: string;
        background: string;
        active: string;
        activeBg: string;
        completed: string;
        completedBg: string;
    };
    shape?: string;
    orientation: string;
}
