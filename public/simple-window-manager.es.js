/**
 * shortcut to create an html element
 * @param {object} options
 * @param {type} [options.string=div]
 * @param {string} [options.className]
 * @param {object} [options.styles]
 * @param {HTMLElement} [options.parent]
 * @param {string} [options.html]
 * @returns {HTMLElement}
 */
function html(options={})
{
    const object = document.createElement(options.type || 'div');
    if (options.parent)
    {
        options.parent.appendChild(object);
    }
    if (options.styles)
    {
        Object.assign(object.style, options.styles);
    }
    if (options.className)
    {
        object.className = options.className;
    }
    if (options.html)
    {
        object.innerHTML = options.html;
    }
    return object
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

const defaultOptions = {
    threshold: 10,
    clicked: true,
    mouse: true,
    touch: 1,
    doubleClicked: false,
    doubleClickedTime: 300,
    longClicked: false,
    longClickedTime: 500,
    capture: false,
    clickDown: false
};
function clicked(element, callback, options) {
    return new Clicked(element, callback, options);
}
class Clicked {
    constructor(element, callback, options) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
            if (!element) {
                console.warn(`Unknown element: document.querySelector(${element}) in clicked()`);
                return;
            }
        }
        this.element = element;
        this.callback = callback;
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
        this.createListeners();
    }
    createListeners() {
        this.events = {
            mousedown: (e) => this.mousedown(e),
            mouseup: (e) => this.mouseup(e),
            mousemove: (e) => this.mousemove(e),
            touchstart: (e) => this.touchstart(e),
            touchmove: (e) => this.touchmove(e),
            touchcancel: () => this.cancel(),
            touchend: (e) => this.touchend(e)
        };
        this.element.addEventListener('mousedown', this.events.mousedown, { capture: this.options.capture });
        this.element.addEventListener('mouseup', this.events.mouseup, { capture: this.options.capture });
        this.element.addEventListener('mousemove', this.events.mousemove, { capture: this.options.capture });
        this.element.addEventListener('touchstart', this.events.touchstart, { passive: true, capture: this.options.capture });
        this.element.addEventListener('touchmove', this.events.touchmove, { passive: true, capture: this.options.capture });
        this.element.addEventListener('touchcancel', this.events.touchcancel, { capture: this.options.capture });
        this.element.addEventListener('touchend', this.events.touchend, { capture: this.options.capture });
    }
    destroy() {
        this.element.removeEventListener('mousedown', this.events.mousedown);
        this.element.removeEventListener('mouseup', this.events.mouseup);
        this.element.removeEventListener('mousemove', this.events.mousemove);
        this.element.removeEventListener('touchstart', this.events.touchstart);
        this.element.removeEventListener('touchmove', this.events.touchmove);
        this.element.removeEventListener('touchcancel', this.events.touchcancel);
        this.element.removeEventListener('touchend', this.events.touchend);
    }
    touchstart(e) {
        if (this.options.touch) {
            if (this.down === true) {
                this.cancel();
            }
            else {
                if (this.options.touch === true || e.touches.length <= this.options.touch) {
                    this.handleDown(e, e.changedTouches[0].screenX, e.changedTouches[0].screenY);
                }
            }
        }
    }
    pastThreshold(x, y) {
        return Math.abs(this.lastX - x) > this.options.threshold || Math.abs(this.lastY - y) > this.options.threshold;
    }
    touchmove(e) {
        if (this.down) {
            if (e.touches.length !== 1) {
                this.cancel();
            }
            else {
                const x = e.changedTouches[0].screenX;
                const y = e.changedTouches[0].screenY;
                if (this.pastThreshold(x, y)) {
                    this.cancel();
                }
            }
        }
    }
    cancel() {
        this.down = false;
        if (this.doubleClickedTimeout) {
            clearTimeout(this.doubleClickedTimeout);
            this.doubleClickedTimeout = null;
        }
        if (this.longClickedTimeout) {
            clearTimeout(this.longClickedTimeout);
            this.longClickedTimeout = null;
        }
    }
    touchend(e) {
        if (this.down) {
            e.preventDefault();
            this.handleClicks(e);
        }
    }
    handleClicks(e) {
        if (this.options.doubleClicked) {
            this.doubleClickedTimeout = this.setTimeout(() => this.doubleClickedCancel(e), this.options.doubleClickedTime);
        }
        else if (this.options.clicked) {
            this.callback({ event: e, type: 'clicked' });
        }
        if (this.longClickedTimeout) {
            clearTimeout(this.longClickedTimeout);
            this.longClickedTimeout = null;
        }
        this.down = false;
    }
    handleDown(e, x, y) {
        if (this.doubleClickedTimeout) {
            if (this.pastThreshold(x, y)) {
                if (this.options.clicked) {
                    this.callback({ event: e, type: 'clicked' });
                }
                this.cancel();
            }
            else {
                this.callback({ event: e, type: 'double-clicked' });
                this.cancel();
            }
        }
        else {
            this.lastX = x;
            this.lastY = y;
            this.down = true;
            if (this.options.longClicked) {
                this.longClickedTimeout = this.setTimeout(() => this.longClicked(e), this.options.longClickedTime);
            }
            if (this.options.clickDown) {
                this.callback({ event: e, type: 'click-down' });
            }
        }
    }
    longClicked(e) {
        this.longClickedTimeout = null;
        this.down = false;
        this.callback({ event: e, type: 'long-clicked' });
    }
    doubleClickedCancel(e) {
        this.doubleClickedTimeout = null;
        if (this.options.clicked) {
            this.callback({ event: e, type: 'clicked' });
        }
    }
    checkMouseButtons(e) {
        if (this.options.mouse === false) {
            return false;
        }
        else if (this.options.mouse === true) {
            return true;
        }
        else if (e.button === 0) {
            return this.options.mouse.indexOf('left') !== -1;
        }
        else if (e.button === 1) {
            return this.options.mouse.indexOf('middle') !== -1;
        }
        else if (e.button === 2) {
            return this.options.mouse.indexOf('right') !== -1;
        }
    }
    mousedown(e) {
        if (this.checkMouseButtons(e)) {
            if (this.down === true) {
                this.down = false;
            }
            else {
                this.handleDown(e, e.screenX, e.screenY);
            }
        }
    }
    mousemove(e) {
        if (this.down) {
            const x = e.screenX;
            const y = e.screenY;
            if (this.pastThreshold(x, y)) {
                this.cancel();
            }
        }
    }
    mouseup(e) {
        if (this.down) {
            e.preventDefault();
            this.handleClicks(e);
        }
    }
    setTimeout(callback, time) {
        return setTimeout(callback, time);
    }
}

