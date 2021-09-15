import { AbstractControl, ValidatorFn } from "@angular/forms";

const VALID_GENRE = ["Sandbox", "Shooter", "MMORPG", "ARPG"];

export function videogameGenreValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = !VALID_GENRE.includes(control.value);
    return forbidden ? { videogameGenreValid: { value: control.value } } : null;
  };
}
