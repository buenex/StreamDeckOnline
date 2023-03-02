/*
    This class control the effects and ensure that Effects 
    can be save and load without break json,
    you can edit this script to save your effects in a database
    rather than to save in localStorage   
*/

class EffectController{
    //get all Effects saves
    static getAll(){
        var ls = JSON.parse(localStorage.getItem("effects"));
        var list = ls != null ? ls : [];
        return list;
    }

    //get an effect by id
    static getById(id){
        var effect = this.getAll().filter(ef => ef.id == id);
        return effect[0];
    }

    //insert new effect to localstorage
    static insert(effect){
        var list =  this.getAll();
        var id = list.length > 0 ? list[list.length-1].id+1 : 0;
        effect.id = id;
        list.push(effect);

        this.setAudios(list);
    }

    //update an effect with id
    static update(id, effect){
        var list =  this.getAll();
        list.forEach((ef, index, array) => {
            if(ef.id == id){
                effect.id = id;
                array[index] = effect;
                this.setAudios(array);
            }
        });        
    }

    //delete an effect from localstorage by id
    static delete(id){
        var list =  this.getAll();
        list = list.filter(ef => ef.id != id);
        this.setAudios(list);
    }

    //set key on localStorage
    static setAudios(list){
        localStorage.setItem("effects",JSON.stringify(list));
    }
}