document.getElementById('sendButton').addEventListener('click', async () => {
    // 選択文字列を取得
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    const { selectionText } = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => {
        return { selectionText: window.getSelection().toString() };
      }
    });
  
    // 生成AIへの送信処理 (例: Fetch API)
    fetch('https://api.example.com/generate', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        "api-key":apikey
        },
        body: JSON.stringify({
            "messages": [
                {
                "role":"system",
                "content": "取得した文字列にハートをつけて返してください。"
                },{
                "role":"user",
                "content":question
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "max_tokens": 800,
            "stop": null
        }),
    })
    .then(response => response.json())
    .then(data => {
      // AIからの応答を処理
      console.log(data);
    });
  });


