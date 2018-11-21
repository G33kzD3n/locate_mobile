import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {
	form: FormGroup;
	pagetitle: any;

	constructor(protected navCtrl: NavController, protected navParams: NavParams, protected formbuilder: FormBuilder) {
		this.pagetitle = "Sign-up";
	}

	ngOnInit() {
		this.form = new FormGroup({
			'fname': new FormControl('', Validators.compose([
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(10),
				Validators.pattern(/[a-zA-Z][a-zA-Z]+/)])),


			'lname': new FormControl('', Validators.compose([
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(10),
				Validators.pattern(/[a-zA-Z][a-zA-Z]+/)])),

			'uname': new FormControl('', Validators.compose([
				Validators.minLength(2),
				Validators.maxLength(10),
				Validators.required,
				Validators.pattern(/[a-zA-Z][a-zA-Z]+/)])),

			'email': new FormControl('', Validators.compose([
				Validators.required,
				Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),

			'mob': new FormControl('', Validators.compose([
				Validators.required,
				Validators.minLength(9),
				Validators.maxLength(10),
				Validators.pattern(/[0-9]*/)])),

			'pass': new FormControl('', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(10),])),

			'cpass': new FormControl('', Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(10),])),
		});

	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}
	onRegister(Form) {
		console.log(Form);
	}

}
