export async function getSteps() {
    const response = await fetch('step');
    const steps = await response.json();
    return steps;
}

export async function addStep() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch('step', requestOptions);
    const step = await response.json();
    return step;
}

export async function removeStep(id) {
    const requestOptions = {
        method: 'DELETE',
    };

    await fetch(`step/${id}`, requestOptions);
}