(() => {
  const globalScope = globalThis;
  const listeners = new Set();

  function toAbsoluteSrc(src) {
    if (!src) return undefined;
    try {
      return new URL(src, globalScope.location?.href ?? 'https://example.com').href;
    } catch (_) {
      return src;
    }
  }

  function emit(detail) {
    for (const handler of listeners) {
      try {
        handler(detail);
      } catch (err) {
        console.error('[oi-interface] action handler threw', err);
      }
    }
    try {
      globalScope.dispatchEvent(
        new CustomEvent('oi-interface:action', { detail }),
      );
    } catch (err) {
      console.warn('[oi-interface] failed to dispatch global action event', err);
    }
  }

  function ensureRegistry() {
    const existing = globalScope.OIInterface;
    if (existing && typeof existing === 'object') {
      return existing;
    }
    const registry = {};
    Object.defineProperty(globalScope, 'OIInterface', {
      value: registry,
      writable: false,
      configurable: false,
      enumerable: true,
    });
    return registry;
  }

  const registry = ensureRegistry();

  if (typeof registry.onAction !== 'function') {
    registry.onAction = (handler) => {
      if (typeof handler !== 'function') return () => undefined;
      listeners.add(handler);
      return () => listeners.delete(handler);
    };
  }

  if (typeof registry.dispatchAction !== 'function') {
    registry.dispatchAction = (detail) => emit(detail);
  }

  registry.version = registry.version ?? '0.1.0';

  class OIInterfaceElement extends HTMLElement {
    constructor() {
      super();
      this._container = null;
      this._currentSrc = null;
      this._cleanup = null;
      this._loadingToken = 0;
    }

    static get observedAttributes() {
      return ['component-src', 'interface-lookup', 'lookup', 'workspace'];
    }

    connectedCallback() {
      this.dataset.status = this.dataset.status || 'idle';
      this._load();
    }

    disconnectedCallback() {
      this._teardown();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      if (!this.isConnected) return;
      if (
        name === 'component-src' || name === 'interface-lookup' || name === 'lookup' ||
        name === 'workspace'
      ) {
        this._load();
      }
    }

    async _load() {
      const lookup = this.getAttribute('interface-lookup') || this.getAttribute('lookup') || '';
      if (!lookup) {
        this.dataset.status = 'error';
        this.textContent = this.getAttribute('missing-text') || 'Interface lookup is required.';
        return;
      }

      const componentSrcAttr = this.getAttribute('component-src');
      const componentSrc = toAbsoluteSrc(componentSrcAttr) ||
        `/api/workspaces/explorer/interfaces/${lookup}/component.js`;
      const token = this.getAttribute('token') || undefined;
      const workspace = this.getAttribute('workspace') || undefined;
      const loadingToken = ++this._loadingToken;

      if (!this._container) {
        const shadow = this.shadowRoot || this.attachShadow({ mode: 'open' });
        shadow.innerHTML = '';
        this._container = document.createElement('div');
        this._container.className = 'oi-interface-root';
        shadow.appendChild(this._container);
      }

      this.dataset.status = 'loading';
      this._container.textContent = this.getAttribute('loading-text') || 'Loading interface...';

      this._teardown();

      try {
        this._currentSrc = componentSrc;
        const module = await import(/* @vite-ignore */ componentSrc);
        if (loadingToken !== this._loadingToken) {
          return;
        }

        const mount = typeof module?.mount === 'function'
          ? module.mount
          : typeof module?.default === 'function'
          ? module.default
          : typeof module?.default?.mount === 'function'
          ? module.default.mount
          : undefined;

        if (typeof mount !== 'function') {
          throw new Error('Component module did not export a mount function.');
        }

        const context = {
          lookup,
          workspace,
          token,
          element: this,
          container: this._container,
          dispatchAction: (action) => this._dispatch(action),
          setStatus: (status) => {
            if (status) this.dataset.status = status;
          },
        };

        const result = await mount(this._container, context);
        if (typeof result === 'function') {
          this._cleanup = result;
        } else if (result && typeof result.unmount === 'function') {
          this._cleanup = result.unmount.bind(result);
        } else {
          this._cleanup = null;
        }

        if (loadingToken === this._loadingToken) {
          this.dataset.status = 'ready';
        }
      } catch (err) {
        if (loadingToken !== this._loadingToken) {
          return;
        }
        console.error('[oi-interface] failed to load component module', err);
        this.dataset.status = 'error';
        this._container.textContent = this.getAttribute('error-text') ||
          'Failed to load interface.';
      }
    }

    _teardown() {
      if (typeof this._cleanup === 'function') {
        try {
          this._cleanup();
        } catch (err) {
          console.warn('[oi-interface] cleanup threw', err);
        }
      }
      this._cleanup = null;
      if (this._container) {
        this._container.replaceChildren();
      }
    }

    _dispatch(action) {
      if (!action || typeof action !== 'object') return;
      const lookup = action.lookup || this.getAttribute('interface-lookup') ||
        this.getAttribute('lookup') || '';
      const workspace = action.workspace || this.getAttribute('workspace') || undefined;
      const detail = {
        action: {
          type: action.type || 'unknown',
          payload: 'payload' in action ? action.payload : action,
          lookup,
          workspace,
        },
        element: this,
      };
      emit(detail);
    }
  }

  if (!globalScope.customElements.get('oi-interface')) {
    globalScope.customElements.define('oi-interface', OIInterfaceElement);
  }
})();
