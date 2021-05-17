/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./node_modules/svelte/internal/index.mjs
function internal_noop() { }
const identity = x => x;
function internal_assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function internal_run_all(fns) {
    fns.forEach(run);
}
function internal_is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function internal_subscribe(store, ...callbacks) {
    if (store == null) {
        return internal_noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    internal_subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(internal_subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? internal_assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot_spread(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_spread_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_spread_changes_fn(dirty) | get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k in props)
        if (!keys.has(k) && k[0] !== '$')
            rest[k] = props[k];
    return rest;
}
function compute_slots(slots) {
    const result = {};
    for (const key in slots) {
        result[key] = true;
    }
    return result;
}
function once(fn) {
    let ran = false;
    return function (...args) {
        if (ran)
            return;
        ran = true;
        fn.call(this, ...args);
    };
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value = ret) {
    store.set(value);
    return ret;
}
const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
function action_destroyer(action_result) {
    return action_result && internal_is_function(action_result.destroy) ? action_result.destroy : internal_noop;
}

const is_client = typeof window !== 'undefined';
let now = (/* unused pure expression or super */ null && (is_client
    ? () => window.performance.now()
    : () => Date.now()));
let raf = (/* unused pure expression or super */ null && (is_client ? cb => requestAnimationFrame(cb) : internal_noop));
// used internally for testing
function set_now(fn) {
    now = fn;
}
function set_raf(fn) {
    raf = fn;
}

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * For testing purposes only!
 */
function clear_loops() {
    tasks.clear();
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function internal_element(name) {
    return document.createElement(name);
}
function element_is(name, is) {
    return document.createElement(name, { is });
}
function object_without_properties(obj, exclude) {
    const target = {};
    for (const k in obj) {
        if (has_prop(obj, k)
            // @ts-ignore
            && exclude.indexOf(k) === -1) {
            // @ts-ignore
            target[k] = obj[k];
        }
    }
    return target;
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function internal_text(data) {
    return document.createTextNode(data);
}
function space() {
    return internal_text(' ');
}
function empty() {
    return internal_text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function internal_self(fn) {
    return function (event) {
        // @ts-ignore
        if (event.target === this)
            fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
    }
    else {
        attr(node, prop, value);
    }
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function get_binding_group_value(group, __value, checked) {
    const value = new Set();
    for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked)
            value.add(group[i].__value);
    }
    if (!checked) {
        value.delete(__value);
    }
    return Array.from(value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function time_ranges_to_array(ranges) {
    const array = [];
    for (let i = 0; i < ranges.length; i += 1) {
        array.push({ start: ranges.start(i), end: ranges.end(i) });
    }
    return array;
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_element(nodes, name, attributes, svg) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
            let j = 0;
            const remove = [];
            while (j < node.attributes.length) {
                const attribute = node.attributes[j++];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            for (let k = 0; k < remove.length; k++) {
                node.removeAttribute(remove[k]);
            }
            return nodes.splice(i, 1)[0];
        }
    }
    return svg ? svg_element(name) : internal_element(name);
}
function claim_text(nodes, data) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
            node.data = '' + data;
            return nodes.splice(i, 1)[0];
        }
    }
    return internal_text(data);
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_input_type(input, type) {
    try {
        input.type = type;
    }
    catch (e) {
        // do nothing
    }
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
}
function select_options(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        option.selected = ~value.indexOf(option.__value);
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function select_multiple_value(select) {
    return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = internal_element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(anchor = null) {
        this.a = anchor;
        this.e = this.n = null;
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = internal_element(target.nodeName);
            this.t = target;
            this.h(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}
function attribute_to_object(attributes) {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}
function get_custom_elements_slots(element) {
    const result = {};
    element.childNodes.forEach((node) => {
        result[node.slot || 'default'] = true;
    });
    return result;
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(internal_element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return internal_noop;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return internal_noop;
    const { delay = 0, duration = 300, easing = identity, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = internal_noop, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
function hasContext(key) {
    return get_current_component().$$.context.has(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        internal_run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        internal_run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = internal_noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            delete_rule(node);
            if (internal_is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = internal_noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        internal_run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (internal_is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = internal_noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    internal_run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (internal_is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_destroy_block(block, lookup) {
    block.f();
    destroy_block(block, lookup);
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, classes_to_add) {
    const attributes = Object.assign({}, ...args);
    if (classes_to_add) {
        if (attributes.class == null) {
            attributes.class = classes_to_add;
        }
        else {
            attributes.class += ' ' + classes_to_add;
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += ' ' + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += ' ' + name;
        }
        else if (value != null) {
            str += ` ${name}="${String(value).replace(/"/g, '&#34;').replace(/'/g, '&#39;')}"`;
        }
    });
    return str;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function internal_escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
function debug(file, line, column, values) {
    console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
    console.log(values); // eslint-disable-line no-console
    return '';
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : context || []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            internal_run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(internal_escape(value)) : `"${value}"`}`}`;
}
function add_classes(classes) {
    return classes ? ` class="${classes}"` : '';
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(internal_is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                internal_run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        internal_run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: internal_noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : options.context || []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    internal_run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
let SvelteElement;
if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            const { on_mount } = this.$$;
            this.$$.on_disconnect = on_mount.map(run).filter(internal_is_function);
            // @ts-ignore todo: improve typings
            for (const key in this.$$.slotted) {
                // @ts-ignore todo: improve typings
                this.appendChild(this.$$.slotted[key]);
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            this[attr] = newValue;
        }
        disconnectedCallback() {
            internal_run_all(this.$$.on_disconnect);
        }
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = internal_noop;
        }
        $on(type, callback) {
            // TODO should this delegate to addEventListener?
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    };
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = internal_noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.2' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function detach_between_dev(before, after) {
    while (before.nextSibling && before.nextSibling !== after) {
        detach_dev(before.nextSibling);
    }
}
function detach_before_dev(after) {
    while (after.previousSibling) {
        detach_dev(after.previousSibling);
    }
}
function detach_after_dev(before) {
    while (before.nextSibling) {
        detach_dev(before.nextSibling);
    }
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function dataset_dev(node, property, value) {
    node.dataset[property] = value;
    dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends (/* unused pure expression or super */ null && (SvelteComponent)) {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to seperate the more strictly typed class.
 */
class SvelteComponentTyped extends (/* unused pure expression or super */ null && (SvelteComponentDev)) {
    constructor(options) {
        super(options);
    }
}
function loop_guard(timeout) {
    const start = Date.now();
    return () => {
        if (Date.now() - start > timeout) {
            throw new Error('Infinite loop detected');
        }
    };
}



;// CONCATENATED MODULE: ./src/utils/config.js
const DEFAULT_CONFIG = {
  zenMode: true,
  darkTheme: true,
  fullPage: true,
  hotkeysActive: true,
  keySetting: [{
    key: 't',
    action: 'toggleDarkTheme',
    ctrl: false,
    alt: false,
    shift: false
  }, {
    key: 'z',
    action: 'toggleZenMode'
  }, {
    key: 'u',
    action: 'une'
  }, {
    key: 'o',
    action: 'nextPage'
  }, {
    key: 'i',
    action: 'previousPage'
  }, {
    key: 'p',
    action: 'fullPage'
  }, {
    key: '+',
    action: 'increaseFontSize'
  }, {
    key: '-',
    action: 'decreaseFontSize'
  }]
};
const CONFIG_KEYS = Object.keys(DEFAULT_CONFIG);
const getConfig = (keys = CONFIG_KEYS) => {
  return new Promise(resolve => {
    chrome.storage.local.get(keys, config => {
      resolve({ ...DEFAULT_CONFIG,
        ...config
      });
    });
  });
};
const setConfig = newConfig => {
  chrome.storage.local.set(newConfig);
};
const setDarkTheme = newDarkTheme => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      darkTheme: newDarkTheme
    }, resolve);
  });
};
const toggleDarkTheme = async () => {
  const {
    darkTheme
  } = await getConfig();
  return setDarkTheme(!darkTheme);
};
const setZenMode = newZenMode => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      zenMode: newZenMode
    }, resolve);
  });
};
const toggleZenMode = async () => {
  const {
    zenMode
  } = await getConfig();
  return setZenMode(!zenMode);
};
const setFullPage = newFullPage => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      fullPage: newFullPage
    }, resolve);
  });
};
const toggleFullPage = async () => {
  const {
    fullPage
  } = await getConfig();
  return setFullPage(!fullPage);
};
const setHotkeysActive = newHotkeysActive => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      hotkeysActive: newHotkeysActive
    }, resolve);
  });
};
const toggleHotkeysActive = async () => {
  const {
    hotkeysActive
  } = await getConfig();
  return setZenMode(!hotkeysActive);
};
;// CONCATENATED MODULE: ./src/interactions/hotkeys.js

