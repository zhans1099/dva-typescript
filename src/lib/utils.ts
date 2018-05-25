import {DvaInstance} from "dva";

const cached: any = {};
export function registerModel(app: DvaInstance, model: any): void {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}