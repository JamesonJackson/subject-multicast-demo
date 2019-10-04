export class SimpleObservable<T> {
  private _subscribe: any;

  constructor(subscribe: Function) {
    this._subscribe = subscribe;
  }

  subscribe(observer: {
    onNext: Function;
    onError?: Function;
    onCompleted?: Function;
  }) {
    return this._subscribe(observer);
  }
}
