
public with sharing class InvoiceController {
    @AuraEnabled(cacheable=true)
    public static List<Invoice__c> getInvoicelist(){
        return [SELECT Name, (
                SELECT Id , name FROM Invoice_Line_Item__r)
                FROM Invoice__c WHERE Id IN (SELECT InvoiceId FROM Invoice_Line_Item__c)] ;
    }
} 




