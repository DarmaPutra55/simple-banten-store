export default function CurrencyFormatter(value){
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'IDR'
    })
};