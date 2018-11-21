import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { createChainId } from '../hash-logic/hash-logic';

@Component({
    selector: 'app-hash-form',
    templateUrl: './hash-form.component.html',
    styleUrls: ['./hash-form.component.scss']
})
export class HashFormComponent implements OnInit {

    hashForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.hashForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            placeOfBirth: ['', [Validators.required, Validators.minLength(2)]],
            dateOfBirth: ['', [Validators.required]]
        });
    }



}
