class EffectComponent{
    static draw(effect){
        var component = `
        <div id="${effect.id}"class="col center card">
            <img class="thumb" src="${effect.thumbBinary}">
            <h4 id="name">${effect.name}</h4> 
            <audio controls="controls" src="${effect.audioBinary}"></audio>
            <div class="row text-align-last-justify">
                <a href="./Pages/edit.html?id=${effect.id}">
                    <div class="col" >
                        <div class="edit-button">
                            <div class="col">
                                <label>Editar</label>
                            </div>
                            <img src="./contents/imgs/edit.png">
                        </div>
                    </div>
                </a>
                <div class="col" onclick="removeEffect(${effect.id})">
                    <div class="delete-button">
                        <div class="col">
                            <label>Remover</label>
                        </div>
                        <img src="./contents/imgs/remove.png">
                    </div>
                </div>
            </div>
        </div>`;

        return component;
    }
}