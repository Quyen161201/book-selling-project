const express = require('express')
const path = require("path");
const fileupload = require('express-fileupload');
const app = express()
const uploadSingleFile = async (fileObject) => {
    let file_name = new Date().getTime()
    let finalName = file_name + '_' + fileObject.name;
    let uploadPath = ""
    if (path.extname(finalName) == '.png' || path.extname(finalName) == '.jpg') {
        uploadPath = path.join(__dirname, "../public/images/browse-books", finalName);
    }
    else if (path.extname(finalName) == '.pdf' || path.extname(finalName) == '.vnd.ms-excel') {

        uploadPath = path.join(__dirname, "../public/images/book", finalName);
    }
    else {
        return false;
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
const uploatMutiFile = async (fileArr) => {
    let uploadedFiles = [];
    let uploadPath = path.join(__dirname, "../public/images/browse-books")
    let file_name_time = new Date().getTime();
    let countFiles = 0;
    try {
        for (let i = 0; i < fileArr.length; i++) {
            let extname = path.extname(fileArr[i].name)
            let basename = path.basename(fileArr[i].name, extname)
            let finalName = `${basename}-${file_name_time}${extname}`
            let finalPath = `${uploadPath}/${finalName}`

            try {
                await fileArr[i].mv(finalPath)
                countFiles++;
                uploadedFiles.push(fileArr[i].name)
            }
            catch (error) {
                uploadedFiles.push({
                    error: error,
                    name: fileArr[i].name,
                })
            }

        }
        return uploadedFiles
    }
    catch (error) {
        console.log('error', error);
    }


}



module.exports = { uploadSingleFile, uploatMutiFile }