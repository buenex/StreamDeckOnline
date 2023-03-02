/*
    This is the main script from indexPage
*/
//this method load theme and draw all effects saves in localStorage
document.body.onload = function(){
    themeOnLoad();
    const effects = document.getElementById("effects");
    var list = EffectController.getAll();

    for(var i = 0; i<list.length; i++){
        effects.insertAdjacentHTML("beforeend" ,EffectComponent.draw(list[i]));
    }    
};

//this method delete the effect from localStorage
function removeEffect(id){
    var effect = EffectController.getById(id);
    if(confirm(`Tem certeza que deseja excluir o efeito: ${effect.name}`)){
        try{
            EffectController.delete(id);
            alert("Efeito removido com sucesso!")
        }catch(exception){
            alert(`O efeito não foi excluído pois ocorreu o erro: \n \n ${exception}`)
        }
    }
    window.location.reload();
}