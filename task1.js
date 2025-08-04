function getBillWithItemNames(bill, items) {
    return {
        id: bill.id,
        billNumber: bill.billNumber,
        opentime: bill.opentime,
        customerName: bill.customerName,
        billItems: bill.billItems.map(billItem => {
            const item = items.find(i => i.id === billItem.id);
            
            return {
                id: billItem.id,
                name: item.name,
                quantity: billItem.quantity
            };
        })
    };
}
