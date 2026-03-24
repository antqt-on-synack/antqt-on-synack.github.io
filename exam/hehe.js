
// Payment widget integration 
class PaymentWidget {
    constructor (containerId) {
        this.container = document.getElementById(containerId);
        this.setupMessageListener();
    }
    setupMessageListener() {
        window.addEventListener('message', (event) => {
            const data = event.data;
            if (data.type === 'redirect') {
                if (!data.url.match(/^javascript\:/i)) {
                    window.location.href = data.url;
                } else {
                    window.location.href = 'https://example.com/account/my-orders'
                }
            } else {
                this.updatePaymentStatus (data.status, data.message);
            } 
        });
    }

    updatePaymentStatus (status, message) {
        const statusDiv = document.getElementById('payment-status');
        statusDiv.innerHTML =`
            <div class="status-${encodeURIComponent (status)}">
                <h3>Payment ${encodeURIComponent (status)}</h3>
                <p>${encodeURIComponent (message)}</p>
            </div>
        `;
    }

    sendToPaymentFrame (message) {
        const iframe = document.getElementById('payment-iframe');
        iframe.contentWindow.postMessage (message, '*');
    }
}

// Initialize payment widget
const paymentWidget = new PaymentWidget('payment-container');
function processPayment (amount, currency) {
    paymentWidget.sendToPaymentFrame({
        type: 'init_payment',
        amount: amount,
        currency: currency,
        callback_url: window.location.origin + '/payment/callback'
    });
}
