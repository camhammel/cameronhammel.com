/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "watchSchema": {
        "url": "https://api.github.com/graphql",
        headers: {
            Authorization(env) {
                return `Bearer ${env.GITHUB_API_READ_TOKEN}`
            }
        },
        interval: 0
    },
    "plugins": {
        "houdini-svelte": {}
    }
}

export default config
