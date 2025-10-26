export class StateManager {
    constructor() {
        this.state = {
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            books: [],
            searchQuery: '',
        };

        this.listeners = [];
    };

    getState(key) {
        return key ? this.state[key] : this.state;
    };

    setState(updates) {
        Object.assign(this.state, updates);

        if (updates.cart !== undefined) {
            localStorage.setItem('cart', JSON.stringify(this.state.cart));
        };

        this.notifyListeners();
    };

    subscribe(listener) {
        this.listeners.push(listener);
    };

    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    };

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    };
};

export const stateManager = new StateManager();
