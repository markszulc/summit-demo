export default function decorate(block) {
    
    console.log("Content Fragment List loading..");

const myurl = "https://author-p55117-e571178.adobeaemcloud.com/graphql/execute.json/frescopa/OfferList";
const accessToken = "eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2NzgwOTUxODIwMTBfZjgwYzllZGYtMDRlNi00MmVkLTk4MGQtMDA5M2IwMWZkNzExX3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6IjgyMUQxRjgwNjMxQzEyQTQwQTQ5NUM3REA3ZTMzMWY4MzYzMWMwY2NhNDk1Y2RkLmUiLCJzdGF0ZSI6IjVFNnVybk9BS0dUbmNXa1JXa1laTGVDbyIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiQzY1REM4QTE1NDg5RTgyMDBBNEM5OEJDQGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJYSUE1MkZQRlhQRjdJUDYyR09RVjNYUUFSUT09PT09PSIsInNpZCI6IjE2Nzc4MzUzOTIzMDdfZmQ4MTA5NTMtZTY0MS00NWY5LWJhNGUtOTk5ODNiZTY4ZDU0X3VlMSIsInJ0aWQiOiIxNjc4MDk1MTgyMDEwXzUyNDYwYWI5LTM4ZDItNDZjZC1iMWEzLTY4N2Q4OTNjYWFiMF91dzIiLCJtb2kiOiJkMDY0YzFiMSIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwicnRlYSI6IjE2NzkzMDQ3ODIwMTAiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJjcmVhdGVkX2F0IjoiMTY3ODA5NTE4MjAxMCIsInNjb3BlIjoiQWRvYmVJRCxvcGVuaWQscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCJ9.fxKp0caADuTLU4qL0QcK0R1TRYsqSfcyixWyVf_j-Szsmmclc6F9EbFWQ4vceXuUHBVJnkcjKOewhX133h7RSH9JUww5TKe15QnoOiieTMhpLeq-GmMZ1BdwMz6d7Ps8A395W8S_Mcjgc5SpnUbvLJRN4vd4gUQCksQ-KAXGF_7IMiQtZAaPtR4epZ2Z1o_9phZpyJ7GjSy6bjZ63z7BQU3TtjvhnQI5b2HyxGXAOMnDA9wKTuuKqXy_YvCO9H6q7W26VccCtA7MIa0occtdoWkigS7pHtT4wtHVX-8DI9WuEPqEsFxeUhth4uI78WrmbKCOr--RStmRq1ZL_Yzjpg";


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