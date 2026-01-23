import Contentstack from "contentstack"

const Stack = Contentstack.Stack({
    api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY,
    delivery_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN,
    environment: import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT,
    live_preview: { 
        preview_token: import.meta.env.VITE_CONTENTSTACK_PREVIEW_TOKEN, 
        enable: true, 
        host: 'rest-preview.contentstack.com'
    }
});

export default Stack;