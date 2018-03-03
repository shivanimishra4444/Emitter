const emitter = new Emitter();
const validation =new Validation();

export function off(...args) {

  return emitter.off(...args)

}



export function on(...args) {

  return emitter.on(...args)

}



export function once(...args) {

  return emitter.once(...args)

}



export function trigger(...args) {

  return emitter.trigger(...args)

}

function Emitter() {}
function Validation() {}
/*object of an array where key is event name and value is an array of functions*/

/**
  * @desc subscribe a function to be called every time the event name is triggered
  * @param {string} event- Event name
  * @param {function} fn - Function to call when the event name is triggered
  * @return {number} The current number of subscribers for the event name
  * @throws {Error} If the event name is not a string data type or the function is not a function data type
*/
Emitter.prototype.on = function(event, fn) {
    validation.stringData(event, 'Event Name must be string');
    validation.functionData(arguments.length, fn, 'fn must be Function data type');
    this.eventList = this.eventList || {};

    (this.eventList[event] = this.eventList[event] || []).push(fn);
    return (this.eventList[event] || [].length);
}

/**
  * @desc Unsubscribe an event name and all its subscribed functions or unsubscribe an event name and the function provided only
  * @param {string} event - Event name
  * @param {function} [fn] - Optional function to unsubscribe from the associated event name
  * @return {number} The current number of subscribers for the event name
  * @throws {Error} If the event name is not a string data type or the function is not a function data type
*/
Emitter.prototype.off = function(event, fn) {
    validation.stringData(event, 'Event Name must be string');
    validation.functionData(arguments.length, fn, 'fn must be Function data type');

    this.eventList = this.eventList || {};
    let eventName = this.eventList[event] || [];


   if (fn === undefined) {
        eventName.length = 0;
        return (eventName || []).length;
    }

    for (let i = 0; i < eventName.length;) {
        if (eventName[i] === fn || eventName[i].fn === fn) {
            eventName.splice(i, 1);// to remove that particular function
            continue;
        }
        i++;
    }
    return (eventName || []).length;
}
/**
  * @desc Unsubscribe an event name and all its subscribed functions or unsubscribe an event name and the function provided only
  * @param {string} event
  * @param {function} ...args - Zero or more arguments to pass to the subscribed functions
  * @return {boolean} True, the event name has subscribers; otherwise, false
  * @throws {Error} If the event name is not a string data type
*/
Emitter.prototype.trigger = function(event) {
    validation.stringData(event, 'Event Name must be string');
    this.eventList = this.eventList || {};
    let args = [].slice.call(arguments, 1);
    let eventName = this.eventList[event]

    if (eventName && eventName.length > 0) {
       eventName = eventName.slice(0);
        eventName.forEach(events => {
            events.apply(this, args);
        })
        return true;
    }
    return false;

}
/**
  * @desc Subscribe a function to be called only once for when the event name is triggered
  * @param {string} event- Event name
  * @param {function} fn - Function to call when the event name is triggered
  * @return {number} The current number of subscribers for the event name
  * @throws {Error} If the event name is not a string data type or the function is not a function data type
*/
Emitter.prototype.once = function(event, fn) {
    validation.stringData(event, 'Event Name must be string');
    validation.functionData(arguments.length, fn, 'fn must be Function data type');
    this.eventList = this.eventList || {};

    function onOnce() {
        this.off(event, onOnce);
        fn.apply(this, arguments);
    }
    onOnce.fn = fn;
    this.on(event, onOnce);
    return (this.eventList[event] || []).length;
}

/**
 * @desc throws a error if the event name is not a string data type 
 * @param {string} datatype
 * @param {string} errorMessage
 * @throws {Error} IllegalArgumentException with error message
 */
Validation.prototype.stringData = function(dataType, errorMessage) {
    if (typeof dataType !== "string") {
        throw Error("IllegalArgumentException:" + errorMessage)
    }

}
/**
 * @desc throws a error if the event name is not a function data type 
 * @param {number} argumentsCount
 * @param {string} dataType
 * @param {string} errorMessage
 * @throws {Error} IllegalArgumentException with error message
 */
Validation.prototype.functionData = function(argumentsCount, dataType, errorMessage) {
    if (argumentsCount == 2 && typeof dataType !== "function") {
        throw Error("IllegalArgumentException:" + errorMessage)
    }

}

/* to improve further

Emitter.prototype.parameters = function (event) {

 this.eventList = this.eventList || {};

  return this.eventList[event] || [];

};

return this.parameters(event).length;*/