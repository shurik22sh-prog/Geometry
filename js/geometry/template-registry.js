const TemplateRegistry = (() => {
  const _registry = {};

  function register(name, template) {
    if (typeof template.build !== 'function') {
      throw new Error(`Template "${name}" must expose a build(config) function`);
    }
    _registry[name] = template;
  }

  function get(name) {
    const template = _registry[name];
    if (!template) throw new Error(`Template not registered: "${name}"`);
    return template;
  }

  function has(name) {
    return Object.prototype.hasOwnProperty.call(_registry, name);
  }

  return { register, get, has };
})();
