const express = require('express')
const path = require("path");
const app = express()
const fileupload = require('express-fileupload');

const uploadSingleFile = async (fileObject) => {
    try {

        let file_name = new Date().getTime()
        let uploadPath = ""
        let finalName = `${file_name}_${fileObject.name}`;
        if (path.extname(finalName) == '.png' || path.extname(finalName) == '.jpg') {
            uploadPath = path.join(__dirname, "../public/images/browse-books", finalName);
        }
        else if (path.extname(finalName) == '.pdf' || path.extname(finalName) == '.vnd.ms-excel') {

            uploadPath = path.join(__dirname, "../public/images/book", finalName);
        }
        else {
            return null;
        }
        try {
            await fileObject.mv(uploadPath)
            console.log('finalname', finalName)
            return finalName

        }
        catch (error) {
            console.log('error', error)

        }
    }
    catch (error) {
        console.log(error)
    }


}
const uploatMutiFile = async (fileArr) => {
    let uploadedFiles = [];
    let uploadPath = path.join(__dirname, "../public/images/browse-books")
    let file_name_time = new Date().getTime();
    let countFiles = 0;
    try {
        for (let i = 0; i < fileArr.length; i++) {
            let extname = path.extname(fileArr[i].name)
            let basename = path.basename(fileArr[i].name, extname)
            let finalName = `${file_name_time}_${basename}${extname}`
            let finalPath = `${uploadPath}/${finalName}`

            try {
                await fileArr[i].mv(finalPath)
                countFiles++;
                uploadedFiles.push(finalName)
            }
            catch (error) {

            }

        }

        return uploadedFiles
    }
    catch (error) {
        console.log('error', error);
    }


}



module.exports = { uploadSingleFile, uploatMutiFile }