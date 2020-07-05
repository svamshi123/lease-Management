public with sharing class BuildingInfo{
   
	@AuraEnabled
    public static String getName(){
        String name = UserInfo.getName(); 
        return name;
    }
    @AuraEnabled
    public static void buildingInfomethod(String namefiels,Decimal unitprice,String address,Integer count){
         List<Unit__c> containBuildingUnit = new List<Unit__c>();
         List<Building__c> buildingList = new List<Building__c>();
         List<Unit__c> unitList = new List<Unit__c>();
        
        System.debug('namefiels'+namefiels+','+address+','+unitprice+','+count);
        Building__c b = new Building__c();
        b.Name = namefiels;
        b.Building_Address__c = address;
        b.UnitsNeedTo_Add__c = count;
        b.unit_Price__c = unitprice;
        buildingList.add(b);
        System.debug('buildingList'+buildingList);
        List<Building__c> containBuilding = new List<Building__c>();
        containBuilding = [select id,name from Building__c where Name =:b.Name];
        System.debug('containBuilding'+containBuilding);
        if(containBuilding.isEmpty()){
             insert buildingList;
        }
        if(!containBuilding.isEmpty()){
            System.debug('units added');
             containBuildingUnit = [select id from Unit__c where Building__r.id =: b.id];
        }
        System.debug('containBuildingUnit'+containBuildingUnit);
        if(count != null && count > 0 && containBuildingUnit.isEmpty()){
           for(Integer i=1;i<=count;i++){
            Unit__c u = new Unit__c();
            u.Name = 'Block'+i;
               if(b.id != null){
                   u.Building__c = b.id;
               }else{
                  u.Building__c = containBuilding[0].id;
               }
           // u.occupied__c = true;
            unitList.add(u); 
        }
        System.debug('unitList'+unitList);
        insert unitList; 
        }
    }

    @AuraEnabled
    public static void insertContract(String name,String building,String unit,String contact,String status){
        List<Contract__c> contractList = new List<Contract__c>();
        system.debug('prara'+name+','+building+','+unit+','+contact+','+status);
        List<Building__c> buidlList  = [select Id from Building__c where name =:building];
        List<Unit__c> unitList = [select Id from Unit__c where name =:unit LIMIT 1];
        List<Contact> contactList = [select Id from Contact where name =:contact];

        Contract__c crt = new Contract__c();
        crt.name = name;
        crt.Building__c = buidlList[0].Id;
        crt.Unit__c = unitList[0].Id;
        crt.Contact__c = contactList[0].Id;
        crt.Status__c = status;
        contractList.add(crt);
        system.debug('Contract'+contractList);
        insert contractList;
    }

    @AuraEnabled
    public static String getUnits(){
        
        List<Unit__c> unitLsit = [select id,name,Building__r.Name,occupied__c from Unit__c];

        return JSON.serialize(unitLsit);
    }

    @AuraEnabled(cacheable=true)
    public static List<OptionWrapper> getBuildings(){
        List<OptionWrapper> buidlList = new List<OptionWrapper>();
        List<Building__c> buildingList = [select id,name from Building__c];
        for(Building__c b :buildingList){
            buidlList.add(new OptionWrapper(b.name,b.name));
        }
        system.debug(buidlList);
        return buidlList;
    }

    @AuraEnabled(cacheable=true)
    public static List<OptionWrapper> getUnitList(String buidlingname){
        List<OptionWrapper> unList = new List<OptionWrapper>();
        list<Building__c> buidId = [select id from Building__c where Name =: buidlingname]; 
        List<Unit__c> unitLsit = [select id,name,Building__r.Name,occupied__c from Unit__c where Building__r.Id =: buidId[0].Id];

        for(Unit__c b :unitLsit){
            unList.add(new OptionWrapper(b.name,b.name));
        }
        system.debug(unList);
        return unList;
    }

    @AuraEnabled(cacheable=true)
    public static List<OptionWrapper> getContact(){
        List<OptionWrapper> conList = new List<OptionWrapper>();
        List<Contact> contactList = [select id,name from Contact];
        for(Contact c :contactList){
            conList.add(new OptionWrapper(c.name,c.name));
        }
        system.debug(conList);
        return conList;
    }

    @AuraEnabled
    public static list<Building__c> searchByBuilding(String name){
        
        List<Building__c> con = [select id,Name,(select name from Contracts__r) from Building__c  where name Like:name];

        return con;
    }
    @AuraEnabled
    public static list<Contact> searchByVenodr(String name){
        
        List<Contact> con = [select id,Name,(select name from Contracts__r) from Contact  where name Like:name];

        return con;
    }
    public class OptionWrapper {
        @AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public String value {get; set;}
    
        public OptionWrapper(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}

