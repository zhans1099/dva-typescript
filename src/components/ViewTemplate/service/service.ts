import HTTP from "lib/http";

export function GetTemplateData(url: string): any{
    return HTTP.get(url)
}