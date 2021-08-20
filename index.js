const fs = require('fs');
const fetch = require('node-fetch');

fs.readFile("credentials.txt", "utf8", (err, data) => {
    var data = data.replace("\r", "").split("\n");

    var username = data[0].trim();
    var password = data[1].trim();
    var userId = data[2].trim();
    var authorization = "Bearer ";

    console.log(`Logging in as ${username}...\n`)
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
            "body": `client_id=unity.client&client_secret=secret&grant_type=password&scope=openid%20nebula%20offline_access&username=SE%7c${username}&password=${password}&acr_values=gameId%3aj68d`,
            "method": "POST",
            "mode": "cors"
        }).then(res => res.json())
        .then(loginidentity => {
            if (loginidentity.error) return console.error(`Error found`, loginidentity);
            console.log(`Success! Logged in as ${username}.\n`)

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
                    "body": `grant_type=refresh_token&refresh_token=${loginidentity.refresh_token}&acr_values=gameId%3aj68d%20profileId%3a${userId}`,
                    "method": "POST",
                    "mode": "cors"
                }).then(res => res.json())
                .then(fullidentity => {
                    authorization += fullidentity.access_token;

                    console.log(`Authorized as ${username}\n`);

                    pet(userId, authorization);
                });
        });
});

function pet(userId, authorization) {
    var pets = ["be3ec39825a8418ca67a9db50f187b5f",
        "bf445340671747558085b150a9f6520f",
        "71e8ce50fd0d41eeb71b37e8ae1f5add",
        "257fc13d6afa46428f75fee61ac1a0cf",
        "8034fa8002574c1582856cb6b4b6fceb",
        "53fc952f04d24c8a9ea27fef83402576",
        "27e42204c22c44bdbd570e9c31f87415",
        "847dc3f04ac040f78047a3f7fa322201",
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

    pets.forEach(function (id, i) {
        setTimeout(function () {

            //interact with the pet
            fetch(`https://eu.mspapis.com/pets/v1/pets/${id}/interactions`, {
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
                "body": `{"profileId":"${userId}","gameId":"j68d"}`,
                "method": "POST",
                "mode": "cors"
            }).then(console.log(`Petted ${id}`));
        }, i * 2000);
    });
};