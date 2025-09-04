export function truncate(text, maxlength=15){

    if(!text) return "";

    return text.length > maxlength ? text.slice(0,maxlength)+"..." : text;
}