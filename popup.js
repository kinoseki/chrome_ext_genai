document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['translation', 'original'], (result) => {
        const translation = result.translation;
        const original = result.original
        // const formattedOriginal = original.match(/.{1,100}/g).join('\n');
        document.getElementById('original').textContent = `${original}`;
        // document.getElementById('original').style.width = `${formattedOriginal.length}px`;
        document.getElementById('translated').textContent = `${translation}`;
        // document.getElementById('translated').style.width = `${translated.length * 10}px`;
    });
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "asyncActionCompleted") {
        chrome.storage.local.get(['translation', 'original'], (result) => {
            const translation = result.translation;
            const original = result.original
            // const formattedOriginal = original.match(/.{1,100}/g).join('\n');
            document.getElementById('original').textContent = `${original}`;
            // document.getElementById('original').style.width = `${formattedOriginal.length}px`;
            document.getElementById('translated').textContent = `${translation}`;
            // document.getElementById('translated').style.width = `${translated.length * 10}px`;
        });
    }
    console.log("Message received in runtime:", message);
    sendResponse({ response: "Message received" });
    return true;
});
