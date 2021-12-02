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
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
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
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
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
function set_store_value(store, ret, value) {
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

// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;
function start_hydrating() {
    is_hydrating = true;
}
function end_hydrating() {
    is_hydrating = false;
}
function upper_bound(low, high, key, value) {
    // Return first index of value larger than input value in the range [low, high)
    while (low < high) {
        const mid = low + ((high - low) >> 1);
        if (key(mid) <= value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
function init_hydrate(target) {
    if (target.hydrate_init)
        return;
    target.hydrate_init = true;
    // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
    let children = target.childNodes;
    // If target is <head>, there may be children without claim_order
    if (target.nodeName === 'HEAD') {
        const myChildren = [];
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            if (node.claim_order !== undefined) {
                myChildren.push(node);
            }
        }
        children = myChildren;
    }
    /*
    * Reorder claimed children optimally.
    * We can reorder claimed children optimally by finding the longest subsequence of
    * nodes that are already claimed in order and only moving the rest. The longest
    * subsequence subsequence of nodes that are claimed in order can be found by
    * computing the longest increasing subsequence of .claim_order values.
    *
    * This algorithm is optimal in generating the least amount of reorder operations
    * possible.
    *
    * Proof:
    * We know that, given a set of reordering operations, the nodes that do not move
    * always form an increasing subsequence, since they do not move among each other
    * meaning that they must be already ordered among each other. Thus, the maximal
    * set of nodes that do not move form a longest increasing subsequence.
    */
    // Compute longest increasing subsequence
    // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
    const m = new Int32Array(children.length + 1);
    // Predecessor indices + 1
    const p = new Int32Array(children.length);
    m[0] = -1;
    let longest = 0;
    for (let i = 0; i < children.length; i++) {
        const current = children[i].claim_order;
        // Find the largest subsequence length such that it ends in a value less than our current value
        // upper_bound returns first greater value, so we subtract one
        // with fast path for when we are on the current longest subsequence
        const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
        p[i] = m[seqLen] + 1;
        const newLen = seqLen + 1;
        // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
        m[newLen] = i;
        longest = Math.max(newLen, longest);
    }
    // The longest increasing subsequence of nodes (initially reversed)
    const lis = [];
    // The rest of the nodes, nodes that will be moved
    const toMove = [];
    let last = children.length - 1;
    for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
        lis.push(children[cur - 1]);
        for (; last >= cur; last--) {
            toMove.push(children[last]);
        }
        last--;
    }
    for (; last >= 0; last--) {
        toMove.push(children[last]);
    }
    lis.reverse();
    // We sort the nodes being moved to guarantee that their insertion order matches the claim order
    toMove.sort((a, b) => a.claim_order - b.claim_order);
    // Finally, we move the nodes
    for (let i = 0, j = 0; i < toMove.length; i++) {
        while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
            j++;
        }
        const anchor = j < lis.length ? lis[j] : null;
        target.insertBefore(toMove[i], anchor);
    }
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = internal_element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = internal_element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function append_hydration(target, node) {
    if (is_hydrating) {
        init_hydrate(target);
        if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentElement !== target))) {
            target.actual_end_child = target.firstChild;
        }
        // Skip nodes of undefined ordering
        while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
            target.actual_end_child = target.actual_end_child.nextSibling;
        }
        if (node !== target.actual_end_child) {
            // We only insert if the ordering of this node should be modified or the parent node is not target
            if (node.claim_order !== undefined || node.parentNode !== target) {
                target.insertBefore(node, target.actual_end_child);
            }
        }
        else {
            target.actual_end_child = node.nextSibling;
        }
    }
    else if (node.parentNode !== target || node.nextSibling !== null) {
        target.appendChild(node);
    }
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function insert_hydration(target, node, anchor) {
    if (is_hydrating && !anchor) {
        append_hydration(target, node);
    }
    else if (node.parentNode !== target || node.nextSibling != anchor) {
        target.insertBefore(node, anchor || null);
    }
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
function trusted(fn) {
    return function (event) {
        // @ts-ignore
        if (event.isTrusted)
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
function init_claim_info(nodes) {
    if (nodes.claim_info === undefined) {
        nodes.claim_info = { last_index: 0, total_claimed: 0 };
    }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
    // Try to find nodes in an order such that we lengthen the longest increasing subsequence
    init_claim_info(nodes);
    const resultNode = (() => {
        // We first try to find an element after the previous one
        for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                return node;
            }
        }
        // Otherwise, we try to find one before
        // We iterate in reverse so that we don't go too far back
        for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
            const node = nodes[i];
            if (predicate(node)) {
                const replacement = processNode(node);
                if (replacement === undefined) {
                    nodes.splice(i, 1);
                }
                else {
                    nodes[i] = replacement;
                }
                if (!dontUpdateLastIndex) {
                    nodes.claim_info.last_index = i;
                }
                else if (replacement === undefined) {
                    // Since we spliced before the last_index, we decrease it
                    nodes.claim_info.last_index--;
                }
                return node;
            }
        }
        // If we can't find any matching node, we create a new one
        return createNode();
    })();
    resultNode.claim_order = nodes.claim_info.total_claimed;
    nodes.claim_info.total_claimed += 1;
    return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
    return claim_node(nodes, (node) => node.nodeName === name, (node) => {
        const remove = [];
        for (let j = 0; j < node.attributes.length; j++) {
            const attribute = node.attributes[j];
            if (!attributes[attribute.name]) {
                remove.push(attribute.name);
            }
        }
        remove.forEach(v => node.removeAttribute(v));
        return undefined;
    }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, internal_element);
}
function claim_svg_element(nodes, name, attributes) {
    return claim_element_base(nodes, name, attributes, svg_element);
}
function claim_text(nodes, data) {
    return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
        const dataStr = '' + data;
        if (node.data.startsWith(dataStr)) {
            if (node.data.length !== dataStr.length) {
                return node.splitText(dataStr.length);
            }
        }
        else {
            node.data = dataStr;
        }
    }, () => internal_text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
    );
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function find_comment(nodes, text, start) {
    for (let i = start; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
            return i;
        }
    }
    return nodes.length;
}
function claim_html_tag(nodes) {
    // find html opening tag
    const start_index = find_comment(nodes, 'HTML_TAG_START', 0);
    const end_index = find_comment(nodes, 'HTML_TAG_END', start_index);
    if (start_index === end_index) {
        return new HtmlTagHydration();
    }
    init_claim_info(nodes);
    const html_tag_nodes = nodes.splice(start_index, end_index + 1);
    detach(html_tag_nodes[0]);
    detach(html_tag_nodes[html_tag_nodes.length - 1]);
    const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
    for (const n of claimed_nodes) {
        n.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
    }
    return new HtmlTagHydration(claimed_nodes);
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
    select.selectedIndex = -1; // no option should be selected
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
function custom_event(type, detail, bubbles = false) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor() {
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = internal_element(target.nodeName);
            this.t = target;
            this.c(html);
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
class HtmlTagHydration extends (/* unused pure expression or super */ null && (HtmlTag)) {
    constructor(claimed_nodes) {
        super();
        this.e = this.n = null;
        this.l = claimed_nodes;
    }
    c(html) {
        if (this.l) {
            this.n = this.l;
        }
        else {
            super.c(html);
        }
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert_hydration(this.t, this.n[i], anchor);
        }
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
    const doc = get_root_for_style(node);
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
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
function getAllContexts() {
    return get_current_component().$$.context;
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
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
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
            started = true;
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
        const d = (program.b - t);
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
            str += ` ${name}="${value}"`;
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
function escape_attribute_value(value) {
    return typeof value === 'string' ? internal_escape(value) : value;
}
function escape_object(obj) {
    const result = {};
    for (const key in obj) {
        result[key] = escape_attribute_value(obj[key]);
    }
    return result;
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
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
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
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
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
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
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
            start_hydrating();
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
        end_hydrating();
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
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.2' }, detail), true));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function append_hydration_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append_hydration(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function insert_hydration_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert_hydration(target, node, anchor);
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
 * will throw a type error, so we need to separate the more strictly typed class.
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
  }) => key.toLowerCase() === keyChar.toLowerCase() && !!alt === altMod && !!ctrl === ctrlMod && !!shift === shiftMod) ?? {};

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
      const linkEl = document.querySelector('[data-smarttag-name="retour_journal"]') || document.querySelector('[href="/"]');
      console.log(linkEl);
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
      const buttonEl = document.getElementById('js-fontsize-increase') || document.querySelector('ul.sub-menu li ul li button.increase-fs');

      if (!buttonEl.disabled) {
        buttonEl.click();
      }
    }
  },
  // decrease font-size
  decreaseFontSize: {
    label: 'Diminuer la taille de police',
    run: () => {
      const buttonEl = document.getElementById('js-fontsize-decrease') || document.querySelector('ul.sub-menu li ul li button.decrease-fs');

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
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
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
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || internal_noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
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
/* src/components/Form/FormField.svelte generated by Svelte v3.44.2 */


function add_css(target) {
	append_styles(target, "svelte-16v2b5o", ".form-field.svelte-16v2b5o{padding-bottom:8px}");
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
			attr(div, "class", "form-field svelte-16v2b5o");
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
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
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
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class FormField extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);
	}
}

