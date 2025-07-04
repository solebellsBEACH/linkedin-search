const isProd = false

export function redirectUrl(url:string){
    if(isProd) chrome.tabs.create({ url })
    else _sendLogs(redirectUrl.name,{url})
}

function _sendLogs(functionName:string, data?:any){
    console.log({functionName, response:data, type:'Chrome Fake Logs'})
}
