import { PipeTransform, Pipe } from "@angular/core";
import { pipe } from "rxjs";


@Pipe({
    name:'convertToSpacesPipe'
})
export class convertToSpacesPipe implements PipeTransform{
    transform(value:string,character:string): string{
        return value.replace(character, " ");
    }
}