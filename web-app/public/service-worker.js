// Basic setup af notifikationer, WIP 
navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
        return registration.pushManager.getSubscription()
            .then(async (subscription) => {
                if (subscription) {
                    return subscription;
                }

                //Server key
                const response = await fetch('./vapid-public-key');
                const vapidPublicKey = await response.text();

                // Otherwise, subscribe the user (userVisibleOnly allows to show notifications).
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
                });
            });
    })
    .then((subscription) => {
        // Send the subscription to the server
        fetch('./register', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                subscription: subscription,
            }),
        });

        // Set your UI to show they have subscribed for push messages
        pushButton.textContent = 'Disable Push Messages';
        isSubscribed = true;
    });

// urlBase64ToUint8Array function is needed because the subscription server key is base64 URL safe encoded
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}