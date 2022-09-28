const asyncHandler = require('express-async-handler')
const path = require('path')
// desc:    Add a category to a project/user.  
// route:   POST /api/upload
// access:  Private 
// dev:     Aliyu A.   
const uploadFile = asyncHandler(async (req, res) => {
    if(req.files === null){
        throw new Error('No file was uploaded')
    }

    const file = req.files.file

    // only accep jpg and png files for now. though pdf upload works, it does not render in frontend

    uploadPath = path.resolve(__dirname, '../', '../', 'frontend', 'public', 'uploads')

    file.mv(`${uploadPath}/${file.name}`, err => {
        if(err){
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`})
    })
})

module.exports = {
    uploadFile,
}