/**
 * Window class returned by WindowManager.createWindow()
 * @extends EventEmitter
 * @fires open
 * @fires focus
 * @fires blur
 * @fires close
 * @fires maximize
 * @fires maximize-restore
 * @fires move
 * @fires move-start
 * @fires move-end
 * @fires resize
 * @fires resize-start
 * @fires resize-end
 * @fires move-x
 * @fires move-y
 * @fires resize-width
 * @fires resize-height
 */
class Window extends eventemitter3
{
    /**
     * @param {WindowManager} [wm]
     * @param {object} [options]
     */
    constructor(wm, options={})
    {
        super();
        this.wm = wm;
        this.options = options;
        this.id = typeof this.options.id === 'undefined' ? Window.id++ : this.options.id;
        this._createWindow();
        this._listeners();

        this.active = false;
        this.maximized = false;

        this._closed = true;
        this._restore = null;
        this._moving = null;
        this._resizing = null;
        this._attachedToScreen = { vertical: '', horziontal: '' };
    }

    /**
     * open the window
     * @param {boolean} [noFocus] do not focus window when opened
     */
    open(noFocus)
    {
        if (this._closed)
        {
            this.win.style.display = 'block';
            this._closed = false;
            this.emit('open', this);
            if (!noFocus)
            {
                this.focus();
            }
        }
    }

    /**
     * focus the window
     */
    focus()
    {
        this.active = true;
        if (this.options.titlebar)
        {
            this.winTitlebar.style.backgroundColor = this.options.backgroundTitlebarActive;
        }
        this.emit('focus', this);
    }

    /**
     * blur the window
     */
    blur()
    {
        this.active = false;
        if (this.options.titlebar)
        {
            this.winTitlebar.style.backgroundColor = this.options.backgroundTitlebarInactive;
        }
        this.emit('blur', this);
    }

    /**
     * closes the window (can be reopened with open)
     */
    close()
    {
        if (!this._closed)
        {
            this._closed = true;
            this.win.style.display = 'none';
            this.emit('close', this);
        }
    }

    /**
     * is window closed?
     * @type {boolean}
     * @readonly
     */
    get closed()
    {
        return this._closed
    }

    /**
     * left coordinate
     * @type {number}
     */
    get x() { return this.options.x }
    set x(value)
    {
        if (value !== this.options.x)
        {
            this.options.x = value;
            this.emit('move-x', this);
            this._buildTransform();
        }
    }

    _buildTransform()
    {
        this.win.style.transform = `translate(${this.options.x}px,${this.options.y}px)`;
    }

    /**
     * top coordinate
     * @type {number}
     */
    get y() { return this.options.y }
    set y(value)
    {
        if (value !== this.options.y)
        {
            this.options.y = value;
            this._buildTransform();
            this.emit('move-y', this);
        }
    }

    /**
     * width of window
     * @type {number}
     */
    get width() { return this.options.width || this.win.offsetWidth }
    set width(value)
    {
        if (value !== this.options.width)
        {
            if (value)
            {
                this.win.style.width = `${value}px`;
                this.options.width = this.win.offsetWidth;
            }
            else
            {
                this.win.style.width = 'auto';
                this.options.width = '';
            }
            this.emit('resize-width', this);
        }
    }

    /**
     * height of window
     * @type {number}
     */
    get height() { return this.options.height || this.win.offsetHeight }
    set height(value)
    {
        if (value !== this.options.height)
        {
            if (value)
            {
                this.win.style.height = `${value}px`;
                this.options.height = this.win.offsetHeight;
            }
            else
            {
                this.win.style.height = 'auto';
                this.options.height = '';
            }
            this.emit('resize-height', this);
        }
    }

    /**
     * resize the window
     * @param {number} width
     * @param {number} height
     */
    resize(width, height)
    {
        this.width = width;
        this.height = height;
    }

    /**
     * move window
     * @param {number} x
     * @param {number} y
     */
    move(x, y)
    {
        const keepInside = this.keepInside;
        if (keepInside)
        {
            const bounds = this.bounds;
            if (keepInside === true || keepInside === 'horizontal')
            {
                x = x + this.width > bounds.right ? bounds.right - this.width : x;
                x = x < bounds.left ? bounds.left : x;
            }
            if (keepInside === true || keepInside === 'vertical')
            {
                y = y + this.height > bounds.bottom ? bounds.bottom - this.height : y;
                y = y < bounds.top ? bounds.top : y;
            }
        }
        if (x !== this.options.x)
        {
            this.options.x = x;
            this.emit('move-x', this);
        }
        if (y !== this.options.y)
        {
            this.options.y = y;
            this.emit('move-y', this);
        }
        this._buildTransform();
    }

    /**
     * maximize the window
     */
    maximize()
    {
        if (this.options.maximizable)
        {
            if (this.maximized)
            {
                this.x = this.maximized.x;
                this.y = this.maximized.y;
                this.width = this.maximized.width;
                this.height = this.maximized.height;
                this.maximized = null;
                this.emit('restore', this);
                this.buttons.maximize.innerHTML = this.options.maximizeButton;
            }
            else
            {
                const x = this.x, y = this.y, width = this.win.offsetWidth, height = this.win.offsetHeight;
                this.maximized = { x, y, width, height };
                this.x = 0;
                this.y = 0;
                this.width = this.wm.overlay.offsetWidth;
                this.height = this.wm.overlay.offsetHeight;
                this.emit('maximize', this);
                this.buttons.maximize.innerHTML = this.options.restoreButton;
            }
        }
    }

    /**
     * sends window to back of window-manager
     */
    sendToBack()
    {
        this.wm.sendToBack(this);
    }

