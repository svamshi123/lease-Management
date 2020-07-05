import { LightningElement,track } from 'lwc';
import getUnits from '@salesforce/apex/BuildingInfo.getUnits';

export default class Unit extends LightningElement {
    @track editId;
    @track unitId;
    @track unitList;
    connectedCallback(){
        this.getallUnits();
    }
    getallUnits(){
        getUnits().then(data=>{
            console.log("data"+data);
            this.unitList = JSON.parse(data);
            console.log("this.unitList"+this.unitList);
        }).catch(error =>{
            console.log(error);
        })
    }
}