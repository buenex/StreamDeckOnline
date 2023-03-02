/*
    This script work with theme of page
*/

//Get toggle elements to interact with them
//Get localStorage value (if exist get value, if not, your value is null)
const toggle = document.getElementById("toggle").getElementsByTagName("input")[0];
const label = toggle.nextElementSibling;
const root = document.documentElement.style;
const stateTheme = localStorage.getItem("stateTheme");

//This method ensures that toogle has a value like true or false
function themeOnLoad(){
    toggle.checked = stateTheme=="true" ? true : false;

    loadTheme(toggle.checked);
}

//Event click over toggle element
label.addEventListener("click", () => {
    toggle.checked = !toggle.checked;
    localStorage.setItem("stateTheme",toggle.checked);        
        
    loadTheme(toggle.checked);
});

//This method work with css variables alternating your value depending toggle state(checked or unchecked)
function loadTheme(state){
    if(state == true){
        root.setProperty("--text","var(--white)");
        root.setProperty("--border","var(--white100)");
        root.setProperty("--background","var(--black)");
        root.setProperty("--card","var(--gray-iron)");
        root.setProperty("--edit","var(--gold)");
        root.setProperty("--delete","var(--garnet)");
    }else{
        root.setProperty("--text","var(--black)");
        root.setProperty("--border","var(--gray)");
        root.setProperty("--background","var(--white)");
        root.setProperty("--card","var(--gray-cloud)");
        root.setProperty("--edit","var(--yellow)");
        root.setProperty("--delete","var(--red)");
    }
}