const config = {
    env : {
        imagekit : {
            publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBBLIC_KEY,
            privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
            urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
        }
    }
}

export default config;