if('serviceWorker' in navigator){
    console.log('puedes usar los servicios Workers del navegador');
    navigator.serviceWorker.register('./sw.js')
    .then(res => console.log('ServiceWorker cargando al 100',res))
    .catch(err => console.log('El ServiceWorker anda de viaje',err))
}else{
    console.log('NO PUEDES USAR los Service Workers del navegador');
}

//$(document).ready(function(){
    //$("#menu a").click(function(e){
       //e.preventDefault();
       //$("html,body").animate({
        //scrollTop
       //}) 
    //})
//});