    /**
     * send window to front of window-manager
     */
    sendToFront()
    {
        this.wm.sendToFront(this);
    }

    /**
     * save the state of the window
     * @return {object} data
     */
    save()
    {
        const data = {};
        const maximized = this.maximized;
        if (maximized)
        {
            data.maximized = { left: maximized.left, top: maximized.top, width: maximized.width, height: maximized.height };
        }
        data.x = this.x;
        data.y = this.y;
        if (typeof this.options.width !== 'undefined')
        {
            data.width = this.options.width;
        }
        if (typeof this.options.height !== 'undefined')
        {
            data.height = this.options.height;
        }
        data.closed = this._closed;
        return data
    }

    /**
     * return the state of the window
     * @param {object} data from save()
     */
    load(data)
    {
        if (data.maximized)
        {
            if (!this.maximized)
            {
                this.maximize(true);
            }
        }
        else if (this.maximized)
        {
            this.maximize(true);
        }
        this.x = data.x;
        this.y = data.y;
        if (typeof data.width !== 'undefined')
        {
            this.width = data.width;
        }
        else
        {
            this.win.style.width = 'auto';
        }
        if (typeof data.height !== 'undefined')
        {
            this.height = data.height;
        }
        else
        {
            this.win.style.height = 'auto';
        }
        if (data.closed)
        {
            this.close(true);
        }
        else if (this.closed)
        {
            this.open(true, true);
        }
    }

    /**
     * change title
     * @type {string}
     */
    get title() { return this._title }
    set title(value)
    {
        this.winTitle.innerText = value;
        this.emit('title-change', this);
    }


    /**
     * right coordinate of window
     * @type {number}
     */
    get right() { return this.x + this.width }
    set right(value)
    {
        this.x = value - this.width;
    }

    /**
     * bottom coordinate of window
     * @type {number}
     */
    get bottom() { return this.y + this.height }
    set bottom(value)
    {
        this.y = value - this.height;
    }

    /**
     * centers window in middle of other window or document.body
     * @param {Window} [win]
     */
    center(win)
    {
        if (win)
        {
            this.move(
                win.x + win.width / 2 - this.width / 2,
                win.y + win.height / 2 - this.height / 2
            );
        }
        else
        {
            this.move(
                window.innerWidth / 2 - this.width / 2,
                window.innerHeight / 2 - this.height / 2
            );
        }
    }

    /**
     * Fires when window is maximized
     * @event Window#maximize
     * @type {Window}
     */

    /**
     * Fires when window is restored to normal after being maximized
     * @event Window#maximize-restore
     * @type {Window}
     */

    /**
     * Fires when window opens
     * @event Window#open
     * @type {Window}
     */

    /**
     * Fires when window gains focus
     * @event Window#focus
     * @type {Window}
     */
    /**
     * Fires when window loses focus
     * @event Window#blur
     * @type {Window}
     */
    /**
     * Fires when window closes
     * @event Window#close
     * @type {Window}
     */

    /**
     * Fires when resize starts
     * @event Window#resize-start
     * @type {Window}
     */

    /**
     * Fires after resize completes
     * @event Window#resize-end
     * @type {Window}
     */

    /**
     * Fires during resizing
     * @event Window#resize
     * @type {Window}
     */

    /**
     * Fires when move starts
     * @event Window#move-start
     * @type {Window}
     */

    /**
     * Fires after move completes
     * @event Window#move-end
     * @type {Window}
     */

    /**
     * Fires during move
     * @event Window#move
     * @type {Window}
     */

    /**
     * Fires when width is changed
     * @event Window#resize-width
     * @type {Window}
     */

    /**
     * Fires when height is changed
     * @event Window#resize-height
     * @type {Window}
     */

    /**
     * Fires when x position of window is changed
     * @event Window#move-x
     * @type {Window}
     */


    /**
     * Fires when y position of window is changed
     * @event Window#move-y
     * @type {Window}
     */

    _createWindow()
    {
        /**
         * This is the top-level DOM element
         * @type {HTMLElement}
         * @readonly
         */
        this.win = html({
            parent: (this.wm ? this.wm.win : null), styles: {
                'display': 'none',
                'border-radius': this.options.borderRadius,
                'user-select': 'none',
                'overflow': 'hidden',
                'position': 'absolute',
                'min-width': this.options.minWidth,
                'min-height': this.options.minHeight,
                'box-shadow': this.options.shadow,
                'background-color': this.options.backgroundWindow,
                'width': isNaN(this.options.width) ? this.options.width : this.options.width + 'px',
                'height': isNaN(this.options.height) ? this.options.height : this.options.height + 'px',
                ...this.options.styles
            },
            className: this.options.classNames.win
        });

        this.winBox = html({
            parent: this.win, styles: {
                'display': 'flex',
                'flex-direction': 'column',
                'width': '100%',
                'height': '100%',
                'min-height': this.options.minHeight
            },
            className: this.options.classNames.winBox
        });
        this._createTitlebar();

        /**
         * This is the content DOM element. Use this to add content to the Window.
         * @type {HTMLElement}
         * @readonly
         */
        this.content = html({
            parent: this.winBox, type: 'section', styles: {
                'display': 'block',
                'flex': 1,
                'min-height': this.minHeight,
                'overflow-x': 'hidden',
                'overflow-y': 'auto'
            },
            className: this.options.classNames.content
        });

        if (this.options.resizable)
        {
            this._createResize();
        }

        this.overlay = html({
            parent: this.win, styles: {
                'display': 'none',
                'position': 'absolute',
                'left': 0,
                'top': 0,
                'width': '100%',
                'height': '100%'
            },
            className: this.options.classNames.overlay
        });
        this.overlay.addEventListener('mousedown', (e) => { this._downTitlebar(e); e.stopPropagation(); });
        this.overlay.addEventListener('touchstart', (e) => { this._downTitlebar(e); e.stopPropagation(); });
        this._buildTransform();
    }

    _downTitlebar(e)
    {
        const event = this._convertMoveEvent(e);
        this._moving = {
            x: event.pageX - this.x,
            y: event.pageY - this.y
        };
        this.emit('move-start', this);
        this._moved = false;
    }

