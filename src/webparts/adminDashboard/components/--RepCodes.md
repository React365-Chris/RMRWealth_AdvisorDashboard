--RepCodes
https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/GetById('850b0332-87cd-43f2-aaa8-345c154cf837')/items?


--RepPayouts = 2dd73365-9267-40f9-8411-c931668c2003

Start w/RepPayouts and fill in data from RepCodes
https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/GetById('2dd73365-9267-40f9-8411-c931668c2003')/items?$Select=PostToAccount,Title,CO,Payout,RepCodeId,Rep/EMail,RepCode/calculateStatus,RepCode/Title,RepCode/Rep_x0020_Description,RepCode/TDAmeritradeNonWrapCode,RepCode/TDAmeritradeWrapCode,RepCode/calculateType,RepCode/calculateSpecialG,RepCode/calcualteTransferRights&$filter=RepCode/calculateStatus eq 'Active' &$expand=Rep,RepCode&$top=10000


RepCode = RepCodes
RepDescription = RepCodes
Type = RepCodes 
Payout = RepPayouts
TD Non = RepCode
TD Wrap = RepCode
Special G = RepCode ,RepCode/calculateSpecialG
Transfer Rights = RepCode ,RepCode/calcualteTransferRights


--Sig
https://rmrwealth1.sharepoint.com/sites/operationsteam/_api/web/lists/GetById('f9c10533-42bb-46e8-b34d-c0aa7070b024')/items?$Select=Title,AccountNumber,RelationshipName,ContactName,ContactName2,EntityName,DateReceived,RepID/Title,Product,Reason,Amount,Shares,Processor/Name,ReadyforReview,Recommendations,Modified,Editor/Title&$expand=Processor,RepID,Editor

PostToAccount,Title,CO,Payout,RepCodeId,Rep/EMail,RepCode/calculateStatus,RepCode/Title,RepCode/Rep_x0020_Description,RepCode/TDAmeritradeNonWrapCode,RepCode/TDAmeritradeWrapCode,RepCode/calculateType,RepCode/calculateSpecialG,RepCode/calcualteTransferRights&$filter=RepCode/calculateStatus eq 'Active' &$expand=Rep,RepCode&$top=10000
