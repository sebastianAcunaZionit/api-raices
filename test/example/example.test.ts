import { Greetings } from "../../src/example/application/greetings";

// Tests that calling sayHello with a valid name returns a string with "hello" and the name.
it("test_say_hello_with_valid_name_returns_hello_and_name", () => {
  const greetings = new Greetings();
  const result = greetings.sayHello("John");
  expect(result).toBe("hello John");
});

// Tests that the class method sayHello returns a string.
it("test_say_hello_returns_string", () => {
  const greetings = new Greetings();
  const result = greetings.sayHello("John");
  expect(typeof result).toBe("string");
});

// Tests that calling sayHello with an empty string as name returns a string with "hello" only.
it("test_say_hello_with_empty_string_as_name_returns_hello_only", () => {
  const greetings = new Greetings();
  const result = greetings.sayHello("");
  expect(result).toBe("hello ");
});