    _createTitlebar()
    {
        if (this.options.titlebar)
        {
            this.winTitlebar = html({
                parent: this.winBox, type: 'header', styles: {
                    'user-select': 'none',
                    'display': 'flex',
                    'flex-direction': 'row',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'height': this.options.titlebarHeight,
                    'min-height': this.options.titlebarHeight,
                    'border': 0,
                    'padding': '0 8px',
                    'overflow': 'hidden',
                },
                className: this.options.classNames.titlebar
            });
            const winTitleStyles = {
                'user-select': 'none',
                'flex': 1,
                'display': 'flex',
                'flex-direction': 'row',
                'align-items': 'center',
                'user-select': 'none',
                'cursor': 'default',
                'padding': 0,
                'margin': 0,
                'font-size': '16px',
                'font-weight': 400,
                'color': this.options.foregroundTitle
            };
            if (this.options.titleCenter)
            {
                winTitleStyles['justify-content'] = 'center';
            }
            else
            {
                winTitleStyles['padding-left'] = '8px';

            }
            this.winTitle = html({ parent: this.winTitlebar, type: 'span', html: this.options.title, styles: winTitleStyles, className: this.options.classNames.winTitle });
            this._createButtons();

            if (this.options.movable)
            {
                this.winTitlebar.addEventListener('mousedown', (e) => this._downTitlebar(e));
                this.winTitlebar.addEventListener('touchstart', (e) => this._downTitlebar(e));
            }
            if (this.options.maximizable)
            {
                clicked(this.winTitlebar, () => this.maximize(), { doubleClicked: true, clicked: false});
            }
        }
    }

    _createButtons()
    {
        this.winButtonGroup = html({
            parent: this.winTitlebar, styles: {
                'display': 'flex',
                'flex-direction': 'row',
                'align-items': 'center',
                'padding-left': '10px'
            },
            className: this.options.classNames.winButtonGroup
        });
        const button = {
            'display': 'inline-block',
            'border': 0,
            'margin': 0,
            'margin-left': '15px',
            'padding': 0,
            'width': '12px',
            'height': '12px',
            'background-color': 'transparent',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'opacity': .7,
            'color': this.options.foregroundButton,
            'outline': 0
        };
        this.buttons = {};
        if (this.options.maximizable)
        {
            this.buttons.maximize = html({ parent: this.winButtonGroup, html: this.options.maximizeButton, type: 'button', styles: button, className: this.options.maximize });
            clicked(this.buttons.maximize, () => this.maximize());
        }
        if (this.options.closable)
        {
            this.buttons.close = html({ parent: this.winButtonGroup, html: this.options.closeButton, type: 'button', styles: button, className: this.options.close });
            clicked(this.buttons.close, () => this.close());
        }
        for (let key in this.buttons)
        {
            const button = this.buttons[key];
            button.addEventListener('mousemove', () =>
            {
                button.style.opacity = 1;
            });
            button.addEventListener('mouseout', () =>
            {
                button.style.opacity = 0.7;
            });
        }
    }

    _createResize()
    {
        this.resizeEdge = html({
            parent: this.winBox, type: 'button', html: this.options.backgroundResize, styles: {
                'position': 'absolute',
                'bottom': 0,
                'right': '4px',
                'border': 0,
                'margin': 0,
                'padding': 0,
                'cursor': 'se-resize',
                'user-select': 'none',
                'height': '15px',
                'width': '10px',
                'background': 'none'
            },
            className: this.options.classNames.resizeEdge
        });
        const down = e => {
            const event = this._convertMoveEvent(e);
            const width = this.width || this.win.offsetWidth;
            const height = this.height || this.win.offsetHeight;
            this._resizing = {
                width: width - event.pageX,
                height: height - event.pageY
            };
            this.emit('resize-start');
            e.preventDefault();
        };
        this.resizeEdge.addEventListener('mousedown', down);
        this.resizeEdge.addEventListener('touchstart', down);
    }

    _move(e)
    {
        const event = this._convertMoveEvent(e);

        if (!this._isTouchEvent(e) && e.which !== 1)
        {
            if (this._moving)
            {
                this._stopMove();
            }
            if (this._resizing)
            {
                this._stopResize();
            }
        }
        if (this._moving)
        {
            this.move(event.pageX - this._moving.x, event.pageY - this._moving.y);
            this.emit('move', this);
            e.preventDefault();
        }
        if (this._resizing)
        {
            this.resize(
                event.pageX + this._resizing.width,
                event.pageY + this._resizing.height
            );
            this.maximized = null;
            this.emit('resize', this);
            e.preventDefault();
        }
    }

    _up()
    {
        if (this._moving)
        {
            this._stopMove();
        }
        if (this._resizing)
        {
            this._stopResize();
        }
    }

    _listeners()
    {
        this.win.addEventListener('mousedown', () => this.focus());
        this.win.addEventListener('touchstart', () => this.focus());
    }

    _stopMove()
    {
        this._moving = null;
        this.emit('move-end', this);
    }

    _stopResize()
    {
        this._restore = this._resizing = null;
        this.emit('resize-end', this);
    }

    _isTouchEvent(e)
    {
        return !!window.TouchEvent && (e instanceof window.TouchEvent)
    }

    _convertMoveEvent(e)
    {
        return this._isTouchEvent(e) ? e.changedTouches[0] : e
    }

    /**
     * attaches window to a side of the screen
     * @param {('horizontal'|'vertical')} direction
     * @param {('left'|'right'|'top'|'bottom')} location
     */
    attachToScreen(direction, location)
    {
        this._attachedToScreen[direction] = location;
    }

    /**
     * @param {Bounds} bounds
     * @param {(boolean|'horizontal'|'vertical')} keepInside
     */
    resizePlacement(bounds, keepInside)
    {
        this.bounds = bounds;
        this.keepInside = keepInside;
        let x = this.x;
        let y = this.y;
        x = this._attachedToScreen.horziontal === 'right' ? bounds.right - this.width : x;
        x = this._attachedToScreen.horizontal === 'left' ? bounds.left : x;
        y = this._attachedToScreen.vertical === 'bottom' ? bounds.bottom - this.height : y;
        y = this._attachedToScreen.vertical === 'top' ? bounds.top : y;
        this.move(x, y);
    }

