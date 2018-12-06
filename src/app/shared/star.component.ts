import { Component, OnChanges, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector:'pm-star',
    templateUrl:'./star.component.html',
    styleUrls:['./star.component.css']
})
export class StarComponent implements OnChanges{
    @Input() rating:number=0;
    starWidth:number=0;
    @Output() sendDataToParent:EventEmitter<string>=new EventEmitter<string>();

    ngOnChanges():void{
        this.starWidth=this.rating * 75 / 5;
    }

    notifyToParent(){
        console.log(`${this.rating} clicked`);
        this.sendDataToParent.emit(`${this.rating} clicked`);
    }
} 