function getDetailedBillWithAmount(bill, items, categories) {
    let totalBillAmount = 0;
    
    const detailedBillItems = bill.billItems.map(billItem => {
        const item = items.find(i => i.id === billItem.id);
        
        const category = categories.find(c => c.id === item.category.categoryId);
        
        const baseAmount = item.rate * billItem.quantity;
        
        let discountAmount = 0;
        if (billItem.discount) {
            if (billItem.discount.isInPercent === 'Y') {
                discountAmount = (baseAmount * billItem.discount.rate) / 100;
            } else {
                discountAmount = billItem.discount.rate;
            }
        }
        
        const amountAfterDiscount = baseAmount - discountAmount;
        
        let totalTaxAmount = 0;
        if (item.taxes) {
            item.taxes.forEach(tax => {
                if (tax.isInPercent === 'Y') {
                    totalTaxAmount += (amountAfterDiscount * tax.rate) / 100;
                } else {
                    totalTaxAmount += tax.rate;
                }
            });
        }
        
        const finalAmount = amountAfterDiscount + totalTaxAmount;
        totalBillAmount += finalAmount;
        
        return {
            id: billItem.id,
            name: item.itemName,
            quantity: billItem.quantity,
            discount: billItem.discount || null,
            taxes: item.taxes || [],
            amount: parseFloat(finalAmount.toFixed(2)),
            superCategoryName: category?.superCategory?.superCategoryName || "",
            categoryName: category?.categoryName || ""
        };
    });
    
    return {
        id: bill.id,
        billNumber: bill.billNumber,
        opentime: bill.opentime,
        customerName: bill.customerName,
        billItems: detailedBillItems,
        "Total Amount": parseFloat(totalBillAmount.toFixed(2))
    };
}