    /**
     * @param {boolean} [ignoreClosed]
     * @returns {boolean}
     */
    isModal(ignoreClosed)
    {
        return (ignoreClosed || !this._closed) && this.options.modal
    }

    /** @returns {boolean} */
    isClosed()
    {
        return this._closed
    }

    get z()
    {
        return parseInt(this.win.style.zIndex)
    }
    set z(value)
    {
        this.win.style.zIndex = value;
    }
}

Window.id = 0;

const close='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><rect id="close" x="0" y="0" width="20" height="20" style="fill:none;"/><g><path d="M3.5,3.5l13,13" style="fill:none;stroke:#fff;stroke-width:3px;"/><path d="M16.5,3.5l-13,13" style="fill:none;stroke:#fff;stroke-width:3px;"/></g></svg>';const maximize='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><rect id="maximize" x="0" y="0" width="20" height="20" style="fill:none;"/><rect x="2" y="2" width="16" height="16" style="fill:none;stroke:#fff;stroke-width:2px;"/><rect x="2" y="2" width="16" height="3.2" style="fill:#fff;"/></svg>';const resize='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><rect id="resize" x="0" y="0" width="20" height="20" style="fill:none;"/><clipPath id="_clip1"><rect x="0" y="0" width="20" height="20"/></clipPath><g clip-path="url(#_clip1)"><rect x="0" y="16.8" width="20" height="3.2" style="fill:#fff;"/><path d="M17.737,3.595l-14.142,14.142l2.263,2.263l14.142,-14.142l-2.263,-2.263Z" style="fill:#fff;"/><path d="M16.8,0l0,20l3.2,0l0,-20l-3.2,0Z" style="fill:#fff;"/><path d="M7.099,18.4l11.301,-11.123l0,11.123l-11.301,0Z" style="fill:#fff;"/></g></svg>';const restore='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><rect id="restore" x="0" y="0" width="20" height="20" style="fill:none;"/><g><rect x="7" y="2.5" width="10" height="10" style="fill:none;stroke:#fff;stroke-width:1.5px;"/><rect x="7" y="2.5" width="10" height="2" style="fill:#fff;"/></g><g><rect x="3" y="7.5" width="10" height="10" style="fill:none;stroke:#fff;stroke-width:1.5px;"/><g><rect x="3" y="7.5" width="10" height="2" style="fill:#fff;"/></g></g></svg>';

/**
 * @typedef {object} WindowOptions
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [width]
 * @property {number} [height]
 * @property {boolean} [modal]
 * @property {boolean} [openOnCreate=true]
 * @property {boolean} [movable=true]
 * @property {boolean} [resizable=true]
 * @property {boolean} [maximizable=true]
 * @property {boolean} [closable=true]
 * @property {boolean} [noSnap] don't snap this window or use this window as a snap target
 * @property {boolean} [titlebar=true]
 * @property {string} [titlebarHeight=36px]
 * @property {boolean} [titleCenter]
 * @property {string} [minWidth=200px]
 * @property {string} [minHeight=60px]
 * @property {string} [borderRadius=4px]
 * @property {object} [styles]
 * @property {string} [shadow='0 0 12px 1px rgba(0, 0, 0, 0.6)']
 * @property {number} [animateTime=250]
 * @property {string} [backgroundModal=rgba(0,0,0,0.6)]
 * @property {string} [backgroundWindow=#fefefe]
 * @property {string} [backgroundTitlebarActive=#365d98]
 * @property {string} [backgroundTitlebarInactive=#888888]
 * @property {string} [foregroundButton=#ffffff]
 * @property {string} [foregroundTitle=#ffffff]
 * @property {string} [maximizeButton=...]
 * @property {string} [closeButton=...]
 * @property {string} [resize=...]
 */
const windowOptions = {
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,
    modal: false,
    openOnCreate: true,

    classNames: {},

    minWidth: '200px',
    minHeight: '60px',
    borderRadius: 0,
    styles: {},

    shadow: 'none',
    movable: true,
    resizable: true,
    maximizable: true,
    closable: true,

    titlebar: true,
    titlebarHeight: '2rem',

    backgroundModal: 'rgba(0, 0, 0, 0.6)',
    backgroundWindow: '#fefefe',
    backgroundTitlebarActive: '#365d98',
    backgroundTitlebarInactive: '#888888',
    foregroundButton: '#ffffff',
    foregroundTitle: '#ffffff',

    closeButton: close,
    maximizeButton: maximize,
    restoreButton: restore,

    backgroundResize: resize
};

const DEFAULT_COLOR = '#a8f0f4';
const DEFAULT_SIZE = 10;

const SnapOptionsDefault = {
    screen: true,
    windows: true,
    snap: 20,
    color: DEFAULT_COLOR,
    spacing: 5,
    indicator: DEFAULT_SIZE
};

class Snap
{
    /**
     * add edge snapping plugin
     * @param {WindowManager} wm
     * @param {object} [options]
     * @param {boolean} [options.screen=true] snap to screen edges
     * @param {boolean} [options.windows=true] snap to window edges
     * @param {number} [options.snap=20] distance to edge in pixels before snapping and width/height of snap bars
     * @param {string} [options.color=#a8f0f4] color for snap bars
     * @param {number} [options.spacing=5] spacing distance between window and edges
     * @param {number} [options.indicator=10] size in pixels of snapping indicator (the indicator is actually twice the size of what is shown)
     */
    constructor(wm, options={})
    {
        this.wm = wm;
        this.options = Object.assign({}, SnapOptionsDefault, options);
        this.highlights = html({ parent: this.wm.overlay, styles: { 'position': 'absolute' } });
        this.horizontal = html({
            parent: this.highlights, styles: {
                display: 'none',
                position: 'absolute',
                height: `${this.options.indicator}px`,
                borderRadius: `${this.options.indicator}px`,
                backgroundColor: this.options.color
            }
        });
        this.vertical = html({
            parent: this.highlights, styles: {
                display: 'none',
                position: 'absolute',
                width: `${this.options.indicator}px`,
                borderRadius: `${this.options.indicator}px`,
                backgroundColor: this.options.color
            }
        });
        this.horizontal;
        this.showing = [];
    }

