export default function generateId() {
    return (new Date()).getTime() * Math.random();
}