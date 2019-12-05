import { HasPhoneNumber, HasEmail } from './1-basics';

// == CLASSES == //

/**
 * (1) Classes work similarly to what you're used to seeing in JS
 * -   They can "implement" interfaces
 */

export class Contact implements HasEmail {
  email: string;
  name: string;
  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}

/**
 * (2) This looks a little verbose -- we have to specify the words "name" and "email" 3x.
 * -   Typescript has a shortcut: PARAMETER PROPERTIES
 */

/**
 * (3) Access modifier keywords - "who can access this thing"
 *
 * - public - everyone
 * - protected - me and subclasses
 * - private - only me
 */

class ParamPropContact implements HasEmail {
  constructor(public name: string, public email: string = 'no email') {
    // nothing needed
  }
}

/**
 * (4) Class fields can have initializers (defaults)
 */
class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0;
  // private password: string;
  constructor(public name: string, public email: string, public phone: number) {
    // () password must either be initialized like this, or have a default value
    // this.password = Math.round(Math.random() * 1e14).toString(32);
  }
}

/**
 * Definite Assignment & Lazy Initialization
 */
class DefiniteContact implements HasEmail {
  private password!: string;
  // without the definite assignment, we will get an error saying:
  // property password has no initializer and is not definitely assigned in the constructor
  // if we know for sure that we will define password (eg. in an async fcn call right after instantiation) we can use definite assignment => password!: string
  constructor(public email: string, public name: string) {}

  async init() {
    this.password = Math.round(Math.random() * 1e10).toString(32);
  }
}

/**
 * Another solution is to use a getter
 */

class AlternateContactUsingGetter implements HasEmail {
  private passwordVal: string | undefined;
  constructor(public email: string, public name: string) {}

  get password() {
    if (!this.passwordVal) {
      this.passwordVal = Math.round(Math.random() * 1e14).toString(32);
    }
    return this.passwordVal;
  }

  async init() {
    this.password;
  }
}

const test = new AlternateContactUsingGetter('hi', 'yo');
console.log(test.password);

/**
 * (5) TypeScript even allows for abstract classes, which have a partial implementation
 */

abstract class AbstractContact implements HasEmail, HasPhoneNumber {
  public abstract phone: number; // must be implemented by non-abstract subclasses

  constructor(
    public name: string,
    public email: string // must be public to satisfy HasEmail
  ) {}

  abstract sendEmail(): void; // must be implemented by non-abstract subclasses
}

/**
 * (6) implementors must "fill in" any abstract methods or properties
 */
class ConcreteContact extends AbstractContact {
  constructor(
    public phone: number, // must happen before non property-parameter arguments
    name: string,
    email: string
  ) {
    super(name, email);
  }
  sendEmail() {
    // mandatory!
    console.log('sending an email');
  }
}
