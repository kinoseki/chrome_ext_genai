chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translate",
        title: "Translate with Azure OpenAI",
        contexts: ["selection"]
    });
    console.log("menu created")
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "translate") {
        console.log("translate start")

        const selectedText = info.selectionText;
        const translation = await translateText(selectedText);
        chrome.storage.local.set({ translation: translation, original: selectedText });
        await chrome.action.openPopup();
        chrome.runtime.sendMessage({ action: "asyncActionCompleted" }).catch((error) => {
            console.error(error);
        });;
    }
});

async function translateText(text) {
    const url = 'https://genai.example.com';
    const apiKey = 'YourApiKey';
    const systemprompt = 'please translate input text to Japanese'
    console.log("request for openai start")
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "api-key": apiKey
        },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "system",
                    "content": systemprompt
                }, {
                    "role": "user",
                    "content": text
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "max_tokens": 800,
            "stop": null
        }),
    });
    const data = await response.json();
    console.log(data)
    return data.choices[0].message.content;
}


