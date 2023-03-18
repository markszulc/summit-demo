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

    // console.log(cfPersistedQuery.trim()+"?ts="+Math.random()*1000);

    token = "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2NzkxNjA2MzU5NDVfMDg4YTdhODAtMGNkMi00ZTY1LTg1ZjktZWQ2YzQxZjQ2NmE5X3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkZXYtY29uc29sZS1wcm9kIiwidXNlcl9pZCI6IjgyMUQxRjgwNjMxQzEyQTQwQTQ5NUM3REA3ZTMzMWY4MzYzMWMwY2NhNDk1Y2RkLmUiLCJzdGF0ZSI6ImtNZ2phSGhQTkgyTVVLWHdGRFNRVXdlaiIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiQzY1REM4QTE1NDg5RTgyMDBBNEM5OEJDQGFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJYSkRUVVJCQVhQTjdNUDYyR09RVjNYUUFGND09PT09PSIsInNpZCI6IjE2NzkwMzE2NjcxODhfMDkwZDhmNGItYTkxYi00MzA1LWIwY2YtYjUyOTEyMmRjYzc1X3VlMSIsInJ0aWQiOiIxNjc5MTYwNjM1OTQ2XzRlNjk3NDhiLThiZDgtNDE5YS1iM2YyLTcwNjVkMzQ3ZTFmNF91dzIiLCJtb2kiOiI5ZTI0MGUxYiIsInBiYSI6Ik1lZFNlY05vRVYsTG93U2VjIiwicnRlYSI6IjE2ODAzNzAyMzU5NDYiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJzY29wZSI6IkFkb2JlSUQsb3BlbmlkLHJlYWRfb3JnYW5pemF0aW9ucyxhZGRpdGlvbmFsX2luZm8ucHJvamVjdGVkUHJvZHVjdENvbnRleHQiLCJjcmVhdGVkX2F0IjoiMTY3OTE2MDYzNTk0NSJ9.QP6e-gYl8BSYd7gq102Lxkm6t_tyoVS641hBGIkAQXrrAMI42CegUDAZy816k2fSQJFi7JPlSH7oZGvqRJyEhzaJcX5AqnO1qpvVKuskrFwIRTni37nbnFDS3AxHcE7JI_-c2iPX_xEc0E_l7G3ftDu6s-QV9_Iou9uFk8Ku_B-1TXzfts4-qDlS-STVL1utqh945MuY4vYoQaKrAYvWs9QNwxZ_4bhNEylLevJPW0yrapUoHi84AGRMYyWDncXBgHQiE3xwrsjQEdjjfSMsG75PT47uBOscV_X_yAkvP1EhDQzXmTAmGN9s727umMwbhLrNZ_hbuuGAVdYsCHrgtg";

    const myurl = "https://author-p55117-e571178.adobeaemcloud.com/graphql/execute.json/frescopa/ArticleList";
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