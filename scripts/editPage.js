/*
    This is the main script from editPage
*/
//Get elements to work with these elements
const thumb =       document.getElementById("thumbFile"); 
const audio =       document.getElementById("audioFile");
const txtName =     document.getElementById("txtName");
const img =         document.getElementById("img");
const player =      document.getElementById("player");
const namePreview = document.getElementById("name");

//declare url and id
var urlParams = null;
var id = null;

//event listener on change from thumb Files
thumb.addEventListener("change",(event)=>{
    var url = event.target.files.length > 0 ? URL.createObjectURL(event.target.files[0]) : "";
    img.src = url;
});

//event listener on change from audio Files
audio.addEventListener("change",(event)=>{
    var url = event.target.files.length > 0 ? URL.createObjectURL(event.target.files[0]) : "";
    player.src = url;
});

//event listener on key up from textbox name
txtName.addEventListener("keyup",(event)=>{
    var text = event.target.value != "" ? event.target.value : "Nome do efeito";
    namePreview.innerHTML = text;
});

//upload effect, insert or update depends on id is null or not
function uploadEffect(){
    if(verification()){
        fileToDataUrl(thumb.files[0],function(imgBinary) {
            fileToDataUrl(audio.files[0],function(audioBinary) {
                try{
                    var obj = new Effect(txtName.value,imgBinary,audioBinary,fileToBlob(thumb.files[0]),fileToBlob(audio.files[0]));
                    id == null ? EffectController.insert(obj) : EffectController.update(id,obj);                    
                    alert("Efeito guardado com sucesso!");
                }catch(exception){
                    alert(`Ocorreu erro ao guardar o efeito! \n \n ${exception}`)
                    return;
                }
                clearFields();
            });
        });
    }
}

//clear main fields depends on id is null or not 
function clearFields(){
    thumb.value = '';
    audio.value = '';
    txtName.value = '';
    img.src = '../contents/imgs/bg-img.png';
    player.src = '';
    namePreview.innerHTML = "Nome do efeito";
    if(id){
        urlParams.delete("id");
        window.location.search = urlParams.toString();
        urlParams = null;
        id = null;
    }
}
//this method reload theme and get url parameters
document.body.onload = function(){
    themeOnLoad();
    urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get("id");
    if(id){
        const effect = EffectController.getById(id);

        var fileList = new DataTransfer();
        fileList.items.add(dataUrlToFile(effect.name,effect.thumbBinary));
        thumb.files = fileList.files;

        fileList = new DataTransfer();
        fileList.items.add(dataUrlToFile(effect.name,effect.audioBinary));       
        audio.files = fileList.files;

        txtName.value = effect.name;
        img.src = effect.thumbBinary;
        player.src = effect.audioBinary;
        namePreview.innerHTML = effect.name;
    }
};

//verification to insert or update effect
function verification(){
    if(thumb.files.length == 0 || audio.files.length == 0 || txtName.value == ""){
        return false;
    }
    return true;
}