import { LightningElement,track } from 'lwc';
import buildingInfomethod from '@salesforce/apex/BuildingInfo.buildingInfomethod';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Building extends LightningElement {
    @track namefiels;
    @track UnitPrice;
    @track address;
    @track count;
        
    handleClick(){
        var inp = this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name == "input1"){
                this.namefiels = element.value;
            }else if(element.name == "input2"){
                this.UnitPrice = element.value;
            }else if(element.name == "input3"){
                this.address = element.value;
            }else if(element.name == "input4"){
                this.count = element.value;
            }
        },this);
        console.log(this.namefiels,this.UnitPrice,this.address,this.count);
        buildingInfomethod({namefiels:this.namefiels,unitprice:this.UnitPrice,address:this.address,count:this.count}).then(data =>{
            const errortoast = new ShowToastEvent({
                'title':'Success!',
                'message' : 'inserted Successfully with Units',
                'variant' : 'success'
            });
            this.dispatchEvent(errortoast);
        }).catch(error =>{
            const errortoast = new ShowToastEvent({
                'title':'Error!',
                'message' : 'Enter valid Cupon',
                'variant' : 'error'
            });
            this.dispatchEvent(errortoast); 
        });
    }
}
