export async function getByStepId(stepId) {
    const response = await fetch(`item/getByStepId/${stepId}`);
    const items = await response.json();
    return items;
}

export async function addItem(item) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    const response = await fetch(`item/`, requestOptions);
    const items = await response.json();
    return items;
}

export async function updateItem(item) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    const response = await fetch(`item/`, requestOptions);
    const items = await response.json();
    return items;
}

export async function deleteItem(itemId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`item/${itemId}`, requestOptions);
    const items = await response.text();
    return items;
}