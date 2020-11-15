var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BDLbwTEw93TPqVvMw0-btRuWzE8bB0jRhLLkb0qvZ-obCn5pCAg1O-CyEC-e_dIcgyiVVyJK5U28gyTpgiBJ5xU",
    "privateKey": "rHw5yo8uUwyXIOzjV95F8fOtVoU4RjIJgXViLOB_Yeo"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cKeRY9zZHS0:APA91bGS7lYitMV4b9FMcEVX7J17BmjkRe0fvyRXdnhHnrEzi8ECw3eCp0IlX3X1cwepC_OjjQEqKHyJvUO71U8xUbEk4mcB8eDjDa-cQnIVftcS9l6sanKhe-tXhTxMwYJD5aWHJFMr",
    "keys": {
        "p256dh": "BAK0uqlM2v6FyTUm4ZgHZoieK7QqWGtcyet6q+wORbUUXCVOt5RFMYmS6ttb/1mhQuxOTcdKc/tHX9uff0exI/4=",
        "auth": "ni54uJu/TGQm0y0hLtNOwg=="
    }
};
var payload = 'Halo, ini push notif!';
var options = {
    gcmAPIKey: '48299598678',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);