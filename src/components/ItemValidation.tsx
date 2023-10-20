import * as yup from "yup"

export const itemSchema = yup.object().shape({
    newItemTitle: yup.string().min(4).max(13).required(),
    newItemType: yup.string().required(),
    newItemPrice: yup.number().positive().integer().required(),
    newItemDescription: yup.string().min(2).max(100),
});