    stop()
    {
        this.highlights.remove();
        this.stopped = true;
    }

    addWindow(win)
    {
        win.on('move', () => this.move(win));
        win.on('move-end', () => this.moveEnd(win));
    }

    screenMove(rect, horizontal, vertical)
    {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        if (rect.left - this.options.snap <= width && rect.right + this.options.snap >= 0)
        {
            if (Math.abs(rect.top - 0) <= this.options.snap)
            {
                horizontal.push({ distance: Math.abs(rect.top - 0), left: 0, width, top: 0, side: 'top', screen: true });
            }
            else if (Math.abs(rect.bottom - height) <= this.options.snap)
            {
                horizontal.push({ distance: Math.abs(rect.bottom - height), left: 0, width, top: height, side: 'bottom', screen: true });
            }
        }
        if (rect.top - this.options.snap <= height && rect.bottom + this.options.snap >= 0)
        {
            if (Math.abs(rect.left - 0) <= this.options.snap)
            {
                vertical.push({ distance: Math.abs(rect.left - 0), top: 0, height, left: 0, side: 'left', screen: true });
            }
            else if (Math.abs(rect.right - width) <= this.options.snap)
            {
                vertical.push({ distance: Math.abs(rect.right - width), top: 0, height, left: width, side: 'right', screen: true });
            }
        }
    }

    windowsMove(original, rect, horizontal, vertical)
    {
        for (let win of this.wm.windows)
        {
            if (!win.options.noSnap && win !== original)
            {
                const rect2 = win.win.getBoundingClientRect();
                if (rect.left - this.options.snap <= rect2.right && rect.right + this.options.snap >= rect2.left)
                {
                    if (Math.abs(rect.top - rect2.bottom) <= this.options.snap)
                    {
                        horizontal.push({ distance: Math.abs(rect.top - rect2.bottom), left: rect2.left, width: rect2.width, top: rect2.bottom, side: 'top' });
                        if (Math.abs(rect.left - rect2.left) <= this.options.snap)
                        {
                            vertical.push({ distance: Math.abs(rect.left - rect2.left), top: rect2.top, height: rect2.height, left: rect2.left, side: 'left', noSpacing: true });
                        }
                        else if (Math.abs(rect.right - rect2.right) <= this.options.snap)
                        {
                            vertical.push({ distance: Math.abs(rect.right - rect2.right), top: rect2.top, height: rect2.height, left: rect2.right, side: 'right', noSpacing: true });
                        }
                    }
                    else if (Math.abs(rect.bottom - rect2.top) <= this.options.snap)
                    {
                        horizontal.push({ distance: Math.abs(rect.bottom - rect2.top), left: rect2.left, width: rect2.width, top: rect2.top, side: 'bottom' });
                        if (Math.abs(rect.left - rect2.left) <= this.options.snap)
                        {
                            vertical.push({ distance: Math.abs(rect.left - rect2.left), top: rect2.top, height: rect2.height, left: rect2.left, side: 'left', noSpacing: true });
                        }
                        else if (Math.abs(rect.right - rect2.right) <= this.options.snap)
                        {
                            vertical.push({ distance: Math.abs(rect.right - rect2.right), top: rect2.top, height: rect2.height, left: rect2.right, side: 'right', noSpacing: true });
                        }
                    }
                }
                if (rect.top - this.options.snap <= rect2.bottom && rect.bottom + this.options.snap >= rect2.top)
                {
                    if (Math.abs(rect.left - rect2.right) <= this.options.snap)
                    {
                        vertical.push({ distance: Math.abs(rect.left - rect2.right), top: rect2.top, height: rect2.height, left: rect2.right, side: 'left' });
                        if (Math.abs(rect.top - rect2.top) <= this.options.snap)
                        {
                            horizontal.push({ distance: Math.abs(rect.top - rect2.top), left: rect2.left, width: rect2.width, top: rect2.top, side: 'top', noSpacing: true });
                        }
                        else if (Math.abs(rect.bottom - rect2.bottom) <= this.options.snap)
                        {
                            horizontal.push({ distance: Math.abs(rect.bottom - rect2.bottom), left: rect2.left, width: rect2.width, top: rect2.bottom, side: 'bottom', noSpacing: true });
                        }
                    }
                    else if (Math.abs(rect.right - rect2.left) <= this.options.snap)
                    {
                        vertical.push({ distance: Math.abs(rect.right - rect2.left), top: rect2.top, height: rect2.height, left: rect2.left, side: 'right' });
                        if (Math.abs(rect.top - rect2.top) <= this.options.snap)
                        {
                            horizontal.push({ distance: Math.abs(rect.top - rect2.top), left: rect2.left, width: rect2.width, top: rect2.top, side: 'top', noSpacing: true });
                        }
                        else if (Math.abs(rect.bottom - rect2.bottom) <= this.options.snap)
                        {
                            horizontal.push({ distance: Math.abs(rect.bottom - rect2.bottom), left: rect2.left, width: rect2.width, top: rect2.bottom, side: 'bottom', noSpacing: true });
                        }
                    }
                }
            }
        }
    }

    move(win)
    {
        if (this.stopped || win.options.noSnap || win.isModal())
        {
            return
        }
        this.horizontal.style.display = 'none';
        this.vertical.style.display = 'none';
        const horizontal = [];
        const vertical = [];
        const rect = win.win.getBoundingClientRect();
        if (this.options.screen)
        {
            this.screenMove(rect, horizontal, vertical);
        }
        if (this.options.windows)
        {
            this.windowsMove(win, rect, horizontal, vertical);
        }
        if (horizontal.length)
        {
            horizontal.sort((a, b) => { return a.distance - b.distance });
            const find = horizontal[0];
            this.horizontal.style.display = 'block';
            this.horizontal.style.width = find.width + 'px';
            this.horizontal.y = find.top - this.options.indicator / 2;
            this.horizontal.style.transform = `translate(${find.left}px,${this.horizontal.y}px)`;
            this.horizontal.side = find.side;
            this.horizontal.noSpacing = find.noSpacing;
            this.horizontal.screen = find.screen;
        }
        if (vertical.length)
        {
            vertical.sort((a, b) => { return a.distance - b.distance });
            const find = vertical[0];
            this.vertical.style.display  = 'block';
            this.vertical.style.height = find.height + 'px';
            this.vertical.x = find.left - this.options.indicator / 2;
            this.vertical.style.transform = `translate(${this.vertical.x}px,${find.top}px)`;
            this.vertical.side = find.side;
            this.vertical.noSpacing = find.noSpacing;
            this.vertical.screen = find.screen;
        }
    }

