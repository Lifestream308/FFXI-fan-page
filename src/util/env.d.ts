/// <reference types="vite/client" /> 

interface ImportMetaEnv {
    VITE_apiKey: string
    VITE_authDomain: string
    VITE_projectId: string
    VITE_storageBucket: string
    VITE_messagingSenderId: string
    VITE_appId: string
    VITE_measurementId: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}