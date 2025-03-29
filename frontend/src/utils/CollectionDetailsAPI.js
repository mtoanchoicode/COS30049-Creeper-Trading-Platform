import { createClient } from "@supabase/supabase-js";
import { notification } from "antd";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const uploadImageToDB = async (contractAddress, image) => {
    //Name = {contractAddress}_bg.ext
    const fileExt = image.name.split(".").pop();
    const fileName = `${contractAddress}_bg.${fileExt}`;
    const filePath = `${fileName}`

    //Check if the file already exists
    const { data: listData, error: listError } = await supabase.storage
        .from('collections-background')
        .list('', { search: filePath });

    if (listError) {
        console.error("Error listing files:", listError);
        notification.error({
            message: "Collection background failed",
            description: "Error checking existing files in database",
        });
        return;
    }

    if (listData.length > 0) {
        console.log("File exists, deleting old file:", filePath);
        //Delete the old background image
        const { error: deleteError } = await supabase.storage
            .from('collections-background')
            .remove([filePath]);

        if (deleteError) {
            console.error("Error deleting old file:", deleteError);
            notification.error({
                message: "Collection background failed",
                description: "Error deleting old file from database",
            });
            return;
        }
    }

    const { data, error } = await supabase.storage
        .from('collections-background')
        .upload(filePath, image);

    if (error) {
        console.error("Error uploading collection background:", error);
        notification.error({
            message: "Collection background failed",
            description: "Error uploading collection to database",
        });
    }

    const { data: url} = await supabase.storage
        .from('collections-background')
        .getPublicUrl(filePath);

    console.log(url.publicUrl);
    addImageUrlToDB(contractAddress, url.publicUrl);
}

const addImageUrlToDB = async (contractAddress, url) => {
    try{
        await fetch(`${API_BASE_URL}/v1/api/collectionDetails/updateImageURL`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contractAddress: contractAddress.toString(),
                collectionImage: url.toString()
            }),
        });
    }catch (err) {
        console.error("Error setting collection background URL:", err);
        notification.error({
            message: "Collection background failed",
            description: "Error adding collection background URL to database",
        });
    }
}

const getImageURLFromDB = async (contractAddress) => {
    try{
        const response = await fetch(`${API_BASE_URL}/v1/api/collectionDetails/?contractAddress=${contractAddress.toString()}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        return data.BackgroundURL;
    }catch (err) {
        console.error("Error getting collection background URL:", err);
        notification.error({
            message: "Collection background failed",
            description: "Error getting collection background URL from database",
        });
    }
}

const getDescriptionFromDB = async (contractAddress) => {
    try{
        const response = await fetch(`${API_BASE_URL}/v1/api/collectionDetails/?contractAddress=${contractAddress.toString()}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        return data.Description;
    }catch (err) {
        console.error("Error getting collection description:", err);
        notification.error({
            message: "Collection description failed",
            description: "Error getting collection description from database",
        });
    }
}

export { uploadImageToDB, getImageURLFromDB, getDescriptionFromDB };
    