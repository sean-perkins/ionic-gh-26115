var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
    if (decorator = decorators[i3])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/@lit/reactive-element/css-tag.js
var t = window;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var n = /* @__PURE__ */ new WeakMap();
var o = class {
  constructor(t3, e7, n6) {
    if (this._$cssResult$ = true, n6 !== s)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e7;
  }
  get styleSheet() {
    let t3 = this.o;
    const s5 = this.t;
    if (e && void 0 === t3) {
      const e7 = void 0 !== s5 && 1 === s5.length;
      e7 && (t3 = n.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && n.set(s5, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new o("string" == typeof t3 ? t3 : t3 + "", void 0, s);
var i = (t3, ...e7) => {
  const n6 = 1 === t3.length ? t3[0] : e7.reduce((e8, s5, n7) => e8 + ((t4) => {
    if (true === t4._$cssResult$)
      return t4.cssText;
    if ("number" == typeof t4)
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t3[n7 + 1], t3[0]);
  return new o(n6, t3, s);
};
var S = (s5, n6) => {
  e ? s5.adoptedStyleSheets = n6.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n6.forEach((e7) => {
    const n7 = document.createElement("style"), o6 = t.litNonce;
    void 0 !== o6 && n7.setAttribute("nonce", o6), n7.textContent = e7.cssText, s5.appendChild(n7);
  });
};
var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e7 = "";
  for (const s5 of t4.cssRules)
    e7 += s5.cssText;
  return r(e7);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window;
var r2 = e2.trustedTypes;
var h = r2 ? r2.emptyScript : "";
var o2 = e2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t3, i3) {
  switch (i3) {
    case Boolean:
      t3 = t3 ? h : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i3) {
  let s5 = t3;
  switch (i3) {
    case Boolean:
      s5 = null !== t3;
      break;
    case Number:
      s5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
} };
var a = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
var d = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t3) {
    var i3;
    null !== (i3 = this.h) && void 0 !== i3 || (this.h = []), this.h.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i3, s5) => {
      const e7 = this._$Ep(s5, i3);
      void 0 !== e7 && (this._$Ev.set(e7, s5), t3.push(e7));
    }), t3;
  }
  static createProperty(t3, i3 = l) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e7 = this.getPropertyDescriptor(t3, s5, i3);
      void 0 !== e7 && Object.defineProperty(this.prototype, t3, e7);
    }
  }
  static getPropertyDescriptor(t3, i3, s5) {
    return { get() {
      return this[i3];
    }, set(e7) {
      const r4 = this[t3];
      this[i3] = e7, this.requestUpdate(t3, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i3)
        this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s5 = [];
    if (Array.isArray(i3)) {
      const e7 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e7)
        s5.unshift(c(i4));
    } else
      void 0 !== i3 && s5.push(c(i3));
    return s5;
  }
  static _$Ep(t3, i3) {
    const s5 = i3.attribute;
    return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  u() {
    var t3;
    this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i3, s5;
    (null !== (i3 = this._$ES) && void 0 !== i3 ? i3 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
  }
  removeController(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.splice(this._$ES.indexOf(t3) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t3, i3) => {
      this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t3;
    const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostConnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  attributeChangedCallback(t3, i3, s5) {
    this._$AK(t3, s5);
  }
  _$EO(t3, i3, s5 = l) {
    var e7;
    const r4 = this.constructor._$Ep(t3, s5);
    if (void 0 !== r4 && true === s5.reflect) {
      const h3 = (void 0 !== (null === (e7 = s5.converter) || void 0 === e7 ? void 0 : e7.toAttribute) ? s5.converter : n2).toAttribute(i3, s5.type);
      this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
    }
  }
  _$AK(t3, i3) {
    var s5;
    const e7 = this.constructor, r4 = e7._$Ev.get(t3);
    if (void 0 !== r4 && this._$El !== r4) {
      const t4 = e7.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2;
      this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
    }
  }
  requestUpdate(t3, i3, s5) {
    let e7 = true;
    void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e7 = false), !this.isUpdatePending && e7 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i4) => this[i4] = t4), this._$Ei = void 0);
    let i3 = false;
    const s5 = this._$AL;
    try {
      i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t4);
      }), this.update(s5)) : this._$Ek();
    } catch (t4) {
      throw i3 = false, this._$Ek(), t4;
    }
    i3 && this._$AE(s5);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.forEach((t4) => {
      var i4;
      return null === (i4 = t4.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    void 0 !== this._$EC && (this._$EC.forEach((t4, i3) => this._$EO(i3, this[i3], t4)), this._$EC = void 0), this._$Ek();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.4.1");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = window;
var s3 = i2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var o3 = `lit$${(Math.random() + "").slice(9)}$`;
var n3 = "?" + o3;
var l2 = `<${n3}>`;
var h2 = document;
var r3 = (t3 = "") => h2.createComment(t3);
var d2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var u = Array.isArray;
var c2 = (t3) => u(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var a2 = /-->/g;
var f = />/g;
var _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var m = /'/g;
var p = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var g = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
var y = g(1);
var w = g(2);
var x = Symbol.for("lit-noChange");
var b = Symbol.for("lit-nothing");
var T = /* @__PURE__ */ new WeakMap();
var A = h2.createTreeWalker(h2, 129, null, false);
var E = (t3, i3) => {
  const s5 = t3.length - 1, n6 = [];
  let h3, r4 = 2 === i3 ? "<svg>" : "", d3 = v;
  for (let i4 = 0; i4 < s5; i4++) {
    const s6 = t3[i4];
    let e7, u3, c3 = -1, g2 = 0;
    for (; g2 < s6.length && (d3.lastIndex = g2, u3 = d3.exec(s6), null !== u3); )
      g2 = d3.lastIndex, d3 === v ? "!--" === u3[1] ? d3 = a2 : void 0 !== u3[1] ? d3 = f : void 0 !== u3[2] ? ($.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d3 = _) : void 0 !== u3[3] && (d3 = _) : d3 === _ ? ">" === u3[0] ? (d3 = null != h3 ? h3 : v, c3 = -1) : void 0 === u3[1] ? c3 = -2 : (c3 = d3.lastIndex - u3[2].length, e7 = u3[1], d3 = void 0 === u3[3] ? _ : '"' === u3[3] ? p : m) : d3 === p || d3 === m ? d3 = _ : d3 === a2 || d3 === f ? d3 = v : (d3 = _, h3 = void 0);
    const y2 = d3 === _ && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += d3 === v ? s6 + l2 : c3 >= 0 ? (n6.push(e7), s6.slice(0, c3) + "$lit$" + s6.slice(c3) + o3 + y2) : s6 + o3 + (-2 === c3 ? (n6.push(void 0), i4) : y2);
  }
  const u2 = r4 + (t3[s5] || "<?>") + (2 === i3 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e3 ? e3.createHTML(u2) : u2, n6];
};
var C = class {
  constructor({ strings: t3, _$litType$: i3 }, e7) {
    let l5;
    this.parts = [];
    let h3 = 0, d3 = 0;
    const u2 = t3.length - 1, c3 = this.parts, [v2, a3] = E(t3, i3);
    if (this.el = C.createElement(v2, e7), A.currentNode = this.el.content, 2 === i3) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (; null !== (l5 = A.nextNode()) && c3.length < u2; ) {
      if (1 === l5.nodeType) {
        if (l5.hasAttributes()) {
          const t4 = [];
          for (const i4 of l5.getAttributeNames())
            if (i4.endsWith("$lit$") || i4.startsWith(o3)) {
              const s5 = a3[d3++];
              if (t4.push(i4), void 0 !== s5) {
                const t5 = l5.getAttribute(s5.toLowerCase() + "$lit$").split(o3), i5 = /([.?@])?(.*)/.exec(s5);
                c3.push({ type: 1, index: h3, name: i5[2], strings: t5, ctor: "." === i5[1] ? M : "?" === i5[1] ? k : "@" === i5[1] ? H : S2 });
              } else
                c3.push({ type: 6, index: h3 });
            }
          for (const i4 of t4)
            l5.removeAttribute(i4);
        }
        if ($.test(l5.tagName)) {
          const t4 = l5.textContent.split(o3), i4 = t4.length - 1;
          if (i4 > 0) {
            l5.textContent = s3 ? s3.emptyScript : "";
            for (let s5 = 0; s5 < i4; s5++)
              l5.append(t4[s5], r3()), A.nextNode(), c3.push({ type: 2, index: ++h3 });
            l5.append(t4[i4], r3());
          }
        }
      } else if (8 === l5.nodeType)
        if (l5.data === n3)
          c3.push({ type: 2, index: h3 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = l5.data.indexOf(o3, t4 + 1)); )
            c3.push({ type: 7, index: h3 }), t4 += o3.length - 1;
        }
      h3++;
    }
  }
  static createElement(t3, i3) {
    const s5 = h2.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function P(t3, i3, s5 = t3, e7) {
  var o6, n6, l5, h3;
  if (i3 === x)
    return i3;
  let r4 = void 0 !== e7 ? null === (o6 = s5._$Co) || void 0 === o6 ? void 0 : o6[e7] : s5._$Cl;
  const u2 = d2(i3) ? void 0 : i3._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== u2 && (null === (n6 = null == r4 ? void 0 : r4._$AO) || void 0 === n6 || n6.call(r4, false), void 0 === u2 ? r4 = void 0 : (r4 = new u2(t3), r4._$AT(t3, s5, e7)), void 0 !== e7 ? (null !== (l5 = (h3 = s5)._$Co) && void 0 !== l5 ? l5 : h3._$Co = [])[e7] = r4 : s5._$Cl = r4), void 0 !== r4 && (i3 = P(t3, r4._$AS(t3, i3.values), r4, e7)), i3;
}
var V = class {
  constructor(t3, i3) {
    this.u = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t3) {
    var i3;
    const { el: { content: s5 }, parts: e7 } = this._$AD, o6 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : h2).importNode(s5, true);
    A.currentNode = o6;
    let n6 = A.nextNode(), l5 = 0, r4 = 0, d3 = e7[0];
    for (; void 0 !== d3; ) {
      if (l5 === d3.index) {
        let i4;
        2 === d3.type ? i4 = new N(n6, n6.nextSibling, this, t3) : 1 === d3.type ? i4 = new d3.ctor(n6, d3.name, d3.strings, this, t3) : 6 === d3.type && (i4 = new I(n6, this, t3)), this.u.push(i4), d3 = e7[++r4];
      }
      l5 !== (null == d3 ? void 0 : d3.index) && (n6 = A.nextNode(), l5++);
    }
    return o6;
  }
  p(t3) {
    let i3 = 0;
    for (const s5 of this.u)
      void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
  }
};
var N = class {
  constructor(t3, i3, s5, e7) {
    var o6;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e7, this._$Cm = null === (o6 = null == e7 ? void 0 : e7.isConnected) || void 0 === o6 || o6;
  }
  get _$AU() {
    var t3, i3;
    return null !== (i3 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i3 ? i3 : this._$Cm;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === t3.nodeType && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = P(this, t3, i3), d2(t3) ? t3 === b || null == t3 || "" === t3 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t3 !== this._$AH && t3 !== x && this.g(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : c2(t3) ? this.k(t3) : this.g(t3);
  }
  O(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  g(t3) {
    this._$AH !== b && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(h2.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    var i3;
    const { values: s5, _$litType$: e7 } = t3, o6 = "number" == typeof e7 ? this._$AC(t3) : (void 0 === e7.el && (e7.el = C.createElement(e7.h, this.options)), e7);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o6)
      this._$AH.p(s5);
    else {
      const t4 = new V(o6, this), i4 = t4.v(this.options);
      t4.p(s5), this.T(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = T.get(t3.strings);
    return void 0 === i3 && T.set(t3.strings, i3 = new C(t3)), i3;
  }
  k(t3) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s5, e7 = 0;
    for (const o6 of t3)
      e7 === i3.length ? i3.push(s5 = new N(this.O(r3()), this.O(r3()), this, this.options)) : s5 = i3[e7], s5._$AI(o6), e7++;
    e7 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e7), i3.length = e7);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s5;
    for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    void 0 === this._$AM && (this._$Cm = t3, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t3));
  }
};
var S2 = class {
  constructor(t3, i3, s5, e7, o6) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e7, this.options = o6, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s5, e7) {
    const o6 = this.strings;
    let n6 = false;
    if (void 0 === o6)
      t3 = P(this, t3, i3, 0), n6 = !d2(t3) || t3 !== this._$AH && t3 !== x, n6 && (this._$AH = t3);
    else {
      const e8 = t3;
      let l5, h3;
      for (t3 = o6[0], l5 = 0; l5 < o6.length - 1; l5++)
        h3 = P(this, e8[s5 + l5], i3, l5), h3 === x && (h3 = this._$AH[l5]), n6 || (n6 = !d2(h3) || h3 !== this._$AH[l5]), h3 === b ? t3 = b : t3 !== b && (t3 += (null != h3 ? h3 : "") + o6[l5 + 1]), this._$AH[l5] = h3;
    }
    n6 && !e7 && this.j(t3);
  }
  j(t3) {
    t3 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
  }
};
var M = class extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === b ? void 0 : t3;
  }
};
var R = s3 ? s3.emptyScript : "";
var k = class extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
  }
};
var H = class extends S2 {
  constructor(t3, i3, s5, e7, o6) {
    super(t3, i3, s5, e7, o6), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s5;
    if ((t3 = null !== (s5 = P(this, t3, i3, 0)) && void 0 !== s5 ? s5 : b) === x)
      return;
    const e7 = this._$AH, o6 = t3 === b && e7 !== b || t3.capture !== e7.capture || t3.once !== e7.once || t3.passive !== e7.passive, n6 = t3 !== b && (e7 === b || o6);
    o6 && this.element.removeEventListener(this.name, this, e7), n6 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s5;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var I = class {
  constructor(t3, i3, s5) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    P(this, t3);
  }
};
var z = i2.litHtmlPolyfillSupport;
null == z || z(C, N), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.4.0");
var Z = (t3, i3, s5) => {
  var e7, o6;
  const n6 = null !== (e7 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e7 ? e7 : i3;
  let l5 = n6._$litPart$;
  if (void 0 === l5) {
    const t4 = null !== (o6 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o6 ? o6 : null;
    n6._$litPart$ = l5 = new N(i3.insertBefore(r3(), t4), t4, void 0, null != s5 ? s5 : {});
  }
  return l5._$AI(t3), l5;
};

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends d {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t3, e7;
    const i3 = super.createRenderRoot();
    return null !== (t3 = (e7 = this.renderOptions).renderBefore) && void 0 !== t3 || (e7.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = Z(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(false);
  }
  render() {
    return x;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.2");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var e4 = (e7) => (n6) => "function" == typeof n6 ? ((e8, n7) => (customElements.define(e8, n7), n7))(e7, n6) : ((e8, n7) => {
  const { kind: t3, elements: s5 } = n7;
  return { kind: t3, elements: s5, finisher(n8) {
    customElements.define(e8, n8);
  } };
})(e7, n6);

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n5;
var e6 = null != (null === (n5 = window.HTMLSlotElement) || void 0 === n5 ? void 0 : n5.prototype.assignedElements) ? (o6, n6) => o6.assignedElements(n6) : (o6, n6) => o6.assignedNodes(n6).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

// src/styles/ionic-styles.ts
var IonicStyles = i`

	html.ios {
		--ion-default-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Roboto", sans-serif
	}

	html.md {
		--ion-default-font: "Roboto", "Helvetica Neue", sans-serif
	}

	body.backdrop-no-scroll {
		overflow: hidden
	}

	html.ios ion-modal ion-footer ion-toolbar:first-of-type,
	html.ios ion-modal.modal-card ion-header ion-toolbar:first-of-type,
	html.ios ion-modal.modal-sheet ion-header ion-toolbar:first-of-type {
		padding-top: 6px
	}

	html.ios ion-modal.modal-card ion-header ion-toolbar:last-of-type,
	html.ios ion-modal.modal-sheet ion-header ion-toolbar:last-of-type {
		padding-bottom: 6px
	}

	html.ios ion-modal ion-toolbar {
		padding-right: calc(var(--ion-safe-area-right) + 8px);
		padding-left: calc(var(--ion-safe-area-left) + 8px)
	}

	@media screen and (min-width:768px) {
		html.ios ion-modal.modal-card:first-of-type {
			--backdrop-opacity: 0.18
		}
	}

	ion-modal.modal-default:not(.overlay-hidden)~ion-modal.modal-default {
		--backdrop-opacity: 0;
		--box-shadow: none
	}

	html.ios ion-modal.modal-card .ion-page {
		border-top-left-radius: var(--border-radius)
	}

	.ion-color-primary {
		--ion-color-base: var(--ion-color-primary, #3880ff) !important;
		--ion-color-base-rgb: var(--ion-color-primary-rgb, 56, 128, 255) !important;
		--ion-color-contrast: var(--ion-color-primary-contrast, #fff) !important;
		--ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb, 255, 255, 255) !important;
		--ion-color-shade: var(--ion-color-primary-shade, #3171e0) !important;
		--ion-color-tint: var(--ion-color-primary-tint, #4c8dff) !important
	}

	.ion-color-secondary {
		--ion-color-base: var(--ion-color-secondary, #3dc2ff) !important;
		--ion-color-base-rgb: var(--ion-color-secondary-rgb, 61, 194, 255) !important;
		--ion-color-contrast: var(--ion-color-secondary-contrast, #fff) !important;
		--ion-color-contrast-rgb: var(--ion-color-secondary-contrast-rgb, 255, 255, 255) !important;
		--ion-color-shade: var(--ion-color-secondary-shade, #36abe0) !important;
		--ion-color-tint: var(--ion-color-secondary-tint, #50c8ff) !important
	}

	.ion-color-tertiary {
		--ion-color-base: var(--ion-color-tertiary, #5260ff) !important;
		--ion-color-base-rgb: var(--ion-color-tertiary-rgb, 82, 96, 255) !important;
		--ion-color-contrast: var(--ion-color-tertiary-contrast, #fff) !important;
		--ion-color-contrast-rgb: var(--ion-color-tertiary-contrast-rgb, 255, 255, 255) !important;
		--ion-color-shade: var(--ion-color-tertiary-shade, #4854e0) !important;
		--ion-color-tint: var(--ion-color-tertiary-tint, #6370ff) !important
	}

	.ion-color-success {
		--ion-color-base: var(--ion-color-success, #2dd36f) !important;
		--ion-color-base-rgb: var(--ion-color-success-rgb, 45, 211, 111) !important;
		--ion-color-contrast: var(--ion-color-success-contrast, #fff) !important;
		--ion-color-contrast-rgb: var(--ion-color-success-contrast-rgb, 255, 255, 255) !important;
		--ion-color-shade: var(--ion-color-success-shade, #28ba62) !important;
		--ion-color-tint: var(--ion-color-success-tint, #42d77d) !important
	}

	.ion-color-warning {
		--ion-color-base: var(--ion-color-warning, #ffc409) !important;
		--ion-color-base-rgb: var(--ion-color-warning-rgb, 255, 196, 9) !important;
		--ion-color-contrast: var(--ion-color-warning-contrast, #000) !important;
		--ion-color-contrast-rgb: var(--ion-color-warning-contrast-rgb, 0, 0, 0) !important;
		--ion-color-shade: var(--ion-color-warning-shade, #e0ac08) !important;
		--ion-color-tint: var(--ion-color-warning-tint, #ffca22) !important
	}

	.ion-color-danger {
		--ion-color-base: var(--ion-color-danger, #eb445a) !important;
		--ion-color-base-rgb: var(--ion-color-danger-rgb, 235, 68, 90) !important;
		--ion-color-contrast: var(--ion-color-danger-contrast, #fff) !important;
		--ion-color-contrast-rgb: var(--ion-color-danger-contrast-rgb, 255, 255, 255) !important;
		--ion-color-shade: var(--ion-color-danger-shade, #cf3c4f) !important;
		--ion-color-tint: var(--ion-color-danger-tint, #ed576b) !important
	}

	.ion-color-light {
		--ion-color-base: var(--ion-color-light, #f4f5f8) !important;
		--ion-color-base-rgb: var(--ion-color-light-rgb, 244, 245, 248) !important;
		--ion-color-contrast: var(--ion-color-light-contrast, #000) !important;
		--ion-color-contrast-rgb: var(--ion-color-light-contrast-rgb, 0, 0, 0) !important;
		--ion-color-shade: var(--ion-color-light-shade, #d7d8da) !important;
		--ion-color-tint: var(--ion-color-light-tint, #f5f6f9) !important
	}

	.ion-color-medium {
		--ion-color-base: var(--ion-color-medium, #92949c) !important;
		--ion-color-base-rgb: var(--ion-color-medium-rgb, 146, 148, 156) !important;
		--ion-color-contrast: var(--ion-color-medium-contrast, #fff) !important;
		--ion-color-contrast-rgb: var(--ion-color-medium-contrast-rgb, 255, 255, 255) !important;
		--ion-color-shade: var(--ion-color-medium-shade, #808289) !important;
		--ion-color-tint: var(--ion-color-medium-tint, #9d9fa6) !important
	}

	.ion-color-dark {
		--ion-color-base: var(--ion-color-dark, #222428) !important;
		--ion-color-base-rgb: var(--ion-color-dark-rgb, 34, 36, 40) !important;
		--ion-color-contrast: var(--ion-color-dark-contrast, #fff) !important;
		--ion-color-contrast-rgb: var(--ion-color-dark-contrast-rgb, 255, 255, 255) !important;
		--ion-color-shade: var(--ion-color-dark-shade, #1e2023) !important;
		--ion-color-tint: var(--ion-color-dark-tint, #383a3e) !important
	}

	.ion-page {
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		position: absolute;
		flex-direction: column;
		justify-content: space-between;
		contain: layout size style;
		overflow: hidden;
		z-index: 0
	}

	ion-modal .ion-page:not(ion-nav .ion-page) {
		position: relative;
		contain: layout style;
		height: 100%
	}

	.split-pane-visible>.ion-page.split-pane-main {
		position: relative
	}

	.ion-page-hidden,
	[hidden],
	ion-action-sheet-controller,
	ion-alert-controller,
	ion-loading-controller,
	ion-menu-controller,
	ion-modal-controller,
	ion-nav-controller,
	ion-picker-controller,
	ion-popover-controller,
	ion-route,
	ion-route-redirect,
	ion-router,
	ion-select-option,
	ion-toast-controller {
		display: none !important
	}

	.ion-page-invisible {
		opacity: 0
	}

	.can-go-back>ion-header ion-back-button {
		display: block
	}

	html.plt-ios.plt-hybrid,
	html.plt-ios.plt-pwa {
		--ion-statusbar-padding: 20px
	}

	@supports (padding-top:20px) {
		html {
			--ion-safe-area-top: var(--ion-statusbar-padding)
		}
	}

	@supports (padding-top:constant(safe-area-inset-top)) {
		html {
			--ion-safe-area-top: constant(safe-area-inset-top);
			--ion-safe-area-bottom: constant(safe-area-inset-bottom);
			--ion-safe-area-left: constant(safe-area-inset-left);
			--ion-safe-area-right: constant(safe-area-inset-right)
		}
	}

	@supports (padding-top:env(safe-area-inset-top)) {
		html {
			--ion-safe-area-top: env(safe-area-inset-top);
			--ion-safe-area-bottom: env(safe-area-inset-bottom);
			--ion-safe-area-left: env(safe-area-inset-left);
			--ion-safe-area-right: env(safe-area-inset-right)
		}
	}

	ion-card-header.ion-color .ion-inherit-color,
	ion-card.ion-color .ion-inherit-color {
		color: inherit
	}

	.menu-content {
		transform: translate3d(0, 0, 0)
	}

	.menu-content-open {
		cursor: pointer;
		touch-action: manipulation;
		pointer-events: none
	}

	.ios .menu-content-reveal {
		box-shadow: -8px 0 42px rgba(0, 0, 0, .08)
	}

	[dir=rtl].ios .menu-content-reveal {
		box-shadow: 8px 0 42px rgba(0, 0, 0, .08)
	}

	.md .menu-content-push,
	.md .menu-content-reveal {
		box-shadow: 4px 0 1rem rgba(0, 0, 0, .18)
	}

	ion-accordion-group.accordion-group-expand-inset>ion-accordion:first-of-type {
		border-top-left-radius: 8px;
		border-top-right-radius: 8px
	}

	ion-accordion-group.accordion-group-expand-inset>ion-accordion:last-of-type {
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px
	}

	ion-accordion-group>ion-accordion:last-of-type ion-item[slot=header] {
		--border-width: 0px
	}

	ion-accordion.accordion-animated>[slot=header] .ion-accordion-toggle-icon {
		transition: transform .3s cubic-bezier(.25, .8, .5, 1)
	}

	@media (prefers-reduced-motion:reduce) {
		ion-accordion .ion-accordion-toggle-icon {
			transition: none !important
		}
	}

	ion-accordion.accordion-expanded>[slot=header] .ion-accordion-toggle-icon,
	ion-accordion.accordion-expanding>[slot=header] .ion-accordion-toggle-icon {
		transform: rotate(180deg)
	}

	ion-accordion-group.accordion-group-expand-inset.md>ion-accordion.accordion-previous ion-item[slot=header] {
		--border-width: 0px;
		--inner-border-width: 0px
	}

	ion-accordion-group.accordion-group-expand-inset.md>ion-accordion.accordion-expanded:first-of-type,
	ion-accordion-group.accordion-group-expand-inset.md>ion-accordion.accordion-expanding:first-of-type {
		margin-top: 0
	}

	ion-input input::-webkit-date-and-time-value {
		text-align: start
	}

	.ion-datetime-button-overlay {
		--width: fit-content;
		--height: fit-content
	}

	.ion-datetime-button-overlay ion-datetime.datetime-grid {
		width: 320px;
		min-height: 320px
	}

	audio,
	canvas,
	progress,
	video {
		vertical-align: baseline
	}

	audio:not([controls]) {
		display: none;
		height: 0
	}

	b,
	strong {
		font-weight: 700
	}

	img {
		max-width: 100%;
		border: 0
	}

	svg:not(:root) {
		overflow: hidden
	}

	figure {
		margin: 1em 40px
	}

	hr {
		height: 1px;
		border-width: 0;
		box-sizing: content-box
	}

	pre {
		overflow: auto
	}

	code,
	kbd,
	pre,
	samp {
		font-family: monospace, monospace;
		font-size: 1em
	}

	input,
	label,
	select,
	textarea {
		font-family: inherit;
		line-height: normal
	}

	textarea {
		overflow: auto;
		height: auto;
		font: inherit;
		color: inherit
	}

	textarea::placeholder {
		padding-left: 2px
	}

	form,
	input,
	optgroup,
	select {
		margin: 0;
		font: inherit;
		color: inherit
	}

	html input[type=button],
	input[type=reset],
	input[type=submit] {
		cursor: pointer;
		-webkit-appearance: button
	}

	.ion-tappable,
	[tappable],
	[tappable] div,
	[tappable] ion-icon,
	[tappable] ion-label,
	[tappable] span,
	a,
	a div,
	a ion-icon,
	a ion-label,
	a span,
	button,
	button div,
	button ion-icon,
	button ion-label,
	button span,
	input,
	textarea {
		touch-action: manipulation
	}

	a ion-label,
	button ion-label {
		pointer-events: none
	}

	button {
		border: 0;
		border-radius: 0;
		font-family: inherit;
		font-style: inherit;
		font-variant: inherit;
		line-height: 1;
		text-transform: none;
		cursor: pointer;
		-webkit-appearance: button
	}

	[tappable] {
		cursor: pointer
	}

	a[disabled],
	button[disabled],
	html input[disabled] {
		cursor: default
	}

	button::-moz-focus-inner,
	input::-moz-focus-inner {
		padding: 0;
		border: 0
	}

	input[type=checkbox],
	input[type=radio] {
		padding: 0;
		box-sizing: border-box
	}

	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		height: auto
	}

	input[type=search]::-webkit-search-cancel-button,
	input[type=search]::-webkit-search-decoration {
		-webkit-appearance: none
	}

	table {
		border-collapse: collapse;
		border-spacing: 0
	}

	td,
	th {
		padding: 0
	}

	* {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none
	}

	html {
		--ion-font-family: var(--ion-default-font);
		width: 100%;
		height: 100%;
		text-size-adjust: 100%;
		font-family: var(--ion-font-family)
	}

	html:not(.hydrated) body {
		display: none
	}

	html.ion-ce body {
		display: block
	}

	html.plt-pwa {
		height: 100vh
	}

	body {
		background: var(--ion-background-color);
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		margin: 0;
		padding: 0;
		position: fixed;
		width: 100%;
		max-width: 100%;
		height: 100%;
		max-height: 100%;
		transform: translateZ(0);
		text-rendering: optimizeLegibility;
		overflow: hidden;
		touch-action: manipulation;
		-webkit-user-drag: none;
		-ms-content-zooming: none;
		word-wrap: break-word;
		overscroll-behavior-y: none;
		text-size-adjust: none
	}

	a {
		background-color: transparent;
		color: var(--ion-color-primary, #3880ff)
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 1rem;
		margin-bottom: 10px;
		font-weight: 500;
		line-height: 1.2
	}

	h1 {
		margin-top: 20px;
		font-size: 26px
	}

	h2 {
		margin-top: 18px;
		font-size: 24px
	}

	h3 {
		font-size: 22px
	}

	h4 {
		font-size: 20px
	}

	h5 {
		font-size: 18px
	}

	h6 {
		font-size: 1rem
	}

	small {
		font-size: 75%
	}

	sub,
	sup {
		position: relative;
		font-size: 75%;
		line-height: 0;
		vertical-align: baseline
	}

	sup {
		top: -.5em
	}

	sub {
		bottom: -.25em
	}

	.ion-no-padding {
		--padding-start: 0;
		--padding-end: 0;
		--padding-top: 0;
		--padding-bottom: 0;
		padding: 0
	}

	.ion-padding {
		--padding-start: var(--ion-padding, 1rem);
		--padding-end: var(--ion-padding, 1rem);
		--padding-top: var(--ion-padding, 1rem);
		--padding-bottom: var(--ion-padding, 1rem);
		padding-left: var(--ion-padding, 1rem);
		padding-right: var(--ion-padding, 1rem);
		padding-top: var(--ion-padding, 1rem);
		padding-bottom: var(--ion-padding, 1rem)
	}

	@supports (margin-inline-start:0) or (-webkit-margin-start:0) {
		.ion-padding {
			padding-left: unset;
			padding-right: unset;
			-webkit-padding-start: var(--ion-padding, 1rem);
			padding-inline-start: var(--ion-padding, 1rem);
			-webkit-padding-end: var(--ion-padding, 1rem);
			padding-inline-end: var(--ion-padding, 1rem)
		}
	}

	.ion-padding-top {
		--padding-top: var(--ion-padding, 1rem);
		padding-top: var(--ion-padding, 1rem)
	}

	.ion-padding-start {
		--padding-start: var(--ion-padding, 1rem);
		padding-left: var(--ion-padding, 1rem)
	}

	.ion-padding-end {
		--padding-end: var(--ion-padding, 1rem);
		padding-right: var(--ion-padding, 1rem)
	}

	@supports (margin-inline-start:0) or (-webkit-margin-start:0) {
		.ion-padding-start {
			padding-left: unset;
			-webkit-padding-start: var(--ion-padding, 1rem);
			padding-inline-start: var(--ion-padding, 1rem)
		}

		.ion-padding-end {
			padding-right: unset;
			-webkit-padding-end: var(--ion-padding, 1rem);
			padding-inline-end: var(--ion-padding, 1rem)
		}
	}

	.ion-padding-bottom {
		--padding-bottom: var(--ion-padding, 1rem);
		padding-bottom: var(--ion-padding, 1rem)
	}

	.ion-padding-vertical {
		--padding-top: var(--ion-padding, 1rem);
		--padding-bottom: var(--ion-padding, 1rem);
		padding-top: var(--ion-padding, 1rem);
		padding-bottom: var(--ion-padding, 1rem)
	}

	.ion-padding-horizontal {
		--padding-start: var(--ion-padding, 1rem);
		--padding-end: var(--ion-padding, 1rem);
		padding-left: var(--ion-padding, 1rem);
		padding-right: var(--ion-padding, 1rem)
	}

	.ion-no-margin {
		--margin-start: 0;
		--margin-end: 0;
		--margin-top: 0;
		--margin-bottom: 0;
		margin: 0
	}

	.ion-margin {
		--margin-start: var(--ion-margin, 1rem);
		--margin-end: var(--ion-margin, 1rem);
		--margin-top: var(--ion-margin, 1rem);
		--margin-bottom: var(--ion-margin, 1rem);
		margin-left: var(--ion-margin, 1rem);
		margin-right: var(--ion-margin, 1rem);
		margin-top: var(--ion-margin, 1rem);
		margin-bottom: var(--ion-margin, 1rem)
	}

	@supports (margin-inline-start:0) or (-webkit-margin-start:0) {
		.ion-padding-horizontal {
			padding-left: unset;
			padding-right: unset;
			-webkit-padding-start: var(--ion-padding, 1rem);
			padding-inline-start: var(--ion-padding, 1rem);
			-webkit-padding-end: var(--ion-padding, 1rem);
			padding-inline-end: var(--ion-padding, 1rem)
		}

		.ion-margin {
			margin-left: unset;
			margin-right: unset;
			-webkit-margin-start: var(--ion-margin, 1rem);
			margin-inline-start: var(--ion-margin, 1rem);
			-webkit-margin-end: var(--ion-margin, 1rem);
			margin-inline-end: var(--ion-margin, 1rem)
		}
	}

	.ion-margin-top {
		--margin-top: var(--ion-margin, 1rem);
		margin-top: var(--ion-margin, 1rem)
	}

	.ion-margin-start {
		--margin-start: var(--ion-margin, 1rem);
		margin-left: var(--ion-margin, 1rem)
	}

	.ion-margin-end {
		--margin-end: var(--ion-margin, 1rem);
		margin-right: var(--ion-margin, 1rem)
	}

	@supports (margin-inline-start:0) or (-webkit-margin-start:0) {
		.ion-margin-start {
			margin-left: unset;
			-webkit-margin-start: var(--ion-margin, 1rem);
			margin-inline-start: var(--ion-margin, 1rem)
		}

		.ion-margin-end {
			margin-right: unset;
			-webkit-margin-end: var(--ion-margin, 1rem);
			margin-inline-end: var(--ion-margin, 1rem)
		}
	}

	.ion-margin-bottom {
		--margin-bottom: var(--ion-margin, 1rem);
		margin-bottom: var(--ion-margin, 1rem)
	}

	.ion-margin-vertical {
		--margin-top: var(--ion-margin, 1rem);
		--margin-bottom: var(--ion-margin, 1rem);
		margin-top: var(--ion-margin, 1rem);
		margin-bottom: var(--ion-margin, 1rem)
	}

	.ion-margin-horizontal {
		--margin-start: var(--ion-margin, 1rem);
		--margin-end: var(--ion-margin, 1rem);
		margin-left: var(--ion-margin, 1rem);
		margin-right: var(--ion-margin, 1rem)
	}

	@supports (margin-inline-start:0) or (-webkit-margin-start:0) {
		.ion-margin-horizontal {
			margin-left: unset;
			margin-right: unset;
			-webkit-margin-start: var(--ion-margin, 1rem);
			margin-inline-start: var(--ion-margin, 1rem);
			-webkit-margin-end: var(--ion-margin, 1rem);
			margin-inline-end: var(--ion-margin, 1rem)
		}
	}

	.ion-float-left {
		float: left !important
	}

	.ion-float-right {
		float: right !important
	}

	.ion-float-start {
		float: left !important
	}

	:host-context([dir=rtl]) .ion-float-start,
	[dir=rtl] .ion-float-start {
		float: right !important
	}

	.ion-float-end {
		float: right !important
	}

	:host-context([dir=rtl]) .ion-float-end,
	[dir=rtl] .ion-float-end {
		float: left !important
	}

	.ion-text-center {
		text-align: center !important
	}

	.ion-text-justify {
		text-align: justify !important
	}

	.ion-text-start {
		text-align: start !important
	}

	.ion-text-end {
		text-align: end !important
	}

	.ion-text-left {
		text-align: left !important
	}

	.ion-text-right {
		text-align: right !important
	}

	.ion-text-nowrap {
		white-space: nowrap !important
	}

	.ion-text-wrap {
		white-space: normal !important
	}

	.ion-text-uppercase {
		text-transform: uppercase !important
	}

	.ion-text-lowercase {
		text-transform: lowercase !important
	}

	.ion-text-capitalize {
		text-transform: capitalize !important
	}

	.ion-align-self-start {
		align-self: flex-start !important
	}

	.ion-align-self-end {
		align-self: flex-end !important
	}

	.ion-align-self-center {
		align-self: center !important
	}

	.ion-align-self-stretch {
		align-self: stretch !important
	}

	.ion-align-self-baseline {
		align-self: baseline !important
	}

	.ion-align-self-auto {
		align-self: auto !important
	}

	.ion-wrap {
		flex-wrap: wrap !important
	}

	.ion-nowrap {
		flex-wrap: nowrap !important
	}

	.ion-wrap-reverse {
		flex-wrap: wrap-reverse !important
	}

	.ion-justify-content-start {
		justify-content: flex-start !important
	}

	.ion-justify-content-center {
		justify-content: center !important
	}

	.ion-justify-content-end {
		justify-content: flex-end !important
	}

	.ion-justify-content-around {
		justify-content: space-around !important
	}

	.ion-justify-content-between {
		justify-content: space-between !important
	}

	.ion-justify-content-evenly {
		justify-content: space-evenly !important
	}

	.ion-align-items-start {
		align-items: flex-start !important
	}

	.ion-align-items-center {
		align-items: center !important
	}

	.ion-align-items-end {
		align-items: flex-end !important
	}

	.ion-align-items-stretch {
		align-items: stretch !important
	}

	.ion-align-items-baseline {
		align-items: baseline !important
	}

	.ion-hide,
	.ion-hide-down,
	.ion-hide-up {
		display: none !important
	}

	@media (min-width:576px) {
		.ion-float-sm-left {
			float: left !important
		}

		.ion-float-sm-right {
			float: right !important
		}

		.ion-float-sm-start {
			float: left !important
		}

		:host-context([dir=rtl]) .ion-float-sm-start,
		[dir=rtl] .ion-float-sm-start {
			float: right !important
		}

		.ion-float-sm-end {
			float: right !important
		}

		:host-context([dir=rtl]) .ion-float-sm-end,
		[dir=rtl] .ion-float-sm-end {
			float: left !important
		}

		.ion-text-sm-center {
			text-align: center !important
		}

		.ion-text-sm-justify {
			text-align: justify !important
		}

		.ion-text-sm-start {
			text-align: start !important
		}

		.ion-text-sm-end {
			text-align: end !important
		}

		.ion-text-sm-left {
			text-align: left !important
		}

		.ion-text-sm-right {
			text-align: right !important
		}

		.ion-text-sm-nowrap {
			white-space: nowrap !important
		}

		.ion-text-sm-wrap {
			white-space: normal !important
		}

		.ion-text-sm-uppercase {
			text-transform: uppercase !important
		}

		.ion-text-sm-lowercase {
			text-transform: lowercase !important
		}

		.ion-text-sm-capitalize {
			text-transform: capitalize !important
		}

		.ion-hide-sm-up {
			display: none !important
		}
	}

	@media (max-width:575.98px) {
		.ion-hide-sm-down {
			display: none !important
		}
	}

	@media (min-width:768px) {
		.ion-float-md-left {
			float: left !important
		}

		.ion-float-md-right {
			float: right !important
		}

		.ion-float-md-start {
			float: left !important
		}

		:host-context([dir=rtl]) .ion-float-md-start,
		[dir=rtl] .ion-float-md-start {
			float: right !important
		}

		.ion-float-md-end {
			float: right !important
		}

		:host-context([dir=rtl]) .ion-float-md-end,
		[dir=rtl] .ion-float-md-end {
			float: left !important
		}

		.ion-text-md-center {
			text-align: center !important
		}

		.ion-text-md-justify {
			text-align: justify !important
		}

		.ion-text-md-start {
			text-align: start !important
		}

		.ion-text-md-end {
			text-align: end !important
		}

		.ion-text-md-left {
			text-align: left !important
		}

		.ion-text-md-right {
			text-align: right !important
		}

		.ion-text-md-nowrap {
			white-space: nowrap !important
		}

		.ion-text-md-wrap {
			white-space: normal !important
		}

		.ion-text-md-uppercase {
			text-transform: uppercase !important
		}

		.ion-text-md-lowercase {
			text-transform: lowercase !important
		}

		.ion-text-md-capitalize {
			text-transform: capitalize !important
		}

		.ion-hide-md-up {
			display: none !important
		}
	}

	@media (max-width:767.98px) {
		.ion-hide-md-down {
			display: none !important
		}
	}

	@media (min-width:992px) {
		.ion-float-lg-left {
			float: left !important
		}

		.ion-float-lg-right {
			float: right !important
		}

		.ion-float-lg-start {
			float: left !important
		}

		:host-context([dir=rtl]) .ion-float-lg-start,
		[dir=rtl] .ion-float-lg-start {
			float: right !important
		}

		.ion-float-lg-end {
			float: right !important
		}

		:host-context([dir=rtl]) .ion-float-lg-end,
		[dir=rtl] .ion-float-lg-end {
			float: left !important
		}

		.ion-text-lg-center {
			text-align: center !important
		}

		.ion-text-lg-justify {
			text-align: justify !important
		}

		.ion-text-lg-start {
			text-align: start !important
		}

		.ion-text-lg-end {
			text-align: end !important
		}

		.ion-text-lg-left {
			text-align: left !important
		}

		.ion-text-lg-right {
			text-align: right !important
		}

		.ion-text-lg-nowrap {
			white-space: nowrap !important
		}

		.ion-text-lg-wrap {
			white-space: normal !important
		}

		.ion-text-lg-uppercase {
			text-transform: uppercase !important
		}

		.ion-text-lg-lowercase {
			text-transform: lowercase !important
		}

		.ion-text-lg-capitalize {
			text-transform: capitalize !important
		}

		.ion-hide-lg-up {
			display: none !important
		}
	}

	@media (max-width:991.98px) {
		.ion-hide-lg-down {
			display: none !important
		}
	}

	@media (min-width:1200px) {
		.ion-float-xl-left {
			float: left !important
		}

		.ion-float-xl-right {
			float: right !important
		}

		.ion-float-xl-start {
			float: left !important
		}

		:host-context([dir=rtl]) .ion-float-xl-start,
		[dir=rtl] .ion-float-xl-start {
			float: right !important
		}

		.ion-float-xl-end {
			float: right !important
		}

		:host-context([dir=rtl]) .ion-float-xl-end,
		[dir=rtl] .ion-float-xl-end {
			float: left !important
		}

		.ion-text-xl-center {
			text-align: center !important
		}

		.ion-text-xl-justify {
			text-align: justify !important
		}

		.ion-text-xl-start {
			text-align: start !important
		}

		.ion-text-xl-end {
			text-align: end !important
		}

		.ion-text-xl-left {
			text-align: left !important
		}

		.ion-text-xl-right {
			text-align: right !important
		}

		.ion-text-xl-nowrap {
			white-space: nowrap !important
		}

		.ion-text-xl-wrap {
			white-space: normal !important
		}

		.ion-text-xl-uppercase {
			text-transform: uppercase !important
		}

		.ion-text-xl-lowercase {
			text-transform: lowercase !important
		}

		.ion-text-xl-capitalize {
			text-transform: capitalize !important
		}

		.ion-hide-xl-up {
			display: none !important
		}
	}

	.default-box {
		border: 0.25rem solid black;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (max-width:1199.98px) {
		.ion-hide-xl-down {
			display: none !important
		}

		.ion-margin {
			--margin-start: var(--ion-margin, 0.5rem);
			--margin-end: var(--ion-margin, 0.5rem);
			--margin-top: var(--ion-margin, 0.5rem);
			--margin-bottom: var(--ion-margin, 0.5rem);
			margin-left: var(--ion-margin, 0.5rem);
			margin-right: var(--ion-margin, 0.5rem);
			margin-top: var(--ion-margin, 0.5rem);
			margin-bottom: var(--ion-margin, 0.5rem)
		}
	

		.ion-padding {
			--padding-start: var(--ion-padding, 0.5rem);
			--padding-end: var(--ion-padding, 0.5rem);
			--padding-top: var(--ion-padding, 0.5rem);
			--padding-bottom: var(--ion-padding, 0.5rem);
			padding-left: var(--ion-padding, 0.5rem);
			padding-right: var(--ion-padding, 0.5rem);
			padding-top: var(--ion-padding, 0.5rem);
			padding-bottom: var(--ion-padding, 0.5rem)
		}
	}

`;

// src/views/app-root.ts
var AppRoot = class extends s4 {
  render() {
    return y`
				<ion-app>
					<ion-router root="src" use-hash="false">
						<ion-route url="/" component="home-view"></ion-route>
						<ion-route url="/about" component="about-view"></ion-route>
					</ion-router>

					<ion-router-outlet></ion-router-outlet>

				</ion-app>
		`;
  }
  createRenderRoot() {
    return this;
  }
};
__publicField(AppRoot, "styles", [IonicStyles]);
AppRoot = __decorateClass([
  e4("app-root")
], AppRoot);

// src/views/home-view.ts
var HomeView = class extends s4 {
  render() {
    return y`

			<div class="ion-padding ion-margin default-box" style="background-color: #A9A9A9">

				<h6>Welcome to the home view!</h6>
			
			</div>

		`;
  }
};
__publicField(HomeView, "styles", [IonicStyles]);
HomeView = __decorateClass([
  e4("home-view")
], HomeView);

// src/views/about-view.ts
var AboutView = class extends s4 {
  render() {
    return y`

			<div class="ion-padding ion-margin default-box" style="background-color: #A9A9A9">

			<h6>Welcome to the about view!</h6>
	
			</div>

		`;
  }
};
__publicField(AboutView, "styles", [IonicStyles]);
AboutView = __decorateClass([
  e4("about-view")
], AboutView);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
//# sourceMappingURL=bundle.esm.js.map
