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