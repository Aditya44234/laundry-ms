export function calculateTotal(items) {
    return items.reduce((sum, item) => {
        return sum + item.quantity * item.price
    },0)
}