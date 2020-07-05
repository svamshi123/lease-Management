import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getName from '@salesforce/apex/BuildingInfo.getName';
export default class Header extends NavigationMixin(LightningElement) {
    @api Name;
    @track Hometrach = true;
    @track Buildingtrack = false;
    @track UnitTrack = false;
    @track Contracttrack = false;
    @track SearchByBuilding = false;
    @track SearchByvendor= false;


    connectedCallback() {
        this.defaultId();
    }
    defaultId() {
        getName().then(data => {
            console.log(data);
            this.Name = data;
        }).catch(error => {
            console.log(error);
        });
    }
    navigetetHome() {
        console.log('Home');
        var homeblock = this.template.querySelector('[data-id="homeblock"]');
        if(homeblock){
            this.template.querySelector('[data-id="homeblock"]').className='class1';
            this.template.querySelector('[data-id="buildblock"]').className='class2';
            this.template.querySelector('[data-id="unitblock"]').className='class2';
            this.template.querySelector('[data-id="contractblock"]').className='class2';
            this.template.querySelector('[data-id="SBBblock"]').className='class2';
            this.template.querySelector('[data-id="SBVblock"]').className='class2';
        }   
        this.Hometrach = true;
        this.Buildingtrack = false;
        this.UnitTrack = false;
        this.Contracttrack = false;
        this.SearchByBuilding = false;
        this.SearchByvendor =false;
    }
    navigatetoBuilding() {
        console.log('building');
        var buildblock = this.template.querySelector('[data-id="buildblock"]');
        if(buildblock){
            this.template.querySelector('[data-id="buildblock"]').className='class1';
            this.template.querySelector('[data-id="homeblock"]').className='class2';
            this.template.querySelector('[data-id="unitblock"]').className='class2';
            this.template.querySelector('[data-id="contractblock"]').className='class2';
            this.template.querySelector('[data-id="SBBblock"]').className='class2';
            this.template.querySelector('[data-id="SBVblock"]').className='class2';
        }
        this.Hometrach = false;
        this.Buildingtrack = true;
        this.UnitTrack = false;
        this.Contracttrack = false;
        this.SearchByBuilding = false;
        this.SearchByvendor =false;
    }
    navigatetoUit() {
        console.log('Unit');
        var unitblock = this.template.querySelector('[data-id="unitblock"]');
        if(unitblock){
            this.template.querySelector('[data-id="unitblock"]').className='class1';
            this.template.querySelector('[data-id="homeblock"]').className='class2';
            this.template.querySelector('[data-id="buildblock"]').className='class2';
            this.template.querySelector('[data-id="contractblock"]').className='class2';
            this.template.querySelector('[data-id="SBBblock"]').className='class2';
            this.template.querySelector('[data-id="SBVblock"]').className='class2';
        }
        this.Hometrach = false;
        this.Buildingtrack = false;
        this.UnitTrack = true;
        this.Contracttrack = false;
        this.SearchByBuilding = false;
        this.SearchByvendor =false;
    }
    navigateContract() {
        console.log('Contract');
        var contractblock = this.template.querySelector('[data-id="contractblock"]');
        if(contractblock){
            this.template.querySelector('[data-id="contractblock"]').className='class1';
            this.template.querySelector('[data-id="homeblock"]').className='class2';
            this.template.querySelector('[data-id="buildblock"]').className='class2';
            this.template.querySelector('[data-id="unitblock"]').className='class2';
            this.template.querySelector('[data-id="SBBblock"]').className='class2';
            this.template.querySelector('[data-id="SBVblock"]').className='class2';
        }
        this.Hometrach = false;
        this.Buildingtrack = false;
        this.UnitTrack = false;
        this.Contracttrack = true;
        this.SearchByBuilding = false;
        this.SearchByvendor =false;
    }
    navigateSearchByBuilding(){
        console.log('SearchByBuilding');
        var SBBblock = this.template.querySelector('[data-id="SBBblock"]');
        if(SBBblock){
            this.template.querySelector('[data-id="SBBblock"]').className='class1';
            this.template.querySelector('[data-id="homeblock"]').className='class2';
            this.template.querySelector('[data-id="buildblock"]').className='class2';
            this.template.querySelector('[data-id="unitblock"]').className='class2';
            this.template.querySelector('[data-id="contractblock"]').className='class2';
            this.template.querySelector('[data-id="SBVblock"]').className='class2';
        }
        this.Hometrach = false;
        this.Buildingtrack = false;
        this.UnitTrack = false;
        this.Contracttrack = false;
        this.SearchByBuilding = true;
        this.SearchByvendor =false;
    }
    navigateSearchByVendor(){
        console.log('SearchVendor');
        var SBVblock = this.template.querySelector('[data-id="SBVblock"]');
        if(SBVblock){
            this.template.querySelector('[data-id="SBVblock"]').className='class1';
            this.template.querySelector('[data-id="homeblock"]').className='class2';
            this.template.querySelector('[data-id="buildblock"]').className='class2';
            this.template.querySelector('[data-id="unitblock"]').className='class2';
            this.template.querySelector('[data-id="contractblock"]').className='class2';
            this.template.querySelector('[data-id="SBBblock"]').className='class2';
        }
        this.Hometrach = false;
        this.Buildingtrack = false;
        this.UnitTrack = false;
        this.Contracttrack = false;
        this.SearchByBuilding = false;
        this.SearchByvendor =true;
    }


}