/* harmony default export */ const FormField_svelte = (FormField);
;// CONCATENATED MODULE: ./src/components/Form/FormInput.svelte
/* src/components/Form/FormInput.svelte generated by Svelte v3.44.2 */


function FormInput_svelte_add_css(target) {
	append_styles(target, "svelte-1fjxhl6", "div.svelte-1fjxhl6{border-radius:4px}div.svelte-1fjxhl6:hover{background-color:rgba(0, 0, 0, 0.1)}");
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
			attr(div, "class", "form-input svelte-1fjxhl6");
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
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
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
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class FormInput extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, FormInput_svelte_instance, FormInput_svelte_create_fragment, safe_not_equal, {}, FormInput_svelte_add_css);
	}
}

/* harmony default export */ const FormInput_svelte = (FormInput);
;// CONCATENATED MODULE: ./src/components/Form/KeyboardInputButton.svelte
/* src/components/Form/KeyboardInputButton.svelte generated by Svelte v3.44.2 */


function KeyboardInputButton_svelte_add_css(target) {
	append_styles(target, "svelte-nrwd7a", "span.svelte-nrwd7a{display:inline-block;color:black;background-color:rgb(239, 239, 239);height:32px;min-width:32px;padding:4px;line-height:24px;font-size:20px;text-align:center;cursor:pointer;margin-left:4px;border-radius:4px;box-sizing:border-box}span.disabled.svelte-nrwd7a{color:rgba(16, 16, 16, 0.3);background-color:rgba(239, 239, 239, 0.3);border-color:rgba(118, 118, 118, 0.3)}span.active.svelte-nrwd7a{color:black;background-color:rgb(255, 125, 125)}");
}

