import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "hyphenate",
})
export class HyphenatePipe implements PipeTransform {
  transform(value: string, replace: string, withThis: string): string {
    return value.replace(replace, withThis);
  }
}
