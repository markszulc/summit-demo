export default function decorate(block) {
    
    console.log("Content Fragment List loading..");

const myurl = "https://author-p55117-e571178.adobeaemcloud.com/graphql/execute.json/frescopa/OfferList";
const accessToken = "eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2NzgwMDY3Njg2MTZfNmEyM2ViMjktZThmNi00Yzg5LThhMjItZjgyZWM1OGVlOGNkX3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6IjgyMUQxRjgwNjMxQzEyQTQwQTQ5NUM3REA3ZTMzMWY4MzYzMWMwY2NhNDk1Y2RkLmUiLCJzdGF0ZSI6ImZKYlluRm9kMXN5QURFbExsejJERVJPQiIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiQzY1REM4QTE1NDg5RTgyMDBBNEM5OEJDQGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJYSDZCV0ZQRlhQRjdJUDYyR09RVjNYUUFSUT09PT09PSIsInNpZCI6IjE2Nzc4MzUzOTIzMDdfZmQ4MTA5NTMtZTY0MS00NWY5LWJhNGUtOTk5ODNiZTY4ZDU0X3VlMSIsInJ0aWQiOiIxNjc4MDA2NzY4NjE2XzYyYWViMjc5LWMxY2UtNDZmZS1hMWU1LTE0M2ExN2VlMjFmMV91dzIiLCJtb2kiOiJkNmZlNWE5ZSIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwicnRlYSI6IjE2NzkyMTYzNjg2MTYiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJjcmVhdGVkX2F0IjoiMTY3ODAwNjc2ODYxNiIsInNjb3BlIjoiQWRvYmVJRCxvcGVuaWQscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCJ9.dNt6WJYmR4nkqpZr6Hj2nSd_wfx0fmRf9o_uac9cKwI-L_OYipcomx3c9ovw5FISL5DiB8r-clxNb1ybLJfxUokcN2qNIdjl4lfwvFe5LX7S627ktXjWGCeiE0XaPcHQ4mdIsB1VT7NISzGJHAar6ikAf-sCpRsFWtYsVw8p1pGTH6mWLk81bDrIWlg5GfypeTQD4HFAc94mkkhBmj-kFOdZrpS5U9f9sLfmVD7aNuIdUez7xbMETQVBi4u_CUPDoh-6KIri6jXKcMtmsXaUH491EIMl5LlEP73oewPjFgqlXfopqzZakz3h7BeLx53K36gb188T1SQARaNop90wmQ";

fetch(myurl,{
    headers:{
        "Content-Type" : "application/json",
        "authorization" : "Bearer " + accessToken
    },

}).then((response) => response.json())
.then((data) => {
    console.log(data);
    if(data){
        const cfList = document.createElement("ul");
        // cfList.setAttribute('itemid','urn:aemconnection:/content/dam/frescopa/en/offers');
        // cfList.setAttribute("itemtype", "container");
        const cfRaw = data.data.offerList.items;
        if(cfRaw && cfRaw.length > 0) {
            cfRaw.forEach(cf => {
                if(cf["_path"].includes('content/dam/frescopa/en/offers') ) {
                    const cfElem = document.createElement('li', {"itemid": "urn:aemconnection"+cf["_path"], "itemtype": "component"});
                    cfElem.setAttribute("itemid", "urn:aemconnection:"+cf["_path"]+"/jcr:content/data/master");
                    cfElem.setAttribute("itemtype", "reference");
                    cfElem.setAttribute("itemscope", true);
                    cfElem.setAttribute("itemfilter", "cf");
                    const headline = document.createElement('p', {"itemprop": "headline", "itemtype": "text"});
                    headline.setAttribute("itemprop", "headline");
                    headline.setAttribute("itemtype", "text");
                    headline.textContent = cf.headline;
                    cfElem.appendChild(headline);
                    cfList.appendChild(cfElem);
                }
            });
            block.append(cfList);
 
        }
    }

});
}