function KeyboardInputButton_svelte_create_fragment(ctx) {
	let span;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	return {
		c() {
			span = internal_element("span");
			if (default_slot) default_slot.c();
			attr(span, "class", "svelte-nrwd7a");
			toggle_class(span, "disabled", /*disabled*/ ctx[0]);
			toggle_class(span, "active", /*active*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, span, anchor);

			if (default_slot) {
				default_slot.m(span, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			if (dirty & /*disabled*/ 1) {
				toggle_class(span, "disabled", /*disabled*/ ctx[0]);
			}

			if (dirty & /*active*/ 2) {
				toggle_class(span, "active", /*active*/ ctx[1]);
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
			if (detaching) detach(span);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function KeyboardInputButton_svelte_instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { disabled } = $$props;
	let { active } = $$props;

	$$self.$$set = $$props => {
		if ('disabled' in $$props) $$invalidate(0, disabled = $$props.disabled);
		if ('active' in $$props) $$invalidate(1, active = $$props.active);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	return [disabled, active, $$scope, slots];
}

class KeyboardInputButton extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, KeyboardInputButton_svelte_instance, KeyboardInputButton_svelte_create_fragment, safe_not_equal, { disabled: 0, active: 1 }, KeyboardInputButton_svelte_add_css);
	}
}

/* harmony default export */ const KeyboardInputButton_svelte = (KeyboardInputButton);
;// CONCATENATED MODULE: ./src/components/Form/KeyboardInput.svelte
/* src/components/Form/KeyboardInput.svelte generated by Svelte v3.44.2 */




function KeyboardInput_svelte_add_css(target) {
	append_styles(target, "svelte-ntlum9", ".keyboard-input.svelte-ntlum9{cursor:pointer;width:100%;display:flex;padding:4px;border:none;background:none;font-size:14px}.label-container.svelte-ntlum9{flex-basis:50%;text-align:left}.button-container.svelte-ntlum9{flex-basis:50%;text-align:right}span.svelte-ntlum9{flex-grow:1;line-height:32px}");
}

// (28:4) {#if ctrl}
function create_if_block_2(ctx) {
	let keyboardinputbutton;
	let current;

	keyboardinputbutton = new KeyboardInputButton_svelte({
			props: {
				active: /*active*/ ctx[5],
				disabled: /*disabled*/ ctx[6],
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

			if (dirty & /*$$scope*/ 1024) {
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

// (29:6) <KeyboardInputButton {active} {disabled}>
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

// (31:4) {#if shift}
function create_if_block_1(ctx) {
	let keyboardinputbutton;
	let current;

	keyboardinputbutton = new KeyboardInputButton_svelte({
			props: {
				active: /*active*/ ctx[5],
				disabled: /*disabled*/ ctx[6],
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

			if (dirty & /*$$scope*/ 1024) {
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

// (32:6) <KeyboardInputButton {active} {disabled}>
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

// (34:4) {#if alt}
function create_if_block(ctx) {
	let keyboardinputbutton;
	let current;

	keyboardinputbutton = new KeyboardInputButton_svelte({
			props: {
				active: /*active*/ ctx[5],
				disabled: /*disabled*/ ctx[6],
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

			if (dirty & /*$$scope*/ 1024) {
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

// (35:6) <KeyboardInputButton {active} {disabled}>
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

// (37:4) <KeyboardInputButton {active} {disabled}>
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
	let button;
	let div0;
	let span;
	let t0;
	let t1;
	let div1;
	let t2;
	let t3;
	let t4;
	let keyboardinputbutton;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*ctrl*/ ctx[1] && create_if_block_2(ctx);
	let if_block1 = /*shift*/ ctx[2] && create_if_block_1(ctx);
	let if_block2 = /*alt*/ ctx[3] && create_if_block(ctx);

	keyboardinputbutton = new KeyboardInputButton_svelte({
			props: {
				active: /*active*/ ctx[5],
				disabled: /*disabled*/ ctx[6],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			button = internal_element("button");
			div0 = internal_element("div");
			span = internal_element("span");
			t0 = internal_text(/*label*/ ctx[4]);
			t1 = space();
			div1 = internal_element("div");
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			if (if_block2) if_block2.c();
			t4 = space();
			create_component(keyboardinputbutton.$$.fragment);
			attr(span, "class", "svelte-ntlum9");
			attr(div0, "class", "label-container svelte-ntlum9");
			attr(div1, "class", "button-container svelte-ntlum9");
			attr(button, "class", "keyboard-input svelte-ntlum9");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, div0);
			append(div0, span);
			append(span, t0);
			append(button, t1);
			append(button, div1);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t2);
			if (if_block1) if_block1.m(div1, null);
			append(div1, t3);
			if (if_block2) if_block2.m(div1, null);
			append(div1, t4);
			mount_component(keyboardinputbutton, div1, null);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[9]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*label*/ 16) set_data(t0, /*label*/ ctx[4]);

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
					if_block0.m(div1, t2);
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
					if_block1.m(div1, t3);
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
					if_block2.m(div1, t4);
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

			if (dirty & /*$$scope, value*/ 1025) {
				keyboardinputbutton_changes.$$scope = { dirty, ctx };
			}

			keyboardinputbutton.$set(keyboardinputbutton_changes);
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
			if (detaching) detach(button);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			destroy_component(keyboardinputbutton);
			mounted = false;
			dispose();
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

	const click_handler = () => {
		if (!disabled) {
			setActiveId(id);
		}
	};

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('ctrl' in $$props) $$invalidate(1, ctrl = $$props.ctrl);
		if ('shift' in $$props) $$invalidate(2, shift = $$props.shift);
		if ('alt' in $$props) $$invalidate(3, alt = $$props.alt);
		if ('label' in $$props) $$invalidate(4, label = $$props.label);
		if ('active' in $$props) $$invalidate(5, active = $$props.active);
		if ('disabled' in $$props) $$invalidate(6, disabled = $$props.disabled);
		if ('id' in $$props) $$invalidate(7, id = $$props.id);
		if ('setActiveId' in $$props) $$invalidate(8, setActiveId = $$props.setActiveId);
	};

	return [
		value,
		ctrl,
		shift,
		alt,
		label,
		active,
		disabled,
		id,
		setActiveId,
		click_handler
	];
}

class KeyboardInput extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			KeyboardInput_svelte_instance,
			KeyboardInput_svelte_create_fragment,
			safe_not_equal,
			{
				value: 0,
				ctrl: 1,
				shift: 2,
				alt: 3,
				label: 4,
				active: 5,
				disabled: 6,
				id: 7,
				setActiveId: 8
			},
			KeyboardInput_svelte_add_css
		);
	}
}

/* harmony default export */ const KeyboardInput_svelte = (KeyboardInput);
;// CONCATENATED MODULE: ./src/components/Form/Switch.svelte
/* src/components/Form/Switch.svelte generated by Svelte v3.44.2 */


function Switch_svelte_add_css(target) {
	append_styles(target, "svelte-1ohi108", ".switch.svelte-1ohi108.svelte-1ohi108{cursor:pointer;position:relative;display:flex;line-height:24px;padding:8px 4px}.label.svelte-1ohi108.svelte-1ohi108{font-size:14px;flex-grow:1}.switch.svelte-1ohi108 input.svelte-1ohi108{opacity:0;width:0;height:0}.slider.svelte-1ohi108.svelte-1ohi108{width:48px;border-radius:34px;background-color:#b5b5b5;-webkit-transition:background-color 0.4s;transition:background-color 0.4s}.slider.svelte-1ohi108.svelte-1ohi108:before{position:relative;display:block;content:'';height:22px;width:22px;left:1px;top:1px;background-color:white;-webkit-transition:0.4s;transition:0.4s}input.svelte-1ohi108:checked+.slider.svelte-1ohi108{background-color:red}input.svelte-1ohi108:focus+.slider.svelte-1ohi108{box-shadow:0 0 0 1px white}input.svelte-1ohi108:checked+.slider.svelte-1ohi108:before{-webkit-transform:translateX(24px);-ms-transform:translateX(24px);transform:translateX(24px)}.slider.round.svelte-1ohi108.svelte-1ohi108{border-radius:34px}.slider.round.svelte-1ohi108.svelte-1ohi108:before{border-radius:50%}");
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
			attr(span0, "class", "label svelte-1ohi108");
			attr(input, "type", "checkbox");
			input.disabled = /*disabled*/ ctx[2];
			attr(input, "class", "svelte-1ohi108");
			attr(span1, "class", "slider round svelte-1ohi108");
			attr(label_1, "class", "switch svelte-1ohi108");
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
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('checked' in $$props) $$invalidate(0, checked = $$props.checked);
		if ('disabled' in $$props) $$invalidate(2, disabled = $$props.disabled);
	};

	return [checked, label, disabled, input_change_handler];
}

class Switch extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, Switch_svelte_instance, Switch_svelte_create_fragment, safe_not_equal, { label: 1, checked: 0, disabled: 2 }, Switch_svelte_add_css);
	}
}

/* harmony default export */ const Switch_svelte = (Switch);
;// CONCATENATED MODULE: ./src/components/UI/About.svelte
/* src/components/UI/About.svelte generated by Svelte v3.44.2 */


function About_svelte_add_css(target) {
	append_styles(target, "svelte-idgcu2", "p.svelte-idgcu2{margin-bottom:16px}ul.svelte-idgcu2{margin-bottom:16px;padding-left:24px}");
}

function About_svelte_create_fragment(ctx) {
	let p0;
	let t3;
	let p1;
	let t8;
	let p2;
	let t10;
	let ul;

	return {
		c() {
			p0 = internal_element("p");

			p0.innerHTML = `L&#39;extension Mediapart Mod a été imaginée, créée et programmée par <a href="https://www.apollinai.re">Apollinaire</a>.
  L&#39;ensembe du code est libre et open-source: il est public, gratuit, toute modification, publication ou vente sont
  permis sans contreparties.`;

			t3 = space();
			p1 = internal_element("p");

			p1.innerHTML = `Pour tout retour, toute suggestion ou contribution, postez une <i>issue</i> sur le repo Github du projet:
  <a href="https://github.com/apollinaire/mediapart-mod">apollinaire/mediapart-mod</a>`;

			t8 = space();
			p2 = internal_element("p");
			p2.textContent = "Librairies externes utilisées, mentions notables:";
			t10 = space();
			ul = internal_element("ul");

			ul.innerHTML = `<li>babel</li> 
  <li>color-convert</li> 
  <li>css-tree</li> 
  <li>prettier</li> 
  <li>svelte</li> 
  <li>typescript</li> 
  <li>webpack</li>`;

			attr(p0, "class", "svelte-idgcu2");
			attr(p1, "class", "svelte-idgcu2");
			attr(p2, "class", "svelte-idgcu2");
			attr(ul, "class", "svelte-idgcu2");
		},
		m(target, anchor) {
			insert(target, p0, anchor);
			insert(target, t3, anchor);
			insert(target, p1, anchor);
			insert(target, t8, anchor);
			insert(target, p2, anchor);
			insert(target, t10, anchor);
			insert(target, ul, anchor);
		},
		p: internal_noop,
		i: internal_noop,
		o: internal_noop,
		d(detaching) {
			if (detaching) detach(p0);
			if (detaching) detach(t3);
			if (detaching) detach(p1);
			if (detaching) detach(t8);
			if (detaching) detach(p2);
			if (detaching) detach(t10);
			if (detaching) detach(ul);
		}
	};
}

class About extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, About_svelte_create_fragment, safe_not_equal, {}, About_svelte_add_css);
	}
}

/* harmony default export */ const About_svelte = (About);
;// CONCATENATED MODULE: ./src/components/UI/CategoryTitle.svelte
/* src/components/UI/CategoryTitle.svelte generated by Svelte v3.44.2 */


function CategoryTitle_svelte_add_css(target) {
	append_styles(target, "svelte-14bu5ei", "h2.svelte-14bu5ei{display:flex;justify-content:center;align-items:center;text-align:center;line-height:48px;font-size:18px;height:48px}");
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
			attr(h2, "class", "svelte-14bu5ei");
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
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
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
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class CategoryTitle extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, CategoryTitle_svelte_instance, CategoryTitle_svelte_create_fragment, safe_not_equal, {}, CategoryTitle_svelte_add_css);
	}
}

/* harmony default export */ const CategoryTitle_svelte = (CategoryTitle);
;// CONCATENATED MODULE: ./src/components/UI/Header.svelte
/* src/components/UI/Header.svelte generated by Svelte v3.44.2 */


function Header_svelte_add_css(target) {
	append_styles(target, "svelte-1m5sor7", ".header.svelte-1m5sor7{display:flex;justify-content:center;align-items:center;text-align:center;line-height:48px;font-size:22px;height:48px;margin-bottom:24px}");
}

function Header_svelte_create_fragment(ctx) {
	let h1;

	return {
		c() {
			h1 = internal_element("h1");

			h1.innerHTML = `<img src="mediapart-mod-48.png" alt="logo mediapart mod"/> 
  <span>Mediapart Mod</span>`;

			attr(h1, "class", "header svelte-1m5sor7");
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
		init(this, options, null, Header_svelte_create_fragment, safe_not_equal, {}, Header_svelte_add_css);
	}
}

/* harmony default export */ const Header_svelte = (Header);
;// CONCATENATED MODULE: ./src/components/UI/ThemeSwitch.svelte
/* src/components/UI/ThemeSwitch.svelte generated by Svelte v3.44.2 */




function ThemeSwitch_svelte_add_css(target) {
	append_styles(target, "svelte-173b2yu", ".dark.svelte-173b2yu{background-color:#292929;color:#b5b5b5}body{margin:0px;font-family:sans-serif}a{color:currentColor}button:focus{outline:solid 1px white}");
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
			attr(div, "class", "svelte-173b2yu");
			toggle_class(div, "dark", /*dark*/ ctx[1]);
			toggle_class(div, "light", /*light*/ ctx[0]);
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
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[3],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
						null
					);
				}
			}

			if (dirty & /*dark*/ 2) {
				toggle_class(div, "dark", /*dark*/ ctx[1]);
			}

			if (dirty & /*light*/ 1) {
				toggle_class(div, "light", /*light*/ ctx[0]);
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
		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$configStore*/ 4) {
			$: $$invalidate(1, dark = $configStore.darkTheme);
		}

		if ($$self.$$.dirty & /*$configStore*/ 4) {
			$: $$invalidate(0, light = !$configStore.darkTheme);
		}
	};

	return [light, dark, $configStore, $$scope, slots];
}