let keySetting = (/* unused pure expression or super */ null && ([]));
const enableHotkeys = newKeySetting => {
  keySetting = newKeySetting;
  document.addEventListener('keydown', onKeydown);
};
const disableHotkeys = () => {
  document.removeEventListener('keydown', onKeydown);
};
const ignoredTagnames = (/* unused pure expression or super */ null && (['input', 'textarea']));

let onKeydown = e => {
  // ignore when we are inside an input
  const tagname = e.target.tagName.toLowerCase();

  if (ignoredTagnames.includes(tagname)) {
    return;
  }

  handleKey(e.key, {
    alt: !!e.altKey,
    ctrl: !!e.ctrlKey,
    shift: !!e.shiftKey
  }, e);
};

const handleKey = (keyChar, {
  alt: altMod,
  ctrl: ctrlMod,
  shift: shiftMod
}, e) => {
  const {
    action
  } = keySetting.find(({
    key,
    alt,
    ctrl,
    shift
  }) => key === keyChar && !!alt === altMod && !!ctrl === ctrlMod && !!shift === shiftMod);

  if (action) {
    e.preventDefault();
    e.stopPropagation();
    actions[action].run();
  }
};

const actions = {
  // dark/light theme toggle
  toggleDarkTheme: {
    label: 'Activer/désactiver le thème sombre',
    run: toggleDarkTheme
  },
  // zen mode toggle
  toggleZenMode: {
    label: 'Activer/désactiver le mode zen',
    run: toggleZenMode
  },
  // back to "la une"
  une: {
    label: 'Retour à la une',
    run: () => {
      const linkEl = document.querySelector('a.logo');
      linkEl === null || linkEl === void 0 ? void 0 : linkEl.click();
    }
  },
  // next page
  nextPage: {
    label: 'Page suivante',
    run: () => {
      const linkEl = document.querySelector('ul.mini-pager li.next a');
      linkEl === null || linkEl === void 0 ? void 0 : linkEl.click();
    }
  },
  // previous page
  previousPage: {
    label: 'Page précédente',
    run: () => {
      const linkEl = document.querySelector('ul.mini-pager li.previous a');
      linkEl === null || linkEl === void 0 ? void 0 : linkEl.click();
    }
  },
  // full page read
  fullPage: {
    label: 'Lecture sur une page',
    run: () => {
      const linkEl = document.querySelector('ul.sub-menu li.content-page-full a');
      linkEl.click();
    }
  },
  // increase font-size
  increaseFontSize: {
    label: 'Augmenter la taille de police',
    run: () => {
      const buttonEl = document.querySelector('ul.sub-menu li ul li button.increase-fs');

      if (!buttonEl.disabled) {
        buttonEl.click();
      }
    }
  },
  // decrease font-size
  decreaseFontSize: {
    label: 'Diminuer la taille de police',
    run: () => {
      const buttonEl = document.querySelector('ul.sub-menu li ul li button.decrease-fs');

      if (!buttonEl.disabled) {
        buttonEl.click();
      }
    }
  }
};
;// CONCATENATED MODULE: ./node_modules/svelte/store/index.mjs



const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = internal_noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = internal_noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || internal_noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = is_function(result) ? result : noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            run_all(unsubscribers);
            cleanup();
        };
    });
}



;// CONCATENATED MODULE: ./src/utils/store.js



const createConfigStore = () => {
  const {
    set,
    subscribe,
    update
  } = writable({ ...DEFAULT_CONFIG,
    loading: true
  }); // store init

  getConfig().then(config => {
    set({ ...config,
      loading: false
    });
  }); // store reaction

  chrome.storage.onChanged.addListener(changes => {
    const newStore = {};
    CONFIG_KEYS.forEach(key => {
      if (changes[key]) {
        newStore[key] = changes[key].newValue;
      }
    });
    update(prev => ({ ...prev,
      ...newStore,
      loading: false
    }));
  });
  return {
    subscribe,
    set: args => {
      setConfig({ ...args,
        loading: true
      });
    }
  };
};

const configStore = createConfigStore();
;// CONCATENATED MODULE: ./src/components/Form/FormField.svelte
/* src/components/Form/FormField.svelte generated by Svelte v3.38.2 */


function add_css() {
	var style = internal_element("style");
	style.id = "svelte-1utonij-style";
	style.textContent = ".form-field.svelte-1utonij{padding-bottom:16px}";
	append(document.head, style);
}

function create_fragment(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			div = internal_element("div");
			if (default_slot) default_slot.c();
			attr(div, "class", "form-field svelte-1utonij");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class FormField extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1utonij-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

/* harmony default export */ const FormField_svelte = (FormField);
;// CONCATENATED MODULE: ./src/components/Form/FormInput.svelte
/* src/components/Form/FormInput.svelte generated by Svelte v3.38.2 */


function FormInput_svelte_add_css() {
	var style = internal_element("style");
	style.id = "svelte-bouj6m-style";
	style.textContent = ".form-input.svelte-bouj6m{margin:-4px;padding:4px}.form-input.svelte-bouj6m:hover{background-color:rgba(0,0,0,0.1)}";
	append(document.head, style);
}

function FormInput_svelte_create_fragment(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			div = internal_element("div");
			if (default_slot) default_slot.c();
			attr(div, "class", "form-input svelte-bouj6m");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function FormInput_svelte_instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class FormInput extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-bouj6m-style")) FormInput_svelte_add_css();
		init(this, options, FormInput_svelte_instance, FormInput_svelte_create_fragment, safe_not_equal, {});
	}
}

