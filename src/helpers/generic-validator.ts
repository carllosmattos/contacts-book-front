import { Injectable } from "@angular/core";
import { AbstractControl } from "../../node_modules/@angular/forms";

@Injectable({
  providedIn: "root",
})
export class Validations {
  static ValidCpf(control: AbstractControl) {
    const cpf = control.value;

    let sum: number = 0;
    let valid: boolean;

    let num: number = 0;
    let char: string = "";
    let nums: string = "0123456789";
    let j: number = 10;
    let summation: number = 0;
    let rest: number = 0;
    let digit1: number = 0;
    let digit2: number = 0;
    let cpfAux: string = "";

    const regex = new RegExp("[0-9]{11}");

    if (
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999" ||
      !regex.test(cpf)
    ) {
      valid = false;
    } else {
      cpfAux = cpf.substring(0, 9);
      for (let i: number = 0; i < 9; i++) {
        char = cpfAux.charAt(i);
        if (nums.search(char) == -1) {
          valid = false;
        }
        num = Number(char);
        summation = summation + num * j;
        j--;
      }
      rest = summation % 11;
      digit1 = 11 - rest;
      if (digit1 > 9) {
        digit1 = 0;
      }
      j = 11;
      summation = 0;
      cpfAux = cpfAux + digit1;
      for (let i: number = 0; i < 10; i++) {
        char = cpfAux.charAt(i);
        num = Number(char);
        summation = summation + num * j;
        j--;
      }
      rest = summation % 11;
      digit2 = 11 - rest;
      if (digit2 > 9) {
        digit2 = 0;
      }
      cpfAux = cpfAux + digit2;
      if (cpf != cpfAux) {
        valid = false;
      } else {
        valid = true;
      }
    }

    if (valid) return null;

    return { cpfInvalid: true };
  }

  static olderAge(controle: AbstractControl) {
    const birth = controle.value;
    const convertBirth = new Date(birth);
    const today = new Date();

    if (today > convertBirth) return null;

    return { youngerAge: true };
  }
}
