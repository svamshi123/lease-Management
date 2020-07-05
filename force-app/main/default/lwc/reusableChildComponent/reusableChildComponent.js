import { LightningElement,api } from 'lwc';

export default class ReusableChildComponent extends LightningElement {
    @api inputLabel;
 
    @api checkValidity(){
        var inputCmp = this.template.querySelector(".inputCmp");
        var value = inputCmp.value;
        if (!value) {
            inputCmp.setCustomValidity("Please Enter a valid Value");
          } else {
            inputCmp.setCustomValidity(""); 
          }
          inputCmp.reportValidity(); 
    }
}