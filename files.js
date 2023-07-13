const { error } = require('console');
const fs = require('fs');

//reading files
fs.readFile('./docs/blog1.txt', (error, data) => {
    if(error){
        console.log(error);
    }
        console.log(data.toString());
});

//Writing files
fs.writeFile('./docs/blog1.txt', 'Hello, World', () => {
    console.log('File was written');
});


//directories
if(!fs.existsSync('./assets'))
{
    fs.mkdir('./assets', (error) => {
        if(error){
            console.error(error);
        }
            console.log('Folder created');
    });
}else {
    fs.rmdir('./assets', (error) => {
        if(error){
            console.log(error);
        }
            console.log('Folder deleted');
    });
}


// deleting files
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (error) => {
        if(error){
            console.log(error);
        }
            console.log('file deleted');
    });
}
