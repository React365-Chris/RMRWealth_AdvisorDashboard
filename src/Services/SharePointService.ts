import { WebPartContext } from "@microsoft/sp-webpart-base";
import { EnvironmentType } from "@microsoft/sp-core-library"; 
import {
    HttpClient,
    HttpClientResponse,
    SPHttpClient,
    ISPHttpClientOptions,
    SPHttpClientResponse,
    SPHttpClientConfiguration,
  } from "@microsoft/sp-http";
import { IListCollection } from "./IList";
import { IListItemCollection } from "./IListItem";
import { IListFieldCollection } from "./IListField";


const CHECKLOG_LOGICAPP_ENDPOINT: string = 'https://prod-36.eastus2.logic.azure.com:443/workflows/9e13936109ce44d3954bfc8f99ce4285/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nfU7_6w3_ROZaYBQW7q_BY_KvUQ-PCsc-zkkGt2Rz-4&Email=';

const RELATIONSHIP_LOGICAPP_ENDPOINT: string = 'https://prod-26.eastus2.logic.azure.com:443/workflows/245bf03801f044028cd9689953c43f53/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=giOc0B3CBpiGJrV05Zj0ZVMr5jhxwfECoeYzikUbmBc&Email=';

//GetMyRepCodes Logic APP
const REPCODE_LOGICAPP_ENDPOINT: string = 'https://prod-46.eastus2.logic.azure.com:443/workflows/14efa6e8a66a4972a046f68a35ce8042/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=66Ud0Z9DcBChcIGsjYeBwOYpAj2t2h43WXwq9118--s&Email=';

//Branches = 8dc913e1-df23-43d9-a386-1d16f8be52df
//Branch Advisors = cabe2cb8-4a8c-45c6-9fe4-61a952a35313
//CheckLog = ce2fd595-41d8-4ceb-a5dd-6c416a7befbe
//Correspondence = 5011a439-fc91-4da5-9d98-8bcc317c43db
//RMR Rep Payouts = 2dd73365-9267-40f9-8411-c931668c2003
//Relationships = 3778936d-84b1-42b0-9170-f7420b0b6c6a


export class SharePointServiceManager {  

    public context: WebPartContext;
    public environmentType: EnvironmentType;

    public setup(context: WebPartContext) : void{
        this.context = context;
    } 

    public getRepCodesLogicApp():Promise<any>{
        return this.context.httpClient.get(`${REPCODE_LOGICAPP_ENDPOINT+this.context.pageContext.user.email}`, HttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public getRelationshipsLogicApp():Promise<any>{
        //check and prepare rep codes into variable
        console.log(`${RELATIONSHIP_LOGICAPP_ENDPOINT+this.context.pageContext.user.email+'&type=all'}`);
        return this.context.httpClient.get(`${RELATIONSHIP_LOGICAPP_ENDPOINT+this.context.pageContext.user.email+'&type=all'}`, HttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });   
    }
    public getTop5RelationshipsLogicApp():Promise<any>{
        //console.log(`${RELATIONSHIP_LOGICAPP_ENDPOINT+this.context.pageContext.user.email+'&type=5'}`)
        //check and prepare rep codes into variable
        return this.context.httpClient.get(`${RELATIONSHIP_LOGICAPP_ENDPOINT+this.context.pageContext.user.email+'&type=5'}`, HttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });   
    }

