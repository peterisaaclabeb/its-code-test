export async function getByStepId(stepId) {
    const response = await fetch(`item/getByStepId/${stepId}`);
    const items = await response.json();
    return items;
}