    moveEnd(win)
    {
        if (this.stopped)
        {
            return
        }
        if (this.horizontal.style.display === 'block')
        {
            const spacing = this.horizontal.noSpacing ? 0 : this.options.spacing;
            const adjust = win.minimized ? (win.height - win.height * win.minimized.scaleY) / 2 : 0;
            switch (this.horizontal.side)
            {
                case 'top':
                    win.y = this.horizontal.y - adjust + spacing + this.options.indicator / 2;
                    break

                case 'bottom':
                    win.bottom = Math.floor(this.horizontal.y + adjust - spacing + this.options.indicator / 2);
                    break
            }
            win.attachToScreen('vertical', this.horizontal.screen ? this.horizontal.side : '');
        }
        if (this.vertical.style.display === 'block')
        {
            const spacing = this.vertical.noSpacing ? 0 : this.options.spacing;
            const adjust = win.minimized ? (win.width - win.width * win.minimized.scaleX) / 2 : 0;
            switch (this.vertical.side)
            {
                case 'left':
                    win.x = this.vertical.x - adjust + spacing + this.options.indicator / 2;
                    break

                case 'right':
                    win.right = Math.floor(this.vertical.x + adjust - spacing + this.options.indicator / 2);
                    break
            }
            win.attachToScreen('horziontal', this.vertical.screen ? this.vertical.side : '');
        }
        this.horizontal.style.display = this.vertical.style.display = 'none';
    }
}

const windowManagerOptions = {
    parent: document.body,
    quiet: false,
    keepInside: true,
    snap: true
};

/**
 * Creates a windowing system to create and manage windows
 *
 * @extends EventEmitter
 * @example
 * var wm = new WindowManager();
 *
 * wm.createWindow({ x: 20, y: 20, width: 200 })
 * wm.content.innerHTML = 'Hello there!'
 */
class WindowManager
{
    /**
     * @param {object} [options]
     * @param {HTMLElement} [options.parent=document.body]
     * @param {boolean} [options.quiet] suppress the simple-window-manager console message
     * @param {(boolean|SnapOptions)} [options.snap] turn on edge and/or screen snapping
     * @param {(boolean|'horizontal'|'vertical')} [options.keepInside=true] keep windows inside the parent in a certain direction
     * @param {WindowOptions} [defaultOptions] default WindowOptions used when createWindow is called
     */
    constructor(options={}, defaultOptions={})
    {
        this.windows = [];
        this.active = null;
        this.options = Object.assign({}, windowManagerOptions, options);
        this.defaultOptions = Object.assign({}, windowOptions, defaultOptions);
        if (!this.options.quiet)
        {
            console.log('%c ☕ simple-window-manager initialized ☕', 'color: #ff00ff');
        }
        this._createDom(options.parent || document.body);
        if (this.options.snap)
        {
            this.snap(this.options.snap === true ? {} : this.options.snap);
        }
        window.addEventListener('resize', () => this.resize());
    }

    /**
     * Create a window
     * @param {WindowOptions} [options]
     * @param {string} [options.title]
     * @param {number} [options.x] position
     * @param {number} [options.y] position
     * @param {boolean} [options.modal]
     * @param {(number|*)} [options.id] if not provide, id will be assigned in order of creation (0, 1, 2...)
     * @returns {Window} the created window
     */
    createWindow(options={})
    {
        const win = new Window(this, Object.assign({}, this.defaultOptions, options));
        win.on('open', () => this._open(win));
        win.on('focus', () => this._focus(win));
        win.on('blur', () => this._blur(win));
        win.on('close', () => this._close(win));
        win.win.addEventListener('mousemove', (e) => this._move(e));
        win.win.addEventListener('touchmove', (e) => this._move(e));
        win.win.addEventListener('mouseup', (e) => this._up(e));
        win.win.addEventListener('touchend', (e) => this._up(e));
        if (this._snap && !options.noSnap)
        {
            this._snap.addWindow(win);
        }
        win.resizePlacement(this.bounds, this.options.keepInside);
        if (win.options.openOnCreate)
        {
            win.open();
        }
        return win
    }

    /**
     * Attach an existing window to the WindowManager
     * Note: WindowManager.createWindow is the preferred way to create windows to ensure that all the defaultOptions
     * are applied to the Window. If you use this function, then Window needs to be initialized with WindowOptions.
     * @param {Window} win
     * @returns {Window} the window
     */
    attachWindow(win)
    {
        win.on('open', this._open, this);
        win.on('focus', this._focus, this);
        win.on('blur', this._blur, this);
        win.on('close', this._close, this);
        this.win.appendChild(win.win);
        win.wm = this;
        win.win.addEventListener('mousemove', (e) => this._move(e));
        win.win.addEventListener('touchmove', (e) => this._move(e));
        win.win.addEventListener('mouseup', (e) => this._up(e));
        win.win.addEventListener('touchend', (e) => this._up(e));
        if (this._snap && !this.defaultOptions.noSnap)
        {
            this._snap.addWindow(win);
        }
        return win
    }

    /**
     * enable edge and/or screen snapping
     * @param {SnapOptions} options
     */
    snap(options)
    {
        this._snap = new Snap(this, options);
        for (let win of this.windows)
        {
            if (!win.options.noSnap)
            {
                this._snap.addWindow(win);
            }
        }
    }

    /**
     * send window to front
     * @param {Window} win
     */
    sendToFront(win)
    {
        const index = this.windows.indexOf(win);
        console.assert(index !== -1, 'sendToFront should find window in this.windows');
        if (index !== this.windows.length - 1)
        {
            this.windows.splice(index, 1);
            this.windows.push(win);
            this._reorder();
        }
    }

