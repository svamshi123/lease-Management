import { LightningElement } from 'lwc';

export default class ParentWhereMultipleChildComponentExist extends LightningElement {
    handleClick() {
        this.template.querySelector("c-reusable-child-component")
          .forEach(element => {
          element.checkValidity();
          });
        }
}