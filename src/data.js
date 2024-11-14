export const API_KEY='AIzaSyDvsY9cVCcby0s-dOaPJ0XZ5g005mdP5NY'
export const valueConvertor = (value)=>{
    if(value >1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>1000){
        return Math.floor(value/1000)+"K";
    }
    else return value;
}