export default (netPrice) => {
    const grossPrice = netPrice + netPrice * 0.2
    
    return grossPrice.toFixed(2)
}