    /**
     * send window to back
     * @param {Window} win
     */
    sendToBack(win)
    {
        const index = this.windows.indexOf(win);
        console.assert(index !== -1, 'sendToFront should find window in this.windows');
        if (index !== 0)
        {
            this.windows.splice(index, 1);
            this.windows.unshift(win);
            this._reorder();
        }
    }

    /**
     * save the state of all the windows
     * @returns {object} use this object in load() to restore the state of all windows
     */
    save()
    {
        const data = {};
        for (let i = 0; i < this.windows.length; i++)
        {
            const entry = this.windows[i];
            data[entry.id] = entry.save();
            data[entry.id].order = i;
        }
        return data
    }

    /**
     * restores the state of all the windows
     * NOTE: this requires that the windows have the same id as when save() was called
     * @param {object} data created by save()
     */
    load(data)
    {
        for (let i = 0; i < this.windows.length; i++)
        {
            const entry = this.windows[i];
            if (data[entry.id])
            {
                entry.load(data[entry.id]);
            }
        }
        // reorder windows
    }

    /**
     * close all windows
     */
    closeAll()
    {
        for (let win of this.windows)
        {
            win.close();
        }
        this.windows = [];
        this.active = null;
    }

    /**
     * reorder windows
     * @private
     * @returns {number} available z-index for top window
     */
    _reorder()
    {
        let i = 0;
        for (const win of this.windows)
        {
            if (!win.isClosed())
            {
                win.z = i++;
            }
        }
    }

    /**
     * @param {HTMLElement} parent
     */
    _createDom(parent)
    {
        /**
         * This is the top-level DOM element
         * @type {HTMLElement}
         * @readonly
         */
        this.win = html({
            parent, styles: {
                'user-select': 'none',
                'width': '100%',
                'height': '100%',
                'overflow': 'hidden',
                'z-index': -1,
                'cursor': 'default'
            }
        });

        /**
         * This is the bottom DOM element. Use this to set a wallpaper or attach elements underneath the windows
         * @type {HTMLElement}
         * @readonly
         */
        this.overlay = html({
            parent: this.win, styles: {
                'user-select': 'none',
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': '100%',
                'height': '100%',
                'overflow': 'hidden'
            }
        });
        this.overlay.addEventListener('mousemove', (e) => this._move(e));
        this.overlay.addEventListener('touchmove', (e) => this._move(e));
        this.overlay.addEventListener('mouseup', (e) => this._up(e));
        this.overlay.addEventListener('touchend', (e) => this._up(e));

        this.modalOverlay = html({
            parent: this.win,
            styles: {
                'display': 'none',
                'user-select': 'none',
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': '100%',
                'height': '100%',
                'overflow': 'hidden',
                'background': this.defaultOptions.backgroundModal
            }
        });
        this.modalOverlay.addEventListener('mousemove', (e) => { this._move(e); e.preventDefault(); e.stopPropagation(); });
        this.modalOverlay.addEventListener('touchmove', (e) => { this._move(e); e.preventDefault(); e.stopPropagation(); });
        this.modalOverlay.addEventListener('mouseup', (e) => { this._up(e); e.preventDefault(); e.stopPropagation(); });
        this.modalOverlay.addEventListener('touchend', (e) => { this._up(e); e.preventDefault(); e.stopPropagation(); });
        this.modalOverlay.addEventListener('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); });
        this.modalOverlay.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); });
    }

    _open(win)
    {
        this.windows.push(win);
        this._reorder();
        if (win.options.modal)
        {
            this.modalOverlay.style.display = 'block';
            this.modalOverlay.style.zIndex = win.z;
        }
        else
        {
            this.modalOverlay.style.display = 'none';
        }
    }

    _focus(win)
    {
        if (this.active === win)
        {
            return
        }
        if (this.active)
        {
            this.active.blur();
        }
        const index = this.windows.indexOf(win);
        console.assert(index !== -1, 'WindowManager._focus should find window in this.windows');
        if (index !== this.windows.length - 1)
        {
            this.windows.splice(index, 1);
            this.windows.push(win);
        }
        this._reorder();
        this.active = this.windows[this.windows.length - 1];
    }

    _blur(win)
    {
        if (this.active === win)
        {
            this.active = null;
        }
    }

    _close(win)
    {
        const index = this.windows.indexOf(win);
        console.assert(index !== -1, 'WindowManager._close should find window in this.windows');
        this.windows.splice(index, 1);
        const next = this.windows[this.windows.length - 1];
        if (win.isModal(true))
        {
            if (next && next.isModal())
            {
                this.modalOverlay.style.zIndex = next.z;
            }
            else
            {
                this.modalOverlay.style.display = 'none';
            }
        }
        next.focus();
    }

    _move(e)
    {
        for (const key in this.windows)
        {
            this.windows[key]._move(e);
        }
    }

    _up(e)
    {
        for (const key in this.windows)
        {
            this.windows[key]._up(e);
        }
    }

    checkModal(win)
    {
        return !this.modal || this.modal === win
    }

    /** @type {Bounds} */
    get bounds()
    {
        return {
            top: this.win.offsetTop,
            bottom: this.win.offsetTop + this.win.offsetHeight,
            left: this.win.offsetLeft,
            right: this.win.offsetLeft + this.win.offsetWidth
        }
    }

    resize()
    {
        const bounds = this.bounds;
        for (const key in this.windows)
        {
            this.windows[key].resizePlacement(bounds, this.options.keepInside);
        }
    }
}

/**
 * @typedef {object} SnapOptions
 * @property {boolean} [screen=true] snap to screen edges
 * @property {boolean} [windows=true] snap to window edges
 * @property {number} [snap=20] distance to edge before snapping
 * @property {string} [color=#a8f0f4] color for snap bars
 * @property {number} [spacing=0] spacing distance between window and edges
 */

/**
 * @typedef {object} Bounds
 * @property {number} left
 * @property {number} right
 * @property {number} top
 * @property {number} bottom
 */

export { Window, WindowManager };
//# sourceMappingURL=simple-window-manager.es.js.map
