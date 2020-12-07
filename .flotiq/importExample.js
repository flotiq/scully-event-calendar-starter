const dotenv = require(`dotenv`)
dotenv.config()
const fetch = require(`node-fetch`)
const assert = require(`assert`).strict
const path = require(`path`)
const fs = require(`fs`)

let headers = {
    accept: `application/json`,
}
let apiUrl

const directoryPath = path.join(__dirname, ``)

exports.importExamples = async () => {
    apiUrl = 'https://api.flotiq.com';
    headers[`X-AUTH-TOKEN`] = process.env.GATSBY_FLOTIQ_API_KEY
    assert.ok(process.env.GATSBY_FLOTIQ_API_KEY,`You must specify API token, preferably Read and write Application API key (if you don't know what it is check: https://flotiq.com/docs/API/)`)

    let directories = fs.readdirSync(directoryPath)
    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        if(directory.indexOf(`ContentType`) === 0) {
            let contentDefinition = require(directoryPath + `/` + directory + `/ContentTypeDefinition.json`)
            let contentTypeDefinitionResponse = await fetch(apiUrl + `/api/v1/internal/contenttype/` + contentDefinition.name, { headers: headers })
            if (!contentTypeDefinitionResponse.ok) {
                if (contentTypeDefinitionResponse.status === 404) {

                    let res = await fetch(apiUrl + `/api/v1/internal/contenttype`, {
                        method: `POST`,
                        body: JSON.stringify(contentDefinition),
                        headers: {...headers, 'Content-Type': `application/json`},
                    })
                    if (res.status === 403) {
                        assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                    }
                } else if (contentTypeDefinitionResponse.status === 403) {
                    assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                }
            }

            let files = fs.readdirSync(directoryPath + '/' + directory)
            await Promise.all(files.map(async function (file) {
                if (file.indexOf(`contentObject`) === 0) {
                    let contentObject = require(directoryPath + '/' + directory + `/` + file)
                    let id = contentObject.id
                    let res = await fetch(apiUrl + `/api/v1/content/` + contentDefinition.name + `/` + id, {method: `HEAD`, headers: headers})
                    let method = `POST`
                    let url = apiUrl + `/api/v1/content/` + contentDefinition.name
                    if (res.status === 403) {
                        assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                    }
                    if (res.ok) {
                        method = `PUT`
                        url += `/` + id
                    }
                    contentObject = JSON.stringify(contentObject)
                    res = await fetch(url, {
                        method: method,
                        body: contentObject,
                        headers: {...headers, 'Content-Type': `application/json`},
                    })
                    if (res.status === 403) {
                        assert.ok(false, `Please provide correct API key (Read and write Application API key)`)
                    }
                    return res;
                }
            }))
        }
    }
}

exports.importExamples()
