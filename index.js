const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();

var authorization = "Bearer ";
console.log(process.env)
console.log(`Logging in as ${process.env.MSP_USERNAME}...\n`);

//get refresh token
fetch("https://eu.mspapis.com/loginidentity/connect/token", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,sv;q=0.7",
            "content-type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"92\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrer": "https://moviestarplanet2.se/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `client_id=unity.client&client_secret=secret&grant_type=password&scope=openid%20nebula%20offline_access&username=SE%7c${process.env.MSP_USERNAME}&password=${process.env.MSP_PASSWORD}&acr_values=gameId%3aj68d`,
        "method": "POST",
        "mode": "cors"
    }).then(res => res.json())
    .then(loginidentity => {
        if (loginidentity.error) return console.error(`Error found`, loginidentity);
        console.log(`Success! Logged in as ${process.env.MSP_USERNAME}.\n`)

        //get final bearer token
        fetch("https://eu.mspapis.com/loginidentity/connect/token", {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-GB,en;q=0.9",
                    "authorization": "Basic dW5pdHkuY2xpZW50OnNlY3JldA==",
                    "content-type": "application/x-www-form-urlencoded",
                    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"92\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site"
                },
                "referrer": "https://moviestarplanet2.se/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": `grant_type=refresh_token&refresh_token=${loginidentity.refresh_token}&acr_values=gameId%3aj68d%20profileId%3a${process.env.MSP_ID}`,
                "method": "POST",
                "mode": "cors"
            }).then(res => res.json())
            .then(fullidentity => {
                authorization += fullidentity.access_token;

                console.log(`Authorized as ${process.env.MSP_USERNAME}\n`);

                pet(authorization);
            });
    });


function pet(authorization) {
    var pets = [
        "c26e5b904f35437aa392bb3d1f9af6f8",
        "11bb6dc4e91c4129a49974e68515d451",
        "454fc60941924316abbdf11658656e4d",
        "a1e0f97f9f5e48898f2e8e728a8e39e6",
        "744374b99c4345b48fc2d3cd4593104b",
        "375ea9a2d78a4f5f84f372aba63156af",
        "541dcbc04f964749a661fd3fd0213fe2",
        "3731da13870d4ebd86cc4116bc2ba6eb",
        "c1fb1956038249bea19252ad48959fb4",
        "4312dd90064a4eb6a5027c0cd5a82707"
    ];

    var delay = 2000;

    //delay the petting
    for (let i = 0; i < 10; i++) {
        setTimeout(function () {

            //interact with the pet
            fetch(`https://eu.mspapis.com/pets/v1/pets/${pets[i]}/interactions`, {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-GB,en;q=0.9",
                    "authorization": authorization,
                    "content-type": "application/json",
                    "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"92\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site"
                },
                "referrer": "https://moviestarplanet2.se/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": `{"profileId":"${process.env.MSP_ID}","gameId":"j68d"}`,
                "method": "POST",
                "mode": "cors"
            }).then(console.log(`Petted ${pets[i]}`));
        }, i * delay);
    }
};