import Api from './Api'

let _method = 'GET'

const Wc = {
    async get(endpoint, options) {
        _method = 'GET'
        let res = await Api.get(endpoint, options)
        if (!res) return {}
        let data = await res.json()
        
        return await this.assert(data)
    },
    async post(endpoint, options) {
        _method = 'POST'
        let res = await Api.post(endpoint, options)
        if (!res) return {}
        let data = await res.json()
        
        return await this.assert(data)
    },
    async assert(data) {
        if (data.fallback) {
            data = await new Promise((resolve) => {
                var xhttp = new XMLHttpRequest()
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status != 200) resolve(null)
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(this.responseText))
                    }
                };
                xhttp.open(data.fallback.method, data.fallback.url, true)
                _method == 'POST'? xhttp.setRequestHeader('Content-type', 'application/json'):null
                _method == 'POST'? xhttp.send(JSON.stringify(data.fallback)):xhttp.send()
            })
        }
        return {data}
    }
}

export default Wc