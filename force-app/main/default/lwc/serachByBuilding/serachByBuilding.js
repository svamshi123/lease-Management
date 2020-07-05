import { LightningElement } from 'lwc';
import searchByBuilding from '@salesforce/apex/BuildingInfo.searchByBuilding';

export default class SerachByBuilding extends LightningElement {
    name;
    contractList;

    handleClick(){
        var nam = this.template.querySelectorAll("lightning-input");
        nam.forEach(function(element){
            if(element.name == "input1"){
                this.name = element.value;
            }
        },this);
        console.log("name"+this.name);
        searchByBuilding({name: this.name}).then((data) =>{
            console.log(data);
            this.contractList = data;
            console.log(this.contractList);
        }).catch((error) =>{
            console.log(error);
        })
    }
}