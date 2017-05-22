/**
 * Created by roman_b on 4/26/2017.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'main-view',
    template: `<h1>Hello {{name}}</h1>`
})
export class MainView implements OnInit{
    constructor() { }

    ngOnInit(): void {

    }
}