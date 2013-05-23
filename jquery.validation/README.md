Validation
============

Current Version: 1.5

### Description
Validation is a jQuery funtion that allows you to validate a form. It somply returns a true or false if it passes or fails and adds a class called input-error or select-error to its parent wrapper.


### Usage
You just call the `validate()` on your form and it will search for any items with a class of `validate`.

Types of validation include 

* string
* email
* phone
* password
* select
* cc (Credit Card)
* number

## String
  - Optional Attributes include 
    * default-text - Allows you to set the default text. If the value of the input is == "" or is == the default-text attriobute it will fail

## Email

## Phone

## Password
  - It looks for an attribute called `validatewith` which is the id of the field it should be comparing with.

## Select

## CC (Credit Card)

## Number
