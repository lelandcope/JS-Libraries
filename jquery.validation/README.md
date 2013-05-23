Validation
============

Current Version: 1.5

### Description
Validation is a jQuery funtion that allows you to validate a form. It simply returns a true or false if it passes or fails and adds a class called input-error or select-error to its parent wrapper.


### Usage
You just call the `validate()` on your form and it will search for any items with a class of `validate`.

    if(!jQuery(element).validate()) {
      // Let the user know there was a problem
      // There will be a class added to the input or select wrapper called input-error or select-error 
      // so you can show the user there was an error
    }

### Types of validation include 

* string
* email
* phone
* password
* select
* cc (Credit Card)
* number

#### String
Optional Attributes include 
default-text - Allows you to set the default text. If the value of the input is == "" or is == the default-text attribute it will fail.

    <span>
        <input type="text" class="validate" value="Enter Name" default-text="Enter Name" validation="string" />
    </span>

#### Email

    <span>
        <input type="text" class="validate" value="Enter Name" default-text="Enter Name" validation="string" />
    </span>

#### Phone
This will validate any form of a valid phone number ( 5551234567, (555) 123-4567, 1(800) 123-4567 .....) 

    <span>
        <input type="text" class="validate" validation="phone" />
    </span>

#### Password
It looks for an attribute called `validatewith` which is the id of the field it should be comparing with.

    <span>
        <input type="text" class="validate" validatewith="confirm-password" validation="password" />
    </span>

#### Select

    <span>
        <select class="validate" validation="select">
            .....
        </select>
    </span>

#### CC (Credit Card)

    <span>
        <input type="text" class="validate" validation="cc" />
    </span>

#### Number

    <span>
        <input type="text" class="validate" validation="number" />
    </span>
