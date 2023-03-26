export default defineEventHandler((event: any) => {
    // return unix timestamp
    return { "timestamp": Date.now() }
})