/* harmony default export */ const FormInput_svelte = (FormInput);
;// CONCATENATED MODULE: ./src/components/Form/KeyboardInputButton.svelte
/* src/components/Form/KeyboardInputButton.svelte generated by Svelte v3.38.2 */


function KeyboardInputButton_svelte_add_css() {
	var style = internal_element("style");
	style.id = "svelte-132rg87-style";
	style.textContent = "button.svelte-132rg87{height:32px;min-width:32px;padding:4px;line-height:20px;font-size:20px;cursor:pointer;margin-right:4px}button.disabled.svelte-132rg87{color:rgba(16, 16, 16, 0.3);background-color:rgba(239, 239, 239, 0.3);border-color:rgba(118, 118, 118, 0.3)}button.active.svelte-132rg87{color:black;background-color:rgb(255, 125, 125)}";
	append(document.head, style);
}

function KeyboardInputButton_svelte_create_fragment(ctx) {
	let button;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[5].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

	return {
		c() {
			button = internal_element("button");
			if (default_slot) default_slot.c();
			attr(button, "class", "svelte-132rg87");
			toggle_class(button, "disabled", /*disabled*/ ctx[0]);
			toggle_class(button, "active", /*active*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (default_slot) {
				default_slot.m(button, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[6]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[4], dirty, null, null);
				}
			}

			if (dirty & /*disabled*/ 1) {
				toggle_class(button, "disabled", /*disabled*/ ctx[0]);
			}

			if (dirty & /*active*/ 2) {
				toggle_class(button, "active", /*active*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

function KeyboardInputButton_svelte_instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { disabled } = $$props;
	let { active } = $$props;
	let { setActiveId } = $$props;
	let { id } = $$props;

	const click_handler = () => {
		if (!disabled) {
			setActiveId(id);
		}
	};

	$$self.$$set = $$props => {
		if ("disabled" in $$props) $$invalidate(0, disabled = $$props.disabled);
		if ("active" in $$props) $$invalidate(1, active = $$props.active);
		if ("setActiveId" in $$props) $$invalidate(2, setActiveId = $$props.setActiveId);
		if ("id" in $$props) $$invalidate(3, id = $$props.id);
		if ("$$scope" in $$props) $$invalidate(4, $$scope = $$props.$$scope);
	};

	return [disabled, active, setActiveId, id, $$scope, slots, click_handler];
}

class KeyboardInputButton extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-132rg87-style")) KeyboardInputButton_svelte_add_css();

		init(this, options, KeyboardInputButton_svelte_instance, KeyboardInputButton_svelte_create_fragment, safe_not_equal, {
			disabled: 0,
			active: 1,
			setActiveId: 2,
			id: 3
		});
	}
}

/* harmony default export */ const KeyboardInputButton_svelte = (KeyboardInputButton);
;// CONCATENATED MODULE: ./src/components/Form/KeyboardInput.svelte
/* src/components/Form/KeyboardInput.svelte generated by Svelte v3.38.2 */




function KeyboardInput_svelte_add_css() {
	var style = internal_element("style");
	style.id = "svelte-1lzsczn-style";
	style.textContent = ".keyboard-input.svelte-1lzsczn{width:100%;display:flex;margin-bottom:4px}.label-container.svelte-1lzsczn{flex-basis:50%;text-align:left}.button-container.svelte-1lzsczn{flex-basis:50%;text-align:right}span.svelte-1lzsczn{flex-grow:1;line-height:32px}";
	append(document.head, style);
}

// (17:4) {#if ctrl}
function create_if_block_2(ctx) {
	let keyboardinputbutton;
	let current;

	keyboardinputbutton = new KeyboardInputButton_svelte({
			props: {
				active: /*active*/ ctx[5],
				disabled: /*disabled*/ ctx[6],
				id: /*id*/ ctx[7],
				setActiveId: /*setActiveId*/ ctx[8],
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(keyboardinputbutton.$$.fragment);
		},
		m(target, anchor) {
			mount_component(keyboardinputbutton, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const keyboardinputbutton_changes = {};
			if (dirty & /*active*/ 32) keyboardinputbutton_changes.active = /*active*/ ctx[5];
			if (dirty & /*disabled*/ 64) keyboardinputbutton_changes.disabled = /*disabled*/ ctx[6];
			if (dirty & /*id*/ 128) keyboardinputbutton_changes.id = /*id*/ ctx[7];
			if (dirty & /*setActiveId*/ 256) keyboardinputbutton_changes.setActiveId = /*setActiveId*/ ctx[8];

			if (dirty & /*$$scope*/ 512) {
				keyboardinputbutton_changes.$$scope = { dirty, ctx };
			}

			keyboardinputbutton.$set(keyboardinputbutton_changes);
		},
		i(local) {
			if (current) return;
			transition_in(keyboardinputbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(keyboardinputbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(keyboardinputbutton, detaching);
		}
	};
}

// (18:6) <KeyboardInputButton {active} {disabled} {id} {setActiveId}>
function create_default_slot_3(ctx) {
	let t;

	return {
		c() {
			t = internal_text("Ctrl");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (20:4) {#if shift}
function create_if_block_1(ctx) {
	let keyboardinputbutton;
	let current;

	keyboardinputbutton = new KeyboardInputButton_svelte({
			props: {
				active: /*active*/ ctx[5],
				disabled: /*disabled*/ ctx[6],
				id: /*id*/ ctx[7],
				setActiveId: /*setActiveId*/ ctx[8],
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(keyboardinputbutton.$$.fragment);
		},
		m(target, anchor) {
			mount_component(keyboardinputbutton, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const keyboardinputbutton_changes = {};
			if (dirty & /*active*/ 32) keyboardinputbutton_changes.active = /*active*/ ctx[5];
			if (dirty & /*disabled*/ 64) keyboardinputbutton_changes.disabled = /*disabled*/ ctx[6];
			if (dirty & /*id*/ 128) keyboardinputbutton_changes.id = /*id*/ ctx[7];
			if (dirty & /*setActiveId*/ 256) keyboardinputbutton_changes.setActiveId = /*setActiveId*/ ctx[8];

			if (dirty & /*$$scope*/ 512) {
				keyboardinputbutton_changes.$$scope = { dirty, ctx };
			}

			keyboardinputbutton.$set(keyboardinputbutton_changes);
		},
		i(local) {
			if (current) return;
			transition_in(keyboardinputbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(keyboardinputbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(keyboardinputbutton, detaching);
		}
	};
}

// (21:6) <KeyboardInputButton {active} {disabled} {id} {setActiveId}>
function create_default_slot_2(ctx) {
	let t;

	return {
		c() {
			t = internal_text("Maj");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (23:4) {#if alt}
function create_if_block(ctx) {
	let keyboardinputbutton;
	let current;

	keyboardinputbutton = new KeyboardInputButton_svelte({
			props: {
				active: /*active*/ ctx[5],
				disabled: /*disabled*/ ctx[6],
				id: /*id*/ ctx[7],
				setActiveId: /*setActiveId*/ ctx[8],
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(keyboardinputbutton.$$.fragment);
		},
		m(target, anchor) {
			mount_component(keyboardinputbutton, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const keyboardinputbutton_changes = {};
			if (dirty & /*active*/ 32) keyboardinputbutton_changes.active = /*active*/ ctx[5];
			if (dirty & /*disabled*/ 64) keyboardinputbutton_changes.disabled = /*disabled*/ ctx[6];
			if (dirty & /*id*/ 128) keyboardinputbutton_changes.id = /*id*/ ctx[7];
			if (dirty & /*setActiveId*/ 256) keyboardinputbutton_changes.setActiveId = /*setActiveId*/ ctx[8];

			if (dirty & /*$$scope*/ 512) {
				keyboardinputbutton_changes.$$scope = { dirty, ctx };
			}

			keyboardinputbutton.$set(keyboardinputbutton_changes);
		},
		i(local) {
			if (current) return;
			transition_in(keyboardinputbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(keyboardinputbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(keyboardinputbutton, detaching);
		}
	};
}

// (24:6) <KeyboardInputButton {active} {disabled} {id} {setActiveId}>
function create_default_slot_1(ctx) {
	let t;

	return {
		c() {
			t = internal_text("Alt");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (26:4) <KeyboardInputButton {active} {disabled} {id} {setActiveId}>
function create_default_slot(ctx) {
	let t;

	return {
		c() {
			t = internal_text(/*value*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*value*/ 1) set_data(t, /*value*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

function KeyboardInput_svelte_create_fragment(ctx) {
	let div2;
	let div0;
	let t0;
	let t1;
	let t2;
	let keyboardinputbutton;
	let t3;
	let div1;
	let span;
	let t4;
	let current;
	let if_block0 = /*ctrl*/ ctx[1] && create_if_block_2(ctx);
	let if_block1 = /*shift*/ ctx[2] && create_if_block_1(ctx);
	let if_block2 = /*alt*/ ctx[3] && create_if_block(ctx);

	keyboardinputbutton = new KeyboardInputButton_svelte({
			props: {
				active: /*active*/ ctx[5],
				disabled: /*disabled*/ ctx[6],
				id: /*id*/ ctx[7],
				setActiveId: /*setActiveId*/ ctx[8],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			div2 = internal_element("div");
			div0 = internal_element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			t2 = space();
			create_component(keyboardinputbutton.$$.fragment);
			t3 = space();
			div1 = internal_element("div");
			span = internal_element("span");
			t4 = internal_text(/*label*/ ctx[4]);
			attr(div0, "class", "button-container svelte-1lzsczn");
			attr(span, "class", "svelte-1lzsczn");
			attr(div1, "class", "label-container svelte-1lzsczn");
			attr(div2, "class", "keyboard-input svelte-1lzsczn");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			if (if_block0) if_block0.m(div0, null);
			append(div0, t0);
			if (if_block1) if_block1.m(div0, null);
			append(div0, t1);
			if (if_block2) if_block2.m(div0, null);
			append(div0, t2);
			mount_component(keyboardinputbutton, div0, null);
			append(div2, t3);
			append(div2, div1);
			append(div1, span);
			append(span, t4);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*ctrl*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*ctrl*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div0, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*shift*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*shift*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div0, t1);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*alt*/ ctx[3]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*alt*/ 8) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div0, t2);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			const keyboardinputbutton_changes = {};
			if (dirty & /*active*/ 32) keyboardinputbutton_changes.active = /*active*/ ctx[5];
			if (dirty & /*disabled*/ 64) keyboardinputbutton_changes.disabled = /*disabled*/ ctx[6];
			if (dirty & /*id*/ 128) keyboardinputbutton_changes.id = /*id*/ ctx[7];
			if (dirty & /*setActiveId*/ 256) keyboardinputbutton_changes.setActiveId = /*setActiveId*/ ctx[8];

			if (dirty & /*$$scope, value*/ 513) {
				keyboardinputbutton_changes.$$scope = { dirty, ctx };
			}

			keyboardinputbutton.$set(keyboardinputbutton_changes);
			if (!current || dirty & /*label*/ 16) set_data(t4, /*label*/ ctx[4]);
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			transition_in(keyboardinputbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			transition_out(keyboardinputbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			destroy_component(keyboardinputbutton);
		}
	};
}

function KeyboardInput_svelte_instance($$self, $$props, $$invalidate) {
	let { value } = $$props;
	let { ctrl } = $$props;
	let { shift } = $$props;
	let { alt } = $$props;
	let { label } = $$props;
	let { active = false } = $$props;
	let { disabled } = $$props;
	let { id } = $$props;
	let { setActiveId } = $$props;

	$$self.$$set = $$props => {
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
		if ("ctrl" in $$props) $$invalidate(1, ctrl = $$props.ctrl);
		if ("shift" in $$props) $$invalidate(2, shift = $$props.shift);
		if ("alt" in $$props) $$invalidate(3, alt = $$props.alt);
		if ("label" in $$props) $$invalidate(4, label = $$props.label);
		if ("active" in $$props) $$invalidate(5, active = $$props.active);
		if ("disabled" in $$props) $$invalidate(6, disabled = $$props.disabled);
		if ("id" in $$props) $$invalidate(7, id = $$props.id);
		if ("setActiveId" in $$props) $$invalidate(8, setActiveId = $$props.setActiveId);
	};

	return [value, ctrl, shift, alt, label, active, disabled, id, setActiveId];
}

class KeyboardInput extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1lzsczn-style")) KeyboardInput_svelte_add_css();

		init(this, options, KeyboardInput_svelte_instance, KeyboardInput_svelte_create_fragment, safe_not_equal, {
			value: 0,
			ctrl: 1,
			shift: 2,
			alt: 3,
			label: 4,
			active: 5,
			disabled: 6,
			id: 7,
			setActiveId: 8
		});
	}
}

/* harmony default export */ const KeyboardInput_svelte = (KeyboardInput);
;// CONCATENATED MODULE: ./src/components/Form/Switch.svelte
/* src/components/Form/Switch.svelte generated by Svelte v3.38.2 */


function Switch_svelte_add_css() {
	var style = internal_element("style");
	style.id = "svelte-j0qz47-style";
	style.textContent = ".switch.svelte-j0qz47.svelte-j0qz47{cursor:pointer;position:relative;display:flex;height:24px;line-height:24px}.label.svelte-j0qz47.svelte-j0qz47{font-size:14px;flex-grow:1}.switch.svelte-j0qz47 input.svelte-j0qz47{opacity:0;width:0;height:0}.slider.svelte-j0qz47.svelte-j0qz47{width:48px;background-color:#ccc;-webkit-transition:0.4s;transition:0.4s}.slider.svelte-j0qz47.svelte-j0qz47:before{position:relative;display:block;content:'';height:22px;width:22px;left:1px;top:1px;background-color:white;-webkit-transition:0.4s;transition:0.4s}input.svelte-j0qz47:checked+.slider.svelte-j0qz47{background-color:red}input.svelte-j0qz47:focus+.slider.svelte-j0qz47{box-shadow:0 0 3px red}input.svelte-j0qz47:checked+.slider.svelte-j0qz47:before{-webkit-transform:translateX(24px);-ms-transform:translateX(24px);transform:translateX(24px)}.slider.round.svelte-j0qz47.svelte-j0qz47{border-radius:34px}.slider.round.svelte-j0qz47.svelte-j0qz47:before{border-radius:50%}";
	append(document.head, style);
}

function Switch_svelte_create_fragment(ctx) {
	let label_1;
	let span0;
	let t0;
	let t1;
	let input;
	let t2;
	let span1;
	let mounted;
	let dispose;

	return {
		c() {
			label_1 = internal_element("label");
			span0 = internal_element("span");
			t0 = internal_text(/*label*/ ctx[1]);
			t1 = space();
			input = internal_element("input");
			t2 = space();
			span1 = internal_element("span");
			attr(span0, "class", "label svelte-j0qz47");
			attr(input, "type", "checkbox");
			input.disabled = /*disabled*/ ctx[2];
			attr(input, "class", "svelte-j0qz47");
			attr(span1, "class", "slider round svelte-j0qz47");
			attr(label_1, "class", "switch svelte-j0qz47");
		},
		m(target, anchor) {
			insert(target, label_1, anchor);
			append(label_1, span0);
			append(span0, t0);
			append(label_1, t1);
			append(label_1, input);
			input.checked = /*checked*/ ctx[0];
			append(label_1, t2);
			append(label_1, span1);

			if (!mounted) {
				dispose = listen(input, "change", /*input_change_handler*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*label*/ 2) set_data(t0, /*label*/ ctx[1]);

			if (dirty & /*disabled*/ 4) {
				input.disabled = /*disabled*/ ctx[2];
			}

			if (dirty & /*checked*/ 1) {
				input.checked = /*checked*/ ctx[0];
			}
		},
		i: internal_noop,
		o: internal_noop,
		d(detaching) {
			if (detaching) detach(label_1);
			mounted = false;
			dispose();
		}
	};
}

function Switch_svelte_instance($$self, $$props, $$invalidate) {
	let { label } = $$props;
	let { checked } = $$props;
	let { disabled = false } = $$props;

	function input_change_handler() {
		checked = this.checked;
		$$invalidate(0, checked);
	}

	$$self.$$set = $$props => {
		if ("label" in $$props) $$invalidate(1, label = $$props.label);
		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
		if ("disabled" in $$props) $$invalidate(2, disabled = $$props.disabled);
	};

	return [checked, label, disabled, input_change_handler];
}

class Switch extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-j0qz47-style")) Switch_svelte_add_css();
		init(this, options, Switch_svelte_instance, Switch_svelte_create_fragment, safe_not_equal, { label: 1, checked: 0, disabled: 2 });
	}
}

/* harmony default export */ const Switch_svelte = (Switch);
;// CONCATENATED MODULE: ./src/components/UI/CategoryTitle.svelte
/* src/components/UI/CategoryTitle.svelte generated by Svelte v3.38.2 */


function CategoryTitle_svelte_add_css() {
	var style = internal_element("style");
	style.id = "svelte-18fj5iu-style";
	style.textContent = "h2.svelte-18fj5iu{display:flex;justify-content:center;align-items:center;text-align:center;line-height:48px;font-size:18px;height:48px}";
	append(document.head, style);
}

function CategoryTitle_svelte_create_fragment(ctx) {
	let h2;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			h2 = internal_element("h2");
			if (default_slot) default_slot.c();
			attr(h2, "class", "svelte-18fj5iu");
		},
		m(target, anchor) {
			insert(target, h2, anchor);

			if (default_slot) {
				default_slot.m(h2, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(h2);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function CategoryTitle_svelte_instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class CategoryTitle extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-18fj5iu-style")) CategoryTitle_svelte_add_css();
		init(this, options, CategoryTitle_svelte_instance, CategoryTitle_svelte_create_fragment, safe_not_equal, {});
	}
}

/* harmony default export */ const CategoryTitle_svelte = (CategoryTitle);
;// CONCATENATED MODULE: ./src/components/UI/Header.svelte
/* src/components/UI/Header.svelte generated by Svelte v3.38.2 */


function Header_svelte_add_css() {
	var style = internal_element("style");
	style.id = "svelte-zjm2p0-style";
	style.textContent = ".header.svelte-zjm2p0{display:flex;justify-content:center;align-items:center;text-align:center;line-height:48px;font-size:22px;height:48px;padding-bottom:24px}";
	append(document.head, style);
}

function Header_svelte_create_fragment(ctx) {
	let h1;

	return {
		c() {
			h1 = internal_element("h1");

			h1.innerHTML = `<img src="mediapart-mod-48.png" alt="logo mediapart mod"/> 
  <span>Mediapart Mod</span>`;

			attr(h1, "class", "header svelte-zjm2p0");
		},
		m(target, anchor) {
			insert(target, h1, anchor);
		},
		p: internal_noop,
		i: internal_noop,
		o: internal_noop,
		d(detaching) {
			if (detaching) detach(h1);
		}
	};
}

class Header extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-zjm2p0-style")) Header_svelte_add_css();
		init(this, options, null, Header_svelte_create_fragment, safe_not_equal, {});
	}
}

/* harmony default export */ const Header_svelte = (Header);
;// CONCATENATED MODULE: ./src/components/UI/ThemeSwitch.svelte
/* src/components/UI/ThemeSwitch.svelte generated by Svelte v3.38.2 */




function ThemeSwitch_svelte_add_css() {
	var style = internal_element("style");
	style.id = "svelte-2pnxup-style";
	style.textContent = "body{margin:0px}.dark.svelte-2pnxup{background-color:#292929;color:#b5b5b5}";
	append(document.head, style);
}

function ThemeSwitch_svelte_create_fragment(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[4].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

	return {
		c() {
			div = internal_element("div");
			if (default_slot) default_slot.c();
			attr(div, "class", "svelte-2pnxup");
			toggle_class(div, "dark", /*dark*/ ctx[0]);
			toggle_class(div, "light", /*light*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[3], dirty, null, null);
				}
			}

			if (dirty & /*dark*/ 1) {
				toggle_class(div, "dark", /*dark*/ ctx[0]);
			}

			if (dirty & /*light*/ 2) {
				toggle_class(div, "light", /*light*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function ThemeSwitch_svelte_instance($$self, $$props, $$invalidate) {
	let dark;
	let light;
	let $configStore;
	component_subscribe($$self, configStore, $$value => $$invalidate(2, $configStore = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(3, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$configStore*/ 4) {
			$: $$invalidate(0, dark = $configStore.darkTheme);
		}

		if ($$self.$$.dirty & /*$configStore*/ 4) {
			$: $$invalidate(1, light = !$configStore.darkTheme);
		}
	};

	return [dark, light, $configStore, $$scope, slots];
}

class ThemeSwitch extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-2pnxup-style")) ThemeSwitch_svelte_add_css();
		init(this, options, ThemeSwitch_svelte_instance, ThemeSwitch_svelte_create_fragment, safe_not_equal, {});
	}
}

/* harmony default export */ const ThemeSwitch_svelte = (ThemeSwitch);
;// CONCATENATED MODULE: ./src/components/Options.svelte
/* src/components/Options.svelte generated by Svelte v3.38.2 */


const { document: document_1 } = globals;











function Options_svelte_add_css() {
	var style = internal_element("style");
	style.id = "svelte-b012qr-style";
	style.textContent = ".layout.svelte-b012qr{box-sizing:border-box;padding:8px;min-height:100vh}.form-container.svelte-b012qr{max-width:700px;margin:auto}.text-container.svelte-b012qr{text-align:center;margin-top:12px}.default-keybinds.svelte-b012qr{background:transparent;border:none;text-decoration:underline;color:currentColor;cursor:pointer}";
	append(document_1.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	return child_ctx;
}

// (76:4) <CategoryTitle>
function create_default_slot_10(ctx) {
	let t;

	return {
		c() {
			t = internal_text("Paramètres généraux");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (79:8) <FormInput>
function create_default_slot_9(ctx) {
	let switch_1;
	let updating_checked;
	let current;

	function switch_1_checked_binding(value) {
		/*switch_1_checked_binding*/ ctx[4](value);
	}

	let switch_1_props = {
		disabled: configStore.loading,
		label: "Thème sombre"
	};

	if (/*$configStore*/ ctx[1].darkTheme !== void 0) {
		switch_1_props.checked = /*$configStore*/ ctx[1].darkTheme;
	}

	switch_1 = new Switch_svelte({ props: switch_1_props });
	binding_callbacks.push(() => bind(switch_1, "checked", switch_1_checked_binding));

	return {
		c() {
			create_component(switch_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(switch_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_1_changes = {};

			if (!updating_checked && dirty & /*$configStore*/ 2) {
				updating_checked = true;
				switch_1_changes.checked = /*$configStore*/ ctx[1].darkTheme;
				add_flush_callback(() => updating_checked = false);
			}

			switch_1.$set(switch_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(switch_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(switch_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(switch_1, detaching);
		}
	};
}

// (78:6) <FormField>
function create_default_slot_8(ctx) {
	let forminput;
	let current;

	forminput = new FormInput_svelte({
			props: {
				$$slots: { default: [create_default_slot_9] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(forminput.$$.fragment);
		},
		m(target, anchor) {
			mount_component(forminput, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const forminput_changes = {};

			if (dirty & /*$$scope, $configStore*/ 32770) {
				forminput_changes.$$scope = { dirty, ctx };
			}

			forminput.$set(forminput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(forminput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(forminput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(forminput, detaching);
		}
	};
}

// (84:8) <FormInput>
function create_default_slot_7(ctx) {
	let switch_1;
	let updating_checked;
	let current;

	function switch_1_checked_binding_1(value) {
		/*switch_1_checked_binding_1*/ ctx[5](value);
	}

	let switch_1_props = {
		disabled: configStore.loading,
		label: "Lecture zen"
	};

	if (/*$configStore*/ ctx[1].zenMode !== void 0) {
		switch_1_props.checked = /*$configStore*/ ctx[1].zenMode;
	}

	switch_1 = new Switch_svelte({ props: switch_1_props });
	binding_callbacks.push(() => bind(switch_1, "checked", switch_1_checked_binding_1));

	return {
		c() {
			create_component(switch_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(switch_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_1_changes = {};

			if (!updating_checked && dirty & /*$configStore*/ 2) {
				updating_checked = true;
				switch_1_changes.checked = /*$configStore*/ ctx[1].zenMode;
				add_flush_callback(() => updating_checked = false);
			}

			switch_1.$set(switch_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(switch_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(switch_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(switch_1, detaching);
		}
	};
}

// (83:6) <FormField>
function create_default_slot_6(ctx) {
	let forminput;
	let current;

	forminput = new FormInput_svelte({
			props: {
				$$slots: { default: [create_default_slot_7] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(forminput.$$.fragment);
		},
		m(target, anchor) {
			mount_component(forminput, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const forminput_changes = {};

			if (dirty & /*$$scope, $configStore*/ 32770) {
				forminput_changes.$$scope = { dirty, ctx };
			}

			forminput.$set(forminput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(forminput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(forminput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(forminput, detaching);
		}
	};
}

// (89:8) <FormInput>
function create_default_slot_5(ctx) {
	let switch_1;
	let updating_checked;
	let current;

	function switch_1_checked_binding_2(value) {
		/*switch_1_checked_binding_2*/ ctx[6](value);
	}

	let switch_1_props = {
		disabled: configStore.loading,
		label: "Lecture sur une page"
	};

	if (/*$configStore*/ ctx[1].fullPage !== void 0) {
		switch_1_props.checked = /*$configStore*/ ctx[1].fullPage;
	}

	switch_1 = new Switch_svelte({ props: switch_1_props });
	binding_callbacks.push(() => bind(switch_1, "checked", switch_1_checked_binding_2));

	return {
		c() {
			create_component(switch_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(switch_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_1_changes = {};

			if (!updating_checked && dirty & /*$configStore*/ 2) {
				updating_checked = true;
				switch_1_changes.checked = /*$configStore*/ ctx[1].fullPage;
				add_flush_callback(() => updating_checked = false);
			}

			switch_1.$set(switch_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(switch_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(switch_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(switch_1, detaching);
		}
	};
}

// (88:6) <FormField>
function create_default_slot_4(ctx) {
	let forminput;
	let current;

	forminput = new FormInput_svelte({
			props: {
				$$slots: { default: [create_default_slot_5] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(forminput.$$.fragment);
		},
		m(target, anchor) {
			mount_component(forminput, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const forminput_changes = {};

			if (dirty & /*$$scope, $configStore*/ 32770) {
				forminput_changes.$$scope = { dirty, ctx };
			}

			forminput.$set(forminput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(forminput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(forminput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(forminput, detaching);
		}
	};
}

// (94:8) <FormInput>
function Options_svelte_create_default_slot_3(ctx) {
	let switch_1;
	let updating_checked;
	let current;

	function switch_1_checked_binding_3(value) {
		/*switch_1_checked_binding_3*/ ctx[7](value);
	}

	let switch_1_props = {
		disabled: configStore.loading,
		label: "Raccourcis clavier"
	};

	if (/*$configStore*/ ctx[1].hotkeysActive !== void 0) {
		switch_1_props.checked = /*$configStore*/ ctx[1].hotkeysActive;
	}

	switch_1 = new Switch_svelte({ props: switch_1_props });
	binding_callbacks.push(() => bind(switch_1, "checked", switch_1_checked_binding_3));

	return {
		c() {
			create_component(switch_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(switch_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_1_changes = {};

			if (!updating_checked && dirty & /*$configStore*/ 2) {
				updating_checked = true;
				switch_1_changes.checked = /*$configStore*/ ctx[1].hotkeysActive;
				add_flush_callback(() => updating_checked = false);
			}

			switch_1.$set(switch_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(switch_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(switch_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(switch_1, detaching);
		}
	};
}

// (93:6) <FormField>
function Options_svelte_create_default_slot_2(ctx) {
	let forminput;
	let current;

	forminput = new FormInput_svelte({
			props: {
				$$slots: { default: [Options_svelte_create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(forminput.$$.fragment);
		},
		m(target, anchor) {
			mount_component(forminput, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const forminput_changes = {};

			if (dirty & /*$$scope, $configStore*/ 32770) {
				forminput_changes.$$scope = { dirty, ctx };
			}

			forminput.$set(forminput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(forminput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(forminput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(forminput, detaching);
		}
	};
}

// (99:4) <CategoryTitle>
function Options_svelte_create_default_slot_1(ctx) {
	let t;

	return {
		c() {
			t = internal_text("Raccourcis clavier");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (101:6) {#each $configStore.keySetting as keyBind}
function create_each_block(ctx) {
	let keyboardinput;
	let current;

	keyboardinput = new KeyboardInput_svelte({
			props: {
				value: /*keyBind*/ ctx[12].key,
				ctrl: /*keyBind*/ ctx[12].ctrl,
				alt: /*keyBind*/ ctx[12].alt,
				shift: /*keyBind*/ ctx[12].shift,
				id: /*keyBind*/ ctx[12].action,
				label: actions[/*keyBind*/ ctx[12].action].label,
				active: /*keyBind*/ ctx[12].action === /*activeId*/ ctx[0],
				disabled: !!/*activeId*/ ctx[0] || !/*$configStore*/ ctx[1].hotkeysActive,
				setActiveId: /*setActiveId*/ ctx[2]
			}
		});

	return {
		c() {
			create_component(keyboardinput.$$.fragment);
		},
		m(target, anchor) {
			mount_component(keyboardinput, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const keyboardinput_changes = {};
			if (dirty & /*$configStore*/ 2) keyboardinput_changes.value = /*keyBind*/ ctx[12].key;
			if (dirty & /*$configStore*/ 2) keyboardinput_changes.ctrl = /*keyBind*/ ctx[12].ctrl;
			if (dirty & /*$configStore*/ 2) keyboardinput_changes.alt = /*keyBind*/ ctx[12].alt;
			if (dirty & /*$configStore*/ 2) keyboardinput_changes.shift = /*keyBind*/ ctx[12].shift;
			if (dirty & /*$configStore*/ 2) keyboardinput_changes.id = /*keyBind*/ ctx[12].action;
			if (dirty & /*$configStore*/ 2) keyboardinput_changes.label = actions[/*keyBind*/ ctx[12].action].label;
			if (dirty & /*$configStore, activeId*/ 3) keyboardinput_changes.active = /*keyBind*/ ctx[12].action === /*activeId*/ ctx[0];
			if (dirty & /*activeId, $configStore*/ 3) keyboardinput_changes.disabled = !!/*activeId*/ ctx[0] || !/*$configStore*/ ctx[1].hotkeysActive;
			keyboardinput.$set(keyboardinput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(keyboardinput.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(keyboardinput.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(keyboardinput, detaching);
		}
	};
}

// (73:0) <ThemeSwitch>
function Options_svelte_create_default_slot(ctx) {
	let div3;
	let header;
	let t0;
	let categorytitle0;
	let t1;
	let div0;
	let formfield0;
	let t2;
	let formfield1;
	let t3;
	let formfield2;
	let t4;
	let formfield3;
	let t5;
	let categorytitle1;
	let t6;
	let div1;
	let t7;
	let div2;
	let button;
	let t8;
	let button_disabled_value;
	let current;
	let mounted;
	let dispose;
	header = new Header_svelte({});

	categorytitle0 = new CategoryTitle_svelte({
			props: {
				$$slots: { default: [create_default_slot_10] },
				$$scope: { ctx }
			}
		});

	formfield0 = new FormField_svelte({
			props: {
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			}
		});

	formfield1 = new FormField_svelte({
			props: {
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			}
		});

	formfield2 = new FormField_svelte({
			props: {
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			}
		});

	formfield3 = new FormField_svelte({
			props: {
				$$slots: { default: [Options_svelte_create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	categorytitle1 = new CategoryTitle_svelte({
			props: {
				$$slots: { default: [Options_svelte_create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	let each_value = /*$configStore*/ ctx[1].keySetting;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div3 = internal_element("div");
			create_component(header.$$.fragment);
			t0 = space();
			create_component(categorytitle0.$$.fragment);
			t1 = space();
			div0 = internal_element("div");
			create_component(formfield0.$$.fragment);
			t2 = space();
			create_component(formfield1.$$.fragment);
			t3 = space();
			create_component(formfield2.$$.fragment);
			t4 = space();
			create_component(formfield3.$$.fragment);
			t5 = space();
			create_component(categorytitle1.$$.fragment);
			t6 = space();
			div1 = internal_element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t7 = space();
			div2 = internal_element("div");
			button = internal_element("button");
			t8 = internal_text("rétablir les valeurs par défaut");
			attr(div0, "class", "form-container svelte-b012qr");
			attr(div1, "class", "keybind-container");
			attr(button, "class", "default-keybinds svelte-b012qr");
			button.disabled = button_disabled_value = !!/*activeId*/ ctx[0] || !/*$configStore*/ ctx[1].hotkeysActive;
			attr(div2, "class", "text-container svelte-b012qr");
			attr(div3, "class", "layout svelte-b012qr");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			mount_component(header, div3, null);
			append(div3, t0);
			mount_component(categorytitle0, div3, null);
			append(div3, t1);
			append(div3, div0);
			mount_component(formfield0, div0, null);
			append(div0, t2);
			mount_component(formfield1, div0, null);
			append(div0, t3);
			mount_component(formfield2, div0, null);
			append(div0, t4);
			mount_component(formfield3, div0, null);
			append(div3, t5);
			mount_component(categorytitle1, div3, null);
			append(div3, t6);
			append(div3, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div3, t7);
			append(div3, div2);
			append(div2, button);
			append(button, t8);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*resetDefaultKeybinds*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			const categorytitle0_changes = {};

			if (dirty & /*$$scope*/ 32768) {
				categorytitle0_changes.$$scope = { dirty, ctx };
			}

			categorytitle0.$set(categorytitle0_changes);
			const formfield0_changes = {};

			if (dirty & /*$$scope, $configStore*/ 32770) {
				formfield0_changes.$$scope = { dirty, ctx };
			}

			formfield0.$set(formfield0_changes);
			const formfield1_changes = {};

			if (dirty & /*$$scope, $configStore*/ 32770) {
				formfield1_changes.$$scope = { dirty, ctx };
			}

			formfield1.$set(formfield1_changes);
			const formfield2_changes = {};

			if (dirty & /*$$scope, $configStore*/ 32770) {
				formfield2_changes.$$scope = { dirty, ctx };
			}

			formfield2.$set(formfield2_changes);
			const formfield3_changes = {};

			if (dirty & /*$$scope, $configStore*/ 32770) {
				formfield3_changes.$$scope = { dirty, ctx };
			}

			formfield3.$set(formfield3_changes);
			const categorytitle1_changes = {};

			if (dirty & /*$$scope*/ 32768) {
				categorytitle1_changes.$$scope = { dirty, ctx };
			}

			categorytitle1.$set(categorytitle1_changes);

			if (dirty & /*$configStore, actions, activeId, setActiveId*/ 7) {
				each_value = /*$configStore*/ ctx[1].keySetting;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty & /*activeId, $configStore*/ 3 && button_disabled_value !== (button_disabled_value = !!/*activeId*/ ctx[0] || !/*$configStore*/ ctx[1].hotkeysActive)) {
				button.disabled = button_disabled_value;
			}
		},
		i(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(categorytitle0.$$.fragment, local);
			transition_in(formfield0.$$.fragment, local);
			transition_in(formfield1.$$.fragment, local);
			transition_in(formfield2.$$.fragment, local);
			transition_in(formfield3.$$.fragment, local);
			transition_in(categorytitle1.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(header.$$.fragment, local);
			transition_out(categorytitle0.$$.fragment, local);
			transition_out(formfield0.$$.fragment, local);
			transition_out(formfield1.$$.fragment, local);
			transition_out(formfield2.$$.fragment, local);
			transition_out(formfield3.$$.fragment, local);
			transition_out(categorytitle1.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			destroy_component(header);
			destroy_component(categorytitle0);
			destroy_component(formfield0);
			destroy_component(formfield1);
			destroy_component(formfield2);
			destroy_component(formfield3);
			destroy_component(categorytitle1);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

function Options_svelte_create_fragment(ctx) {
	let themeswitch;
	let current;

	themeswitch = new ThemeSwitch_svelte({
			props: {
				$$slots: { default: [Options_svelte_create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(themeswitch.$$.fragment);
		},
		m(target, anchor) {
			mount_component(themeswitch, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const themeswitch_changes = {};

			if (dirty & /*$$scope, activeId, $configStore*/ 32771) {
				themeswitch_changes.$$scope = { dirty, ctx };
			}

			themeswitch.$set(themeswitch_changes);
		},
		i(local) {
			if (current) return;
			transition_in(themeswitch.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(themeswitch.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(themeswitch, detaching);
		}
	};
}

function Options_svelte_instance($$self, $$props, $$invalidate) {
	let $configStore;
	component_subscribe($$self, configStore, $$value => $$invalidate(1, $configStore = $$value));

	const ignoredKeys = [
		"Control",
		"Alt",
		"Shift",
		"Dead",
		"Unidentified",
		"AltGraph",
		"Fn",
		"FnLock",
		"Hyper",
		"Super",
		"Symbol",
		"SymbolLock"
	];

	const isIgnoredMeta = key => {
		return key === "Meta" && !window.navigator.userAgent.includes("Macintosh");
	};

	let activeId = null;

	const handleKeyDown = e => {
		e.preventDefault();
		e.stopPropagation();

		if (!e.key || ignoredKeys.includes(e.key) || isIgnoredMeta(e.key)) {
			return;
		}

		const newKeySetting = $configStore.keySetting.map(hotkey => {
			if (hotkey.action === activeId) {
				return {
					action: hotkey.action,
					key: e.key,
					alt: e.altKey,
					ctrl: e.ctrlKey,
					shift: e.altKey
				};
			} else return hotkey;
		});

		if (e.key !== "Escape") {
			configStore.set({ keySetting: newKeySetting });
		}

		$$invalidate(0, activeId = null);
		document.removeEventListener("keydown", handleKeyDown);
		document.removeEventListener("click", handleClick);
	};

	const handleClick = () => {
		document.removeEventListener("keydown", handleKeyDown);
		$$invalidate(0, activeId = null);
		document.removeEventListener("click", handleClick);
	};

	const setActiveId = id => {
		$$invalidate(0, activeId = id);
		document.addEventListener("keydown", handleKeyDown);

		setTimeout(
			() => {
				document.addEventListener("click", handleClick);
			},
			1
		);
	};

	const resetDefaultKeybinds = () => {
		configStore.set({ keySetting: DEFAULT_CONFIG.keySetting });
	};

	function switch_1_checked_binding(value) {
		if ($$self.$$.not_equal($configStore.darkTheme, value)) {
			$configStore.darkTheme = value;
			configStore.set($configStore);
		}
	}

	function switch_1_checked_binding_1(value) {
		if ($$self.$$.not_equal($configStore.zenMode, value)) {
			$configStore.zenMode = value;
			configStore.set($configStore);
		}
	}

	function switch_1_checked_binding_2(value) {
		if ($$self.$$.not_equal($configStore.fullPage, value)) {
			$configStore.fullPage = value;
			configStore.set($configStore);
		}
	}

	function switch_1_checked_binding_3(value) {
		if ($$self.$$.not_equal($configStore.hotkeysActive, value)) {
			$configStore.hotkeysActive = value;
			configStore.set($configStore);
		}
	}

	return [
		activeId,
		$configStore,
		setActiveId,
		resetDefaultKeybinds,
		switch_1_checked_binding,
		switch_1_checked_binding_1,
		switch_1_checked_binding_2,
		switch_1_checked_binding_3
	];
}

class Options extends SvelteComponent {
	constructor(options) {
		super();
		if (!document_1.getElementById("svelte-b012qr-style")) Options_svelte_add_css();
		init(this, options, Options_svelte_instance, Options_svelte_create_fragment, safe_not_equal, {});
	}
}

/* harmony default export */ const Options_svelte = (Options);
;// CONCATENATED MODULE: ./src/options.js

const app = new Options_svelte({
  target: document.getElementById('svelte-root')
});
/* harmony default export */ const options = ((/* unused pure expression or super */ null && (app)));
/******/ })()
;