import { LightningElement, track, wire } from 'lwc';
import getBuildings from '@salesforce/apex/BuildingInfo.getBuildings';
import getUnitList from '@salesforce/apex/BuildingInfo.getUnitList';
import getContact from '@salesforce/apex/BuildingInfo.getContact';
import insertContract from '@salesforce/apex/BuildingInfo.insertContract';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Contract extends LightningElement {
    @track value = '';
    @track name;
    @track buildings;
    @track build;
    @track units;
    UnitOptions;
    @track contact;
    @track status;
    get options() {
        return [
            { label: 'Draft', value: 'Draft' },
            { label: 'In Approval Process', value: 'In Approval Process' },
            { label: 'Activated', value: 'Activated' },
        ];
    }
    
    @wire(getBuildings)
        BuildiingList;

        get buildingOptions() {
            console.log('>>>>' + JSON.stringify(this.BuildiingList.data));
            return this.BuildiingList.data;
        }
    
   /* @wire(getUnitList)
        unitList;

        get unitOptions() {
            console.log('>>>>' + JSON.stringify(this.unitList.data));
            return this.unitList.data;
        }*/
    @wire(getContact)
        ContactList;

        get contactoptions() {
            console.log('>>>>' + JSON.stringify(this.ContactList.data));
            return this.ContactList.data;
        }
    
    handleUnits(event){
        this.build = event.target.value;
        console.log(this.build);
        getUnitList({buidlingname : this.build}).then((data) =>{
            console.log("nuidl name");
            this.UnitOptions = data;
            console.log(this.UnitOptions);
        }).catch(() =>{
            console.log("error");
        })
    }

    handleClick() {
        var nam = this.template.querySelectorAll("lightning-input");
        nam.forEach(function(element){
            if(element.name == "input1"){
                this.name = element.value;
            }
        },this);
        var inp = this.template.querySelectorAll("lightning-combobox");
        inp.forEach(function(element){
            if(element.name == "input2"){
                this.buildings = element.value;
            }else if(element.name == "input3"){
                this.units = element.value;
            }else if(element.name == "input4"){
                this.contact = element.value;
            }else if(element.name == "input5"){
                this.status = element.value;
            }
        },this);
        console.log( this.name, this.buildings,this.units,this.contact, this.status);
        insertContract({name:this.name,building:this.buildings,unit:this.units,contact:this.contact,status:this.status}).then(() =>{
             const errortoast = new ShowToastEvent({
                'title':'Success!',
                'message' : 'inserted Successfully',
                'variant' : 'success'
            });
            this.dispatchEvent(errortoast);
        }).catch(() =>{
            const errortoast = new ShowToastEvent({
                'title':'Error!',
                'message' : 'Enter valid Values',
                'variant' : 'error'
            });
            this.dispatchEvent(errortoast); 
        });
    }
}