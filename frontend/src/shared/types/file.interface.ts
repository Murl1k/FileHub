export interface IFileData {
    id: string,
    folder: string | null
    size: number
    name: string
    url: string
    created_at: string
    updated_at: string
    is_public: boolean
}