    public get(relativeEndPointUrl: string): Promise<any>{
        return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}${relativeEndPointUrl}`, SPHttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public getOperations(relativeEndPointUrl: string): Promise<any>{
        console.log('getOperations', `https://rmrwealth1.sharepoint.com/sites/operationsteam${relativeEndPointUrl}`);     
        return this.context.spHttpClient.get(`https://rmrwealth1.sharepoint.com/sites/operationsteam${relativeEndPointUrl}`, SPHttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public _getWorkignFilesTemp(listUrl:string):Promise<IListItemCollection>{
        return this.getOperations(`/_api/web/getFolderByServerRelativeUrl('${listUrl}')/files`);
    }
    
    public post(relativeEndPointUrl: string, spOpts:any): Promise<any>{
        console.log('posting................',relativeEndPointUrl,spOpts);
        return this.context.spHttpClient.post(`${relativeEndPointUrl}`, SPHttpClient.configurations.v1,spOpts).then(response => {
            if(!response.ok) return Promise.reject('post Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public _postCheckLogFile(listUrl:string,spOpts:any):Promise<IListItemCollection>{
        return this.post(listUrl,spOpts);
    }

    //var url = `https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/Web/GetFolderByServerRelativeUrl('Test')/Files/Add(url='${file.name}', overwrite=true)`; example URL 
    public _postWorkignFiles(listUrl:string, spOpts:any):Promise<IListItemCollection>{
        return this.post(listUrl,spOpts);
    }


//$select=Title,RelationshipType,WritingAdvisorRep__c,ServicingAdvisorRepCode,RelationshipId,OwnerName,CreatedInSalesForce,RecordTypeName,RepCode
//$filter=${Query}&
    public getRelationshipsSP(): Promise<any>{ 
        //console.log(`https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/GetById('3778936d-84b1-42b0-9170-f7420b0b6c6a')/items?$filter=${Query}&$top=10000`);       
        return this.context.spHttpClient.get(`https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/GetById('3778936d-84b1-42b0-9170-f7420b0b6c6a')/items?$top=10000&$orderby=Title asc`, SPHttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public getCheckLogsSP(Query: string): Promise<any>{        
        return this.context.spHttpClient.get(`https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/GetById('ce2fd595-41d8-4ceb-a5dd-6c416a7befbe')/items?$filter=${Query}&$top=10000`, SPHttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public getRelationshipCheckLogsSP(RelationshipID: string): Promise<any>{ 
        return this.context.spHttpClient.get(`https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/GetById('ce2fd595-41d8-4ceb-a5dd-6c416a7befbe')/items?$select=*,ReadyforReview,Processor/EMail&$filter=RelationshipId eq '${RelationshipID}'&$expand=Processor`, SPHttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public getCorresondenceLogsSP(RelationshipID: string): Promise<any>{ 
        return this.context.spHttpClient.get(`https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/GetById('5011a439-fc91-4da5-9d98-8bcc317c43db')/items?$filter=RelationshipId eq '${RelationshipID}'`, SPHttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public getCheckLogsLogicApp():Promise<any>{
        return this.context.httpClient.get(`${CHECKLOG_LOGICAPP_ENDPOINT+this.context.pageContext.user.email}`, HttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    //_api/web/lists/GetById('5011a439-fc91-4da5-9d98-8bcc317c43db')/items?$filter=RelationshipId eq '${RelationshipID}'
   // _api/web/GetFolderByServerRelativeUrl('/Shared Documents')`

    public getWorkingFiles(relativeEndPoint: string): Promise<any>{        
        return this.context.spHttpClient.get(`https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/GetFolderByServerRelativeUrl('${relativeEndPoint}')`, SPHttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public _getWorkignFiles(url):Promise<IListItemCollection>{
        //return this.getRelationshipsLogicApp();   
        return this.getWorkingFiles(url);
    } 

    public getWorkingFilesIndividual(relativeEndPoint: string): Promise<any>{        
        return this.context.spHttpClient.get(`https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/GetFolderByServerRelativeUrl('${relativeEndPoint}')/files`, SPHttpClient.configurations.v1).then(response => {
            if(!response.ok) return Promise.reject('Get Request Failed');
            return response.json();
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    public _getWorkignFilesIndividual(url):Promise<IListItemCollection>{
        //return this.getRelationshipsLogicApp();   
        return this.getWorkingFilesIndividual(url);
    }
    
    
    public _getRelationships():Promise<IListItemCollection>{
        //return this.getRelationshipsLogicApp();   
        return this.getRelationshipsSP();
    }
    public getCheckLogs(repCodeQuery):Promise<IListItemCollection>{
        return this.getCheckLogsSP(repCodeQuery);
    }
    public getRelationshipCheckLogs(relationshipID):Promise<IListItemCollection>{
        return this.getRelationshipCheckLogsSP(relationshipID);
    }
    public getRelationshipCorrespondenceLogs(relationshipID):Promise<IListItemCollection>{
        return this.getCorresondenceLogsSP(relationshipID);
    }

    public _getItem(url):Promise<IListItemCollection>{
        return this.getOperations(url);
    }
 


}

const SharePointService = new SharePointServiceManager();
export default SharePointService;
   