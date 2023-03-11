import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
    console.log("Content Fragment List loading..");
    
    let cfPersistedQuery = block.textContent;
    let token = "";
    let options = {};
    console.log(window.location.ancestorOrigins.length);
    if(window.location.ancestorOrigins.length > 0) {
        console.log("Using Author");
        cfPersistedQuery = cfPersistedQuery.replace("publish", "author");
        token = "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2NzgwOTUxODIwMTBfZjgwYzllZGYtMDRlNi00MmVkLTk4MGQtMDA5M2IwMWZkNzExX3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6IjgyMUQxRjgwNjMxQzEyQTQwQTQ5NUM3REA3ZTMzMWY4MzYzMWMwY2NhNDk1Y2RkLmUiLCJzdGF0ZSI6IjVFNnVybk9BS0dUbmNXa1JXa1laTGVDbyIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiQzY1REM4QTE1NDg5RTgyMDBBNEM5OEJDQGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJYSUE1MkZQRlhQRjdJUDYyR09RVjNYUUFSUT09PT09PSIsInNpZCI6IjE2Nzc4MzUzOTIzMDdfZmQ4MTA5NTMtZTY0MS00NWY5LWJhNGUtOTk5ODNiZTY4ZDU0X3VlMSIsInJ0aWQiOiIxNjc4MDk1MTgyMDEwXzUyNDYwYWI5LTM4ZDItNDZjZC1iMWEzLTY4N2Q4OTNjYWFiMF91dzIiLCJtb2kiOiJkMDY0YzFiMSIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwicnRlYSI6IjE2NzkzMDQ3ODIwMTAiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJjcmVhdGVkX2F0IjoiMTY3ODA5NTE4MjAxMCIsInNjb3BlIjoiQWRvYmVJRCxvcGVuaWQscmVhZF9vcmdhbml6YXRpb25zLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCJ9.fxKp0caADuTLU4qL0QcK0R1TRYsqSfcyixWyVf_j-Szsmmclc6F9EbFWQ4vceXuUHBVJnkcjKOewhX133h7RSH9JUww5TKe15QnoOiieTMhpLeq-GmMZ1BdwMz6d7Ps8A395W8S_Mcjgc5SpnUbvLJRN4vd4gUQCksQ-KAXGF_7IMiQtZAaPtR4epZ2Z1o_9phZpyJ7GjSy6bjZ63z7BQU3TtjvhnQI5b2HyxGXAOMnDA9wKTuuKqXy_YvCO9H6q7W26VccCtA7MIa0occtdoWkigS7pHtT4wtHVX-8DI9WuEPqEsFxeUhth4uI78WrmbKCOr--RStmRq1ZL_Yzjpg";
        options = {headers: {
            "authorization": token
        }};
    }

    console.log(cfPersistedQuery.trim()+"?ts="+Math.random()*1000);

    const myurl = "https://author-p55117-e571178.adobeaemcloud.com/graphql/execute.json/frescopa/ArticleList";
    token = "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2Nzg1MTE5MzczODZfYzMwY2ZhYWItOWUxMi00ZmE0LWI2MDItYTQzMjJkZDc1MzM1X3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6IjgyMUQxRjgwNjMxQzEyQTQwQTQ5NUM3REA3ZTMzMWY4MzYzMWMwY2NhNDk1Y2RkLmUiLCJzdGF0ZSI6InQ3MXl0RFFQMXp3SU5USFloZmRHMGh6TyIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiQzY1REM4QTE1NDg5RTgyMDBBNEM5OEJDQGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJYSU9QNEZQRlhQTjdNUDYyR09RVjNYUUFGND09PT09PSIsInNpZCI6IjE2Nzg1MTE5MDEyOTRfZWRkMGRhYzYtOWEzZC00MWE3LTk3NGItNDdlZmIwOGZlNTQ5X3VlMSIsInJ0aWQiOiIxNjc4NTExOTM3Mzg2X2Q5N2RiYTM3LTE0MzAtNDg2NS1hOWYwLTI1ZWE5MmFiN2IyNV91dzIiLCJtb2kiOiI1MDUzOTExMSIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwicnRlYSI6IjE2Nzk3MjE1MzczODYiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJzY29wZSI6IkFkb2JlSUQsb3BlbmlkLHJlYWRfb3JnYW5pemF0aW9ucyxhZGRpdGlvbmFsX2luZm8ucHJvamVjdGVkUHJvZHVjdENvbnRleHQiLCJjcmVhdGVkX2F0IjoiMTY3ODUxMTkzNzM4NiJ9.EwCLZRoF1PaxwjxtyS4EGfXaqImHbo0RNNfYQXLdp4mitVk6mjVDj62CdATul9qYMoQPnWXjemSMibGDDZx8QG07-xwW91ceivWTVtBN4nzc_KQhU0Afzkn4zfQW7PbZHcriJtR6osDDDBv__GN7-krrN5ZDrL3kvAFg1ywa93zWdPrnnKfZGbAwycrb7lXwvoouf-dic9Ulji__Nzmrfb7msNbN0p9L1-knaIKUvieO1l5o3obxEDPHovM7GVLsiDcPUCO2xrppDtz2RGlru2HURx-LeNbpZt3QqRYcK9beUiXm2JDO0KcVU-qCtIMtpMUHgbO61-wD4tmhiuEfpQ";
    options = {headers: {
        "authorization": token
    }};

    const cfReq = fetch(myurl+"?ts="+Math.random()*1000, options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.data) {
            const cfList = data.data.articleList.items;
            const cfListBlock = document.createElement('ul');
            cfListBlock.setAttribute("class", "article-items");
            cfList.forEach(cf => {
                let ctaUrl = '';
                let imageUrl = '';
                let description = '';
                // if(cf.ctaUrl !== null) {
                //     ctaUrl = cf.ctaUrl["_publishUrl"];
                // }
                if(cf.heroImage !== null) {
                    imageUrl = cf.heroImage["_publishUrl"];
                    //console.log(cf.heroImage)
                    description = cf.main["plaintext"];
                    //console.log(description);
                    const cfElem = document.createElement('li', {"class": "article-item"});
                    cfElem.setAttribute("class", "article-item");
                    cfElem.setAttribute("itemscope", "");
                    cfElem.setAttribute("itemid", "urn:aemconnection:" + cf["_path"] + "/jcr:content/data/master");
                    cfElem.setAttribute("itemtype", "reference");
                    cfElem.setAttribute("itemfilter", "cf");
                    const offer = '<a href="'+ctaUrl+'"><img class="article-item-image" src="'+imageUrl+'" alt="'+cf.headline+'" itemprop="primaryImage" itemtype="media"></a><div class="article-item-title" itemprop="headline" itemtype="text"><h5>'+cf.headline+'</h5></div><div class="article-item-desc" itemprop="main" itemtype="richtext">'+description+'</div>';
                    cfElem.innerHTML = offer;
                    cfListBlock.appendChild(cfElem);
                }
                
            });
            block.textContent = "";
            block.append(cfListBlock);
        }
    });
}