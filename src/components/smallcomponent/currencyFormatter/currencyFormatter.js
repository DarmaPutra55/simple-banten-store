export default function CurrencyFormatter(value){
    return value ? value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'IDR'
    }) : 0
};