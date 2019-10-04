import { SimpleObservable } from "./simpleObservable";
import { Subject } from "./subject";
/**
 * Create a new observable from our SimpleObservable class
 * takes a function called 'subscribe'
 * this function runs when an observer 'subscribes'
 */
const simpleObservable$ = new SimpleObservable(function subscribe({ onNext }) {
  let count = 0;
  const intervalId = setInterval(() => onNext(count++), 1000);
  const unsubscribe = () => clearInterval(intervalId);
  return { unsubscribe };
});

const multiCastedObservable = new Subject(simpleObservable$);

// kick it off!
initUi();

function initUi() {
  const subscriptions = {};
  ["one", "two", "three", "four"].forEach((id: string) => {
    const el = document.getElementById(id);
    el.addEventListener("click", () =>
      toggleSubscription(el, subscriptions, id)
    );
  });
}

function toggleSubscription(
  el: HTMLElement,
  subscriptions: { [id: string]: { unsubscribe: Function } },
  id: string
): void {
  if (subscriptions[id]) {
    subscriptions[id].unsubscribe();
    delete subscriptions[id];
    el.classList.remove("subscribed");
  } else {
    const subscription = multiCastedObservable.subscribe({
      onNext: updateSquare(id)
    });
    subscriptions[id] = subscription;
    el.classList.add("subscribed");
  }
}

function updateSquare(id: string): Function {
  const el = document.getElementById(id);
  return (evt: string) => (el.innerHTML = evt);
}
