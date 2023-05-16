import { iGreetings } from "../../example/model/greetings";

export class Greetings implements iGreetings {
  sayHello(name: string): string {
    return `hello ${name}`;
  }
}