class ThemeSwitch extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, ThemeSwitch_svelte_instance, ThemeSwitch_svelte_create_fragment, safe_not_equal, {}, ThemeSwitch_svelte_add_css);
	}
}

/* harmony default export */ const ThemeSwitch_svelte = (ThemeSwitch);
;// CONCATENATED MODULE: ./src/components/Options.svelte
/* src/components/Options.svelte generated by Svelte v3.44.2 */














function Options_svelte_add_css(target) {
	append_styles(target, "svelte-110kjy5", ".layout.svelte-110kjy5{box-sizing:border-box;padding:8px 8px 64px;min-height:100vh}.form-container.svelte-110kjy5{max-width:500px;font-size:14px;margin:auto}.text-container.svelte-110kjy5{text-align:center;margin-top:12px;margin-bottom:8px}.default-keybinds.svelte-110kjy5{background:transparent;border:none;text-decoration:underline;color:currentColor;cursor:pointer}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	return child_ctx;
}

// (78:4) <CategoryTitle>
function create_default_slot_12(ctx) {
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

// (81:8) <FormInput>
function create_default_slot_11(ctx) {
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
	binding_callbacks.push(() => bind(switch_1, 'checked', switch_1_checked_binding));

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

// (80:6) <FormField>
function create_default_slot_10(ctx) {
	let forminput;
	let current;

	forminput = new FormInput_svelte({
			props: {
				$$slots: { default: [create_default_slot_11] },
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

// (86:8) <FormInput>
function create_default_slot_9(ctx) {
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
	binding_callbacks.push(() => bind(switch_1, 'checked', switch_1_checked_binding_1));

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

// (85:6) <FormField>
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

// (91:8) <FormInput>
function create_default_slot_7(ctx) {
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
	binding_callbacks.push(() => bind(switch_1, 'checked', switch_1_checked_binding_2));

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

// (90:6) <FormField>
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

// (96:8) <FormInput>
function create_default_slot_5(ctx) {
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
	binding_callbacks.push(() => bind(switch_1, 'checked', switch_1_checked_binding_3));

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

// (95:6) <FormField>
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

// (101:4) <CategoryTitle>
function Options_svelte_create_default_slot_3(ctx) {
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

// (104:8) <FormInput>
function Options_svelte_create_default_slot_2(ctx) {
	let keyboardinput;
	let t;
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
			t = space();
		},
		m(target, anchor) {
			mount_component(keyboardinput, target, anchor);
			insert(target, t, anchor);
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
			if (detaching) detach(t);
		}
	};
}

// (103:6) {#each $configStore.keySetting as keyBind}
function create_each_block(ctx) {
	let forminput;
	let current;

	forminput = new FormInput_svelte({
			props: {
				$$slots: { default: [Options_svelte_create_default_slot_2] },
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

			if (dirty & /*$$scope, $configStore, activeId*/ 32771) {
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

// (126:4) <CategoryTitle>
function Options_svelte_create_default_slot_1(ctx) {
	let t;

	return {
		c() {
			t = internal_text("À propos");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (75:0) <ThemeSwitch>
function Options_svelte_create_default_slot(ctx) {
	let div4;
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
	let t9;
	let categorytitle2;
	let t10;
	let div3;
	let about;
	let current;
	let mounted;
	let dispose;
	header = new Header_svelte({});

	categorytitle0 = new CategoryTitle_svelte({
			props: {
				$$slots: { default: [create_default_slot_12] },
				$$scope: { ctx }
			}
		});

	formfield0 = new FormField_svelte({
			props: {
				$$slots: { default: [create_default_slot_10] },
				$$scope: { ctx }
			}
		});

	formfield1 = new FormField_svelte({
			props: {
				$$slots: { default: [create_default_slot_8] },
				$$scope: { ctx }
			}
		});

	formfield2 = new FormField_svelte({
			props: {
				$$slots: { default: [create_default_slot_6] },
				$$scope: { ctx }
			}
		});

	formfield3 = new FormField_svelte({
			props: {
				$$slots: { default: [create_default_slot_4] },
				$$scope: { ctx }
			}
		});

	categorytitle1 = new CategoryTitle_svelte({
			props: {
				$$slots: { default: [Options_svelte_create_default_slot_3] },
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

	categorytitle2 = new CategoryTitle_svelte({
			props: {
				$$slots: { default: [Options_svelte_create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	about = new About_svelte({});

	return {
		c() {
			div4 = internal_element("div");
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
			t9 = space();
			create_component(categorytitle2.$$.fragment);
			t10 = space();
			div3 = internal_element("div");
			create_component(about.$$.fragment);
			attr(div0, "class", "form-container svelte-110kjy5");
			attr(div1, "class", "form-container svelte-110kjy5");
			attr(button, "class", "default-keybinds svelte-110kjy5");
			button.disabled = button_disabled_value = !!/*activeId*/ ctx[0] || !/*$configStore*/ ctx[1].hotkeysActive;
			attr(div2, "class", "text-container svelte-110kjy5");
			attr(div3, "class", "form-container svelte-110kjy5");
			attr(div4, "class", "layout svelte-110kjy5");
		},
		m(target, anchor) {
			insert(target, div4, anchor);
			mount_component(header, div4, null);
			append(div4, t0);
			mount_component(categorytitle0, div4, null);
			append(div4, t1);
			append(div4, div0);
			mount_component(formfield0, div0, null);
			append(div0, t2);
			mount_component(formfield1, div0, null);
			append(div0, t3);
			mount_component(formfield2, div0, null);
			append(div0, t4);
			mount_component(formfield3, div0, null);
			append(div4, t5);
			mount_component(categorytitle1, div4, null);
			append(div4, t6);
			append(div4, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div4, t7);
			append(div4, div2);
			append(div2, button);
			append(button, t8);
			append(div4, t9);
			mount_component(categorytitle2, div4, null);
			append(div4, t10);
			append(div4, div3);
			mount_component(about, div3, null);
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

			const categorytitle2_changes = {};

			if (dirty & /*$$scope*/ 32768) {
				categorytitle2_changes.$$scope = { dirty, ctx };
			}

			categorytitle2.$set(categorytitle2_changes);
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

			transition_in(categorytitle2.$$.fragment, local);
			transition_in(about.$$.fragment, local);
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

			transition_out(categorytitle2.$$.fragment, local);
			transition_out(about.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div4);
			destroy_component(header);
			destroy_component(categorytitle0);
			destroy_component(formfield0);
			destroy_component(formfield1);
			destroy_component(formfield2);
			destroy_component(formfield3);
			destroy_component(categorytitle1);
			destroy_each(each_blocks, detaching);
			destroy_component(categorytitle2);
			destroy_component(about);
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
		'Control',
		'Alt',
		'Shift',
		'Dead',
		'Unidentified',
		'AltGraph',
		'Fn',
		'FnLock',
		'Hyper',
		'Super',
		'Symbol',
		'SymbolLock'
	];

	const isIgnoredMeta = key => {
		return key === 'Meta' && !window.navigator.userAgent.includes('Macintosh');
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
					key: e.key.toLowerCase(),
					alt: e.altKey,
					ctrl: e.ctrlKey,
					shift: e.shiftKey
				};
			} else return hotkey;
		});

		if (e.key !== 'Escape') {
			configStore.set({ keySetting: newKeySetting });
		}

		$$invalidate(0, activeId = null);
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('click', handleClick);
	};

	const handleClick = () => {
		document.removeEventListener('keydown', handleKeyDown);
		$$invalidate(0, activeId = null);
		document.removeEventListener('click', handleClick);
	};

	const setActiveId = id => {
		$$invalidate(0, activeId = id);
		document.addEventListener('keydown', handleKeyDown);

		setTimeout(
			() => {
				document.addEventListener('click', handleClick);
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
		init(this, options, Options_svelte_instance, Options_svelte_create_fragment, safe_not_equal, {}, Options_svelte_add_css);
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