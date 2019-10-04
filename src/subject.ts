interface IListener {
  onNext: Function;
  onError?: Function;
  onComplete?: Function;
}

export class Subject {
  listeners: IListener[];
  subscription: { unsubscribe: Function };

  constructor(observable?: { subscribe: Function }) {
    this.listeners = [];

    if (observable)
      this.subscription = observable.subscribe({
        onNext: this.onNext.bind(this),
        onError: this.onError,
        onComplete: this.onComplete
      });
  }

  subscribe(listener: IListener) {
    this.listeners.push(listener);
    const unsubscribe = () => this.unsubscribe(listener);
    return { unsubscribe };
  }

  unsubscribe(listener: IListener): void {
    const index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
  }

  onNext(evt: any): void {
    this.listeners.forEach(listener => listener.onNext(evt));
  }

  onError(evt: any): void {
    // handle error
  }

  onComplete(evt: any): void {
    // handle complete
  }
}
